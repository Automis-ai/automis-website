// Lead-magnet capture for the /arcangelo IG landing.
// Upserts the contact into GoHighLevel via the API v2 (no webhook needed) and
// tags it by niche + newsletter consent. A GHL workflow triggered by the
// `lead-magnet` tag sends the delivery email and starts the nurture sequence.
// The PDF itself is also delivered as an instant download on the page.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, niche, niche_label, newsletter } = body || {};

    if (!email || !niche) {
      return new Response("Missing email or niche", { status: 400 });
    }

    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    // Not wired yet (keys not in Vercel env). Fail soft — the page still shows
    // the instant download; we just haven't captured the lead server-side.
    if (!token || !locationId) {
      console.warn("GHL_API_KEY / GHL_LOCATION_ID not set — playbook lead not captured:", { email, niche });
      return new Response("Capture not configured", { status: 501 });
    }

    const tags = ["lead-magnet", `playbook-${niche}`, "arcangelo-ig"];
    if (newsletter) tags.push("newsletter");

    const res = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        email,
        name: name || undefined,
        tags,
        source: "arcangelo-ig-landing",
        // Store the niche id (clinic/online/realestate/local) so a single GHL
        // delivery email can link the right PDFs via {{contact.playbook_niche}}.
        customFields: [{ id: "BAaDWAqOd88h9ES3I8pT", value: niche }],
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("GHL upsert failed:", res.status, text);
      return new Response(text, { status: res.status });
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Playbook API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
