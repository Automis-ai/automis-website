// «Link aperto» (riprogettato 26/11/2026 sul parere legale): la pagina /it/guide/{cfo,ceo,studi}?p=CODICE chiede un CONSENSO DEDICATO (riquadro sulla pagina,
// non la categoria «Statistici» del banner cookie). Solo dopo il «sì» il browser manda qui l'apertura (stesso dominio). Per ritirare il consenso manda la revoca.
// Questa parte: controlla il formato, scarta bot e richieste da altri siti, e inoltra (server-to-server, con un segreto) alla funzione edge `link-aperto` di Supabase.
// Apertura: risponde SEMPRE 204 (nessuna informazione a chi chiama). Revoca: 204 se la riga è cancellata (o non c'era), 503 se la cancellazione non è riuscita:
// la pagina allora dice alla persona di scrivere a support@automis.ai.
// Variabili d'ambiente (Vercel, solo server): LINK_APERTO_URL (indirizzo della funzione) e LINK_APERTO_SECRET (lo stesso della funzione).
// Se mancano, l'apertura non fa niente e la revoca risponde 503. Non scrive log con il codice, non inoltra IP né user agent.
import { parseRif } from "./guideWa.js";

/** Versione del testo del riquadro di consenso. Va cambiata a ogni modifica del testo (e il riquadro richiede di nuovo la scelta). Prova del consenso, art. 7.1 GDPR. */
export const CONSENSO_VERSIONE = "la1";
/** Cookie tecnico di prova: ricorda la scelta (sì/no) per il codice di questo link. Scritto solo DOPO la scelta della persona. */
export const COOKIE_SCELTA = "automis_link_aperto";
export const SCELTA_GIORNI = 90;

/** Contenuto del cookie di scelta (versione del testo, scelta, data, codice del link). */
export function valoreScelta(scelta, rif, adesso = new Date()) {
  return encodeURIComponent(JSON.stringify({ v: CONSENSO_VERSIONE, s: scelta === "si" ? "si" : "no", ts: adesso.toISOString(), c: rif }));
}

/** Scelta già fatta per questo codice, letta da `document.cookie`: "si", "no" o null (da chiedere: nessun cookie, versione del testo cambiata, altro codice). */
export function leggiScelta(cookie, rif) {
  const m = String(cookie || "").match(new RegExp("(?:^|; )" + COOKIE_SCELTA + "=([^;]*)"));
  if (!m) return null;
  try {
    const c = JSON.parse(decodeURIComponent(m[1]));
    if (c?.v !== CONSENSO_VERSIONE || c?.c !== rif) return null;
    return c.s === "si" || c.s === "no" ? c.s : null;
  } catch { return null; }
}

/**
 * Decisione del beacon lato browser (funzione pura, provata in scripts/test-guide-visita.mjs).
 * Invia solo con: codice presente, CONSENSO DEDICATO dato (scelta «sì» nel riquadro: mai la casella «Statistici» del banner) e NON traffico interno.
 * Il chiamante la usa una sola volta, nel gesto di «Sì, va bene».
 */
export function deveInviare({ rif, consenso, interno } = {}) {
  if (!rif || consenso !== true) return false;
  return (typeof interno === "function" ? interno() : interno) !== true;
}

const MAX_BODY = 512; // byte: il body vero è ~40
const GUIDA = /^[A-Z]\d{1,2}$/;
// Scanner e anteprime. Attenzione: NON «linkedin» da solo, perché l'app LinkedIn apre i link con un browser interno il cui UA contiene «LinkedInApp».
const BOT_UA = /bot\b|crawl|spider|slurp|preview|headless|facebookexternalhit|linkedinbot|lighthouse|pingdom|uptime|monitor|python-requests|curl\/|wget|node-fetch|axios|go-http-client|java\//i;

export function isBotUA(ua) {
  const v = String(ua || "").trim();
  return !v || BOT_UA.test(v);
}

const VERSIONE = /^[a-z0-9._-]{1,24}$/;

/** Apertura valida = codice nel formato del generatore (parseRif) + versione del testo di consenso (senza, niente consenso provato = niente). Guida opzionale (R1, R2, S4), altrimenti null. */
export function parseVisita(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const codice = parseRif(typeof body.rif === "string" ? body.rif : "");
  if (!codice) return null;
  const v = typeof body.consenso_v === "string" ? body.consenso_v.trim().toLowerCase() : "";
  if (!VERSIONE.test(v)) return null;
  const g = typeof body.guida === "string" ? body.guida.trim().toUpperCase() : "";
  return { codice, guida: GUIDA.test(g) ? g : null, consenso_v: v };
}

/** Revoca valida = solo il codice nel formato del generatore. */
export function parseRevoca(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const codice = parseRif(typeof body.rif === "string" ? body.rif : "");
  return codice ? { codice, revoca: true } : null;
}

// Richiesta dal browser sul nostro stesso dominio: se Origin (o Sec-Fetch-Site) c'è e dice altro, si scarta.
function stessoSito(req) {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  try { return new URL(origin).host === host; } catch { return false; }
}

const nessuna = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
const non_riuscita = () => new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });

export async function handleVisita(req, { env = process.env, fetchImpl = fetch } = {}) {
  try {
    if (isBotUA(req.headers.get("user-agent")) || !stessoSito(req)) return nessuna();
    const raw = await req.text();
    if (raw.length > MAX_BODY) return nessuna();
    let body;
    try { body = JSON.parse(raw); } catch { return nessuna(); }
    const visita = parseVisita(body);
    if (!visita) return nessuna();
    const url = env.LINK_APERTO_URL;
    const secret = env.LINK_APERTO_SECRET;
    if (!url || !secret) return nessuna();
    await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-link-aperto-secret": secret },
      body: JSON.stringify(visita),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    console.error("guide-visita: inoltro non riuscito"); // senza dettagli: l'errore potrebbe contenere l'URL o il codice
  }
  return nessuna();
}

/** Revoca del consenso: cancella la riga del codice (stesse difese dell'apertura, stesso segreto). Se la cancellazione non riesce risponde 503. */
export async function handleRevoca(req, { env = process.env, fetchImpl = fetch } = {}) {
  try {
    if (isBotUA(req.headers.get("user-agent")) || !stessoSito(req)) return nessuna();
    const raw = await req.text();
    if (raw.length > MAX_BODY) return nessuna();
    let body;
    try { body = JSON.parse(raw); } catch { return nessuna(); }
    const revoca = parseRevoca(body);
    if (!revoca) return nessuna();
    const url = env.LINK_APERTO_URL;
    const secret = env.LINK_APERTO_SECRET;
    if (!url || !secret) return non_riuscita();
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-link-aperto-secret": secret },
      body: JSON.stringify(revoca),
      signal: AbortSignal.timeout(3000),
    });
    return res.ok ? nessuna() : non_riuscita();
  } catch {
    console.error("guide-revoca: inoltro non riuscito"); // senza dettagli: l'errore potrebbe contenere l'URL o il codice
    return non_riuscita();
  }
}
