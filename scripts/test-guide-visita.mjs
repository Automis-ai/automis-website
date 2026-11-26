// Prove di «Link aperto» (consenso dedicato, /api/guide-visita, /api/guide-revoca) con la funzione Supabase simulata: nessuna chiamata vera, segreto e URL finti.
//   npm run test:guide-visita     (node --no-warnings scripts/test-guide-visita.mjs)
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { handleVisita, handleRevoca, parseVisita, parseRevoca, isBotUA, deveInviare, leggiScelta, valoreScelta, CONSENSO_VERSIONE, COOKIE_SCELTA } from "../lib/guideVisita.js";

const ENV = { LINK_APERTO_URL: "https://progetto-finto.supabase.co/functions/v1/link-aperto", LINK_APERTO_SECRET: "segreto-finto" };
const UA_OK = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 LinkedInApp/9.30";

function req(body, headers = {}, path = "guide-visita") {
  return new Request("https://automis.ai/api/" + path, {
    method: "POST",
    headers: { "user-agent": UA_OK, host: "automis.ai", origin: "https://automis.ai", "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
function conLog() {
  const calls = [];
  const fetchImpl = async (url, init) => { calls.push({ url, init }); return new Response("{}", { status: 200 }); };
  return { calls, fetchImpl };
}
const run = async (r, extra = {}) => {
  const log = conLog();
  const res = await handleVisita(r, { env: ENV, fetchImpl: log.fetchImpl, ...extra });
  return { res, calls: log.calls };
};

test("parseVisita: codice nel formato del generatore + versione del consenso (senza, niente), guida opzionale", () => {
  assert.deepEqual(parseVisita({ rif: "k7x2mn", guida: "R1", consenso_v: "la1" }), { codice: "k7x2mn", guida: "R1", consenso_v: "la1" });
  assert.deepEqual(parseVisita({ rif: "K7X2MN", guida: "r2", consenso_v: "LA1" }), { codice: "k7x2mn", guida: "R2", consenso_v: "la1" });
  assert.deepEqual(parseVisita({ rif: "k7x2mn", guida: "<x>", consenso_v: "la1" }), { codice: "k7x2mn", guida: null, consenso_v: "la1" });
  for (const v of [undefined, "", "<b>", "x".repeat(30), 5]) assert.equal(parseVisita({ rif: "k7x2mn", consenso_v: v }), null, "senza consenso provato: " + String(v));
  for (const brutto of ["", "k7x2m0", "k7x2m", "k7x2mnn", "k7x2m!", "'; drop table", 5, null, ["k7x2mn"]]) {
    assert.equal(parseVisita({ rif: brutto, consenso_v: "la1" }), null, String(brutto));
  }
  assert.equal(parseVisita(null), null);
  assert.equal(parseVisita([]), null);
});

test("parseRevoca: solo il codice nel formato del generatore", () => {
  assert.deepEqual(parseRevoca({ rif: "K7X2MN" }), { codice: "k7x2mn", revoca: true });
  for (const brutto of ["", "k7x2m0", "abc", 5, null]) assert.equal(parseRevoca({ rif: brutto }), null);
  assert.equal(parseRevoca(null), null);
});

test("isBotUA: scanner e anteprime sì, browser veri (anche l'app LinkedIn) no", () => {
  assert.equal(isBotUA(UA_OK), false);
  assert.equal(isBotUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36"), false);
  assert.equal(isBotUA(""), true);
  assert.equal(isBotUA(undefined), true);
  for (const ua of ["LinkedInBot/1.0 (compatible; Mozilla/5.0)", "facebookexternalhit/1.1", "Googlebot/2.1", "HeadlessChrome/120", "python-requests/2.31", "curl/8.4", "Slackbot-LinkExpanding 1.0", "WhatsApp link preview"]) {
    assert.equal(isBotUA(ua), true, ua);
  }
});

test("apertura valida: UNA chiamata alla funzione, con segreto e solo {codice, guida, consenso_v}; risposta 204", async () => {
  const { res, calls } = await run(req({ rif: "k7x2mn", guida: "R1", consenso_v: "la1" }));
  assert.equal(res.status, 204);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, ENV.LINK_APERTO_URL);
  assert.equal(calls[0].init.headers["x-link-aperto-secret"], ENV.LINK_APERTO_SECRET);
  assert.deepEqual(JSON.parse(calls[0].init.body), { codice: "k7x2mn", guida: "R1", consenso_v: "la1" });
  // niente IP né user agent inoltrati
  assert.equal(Object.keys(calls[0].init.headers).some((h) => /user-agent|forwarded|ip/i.test(h)), false);
});

test("codice non valido, body rotto o troppo grande: nessuna chiamata, sempre 204", async () => {
  for (const r of [req({ rif: "abc" }), req({ rif: "" }), req({}), req("non è json"), req("[1,2]"), req({ rif: "k7x2mn", consenso_v: "la1", extra: "x".repeat(600) }), req({ rif: "k7x2mn" })]) {
    const { res, calls } = await run(r);
    assert.equal(res.status, 204);
    assert.equal(calls.length, 0);
  }
});

test("bot, anteprime e richieste da altri siti: nessuna chiamata", async () => {
  const ok = { rif: "k7x2mn", consenso_v: "la1" };
  for (const h of [{ "user-agent": "LinkedInBot/1.0" }, { "user-agent": "" }, { origin: "https://evil.example" }, { "sec-fetch-site": "cross-site" }]) {
    const { res, calls } = await run(req(ok, h));
    assert.equal(res.status, 204);
    assert.equal(calls.length, 0, JSON.stringify(h));
  }
  // senza Origin (alcuni browser) passa, con sec-fetch-site same-origin passa
  assert.equal((await run(req(ok, { origin: "" }))).calls.length, 1);
  assert.equal((await run(req(ok, { "sec-fetch-site": "same-origin" }))).calls.length, 1);
});

test("senza URL o segreto configurati: non fa niente (mai una chiamata senza segreto)", async () => {
  for (const env of [{}, { LINK_APERTO_URL: ENV.LINK_APERTO_URL }, { LINK_APERTO_SECRET: "x" }]) {
    const log = conLog();
    const res = await handleVisita(req({ rif: "k7x2mn", consenso_v: "la1" }), { env, fetchImpl: log.fetchImpl });
    assert.equal(res.status, 204);
    assert.equal(log.calls.length, 0);
  }
});

test("funzione giù o lenta: la route risponde comunque 204, senza scrivere il codice nei log", async () => {
  const errori = [];
  const orig = console.error;
  console.error = (...a) => errori.push(a.join(" "));
  try {
    const res = await handleVisita(req({ rif: "k7x2mn", consenso_v: "la1" }), { env: ENV, fetchImpl: async () => { throw new Error("giù k7x2mn"); } });
    assert.equal(res.status, 204);
  } finally { console.error = orig; }
  assert.equal(errori.length, 1);
  assert.equal(errori.join("").includes("k7x2mn"), false);
});

test("revoca: UNA chiamata con segreto e {codice, revoca:true}, 204; la riga si cancella e la funzione non riceve altro", async () => {
  const log = conLog();
  const res = await handleRevoca(req({ rif: "k7x2mn" }, {}, "guide-revoca"), { env: ENV, fetchImpl: log.fetchImpl });
  assert.equal(res.status, 204);
  assert.equal(log.calls.length, 1);
  assert.equal(log.calls[0].url, ENV.LINK_APERTO_URL);
  assert.equal(log.calls[0].init.headers["x-link-aperto-secret"], ENV.LINK_APERTO_SECRET);
  assert.deepEqual(JSON.parse(log.calls[0].init.body), { codice: "k7x2mn", revoca: true });
  assert.equal(Object.keys(log.calls[0].init.headers).some((h) => /user-agent|forwarded|ip/i.test(h)), false);
});

test("revoca: codice non valido, body rotto, altri siti = nessuna chiamata; funzione giù, errore o non configurata = 503 (la pagina dà l'email di riserva), senza il codice nei log", async () => {
  for (const r of [req({ rif: "abc" }, {}, "guide-revoca"), req({}, {}, "guide-revoca"), req("non è json", {}, "guide-revoca"), req({ rif: "k7x2mn" }, { origin: "https://evil.example" }, "guide-revoca"), req({ rif: "k7x2mn" }, { "sec-fetch-site": "cross-site" }, "guide-revoca")]) {
    const log = conLog();
    const res = await handleRevoca(r, { env: ENV, fetchImpl: log.fetchImpl });
    assert.equal(res.status, 204);
    assert.equal(log.calls.length, 0);
  }
  const errori = [];
  const orig = console.error;
  console.error = (...a) => errori.push(a.join(" "));
  try {
    assert.equal((await handleRevoca(req({ rif: "k7x2mn" }, {}, "guide-revoca"), { env: ENV, fetchImpl: async () => { throw new Error("giù k7x2mn"); } })).status, 503);
    assert.equal((await handleRevoca(req({ rif: "k7x2mn" }, {}, "guide-revoca"), { env: ENV, fetchImpl: async () => new Response("{}", { status: 500 }) })).status, 503);
    assert.equal((await handleRevoca(req({ rif: "k7x2mn" }, {}, "guide-revoca"), { env: {}, fetchImpl: async () => new Response("{}") })).status, 503);
  } finally { console.error = orig; }
  assert.equal(errori.join("").includes("k7x2mn"), false);
});

test("deveInviare: SOLO con il consenso dedicato (true), senza traffico interno e con il codice; il resto no", () => {
  const ok = { rif: "k7x2mn", consenso: true, interno: false };
  assert.equal(deveInviare(ok), true);
  assert.equal(deveInviare({ ...ok, consenso: false }), false, "«No, grazie»");
  assert.equal(deveInviare({ ...ok, consenso: undefined }), false, "nessuna scelta ancora");
  assert.equal(deveInviare({ ...ok, consenso: "si" }), false, "solo true vale");
  assert.equal(deveInviare({ ...ok, interno: true }), false, "traffico interno (?internal=1)");
  assert.equal(deveInviare({ ...ok, interno: () => true }), false, "traffico interno (flag)");
  assert.equal(deveInviare({ ...ok, rif: "" }), false, "senza codice");
  assert.equal(deveInviare(), false);
});

test("scelta ricordata: cookie con versione del testo, data e codice; riletta solo per lo stesso codice e la stessa versione", () => {
  const rif = "k7x2mn";
  const cookie = (c) => `altro=1; ${COOKIE_SCELTA}=${c}; x=2`;
  const quando = new Date("2026-11-28T10:00:00Z");
  const si = valoreScelta("si", rif, quando);
  assert.deepEqual(JSON.parse(decodeURIComponent(si)), { v: CONSENSO_VERSIONE, s: "si", ts: "2026-11-28T10:00:00.000Z", c: rif });
  assert.equal(leggiScelta(cookie(si), rif), "si");
  assert.equal(leggiScelta(cookie(valoreScelta("no", rif, quando)), rif), "no");
  assert.equal(leggiScelta(cookie(valoreScelta("boh", rif, quando)), rif), "no", "tutto ciò che non è «si» vale no");
  assert.equal(leggiScelta(cookie(si), "abcd23"), null, "un altro codice: si richiede");
  assert.equal(leggiScelta(cookie(encodeURIComponent(JSON.stringify({ v: "vecchia", s: "si", c: rif }))), rif), null, "testo cambiato: si richiede");
  assert.equal(leggiScelta(cookie("%%non-json"), rif), null);
  assert.equal(leggiScelta("", rif), null);
  assert.equal(leggiScelta(undefined, rif), null);
});

test("riquadro: il beacon parte solo dal gesto «Sì, va bene»; revoca cancella; nessun legame col banner cookie", () => {
  const strip = (f) => fs.readFileSync(new URL(f, import.meta.url), "utf8").replace(/\/\/.*$/gm, "");
  const comp = strip("../components/guide-catalogo/VisitaBeacon.js");
  const catalogo = fs.readFileSync(new URL("../components/guide-catalogo/GuideCatalog.js", import.meta.url), "utf8");
  assert.equal(/<VisitaBeacon rif=\{rif\}/.test(catalogo), true, "montato nel catalogo");
  // il codice arriva dalla prop, non dall'indirizzo
  assert.equal(/searchParams\.get\(["']p["']\)/.test(comp), false);
  assert.equal(/!rif/.test(comp), true);
  // niente categoria «Statistici» del banner
  assert.equal(/readConsent|statistics|CONSENT_VERSION|CONSENT_CHANGED_EVENT|automis_consent/.test(comp), false, "il consenso del banner non c'è");
  // invia() si chiama una sola volta e solo dentro accetta()
  assert.equal((comp.replace("function invia", "").match(/\binvia\(rif/g) || []).length, 1);
  const accetta = comp.slice(comp.indexOf("const accetta"), comp.indexOf("const rifiuta"));
  assert.equal(/invia\(rif, guida\)/.test(accetta) && /deveInviare\(\{ rif, consenso: true, interno \}\)/.test(accetta), true, "invio dentro il gesto, con deveInviare");
  const effetti = comp.slice(comp.indexOf("useEffect(()"), comp.indexOf("const accetta"));
  assert.equal(/invia\(/.test(effetti), false, "nessun invio al caricamento della pagina");
  // rifiuto: nessuna chiamata di rete
  const rifiuta = comp.slice(comp.indexOf("const rifiuta"), comp.indexOf("const ritira"));
  assert.equal(/fetch|sendBeacon|invia\(/.test(rifiuta), false);
  // revoca: chiama /api/guide-revoca, scrive il «no», dice la verità se non riesce
  const ritira = comp.slice(comp.indexOf("const ritira"));
  assert.equal(/\/api\/guide-revoca/.test(ritira) && /scriviScelta\("no", rif\)/.test(ritira) && /"errore"/.test(ritira), true);
  // traffico interno: il riquadro non compare e non parte niente
  assert.equal(/internal.*===\s*"1"/.test(comp) && /isInternalTraffic/.test(comp), true);
  // pulsanti di pari evidenza: stessa classe
  assert.equal((comp.match(/className="btn la-btn"/g) || []).length, 2);
  // banner cookie e consent.js non toccati: niente evento nuovo, CONSENT_VERSION com'era
  const consent = fs.readFileSync(new URL("../lib/consent.js", import.meta.url), "utf8");
  assert.equal(/consent-changed|CONSENT_CHANGED_EVENT|dispatchEvent/.test(consent), false, "lib/consent.js com'era su main");
  assert.equal(/export const CONSENT_VERSION = 1;/.test(consent), true);
  const layout = fs.readFileSync(new URL("../app/layout.js", import.meta.url), "utf8");
  assert.equal(/guide-visita|guide-revoca|automis_link_aperto/.test(layout), false, "layout.js non si tocca");
  // le route esistono e usano gli handler
  assert.equal(/handleRevoca/.test(fs.readFileSync(new URL("../app/api/guide-revoca/route.js", import.meta.url), "utf8")), true);
});
