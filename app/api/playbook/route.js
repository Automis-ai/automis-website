// Lead-magnet delivery for the /arcangelo IG landing.
// Forwards {niche, name, email, ...} to a GoHighLevel inbound webhook, which
// runs the workflow that emails the matching cheat sheet + playbook and tags
// the contact `lead-magnet · <niche>`. Same pattern as /api/audit.
export async function POST(req) {
  try {
    const body = await req.json();

    if (!process.env.GHL_PLAYBOOK_WEBHOOK_URL) {
      // Not wired yet (GHL workflow / Vercel env pending). Fail soft so the
      // front-end can still confirm to the user; the lead is logged below.
      console.warn("GHL_PLAYBOOK_WEBHOOK_URL not configured — playbook lead not forwarded:", body);
      return new Response("Webhook not configured", { status: 501 });
    }

    const response = await fetch(process.env.GHL_PLAYBOOK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("GHL playbook response:", text);

    if (!response.ok) {
      return new Response(text, { status: response.status });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Playbook API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
