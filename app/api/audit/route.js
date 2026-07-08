// Opportunity Finder lead capture.
// Creates/updates the contact directly in GoHighLevel (same approach as the
// /api/playbook IG magnet), applying the finder tags AND writing the personalized
// results (roadmap link, pillar, hours) as contact custom fields. This lets a
// simple tag-triggered GHL workflow deliver a personalized email with no premium
// Inbound Webhook trigger. Best effort: the finder still shows the instant
// download regardless of the upsert result.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const ghlNotesUrl = (contactId) => `https://services.leadconnectorhq.com/contacts/${contactId}/notes`;

// GHL custom-field IDs (location wnpNuP…). Created 2026-07-08.
const CF_ROADMAP_URL = "HhlNjlKkTj8bEtWew4xA"; // contact.roadmap_url
const CF_RECOMMENDED_PILLAR = "8Upb1lCetqUpDzWhiCyn"; // contact.recommended_pillar
const CF_HOURS_SAVED = "FZ6gVGj8yaCegdM3990C"; // contact.hours_saved

// Compose the human-readable finder note that lands on the GHL contact timeline,
// so whoever takes the booked call can see exactly what the lead answered.
function buildFinderNote({ answers_detail, recommended_pillar, estimated_hours_saved, roadmap_url }) {
  const lines = ["AI Opportunity Finder · quiz answers", ""];
  (Array.isArray(answers_detail) ? answers_detail : []).forEach(({ q, a }) => {
    if (!q) return;
    lines.push(q);
    lines.push(`> ${a || "(no answer)"}`);
    lines.push("");
  });
  if (recommended_pillar) lines.push(`Recommended focus: ${recommended_pillar}`);
  if (estimated_hours_saved) lines.push(`Estimated time back: ${estimated_hours_saved}`);
  if (roadmap_url) lines.push(`Roadmap: ${roadmap_url}`);
  return lines.join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, tags, source, roadmap_url, recommended_pillar, estimated_hours_saved, answers_detail } = body || {};

    // Direct contact upsert: guarantees the contact + tags + personalized custom
    // fields land, so a tag-triggered workflow can email the roadmap with no webhook.
    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (email && token && locationId) {
      const customFields = [
        roadmap_url && { id: CF_ROADMAP_URL, field_value: roadmap_url },
        recommended_pillar && { id: CF_RECOMMENDED_PILLAR, field_value: recommended_pillar },
        estimated_hours_saved && { id: CF_HOURS_SAVED, field_value: estimated_hours_saved },
      ].filter(Boolean);
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
            customFields: customFields.length ? customFields : undefined,
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("GHL upsert failed:", res.status, text);
        } else {
          // Upsert OK: attach the finder answers as a note on the contact so the
          // full quiz context is visible in the timeline before any call.
          const data = await res.json().catch(() => null);
          const contactId = data?.contact?.id || data?.id;
          if (contactId && Array.isArray(answers_detail) && answers_detail.length) {
            try {
              const noteRes = await fetch(ghlNotesUrl(contactId), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Version: "2021-07-28",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  body: buildFinderNote(body),
                  ...(process.env.GHL_USER_ID ? { userId: process.env.GHL_USER_ID } : {}),
                }),
              });
              if (!noteRes.ok) {
                console.error("GHL note failed:", noteRes.status, await noteRes.text());
              }
            } catch (err) {
              console.error("GHL note error:", err);
            }
          }
        }
      } catch (err) {
        console.error("GHL upsert error:", err);
      }
    } else if (email) {
      console.warn("GHL_API_KEY / GHL_LOCATION_ID not set — finder contact not upserted:", { email, tags });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
