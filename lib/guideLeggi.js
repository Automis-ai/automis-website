// Lettore online delle guide (contratto v3). Niente PDF e niente download: la persona conferma il numero,
// poi legge le pagine come immagini WebP dal bucket PRIVATO Supabase `guide`.
//
//   POST /api/guide-leggi-accesso {phone, slug}
//     contatto in GHL per telefono (lettura) -> il codice della guida è in `guide_ricevute`? -> cookie httpOnly
//     firmato `ga_lettore` (hash del telefono + codici abilitati, 30 giorni). Alla prima apertura di quella
//     guida da parte del contatto: tag GHL `letto-<CODICE>` (l'unica scrittura).
//   POST /api/guide-leggi-pagine {slug, from, to}
//     con il cookie: link firmati di 10 minuti per un gruppo di pagine (caricamento progressivo: si chiedono
//     man mano che la pagina si avvicina allo schermo, così i link non scadono mentre si legge).
//   GET /api/guide-leggi-web?slug=
//     «guida web» (una pagina HTML, manifest con formato "web"): con lo stesso cookie, l'HTML dal bucket
//     privato (web/<CODICE>/index.html) servito dal server, mai un link: senza cookie non esce niente.
//
// Numero sconosciuto e numero senza quella guida: STESSA risposta (found:false). Freno per IP e per numero,
// campo trappola, come /api/guide-signup. Le dipendenze arrivano da fuori (fetch, catalogo, env, orologio):
// le route le passano vere, scripts/test-guide-wa-access.mjs le passa finte.
import { normalizePhone } from "./guidePhone.js";
import { READER_COOKIE, READER_TTL_MS, hashPhone, makeReaderToken, readReaderToken } from "./guideGate.js";

const GHL_BASE_DEFAULT = "https://services.leadconnectorhq.com";
export const LINK_TTL_S = 600; // 10 minuti
const BUCKET_DEFAULT = "guide";
const IP_LIMIT = 6; // tentativi
const IP_WINDOW_MS = 10 * 60 * 1000;
const PHONE_LIMIT = 4; // stesso numero: evita di martellare un contatto con tanti IP
const PHONE_WINDOW_MS = 10 * 60 * 1000;
export const BATCH_MAX = 12; // pagine firmate per richiesta
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const hits = { ip: new Map(), phone: new Map() };
let cachedFieldId; // id del campo guide_ricevute: cercato una volta per istanza

export function _resetForTests() {
  hits.ip.clear();
  hits.phone.clear();
  cachedFieldId = undefined;
}

const reply = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });

// Finestra scorrevole: conta i tentativi recenti e registra questo. true = da bloccare.
function tooMany(store, key, limit, windowMs, now) {
  const list = (store.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    store.set(key, list);
    return true;
  }
  list.push(now);
  store.set(key, list);
  if (store.size > 5000) {
    for (const [k, v] of store) if (!v.some((t) => now - t < windowMs)) store.delete(k);
  }
  return false;
}

