export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch(
      "https://automis.app.n8n.cloud/webhook/contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.N8N_SECRET_KEY,
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();
    if (!response.ok) {
      return new Response(text, { status: response.status });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Contact form API error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
