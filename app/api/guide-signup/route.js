// Iscrizione alla guida «alternativa a ManyChat» (IT + EN), con email VERIFICATA.
// 1) salva il contatto in GHL (stessa API v2 di /api/audit-sample);
// 2) scrive nel campo personalizzato `guide_link` il link di conferma (scade in 30 minuti);
// 3) toglie e rimette il tag-richiesta: è il tag a far partire il workflow GHL che manda la mail.
// La guida NON si apre da qui: si apre solo cliccando il link nella mail (/api/guide-access).
import { makeLinkToken } from "@/lib/guideGate";

const GHL_BASE = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const SITE = process.env.GUIDE_SITE_URL || "https://automis.ai";
const SOURCE = "ig-guida-alternativa-manychat";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COOLDOWN_MS = 60 * 1000;

// I tag-richiesta (quelli che fanno partire il workflow GHL) hanno il trattino basso, come creati in GHL.
const LANGS = {
  it: { stable: "guida-commento-dm", request: "guida_richiesta", newsPending: "newsletter-richiesta" },
  en: { stable: "guide-comment-dm-en", request: "guide_request_en", newsPending: "newsletter-requested-en" },
};

// Freno anti-abuso (chiunque può scrivere l'email di un altro): una richiesta al minuto per indirizzo.
// È in memoria, quindi vale per istanza: aiuta ma non basta da solo; la regola vera è sul firewall di Vercel.
const lastSent = new Map();
let cachedFieldId; // undefined = non cercato; "" = cercato e non trovato

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
  Accept: "application/json",
});

// Il campo si trova per nome (come fa /api/audit): `guide_link`, tipo testo lungo.
async function guideLinkFieldId(token, locationId) {
  if (cachedFieldId) return cachedFieldId;
  const res = await fetch(`${GHL_BASE}/locations/${locationId}/customFields`, { headers: headers(token) });
  if (!res.ok) return "";
  const data = await res.json().catch(() => ({}));
  const match = (data.customFields || []).find((f) => {
    const k = String(f.fieldKey || "").toLowerCase();
    const n = String(f.name || "").toLowerCase().replace(/\s+/g, "_");
    return k.endsWith("guide_link") || n === "guide_link";
  });
  if (match) cachedFieldId = match.id;
  return match?.id || "";
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const cfg = LANGS[body?.lang];
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!cfg || !email || email.length > 254 || !EMAIL_RE.test(email)) return json({ error: "invalid" }, 400);

    // Campo trappola per i bot: finto ok, niente salvataggio, niente mail.
    if (typeof body.company === "string" && body.company.trim()) return json({ ok: true, sent: true });

    const now = Date.now();
    if (now - (lastSent.get(email) || 0) < COOLDOWN_MS) return json({ error: "too_soon" }, 429);

    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) {
      console.warn("guide-signup: GHL_API_KEY / GHL_LOCATION_ID not set");
      return json({ error: "not_configured" }, 501);
    }
    const fieldId = await guideLinkFieldId(token, locationId);
    if (!fieldId) {
      console.error("guide-signup: custom field 'guide_link' not found in GHL");
      return json({ error: "not_configured" }, 501);
    }

    // 1) contatto (con i tag che NON fanno partire la mail)
    const wantsNews = body.newsletter === true;
    // Nome di battesimo: serve a salutare per nome. Pulito e corto; se manca, il contatto resta com'è.
    const firstName = (typeof body.name === "string" ? body.name : "")
      .replace(/[\u0000-\u001f<>]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 60);
    const tags = [cfg.stable, ...(wantsNews ? [cfg.newsPending] : [])];
    const up = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify({ locationId, email, tags, source: SOURCE, ...(firstName ? { firstName } : {}) }),
    });
    if (!up.ok) {
      console.error("guide-signup: upsert failed:", up.status, await up.text());
      return json({ error: "save_failed" }, 502);
    }
    const data = await up.json().catch(() => null);
    const contactId = data?.contact?.id || data?.id;
    if (!contactId) {
      console.error("guide-signup: no contact id in upsert response");
      return json({ error: "save_failed" }, 502);
    }

    // 2) link di conferma nel campo (PRIMA del tag: la mail deve trovarlo già scritto)
    const t = makeLinkToken(contactId, body.lang, wantsNews);
    if (!t) return json({ error: "not_configured" }, 501);
    const link = `${SITE}/api/guide-access?t=${encodeURIComponent(t)}`;
    const put = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify({ customFields: [{ id: fieldId, field_value: link }] }),
    });
    if (!put.ok) {
      console.error("guide-signup: custom field update failed:", put.status, await put.text());
      return json({ error: "save_failed" }, 502);
    }

    // 3) tag-richiesta: tolto e rimesso, così il workflow parte anche alla seconda richiesta
    await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: "DELETE",
      headers: headers(token),
      body: JSON.stringify({ tags: [cfg.request] }),
    }).catch(() => {});
    const tg = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify({ tags: [cfg.request] }),
    });
    if (!tg.ok) {
      console.error("guide-signup: tag failed:", tg.status, await tg.text());
      return json({ error: "save_failed" }, 502);
    }

    lastSent.set(email, now);
    return json({ ok: true, sent: true });
  } catch (err) {
    console.error("guide-signup route error:", err);
    return json({ error: "server" }, 500);
  }
}
