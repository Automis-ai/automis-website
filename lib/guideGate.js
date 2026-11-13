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

function key(env = process.env) {
  const base = env.GUIDE_GATE_SECRET || env.GHL_API_KEY;
  if (!base) return null;
  return crypto.createHash("sha256").update(`guide-gate:${base}`).digest();
}

function make(payload, k) {
  const body = b64u(JSON.stringify(payload));
  const sig = b64u(crypto.createHmac("sha256", k).update(body).digest());
  return `${body}.${sig}`;
}

function read(token, kind, env) {
  const k = key(env);
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

// Lettore online delle guide (contratto v3): cookie `ga_lettore`, httpOnly, 30 giorni.
// Dentro: l'hash del telefono (mai il numero), i codici abilitati, la scadenza. Si firma come gli altri.
// `env` è opzionale: serve alle prove, che non toccano process.env.
export const READER_COOKIE = "ga_lettore";
export const READER_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Hash del telefono (HMAC con la chiave del cancello): stesso numero, stesso hash, non si risale al numero. */
export function hashPhone(phone, env = process.env) {
  const k = key(env);
  return k ? b64u(crypto.createHmac("sha256", k).update(`phone:${phone}`).digest()).slice(0, 22) : null;
}

/** Cookie del lettore. `codes` = codici delle guide abilitate. null se il cancello non è configurato. */
export function makeReaderToken(phoneHash, codes, ttlMs = READER_TTL_MS, env = process.env) {
  const k = key(env);
  if (!k || !phoneHash) return null;
  return make({ k: "r", h: phoneHash, c: [...new Set(codes)].sort(), x: Date.now() + ttlMs }, k);
}

/** { h, c: [codici] } se il cookie è firmato da noi e non scaduto, altrimenti null. */
export function readReaderToken(token, env = process.env) {
  const p = read(token, "r", env);
  return p && typeof p.h === "string" && Array.isArray(p.c) ? { h: p.h, c: p.c.filter((x) => typeof x === "string") } : null;
}
