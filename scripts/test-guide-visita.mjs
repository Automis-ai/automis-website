// Prove della route «Link aperto» (/api/guide-visita) con la funzione Supabase simulata: nessuna chiamata vera, segreto e URL finti.
//   npm run test:guide-visita     (node --no-warnings scripts/test-guide-visita.mjs)
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { handleVisita, parseVisita, isBotUA } from "../lib/guideVisita.js";

const ENV = { LINK_APERTO_URL: "https://progetto-finto.supabase.co/functions/v1/link-aperto", LINK_APERTO_SECRET: "segreto-finto" };
const UA_OK = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 LinkedInApp/9.30";

function req(body, headers = {}) {
  return new Request("https://automis.ai/api/guide-visita", {
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

test("parseVisita: solo il formato del generatore, guida opzionale", () => {
  assert.deepEqual(parseVisita({ rif: "k7x2mn", guida: "R1" }), { codice: "k7x2mn", guida: "R1" });
  assert.deepEqual(parseVisita({ rif: "K7X2MN", guida: "r2" }), { codice: "k7x2mn", guida: "R2" });
  assert.deepEqual(parseVisita({ rif: "k7x2mn", guida: "<x>" }), { codice: "k7x2mn", guida: null });
  assert.deepEqual(parseVisita({ rif: "k7x2mn" }), { codice: "k7x2mn", guida: null });
  for (const brutto of ["", "k7x2m0", "k7x2m", "k7x2mnn", "k7x2m!", "'; drop table", 5, null, ["k7x2mn"]]) {
    assert.equal(parseVisita({ rif: brutto }), null, String(brutto));
  }
  assert.equal(parseVisita(null), null);
  assert.equal(parseVisita([]), null);
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

test("visita valida: UNA chiamata alla funzione, con segreto e solo {codice, guida}; risposta 204", async () => {
  const { res, calls } = await run(req({ rif: "k7x2mn", guida: "R1" }));
  assert.equal(res.status, 204);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, ENV.LINK_APERTO_URL);
  assert.equal(calls[0].init.headers["x-link-aperto-secret"], ENV.LINK_APERTO_SECRET);
  assert.deepEqual(JSON.parse(calls[0].init.body), { codice: "k7x2mn", guida: "R1" });
  // niente IP né user agent inoltrati
  assert.equal(Object.keys(calls[0].init.headers).some((h) => /user-agent|forwarded|ip/i.test(h)), false);
});

test("codice non valido, body rotto o troppo grande: nessuna chiamata, sempre 204", async () => {
  for (const r of [req({ rif: "abc" }), req({ rif: "" }), req({}), req("non è json"), req("[1,2]"), req({ rif: "k7x2mn", extra: "x".repeat(600) })]) {
    const { res, calls } = await run(r);
    assert.equal(res.status, 204);
    assert.equal(calls.length, 0);
  }
});

test("bot, anteprime e richieste da altri siti: nessuna chiamata", async () => {
  const ok = { rif: "k7x2mn" };
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
    const res = await handleVisita(req({ rif: "k7x2mn" }), { env, fetchImpl: log.fetchImpl });
    assert.equal(res.status, 204);
    assert.equal(log.calls.length, 0);
  }
});

test("funzione giù o lenta: la route risponde comunque 204, senza scrivere il codice nei log", async () => {
  const errori = [];
  const orig = console.error;
  console.error = (...a) => errori.push(a.join(" "));
  try {
    const res = await handleVisita(req({ rif: "k7x2mn" }), { env: ENV, fetchImpl: async () => { throw new Error("giù k7x2mn"); } });
    assert.equal(res.status, 204);
  } finally { console.error = orig; }
  assert.equal(errori.length, 1);
  assert.equal(errori.join("").includes("k7x2mn"), false);
});

test("beacon: usa la prop rif, non l'indirizzo; parte solo con rif; è montato nel catalogo", () => {
  const beacon = fs.readFileSync(new URL("../components/guide-catalogo/VisitaBeacon.js", import.meta.url), "utf8");
  const catalogo = fs.readFileSync(new URL("../components/guide-catalogo/GuideCatalog.js", import.meta.url), "utf8");
  assert.equal(/searchParams\.get\(["']p["']\)/.test(beacon), false, "il codice non si legge da ?p= (lo toglie lo script GTM)");
  assert.equal(/!rif/.test(beacon), true);
  assert.equal(/cookie/i.test(beacon.replace(/\/\/.*$/gm, "")), false, "nessun cookie");
  assert.equal(/<VisitaBeacon rif=\{rif\}/.test(catalogo), true);
  const layout = fs.readFileSync(new URL("../app/layout.js", import.meta.url), "utf8");
  assert.equal(/guide-visita|automis_autore/.test(layout), false, "layout.js non si tocca");
});