function clientIp(req) {
  const xf = req.headers.get("x-forwarded-for");
  return (xf ? xf.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim();
}

export function readCookie(header, name) {
  for (const part of String(header || "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

const ghlHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Version: "2021-07-28",
  Accept: "application/json",
});

// Il campo si trova per nome (come /api/guide-signup con guide_link): `guide_ricevute`.
async function receivedFieldId(f, base, token, locationId) {
  if (cachedFieldId) return cachedFieldId;
  const res = await f(`${base}/locations/${locationId}/customFields`, { headers: ghlHeaders(token) });
  if (!res.ok) throw new Error(`customFields ${res.status}`);
  const data = await res.json().catch(() => ({}));
  const match = (data.customFields || []).find((c) => {
    const k = String(c.fieldKey || "").toLowerCase();
    const n = String(c.name || "").toLowerCase().replace(/\s+/g, "_");
    return k.endsWith("guide_ricevute") || n === "guide_ricevute";
  });
  if (match) cachedFieldId = match.id;
  return match?.id || "";
}

// Contatto per telefono (sola lettura). Poi lo rileggo per id: la ricerca non sempre porta campi e tag.
async function findContact(f, base, token, locationId, phone) {
  const url = `${base}/contacts/search/duplicate?locationId=${encodeURIComponent(locationId)}&number=${encodeURIComponent(phone)}`;
  const res = await f(url, { headers: ghlHeaders(token) });
  if (res.status === 404 || res.status === 400 || res.status === 422) return null;
  if (!res.ok) throw new Error(`duplicate ${res.status}`);
  const data = await res.json().catch(() => ({}));
  const found = data?.contact;
  if (!found?.id) return null;
  if (Array.isArray(found.customFields) && found.customFields.length && Array.isArray(found.tags)) return found;
  const full = await f(`${base}/contacts/${found.id}`, { headers: ghlHeaders(token) });
  if (!full.ok) throw new Error(`contact ${full.status}`);
  const d = await full.json().catch(() => ({}));
  return d?.contact || found;
}

export function parseReceived(value) {
  const raw = Array.isArray(value) ? value.join(",") : String(value ?? "");
  return raw.split(/[\s,;]+/).map((c) => c.trim().toUpperCase()).filter(Boolean);
}

const cookieHeader = (token, env) => {
  const secure = String(env.GUIDE_SITE_URL || "https://automis.ai").startsWith("https") ? "; Secure" : "";
  return `${READER_COOKIE}=${token}; Path=/; Max-Age=${Math.floor(READER_TTL_MS / 1000)}; HttpOnly; SameSite=Lax${secure}`;
};

/** Cookie del lettore valido? { h, c: [codici] } oppure null. */
export function readerSession(cookieValue, env = process.env) {
  return cookieValue ? readReaderToken(cookieValue, env) : null;
}

/**
 * POST /api/guide-leggi-accesso
 * @param {Request} req
 * @param {{ fetchImpl?: typeof fetch, catalog: Array<{code:string,slug:string,pronta:boolean}>, env?: object, now?: () => number }} deps
 */
export async function handleLeggiAccesso(req, deps) {
  const f = deps.fetchImpl || fetch;
  const env = deps.env || process.env;
  const now = (deps.now || Date.now)();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return reply(400, { error: "invalid" });

  // Campo trappola per i bot: finto «non trovata», nessuna chiamata a nessuno.
  if (typeof body.company === "string" && body.company.trim()) return reply(200, { ok: true, found: false });

  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const entry = SLUG_RE.test(slug) ? deps.catalog.find((g) => g.slug === slug && g.pronta) : null;
  const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");
  if (!entry || !phone) return reply(400, { error: "invalid" });

  // Freno: per IP e per numero. Prima dei controlli su GHL, così anche i tentativi a vuoto contano.
  if (tooMany(hits.ip, clientIp(req), IP_LIMIT, IP_WINDOW_MS, now) ||
      tooMany(hits.phone, phone, PHONE_LIMIT, PHONE_WINDOW_MS, now)) {
    return reply(429, { error: "too_many" });
  }

  // Il lettore ha una chiave GHL sua (Private Integration «Bot guide WhatsApp»); senza, usa quella del sito.
  const token = env.GUIDE_GHL_API_KEY || env.GHL_API_KEY;
  const locationId = env.GHL_LOCATION_ID;
  const phoneHash = hashPhone(phone, env);
  if (!token || !locationId || !phoneHash) {
    console.warn("guide-leggi-accesso: GUIDE_GHL_API_KEY (o GHL_API_KEY) / GHL_LOCATION_ID / GUIDE_GATE_SECRET not set");
    return reply(501, { error: "not_configured" });
  }
  const ghlBase = env.GHL_API_BASE || GHL_BASE_DEFAULT;

  try {
    const fieldId = await receivedFieldId(f, ghlBase, token, locationId);
    if (!fieldId) {
      console.error("guide-leggi-accesso: custom field 'guide_ricevute' not found in GHL");
      return reply(501, { error: "not_configured" });
    }
    const contact = await findContact(f, ghlBase, token, locationId, phone);
    if (!contact) return reply(200, { ok: true, found: false });

    const field = (contact.customFields || []).find((c) => c.id === fieldId);
    const received = parseReceived(field?.value ?? field?.field_value);
    if (!received.includes(entry.code)) return reply(200, { ok: true, found: false });

    // Prima apertura di questa guida da parte del contatto: tag `letto-<CODICE>` (segnale d'interesse).
    // Se la scrittura fallisce non blocca la lettura.
    const tag = `letto-${entry.code}`;
    const already = (contact.tags || []).some((t) => String(t).toLowerCase() === tag.toLowerCase());
    if (!already) {
      try {
        const tg = await f(`${ghlBase}/contacts/${contact.id}/tags`, {
          method: "POST",
          headers: { ...ghlHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify({ tags: [tag] }),
        });
        if (!tg.ok) console.error("guide-leggi-accesso: tag failed:", tg.status);
      } catch (err) {
        console.error("guide-leggi-accesso: tag error:", err?.message || err);
      }
    }

    // Cookie: se la persona ne ha già uno per lo stesso numero, i codici si sommano.
    const prev = readerSession(readCookie(req.headers.get("cookie"), READER_COOKIE), env);
    const codes = [entry.code, ...(prev && prev.h === phoneHash ? prev.c : [])];
    const session = makeReaderToken(phoneHash, codes, READER_TTL_MS, env);
    if (!session) return reply(501, { error: "not_configured" });
    return reply(200, { ok: true, found: true }, { "Set-Cookie": cookieHeader(session, env) });
  } catch (err) {
    console.error("guide-leggi-accesso error:", err?.message || err);
    return reply(502, { error: "upstream" });
  }
}

// ---- pagine nel bucket -------------------------------------------------------------------------------

const supa = (env) => ({
  base: String(env.SUPABASE_URL).replace(/\/+$/, ""),
  bucket: env.GUIDE_BUCKET || BUCKET_DEFAULT,
  key: env.SUPABASE_SERVICE_ROLE_KEY,
});

/** manifest.json della guida: { formato, pagine, larghezza, altezza, edizione }. Lancia se manca o non è valido.
 *  Guida web (`"formato": "web"` nel manifest): { formato: "web", edizione }, senza pagine. */
export async function readManifest(f, env, code) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY non impostate");
  const { base, bucket, key } = supa(env);
  const res = await f(`${base}/storage/v1/object/${bucket}/pagine/${code}/manifest.json`, {
    headers: { Authorization: `Bearer ${key}`, apikey: key },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`manifest ${code}: Supabase ha risposto ${res.status}`);
  const m = await res.json();
  if (m?.formato === "web") return { formato: "web", edizione: typeof m.edizione === "string" ? m.edizione : null };
  const ok = (v, max) => Number.isInteger(v) && v > 0 && v <= max;
  if (!ok(m?.pagine, 500) || !ok(m?.larghezza, 10000) || !ok(m?.altezza, 20000)) throw new Error(`manifest ${code} non valido`);
  return { formato: "immagini", pagine: m.pagine, larghezza: m.larghezza, altezza: m.altezza, edizione: typeof m.edizione === "string" ? m.edizione : null };
}

/** Link firmati di 10 minuti per le pagine from..to (1-based, comprese). Ritorna [{ n, url }]. */
export async function signPages(f, env, code, from, to) {
  const { base, bucket, key } = supa(env);
  const paths = [];
  for (let n = from; n <= to; n++) paths.push(`pagine/${code}/${String(n).padStart(3, "0")}.webp`);
  const res = await f(`${base}/storage/v1/object/sign/${bucket}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn: LINK_TTL_S, paths }),
  });
  if (!res.ok) throw new Error(`sign ${res.status}`);
  const list = await res.json().catch(() => []);
  if (!Array.isArray(list)) throw new Error("sign: risposta inattesa");
  return paths.map((p, i) => {
    const item = list.find((x) => x?.path === p) || list[i];
    const rel = item?.signedURL || item?.signedUrl;
    if (!rel) throw new Error(`sign: manca ${p}`);
    const url = rel.startsWith("http") ? rel : `${base}/storage/v1${rel.startsWith("/") ? "" : "/"}${rel}`;
    return { n: from + i, url };
  });
}

/**
 * POST /api/guide-leggi-pagine {slug, from, to}: serve il cookie `ga_lettore` con quel codice dentro.
 */
export async function handleLeggiPagine(req, deps) {
  const f = deps.fetchImpl || fetch;
  const env = deps.env || process.env;
  const body = await req.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const entry = SLUG_RE.test(slug) ? deps.catalog.find((g) => g.slug === slug && g.pronta) : null;
  if (!entry) return reply(404, { error: "not_found" });

  const session = readerSession(readCookie(req.headers.get("cookie"), READER_COOKIE), env);
  if (!session || !session.c.includes(entry.code)) return reply(401, { error: "unauthorized" });

  try {
    const m = await readManifest(f, env, entry.code);
    if (m.formato === "web") return reply(400, { error: "invalid" }); // le guide web non hanno pagine
    const from = Math.max(1, Number.parseInt(body.from, 10) || 1);
    const to = Math.min(m.pagine, from + BATCH_MAX - 1, Math.max(from, Number.parseInt(body.to, 10) || from));
    if (from > m.pagine) return reply(400, { error: "invalid" });
    const pages = await signPages(f, env, entry.code, from, to);
    return reply(200, { ok: true, pages, expiresIn: LINK_TTL_S });
  } catch (err) {
    console.error("guide-leggi-pagine error:", err?.message || err);
    return reply(502, { error: "upstream" });
  }
}

// ---- guida web --------------------------------------------------------------------------------------

const WEB_MAX_BYTES = 8 * 1024 * 1024;

/** HTML della guida web: web/<CODICE>/index.html dal bucket privato, con la chiave di servizio (solo server). */
export async function readWebGuide(f, env, code) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY non impostate");
  const { base, bucket, key } = supa(env);
  const res = await f(`${base}/storage/v1/object/${bucket}/web/${code}/index.html`, {
    headers: { Authorization: `Bearer ${key}`, apikey: key },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`web ${code}: Supabase ha risposto ${res.status}`);
  const html = await res.text();
  if (!html.trim() || html.length > WEB_MAX_BYTES) throw new Error(`web ${code}: HTML vuoto o troppo grande`);
  return html;
}

/**
 * GET /api/guide-leggi-web?slug=: l'HTML della guida web, solo con il cookie `ga_lettore` che abilita QUELLA guida.
 * 401 = cookie assente, scaduto o manomesso (la pagina riparte dal numero); 403 = cookie buono ma per altre guide.
 * La risposta non si mette in cache, non si indicizza e gira in un iframe isolato (CSP sandbox senza same-origin):
 * il JavaScript della guida non può leggere i cookie né lo storage del sito.
 */
export async function handleLeggiWeb(req, deps) {
  const f = deps.fetchImpl || fetch;
  const env = deps.env || process.env;
  const raw = new URL(req.url).searchParams.get("slug");
  const slug = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  const entry = SLUG_RE.test(slug) ? deps.catalog.find((g) => g.slug === slug && g.pronta) : null;
  if (!entry) return reply(404, { error: "not_found" });

  const session = readerSession(readCookie(req.headers.get("cookie"), READER_COOKIE), env);
  if (!session) return reply(401, { error: "unauthorized" });
  if (!session.c.includes(entry.code)) return reply(403, { error: "forbidden" });

  try {
    const m = await readManifest(f, env, entry.code);
    if (m.formato !== "web") return reply(404, { error: "not_found" }); // guida a immagini: non è di questa route
    const html = await readWebGuide(f, env, entry.code);
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy": "sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox; frame-ancestors 'self'",
        Vary: "Cookie",
      },
    });
  } catch (err) {
    console.error("guide-leggi-web error:", err?.message || err);
    return reply(502, { error: "upstream" });
  }
}
