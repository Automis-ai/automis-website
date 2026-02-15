export async function POST(req) {
  try {
    const body = await req.json();

    console.log("ENV URL:", process.env.GHL_AUDIT_WEBHOOK_URL);

    if (!process.env.GHL_AUDIT_WEBHOOK_URL) {
      return new Response("Webhook URL not configured", { status: 500 });
    }

    const response = await fetch(
      process.env.GHL_AUDIT_WEBHOOK_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    console.log("GHL response:", text);

    if (!response.ok) {
      return new Response(text, { status: response.status });
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}