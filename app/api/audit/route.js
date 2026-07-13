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
// Per-post attribution (see personal-brands/utm-tagging.md): the id of the
// "lead_source_content" custom field. Set GHL_CF_LEAD_SOURCE_CONTENT once the
// field exists in GHL; until then the sorgente:/pilastro: tags still apply,
// only the per-post field write is skipped.
const CF_LEAD_SOURCE_CONTENT = process.env.GHL_CF_LEAD_SOURCE_CONTENT;

// GHL tag values: short, lowercase, slug-safe.
const slug = (v) =>
  String(v)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

// GHL notes are attributed to a user; default to the Automis admin account
// (admin@automis.ai), overridable via GHL_USER_ID.
const GHL_NOTE_USER_ID = process.env.GHL_USER_ID || "YabuGXVJOw3apas82kit"; // Admin Automis

// Compose the human-readable finder note that lands on the GHL contact timeline,
// so whoever takes the booked call can see exactly what the lead answered.
function buildFinderNote({ answers_detail, recommended_pillar, estimated_hours_saved, roadmap_url, attribution }) {
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
  if (attribution && (attribution.utm_source || attribution.utm_content)) {
    const src = [attribution.utm_source, attribution.utm_campaign, attribution.utm_content]
      .filter(Boolean)
      .join(" / ");
    lines.push(`Source: ${src}`);
  }
  return lines.join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, tags, source, roadmap_url, recommended_pillar, estimated_hours_saved, answers_detail, attribution } = body || {};

    // Direct contact upsert: guarantees the contact + tags + personalized custom
    // fields land, so a tag-triggered workflow can email the roadmap with no webhook.
    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (email && token && locationId) {
      // UTM -> GHL (utm-tagging.md): utm_source/utm_campaign become tags, and the
      // exact content (post id) becomes the lead_source_content custom field —
      // that field is what lets a booked call be traced back to the single post.
      const attr = attribution || {};
      const utmTags = [];
      if (attr.utm_source) utmTags.push(`sorgente:${slug(attr.utm_source)}`);
      if (attr.utm_campaign) utmTags.push(`pilastro:${slug(attr.utm_campaign)}`);
      const allTags = [...(Array.isArray(tags) ? tags : []), ...utmTags];

      const customFields = [
        roadmap_url && { id: CF_ROADMAP_URL, field_value: roadmap_url },
        recommended_pillar && { id: CF_RECOMMENDED_PILLAR, field_value: recommended_pillar },
        estimated_hours_saved && { id: CF_HOURS_SAVED, field_value: estimated_hours_saved },
        CF_LEAD_SOURCE_CONTENT && attr.utm_content && { id: CF_LEAD_SOURCE_CONTENT, field_value: String(attr.utm_content).slice(0, 200) },
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
            tags: allTags.length ? allTags : undefined,
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
                  userId: GHL_NOTE_USER_ID,
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
