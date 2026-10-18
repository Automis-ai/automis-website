// Contact form (/contact, /it/contact, /pt/contact).
// Upserts the contact directly in GoHighLevel, like /api/audit and
// /api/tool-capture, and writes the message as a note on the contact. It used
// to forward to an n8n cloud webhook (automis.app.n8n.cloud) that no longer
// exists. Unlike the soft captures, a failed upsert returns an error so the
// form shows it instead of a false "sent".
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const ghlNotesUrl = (contactId) => `https://services.leadconnectorhq.com/contacts/${contactId}/notes`;
// Tags go through the add-tags endpoint: `tags` on upsert replaces the existing
// ones, which would wipe what the finder or the tools set on a returning contact.
const ghlTagsUrl = (contactId) => `https://services.leadconnectorhq.com/contacts/${contactId}/tags`;

// GHL notes are attributed to a user; default to the Automis admin account.
const GHL_NOTE_USER_ID = process.env.GHL_USER_ID || "YabuGXVJOw3apas82kit";

const LOCALES = ["en", "it", "pt"];

const slug = (v) =>
  String(v)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const clean = (v, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function buildNote({ subject, message, company, phone, locale, attribution }) {
  const lines = ["Contact form automis.ai"];
  if (subject) lines.push(`Oggetto: ${subject}`);
  if (company) lines.push(`Azienda: ${company}`);
  if (phone) lines.push(`Telefono: ${phone}`);
  lines.push(`Lingua: ${locale}`);
  lines.push("", message || "(nessun messaggio)");
  const attr = attribution || {};
  const src = [attr.utm_source, attr.utm_medium, attr.utm_campaign, attr.utm_content].filter(Boolean);
  if (src.length) lines.push("", `UTM: ${src.join(" / ")}`);
  if (attr.landing_path) lines.push(`Landing: ${attr.landing_path}`);
  if (attr.referrer) lines.push(`Referrer: ${attr.referrer}`);
  return lines.join("\n");
}

export async function POST(req) {
  try {
    const body = (await req.json().catch(() => null)) || {};
    const email = clean(body.email, 200);
    const name = clean(body.name, 200);
    const phone = clean(body.phone, 50);
    const company = clean(body.company, 200);
    const subject = clean(body.subject, 300);
    const message = clean(body.message);
    const locale = LOCALES.includes(body.locale) ? body.locale : "en";
    const attribution = body.attribution && typeof body.attribution === "object" ? body.attribution : {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response("Missing or invalid email", { status: 400 });
    }

    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) {
      console.error("GHL_API_KEY / GHL_LOCATION_ID not set, contact form lead lost:", email);
      return new Response("Contact service not configured", { status: 503 });
    }

    const tags = ["contact-form", `lingua:${locale}`];
    if (attribution.utm_source) tags.push(`sorgente:${slug(attribution.utm_source)}`);
    if (attribution.utm_campaign) tags.push(`pilastro:${slug(attribution.utm_campaign)}`);

    const headers = {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const res = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        email,
        name: name || undefined,
        phone: phone || undefined,
        companyName: company || undefined,
        source: "contact-form",
      }),
    });
    if (!res.ok) {
      console.error("GHL upsert failed:", res.status, await res.text());
      return new Response("Upstream error", { status: 502 });
    }

    // Best effort: the contact is already saved; tags and note follow.
    const data = await res.json().catch(() => null);
    const contactId = data?.contact?.id || data?.id;
    if (contactId) {
      try {
        const tagRes = await fetch(ghlTagsUrl(contactId), {
          method: "POST",
          headers,
          body: JSON.stringify({ tags }),
        });
        if (!tagRes.ok) {
          console.error("GHL tags failed:", tagRes.status, await tagRes.text());
        }
      } catch (err) {
        console.error("GHL tags error:", err);
      }
      try {
        const noteRes = await fetch(ghlNotesUrl(contactId), {
          method: "POST",
          headers,
          body: JSON.stringify({
            body: buildNote({ subject, message, company, phone, locale, attribution }),
            userId: GHL_NOTE_USER_ID,
          }),
        });
        if (!noteRes.ok) {
          console.error("GHL note failed:", noteRes.status, await noteRes.text());
        }
      } catch (err) {
        console.error("GHL note error:", err);
      }
    } else {
      console.error("GHL upsert returned no contact id, message not attached:", email);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Contact form API error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
