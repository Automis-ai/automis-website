// «Link aperto»: la pagina /it/guide/{cfo,ceo,studi}?p=CODICE manda qui una visita (beacon dal browser, stesso dominio).
// Questa parte: controlla il formato, scarta bot e richieste da altri siti, e inoltra il solo codice (server-to-server, con un segreto)
// alla funzione edge `link-aperto` di Supabase. Risponde SEMPRE 204: nessuna informazione a chi chiama.
// Variabili d'ambiente (Vercel, solo server): LINK_APERTO_URL (indirizzo della funzione) e LINK_APERTO_SECRET (lo stesso della funzione).
// Se mancano, la route non fa niente. Non scrive log con il codice, non inoltra IP né user agent.
import { parseRif } from "./guideWa.js";

const MAX_BODY = 512; // byte: il body vero è ~40
const GUIDA = /^[A-Z]\d{1,2}$/;
// Scanner e anteprime. Attenzione: NON «linkedin» da solo, perché l'app LinkedIn apre i link con un browser interno il cui UA contiene «LinkedInApp».
const BOT_UA = /bot\b|crawl|spider|slurp|preview|headless|facebookexternalhit|linkedinbot|lighthouse|pingdom|uptime|monitor|python-requests|curl\/|wget|node-fetch|axios|go-http-client|java\//i;

export function isBotUA(ua) {
  const v = String(ua || "").trim();
  return !v || BOT_UA.test(v);
}

/** Visita valida = codice nel formato del generatore (parseRif). Guida opzionale (R1, R2, S4), altrimenti null. */
export function parseVisita(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const codice = parseRif(typeof body.rif === "string" ? body.rif : "");
  if (!codice) return null;
  const g = typeof body.guida === "string" ? body.guida.trim().toUpperCase() : "";
  return { codice, guida: GUIDA.test(g) ? g : null };
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
