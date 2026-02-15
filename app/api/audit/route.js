export async function POST(req) {
  try {
    const body = await req.json();

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

    if (!response.ok) {
      console.error("❌ GHL Error:", text);
      return new Response(text, { status: response.status });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}