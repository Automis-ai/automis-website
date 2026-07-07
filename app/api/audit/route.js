// Opportunity Finder lead capture.
// Creates/updates the contact directly in GoHighLevel (same approach as the
// /api/playbook IG magnet, so the contact lands with its tags WITHOUT needing a
// GHL workflow), and also forwards the full payload to the audit webhook so any
// workflow can email the roadmap link + start nurture. Both steps are best
// effort: the finder still shows the instant download regardless.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, tags, source } = body || {};

    // 1) Direct contact upsert (guarantees the contact + tags, no workflow needed).
    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (email && token && locationId) {
      try {
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
            tags: Array.isArray(tags) ? tags : undefined,
            source: source || "opportunity-finder",
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("GHL upsert failed:", res.status, text);
        }
      } catch (err) {
        console.error("GHL upsert error:", err);
      }
    } else if (email) {
      console.warn("GHL_API_KEY / GHL_LOCATION_ID not set — finder contact not upserted:", { email, tags });
    }

    // 2) Forward the full payload to the audit webhook (carries roadmap_url,
    //    variant, pillar, answers, etc. for an email/nurture workflow).
    if (process.env.GHL_AUDIT_WEBHOOK_URL) {
      try {
        await fetch(process.env.GHL_AUDIT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error("Audit webhook error:", err);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
