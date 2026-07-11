import { NextResponse } from "next/server";
import crypto from "crypto";

/*
  Server-side "call booked" conversion.

  The booking calendar is a LeadConnector/GHL iframe on a third-party domain, so
  the browser cannot see when a booking actually completes. GHL can: configure a
  workflow webhook that calls this endpoint whenever an appointment is booked.

  We then report the conversion two ways:
    - GA4 Measurement Protocol  -> event `booking_completed`
    - Meta Conversions API       -> event `Schedule`
  Meta matches on hashed email/phone, so it does not need a browser id. GA4 does
  need a client_id; GHL rarely has the GA one, so we fall back to a stable id
  derived from the email. That still records the conversion, it just may not
  join the original web session.

  Everything is env-gated and no-ops if the keys are absent, so this is safe to
  ship before the accounts are configured. Required env:
    CONVERSION_WEBHOOK_SECRET  shared secret, checked on every call
    GA4_MEASUREMENT_ID         e.g. G-14M9EVJL3N
    GA4_API_SECRET             GA4 Admin > Data Streams > Measurement Protocol
    META_PIXEL_ID              e.g. 3659071671051477
    META_CAPI_TOKEN            Meta Events Manager > Settings > Conversions API
*/

export const runtime = "nodejs";

const sha256 = (v) =>
  crypto.createHash("sha256").update(String(v).trim().toLowerCase()).digest("hex");

function clientIdFor(payload) {
  if (payload.ga_client_id) return String(payload.ga_client_id);
  if (payload.email) {
    // Deterministic pseudo client_id in GA's "xxxxx.yyyyy" shape.
    const h = crypto.createHash("md5").update(String(payload.email).toLowerCase()).digest("hex");
    return `${parseInt(h.slice(0, 8), 16)}.${parseInt(h.slice(8, 16), 16)}`;
  }
  return `${Math.floor(Math.random() * 1e10)}.${Math.floor(Math.random() * 1e10)}`;
}

async function sendGA4(payload) {
  const id = process.env.GA4_MEASUREMENT_ID;
  const secret = process.env.GA4_API_SECRET;
  if (!id || !secret) return { ga4: "skipped" };

  const body = {
    client_id: clientIdFor(payload),
    events: [
      {
        name: "booking_completed",
        params: {
          value: payload.value ?? 0,
          currency: payload.currency ?? "EUR",
          locale: payload.locale ?? null,
          source: payload.utm_source ?? null,
          engagement_time_msec: 1,
        },
      },
    ],
  };
  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${id}&api_secret=${secret}`,
    { method: "POST", body: JSON.stringify(body) }
  );
  return { ga4: res.ok ? "ok" : `error ${res.status}` };
}

async function sendMeta(payload, request) {
  const pixel = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return { meta: "skipped" };

  const userData = {};
  if (payload.email) userData.em = [sha256(payload.email)];
  if (payload.phone) userData.ph = [sha256(String(payload.phone).replace(/[^0-9]/g, ""))];
  if (payload.fbp) userData.fbp = payload.fbp;
  if (payload.fbc) userData.fbc = payload.fbc;
  userData.client_user_agent = request.headers.get("user-agent") || undefined;

  const body = {
    data: [
      {
        event_name: "Schedule",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: payload.event_source_url || "https://automis.ai",
        user_data: userData,
        custom_data: { currency: payload.currency ?? "EUR", value: payload.value ?? 0 },
      },
    ],
  };
  const res = await fetch(
    `https://graph.facebook.com/v19.0/${pixel}/events?access_token=${token}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  return { meta: res.ok ? "ok" : `error ${res.status}` };
}

export async function POST(request) {
  const secret = process.env.CONVERSION_WEBHOOK_SECRET;
  if (secret) {
    const provided =
      request.headers.get("x-webhook-secret") ||
      new URL(request.url).searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  // GHL webhooks vary; accept common field names.
  // GHL's workflow webhook varies in shape; accept the common field names.
  const normalized = {
    email: payload.email || payload.contact?.email || payload.contact_email,
    phone: payload.phone || payload.contact?.phone || payload.contact_phone,
    locale: payload.locale,
    // Custom-data values arrive as strings ("297"); coerce for GA4/Meta.
    value: payload.value != null ? Number(payload.value) || 0 : 0,
    currency: payload.currency,
    ga_client_id: payload.ga_client_id,
    fbp: payload.fbp,
    fbc: payload.fbc,
    utm_source: payload.utm_source,
    event_source_url: payload.event_source_url,
  };

  const results = {};
  try {
    Object.assign(results, await sendGA4(normalized));
  } catch (e) {
    results.ga4 = "exception";
  }
  try {
    Object.assign(results, await sendMeta(normalized, request));
  } catch (e) {
    results.meta = "exception";
  }

  // Debug echo: field NAMES received + whether the match keys were found.
  // No personal data (no address/number), just names and booleans, so it is
  // safe to read in GHL's execution logs while wiring the webhook.
  return NextResponse.json({
    ok: true,
    ...results,
    received: {
      keys: Object.keys(payload || {}).slice(0, 40),
      has_email: !!normalized.email,
      has_phone: !!normalized.phone,
      value: normalized.value,
    },
  });
}
