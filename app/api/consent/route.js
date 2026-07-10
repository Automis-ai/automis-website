import { NextResponse } from "next/server";

/*
  Proof of consent.

  GDPR expects the controller to be able to demonstrate that consent was given.
  The visitor's choice already lives in a first-party cookie on their device;
  this endpoint keeps a durable copy on our side.

  Set CONSENT_LOG_WEBHOOK (e.g. an n8n webhook) to persist the records. Without
  it we only write to the server log, which is fine for staging but is NOT a
  durable consent register: set the webhook before relying on this in
  production.

  We record the choice, not the person: no name, email, or IP is stored here.
*/

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body?.categories || typeof body.v !== "number") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const record = {
    version: body.v,
    timestamp: body.ts,
    categories: {
      statistics: !!body.categories.statistics,
      marketing: !!body.categories.marketing,
    },
    locale: body.locale ?? null,
    path: body.path ?? null,
    user_agent: request.headers.get("user-agent")?.slice(0, 200) ?? null,
  };

  const webhook = process.env.CONSENT_LOG_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      // Never fail the visitor's request because our log is down.
    }
  } else {
    console.log("[consent]", JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}
