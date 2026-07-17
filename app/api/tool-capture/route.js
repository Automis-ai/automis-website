// Free-tools lead capture ("email me a copy").
// Mirrors /api/audit: upserts the contact directly in GoHighLevel with a
// tool-specific tag, and (best effort) writes the computed result as a note so
// whoever follows up sees the numbers. The tool always shows its result
// regardless of the upsert outcome; this is a soft, optional capture.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const ghlNotesUrl = (contactId) => `https://services.leadconnectorhq.com/contacts/${contactId}/notes`;

// GHL notes are attributed to a user; default to the Automis admin account.
const GHL_NOTE_USER_ID = process.env.GHL_USER_ID || "YabuGXVJOw3apas82kit";

const slug = (v) =>
  String(v)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export async function POST(req) {
  try {
    const body = (await req.json()) || {};
    const { email, name, toolName, locale, resultSummary } = body;

    if (!email) return new Response("Missing email", { status: 400 });

    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (token && locationId) {
      const tags = [
        `tool-${slug(toolName || "unknown")}`,
        "tool-lead",
        locale === "it" ? "lingua:it" : "lingua:en",
      ];
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
            tags,
            source: "tools",
          }),
        });
        if (!res.ok) {
          console.error("GHL upsert failed:", res.status, await res.text());
        } else if (resultSummary) {
          const data = await res.json().catch(() => null);
          const contactId = data?.contact?.id || data?.id;
          if (contactId) {
            try {
              await fetch(ghlNotesUrl(contactId), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Version: "2021-07-28",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  body: `Tool: ${toolName || "(unknown)"}\n\n${resultSummary}`,
                  userId: GHL_NOTE_USER_ID,
                }),
              });
            } catch (err) {
              console.error("GHL note error:", err);
            }
          }
        }
      } catch (err) {
        console.error("GHL upsert error:", err);
      }
    } else {
      console.warn("GHL_API_KEY / GHL_LOCATION_ID not set, tool lead not upserted:", email);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("tool-capture error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
