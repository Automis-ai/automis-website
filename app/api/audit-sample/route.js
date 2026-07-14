// Lead-magnet capture for the /jumpstart-audit "sample audit" form.
// Upserts the contact into GoHighLevel via the API v2 (no webhook needed) and
// tags it "audit form". A GHL workflow triggered by that tag can send the
// delivery email and start a nurture. The PDF is also delivered as an instant
// download on the page.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body || {};

    if (!name || !email) {
      return new Response("Missing name or email", { status: 400 });
    }

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
        tags: ["audit form"],
        source: "jumpstart-audit-sample",
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
