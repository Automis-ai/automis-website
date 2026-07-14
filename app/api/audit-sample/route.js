// Lead-magnet capture for the jumpstart-audit "sample audit" forms (EN + IT).
// Upserts the contact into GoHighLevel via the API v2 (no webhook needed) and
// tags it. A GHL workflow triggered by that tag can send the delivery email and
// start a nurture. The PDF is also delivered as an instant download on the page.
//
// The locale forms pass their own `tags` + `source` in the body so IT leads land
// with tag "audit form IT" and can be segmented; when absent we default to the
// original EN values, so the EN form keeps working unchanged.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

const DEFAULT_TAGS = ["audit form"];
const DEFAULT_SOURCE = "jumpstart-audit-sample";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body || {};

    if (!name || !email) {
      return new Response("Missing name or email", { status: 400 });
    }

    // Only accept a clean array of non-empty strings from the client; otherwise
    // fall back to the EN defaults so a malformed body can't drop the tag.
    const tags =
      Array.isArray(body?.tags) &&
      body.tags.length > 0 &&
      body.tags.every((t) => typeof t === "string" && t.trim())
        ? body.tags.map((t) => t.trim())
        : DEFAULT_TAGS;
    const source =
      typeof body?.source === "string" && body.source.trim()
        ? body.source.trim()
        : DEFAULT_SOURCE;

    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    // Fail soft: the page still delivers the download even if capture is not wired.
    if (!token || !locationId) {
      console.warn("GHL_API_KEY / GHL_LOCATION_ID not set — audit-sample lead not captured:", { email });
      return new Response("Capture not configured", { status: 501 });
    }

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
        name,
        tags,
        source,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("GHL upsert failed:", res.status, text);
      return new Response(text, { status: res.status });
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Audit-sample API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
