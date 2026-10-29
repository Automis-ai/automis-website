// Cancello per la guida «alternativa a ManyChat»: due codici firmati HMAC, nessun database.
//  - codice LINK: sta nella mail di conferma, vale 30 minuti. Prova che l'indirizzo è vero e si
//    scambia, in /api/guide-access, con il cookie.
//  - codice SESSIONE: sta nel cookie (httpOnly), vale 30 giorni. È lui ad aprire la guida e il PDF.
// La chiave è GUIDE_GATE_SECRET se esiste; altrimenti si ricava da GHL_API_KEY (già su Vercel).
// Senza nessuna delle due nessuno entra. I due tipi non sono intercambiabili (campo `k`).
import crypto from "node:crypto";

export const LINK_TTL_MS = 30 * 60 * 1000;
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const cookieName = (lang) => `guide_${lang}`;

const b64u = (buf) => Buffer.from(buf).toString("base64url");

function key() {
  const base = process.env.GUIDE_GATE_SECRET || process.env.GHL_API_KEY;
  if (!base) return null;
  return crypto.createHash("sha256").update(`guide-gate:${base}`).digest();
}

function make(payload, k) {
  const body = b64u(JSON.stringify(payload));
  const sig = b64u(crypto.createHmac("sha256", k).update(body).digest());
  return `${body}.${sig}`;
}

function read(token, kind) {
  const k = key();
  if (!k || typeof token !== "string") return null;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return null;
  const expected = b64u(crypto.createHmac("sha256", k).update(body).digest());
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (p.k !== kind || typeof p.x !== "number" || p.x < Date.now()) return null;
    return p;
  } catch {
    return null;
  }
}

/** Link di conferma per la mail. `ttlMs` serve solo ai collaudi. null se il cancello non è configurato. */
export function makeLinkToken(contactId, lang, newsletter = false, ttlMs = LINK_TTL_MS) {
  const k = key();
  return k ? make({ k: "l", c: contactId, l: lang, n: newsletter ? 1 : 0, x: Date.now() + ttlMs }, k) : null;
}

/** Contenuto del link se firmato da noi e non scaduto, altrimenti null. */
export const readLinkToken = (token) => read(token, "l");

export function makeSessionToken(contactId, lang, ttlMs = SESSION_TTL_MS) {
  const k = key();
  return k ? make({ k: "s", c: contactId, l: lang, x: Date.now() + ttlMs }, k) : null;
}

/** True solo se il cookie è una sessione firmata, non scaduta, per questa lingua. */
export function verifySession(token, lang) {
  const p = read(token, "s");
  return !!p && p.l === lang;
}
