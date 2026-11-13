// Prove di catalogo, lettore online e loader con GHL e Supabase simulati (nessuna chiamata vera, nessuna chiave).
//   npm run test:guide-wa     (node --no-warnings scripts/test-guide-wa-access.mjs)
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { handleLeggiAccesso, handleLeggiPagine, handleLeggiWeb, readManifest, readerSession, signPages, _resetForTests, parseReceived, readCookie, BATCH_MAX } from "../lib/guideLeggi.js";
import { makeReaderToken, hashPhone, READER_COOKIE } from "../lib/guideGate.js";
import { normalizePhone } from "../lib/guidePhone.js";
import { waMessage, waLink, parseSource } from "../lib/guideWa.js";
import { loadCatalogo, normalizeCatalog, _resetForTests as resetCatalog, _lastSource, CATALOG_TTL_MS } from "../lib/guideCatalogoLoader.js";

const catalog = JSON.parse(fs.readFileSync(new URL("../data/guide-catalogo.json", import.meta.url), "utf8"));
const FIELD_ID = "fld_ricevute";
const ENV = {
  GHL_API_KEY: "ghl-finta",
  GHL_LOCATION_ID: "loc_finta",
  GUIDE_GATE_SECRET: "segreto-finto",
  SUPABASE_URL: "https://progetto-finto.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "service-finta",
};
const R1 = catalog.find((g) => g.code === "R1");
const M1 = catalog.find((g) => g.code === "M1"); // «in arrivo»

// contatti finti, per telefono E.164
const CONTACTS = {
  "+393331112233": { id: "c1", tags: ["bot-guide"], customFields: [{ id: FIELD_ID, value: "R1, S1 ,t4" }] },
  "+393334445566": { id: "c2", tags: [], customFields: [{ id: FIELD_ID, value: "S2" }] },
  "+393337778899": { id: "c3", customFields: [] }, // niente campi né tag nella ricerca: serve la lettura per id
  "+393339990000": { id: "c4", tags: ["letto-r1"], customFields: [{ id: FIELD_ID, value: "R1" }] }, // R1 già aperta
  "+393330001111": { id: "c5", tags: [], customFields: [{ id: FIELD_ID, value: "M1" }] }, // ha M1, ma M1 non è pubblica
};
const FULL = { c3: { id: "c3", tags: [], customFields: [{ id: FIELD_ID, value: "R1" }] } };

const WEB_HTML = "<!doctype html><title>Guida web finta</title><p>CONTENUTO-RISERVATO-DELLA-GUIDA</p><script>var x=1</script>";

function makeFetch(log, { pages = 75, web = false } = {}) {
  return async (url, init = {}) => {
    const u = String(url);
    log.push({ url: u, method: init.method || "GET", headers: init.headers, body: init.body });
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });
    if (u.includes("/locations/loc_finta/customFields"))
      return json({ customFields: [{ id: "altro", fieldKey: "contact.guide_link", name: "guide_link" }, { id: FIELD_ID, fieldKey: "contact.guide_ricevute", name: "Guide ricevute" }] });
    if (u.includes("/contacts/search/duplicate")) {
      const c = CONTACTS[new URL(u).searchParams.get("number")];
      return c ? json({ contact: c }) : json({ contact: null });
    }
    if (u.match(/\/contacts\/c\d+\/tags$/)) return json({ tags: ["ok"] });
    const m = u.match(/\/contacts\/(c\d+)$/);
    if (m) return json({ contact: FULL[m[1]] });
    if (web && u.endsWith("/manifest.json")) return json({ code: "R1", formato: "web", edizione: "novembre 2026" });
    if (u.includes("/storage/v1/object/guide/web/") && u.endsWith("/index.html")) return new Response(web === "vuota" ? "" : WEB_HTML, { status: 200, headers: { "Content-Type": "text/plain" } });
    if (u.endsWith("/manifest.json")) return json({ code: "R1", pagine: pages, larghezza: 1240, altezza: 1754, edizione: "novembre 2026" });
    if (u.endsWith("/storage/v1/object/sign/guide")) {
      const { paths } = JSON.parse(init.body);
      return json(paths.map((p) => ({ path: p, signedURL: `/object/sign/guide/${p}?token=tok`, error: null })));
    }
    return json({ error: "inatteso" }, 500);
  };
}

const post = (url, payload, { ip = "1.2.3.4", cookie } = {}) =>
  new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip, ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(payload),
  });
const access = (log, payload, opts = {}, env = ENV) =>
  handleLeggiAccesso(post("http://localhost/api/guide-leggi-accesso", payload, opts), { fetchImpl: makeFetch(log), catalog, env }).then(async (r) => ({ status: r.status, body: await r.json(), headers: r.headers }));
const pagine = (log, payload, opts = {}, env = ENV) =>
  handleLeggiPagine(post("http://localhost/api/guide-leggi-pagine", payload, opts), { fetchImpl: makeFetch(log), catalog, env }).then(async (r) => ({ status: r.status, body: await r.json() }));
const ck = (token) => `${READER_COOKIE}=${token}`;
const cookieOf = (r) => r.headers.get("set-cookie").split(";")[0].split("=").slice(1).join("=");
const ghlWrites = (log) => log.filter((l) => l.method !== "GET" && !l.url.includes("supabase"));

test.beforeEach(() => _resetForTests());

// ---- accesso al lettore -----------------------------------------------------------------------------

test("accesso ok: numero noto con la guida -> cookie httpOnly di 30 giorni, tag letto-R1", async () => {
  const log = [];
  const r = await access(log, { phone: "333 111 2233", slug: R1.slug });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { ok: true, found: true });
  const sc = r.headers.get("set-cookie");
  assert.match(sc, /^ga_lettore=/);
  assert.match(sc, /HttpOnly/);
  assert.match(sc, /Max-Age=2592000/);
  assert.match(sc, /SameSite=Lax/);
  assert.match(sc, /Secure/);
  // nel cookie il telefono è un hash: nessuna traccia del numero
  const token = cookieOf(r);
  const payload = Buffer.from(token.split(".")[0], "base64url").toString();
  assert.ok(!payload.includes("333") && !payload.includes("1112233"), payload);
  assert.deepEqual(readerSession(token, ENV), { h: hashPhone("+393331112233", ENV), c: ["R1"] });
  // GHL: una sola scrittura, il tag di prima apertura. Supabase non si tocca: nessun PDF, nessun link
  const w = ghlWrites(log);
  assert.equal(w.length, 1);
  assert.ok(w[0].url.endsWith("/contacts/c1/tags"));
  assert.deepEqual(JSON.parse(w[0].body), { tags: ["letto-R1"] });
  assert.ok(!log.some((l) => l.url.includes("supabase")));
  assert.equal(r.body.url, undefined);
});

test("legge anche il codice in minuscolo e con spazi nel campo guide_ricevute", async () => {
  const t4 = catalog.find((g) => g.code === "T4");
  const r = await access([], { phone: "+39 333 111 2233", slug: t4.slug });
  assert.equal(r.body.found, true);
});

test("contatto trovato senza campi nella ricerca: li rilegge per id", async () => {
  const log = [];
  const r = await access(log, { phone: "3337778899", slug: R1.slug });
  assert.equal(r.body.found, true);
  assert.ok(log.some((l) => l.url.endsWith("/contacts/c3")));
});

test("già aperta in passato (tag letto-r1 presente): cookie sì, nessun nuovo tag", async () => {
  const log = [];
  const r = await access(log, { phone: "3339990000", slug: R1.slug });
  assert.equal(r.body.found, true);
  assert.equal(ghlWrites(log).length, 0);
});

test("numero noto ma senza QUELLA guida: found false, niente cookie, niente tag", async () => {
  const log = [];
  const r = await access(log, { phone: "3334445566", slug: R1.slug });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { ok: true, found: false });
  assert.equal(r.headers.get("set-cookie"), null);
  assert.equal(ghlWrites(log).length, 0);
});

test("numero sconosciuto: stessa risposta di «senza quella guida»", async () => {
  const log = [];
  const r = await access(log, { phone: "3330000000", slug: R1.slug });
  assert.deepEqual(r.body, { ok: true, found: false });
  assert.equal(r.headers.get("set-cookie"), null);
  assert.equal(ghlWrites(log).length, 0);
});

test("guida non pubblica o inesistente: 400, nessuna chiamata (anche se il contatto la «ha»)", async () => {
  for (const slug of [M1.slug, "guida-che-non-esiste", "s5", "../etc", ""]) {
    const log = [];
    const r = await access(log, { phone: "3330001111", slug });
    assert.equal(r.status, 400, slug);
    assert.equal(log.length, 0, slug);
    assert.equal(r.headers.get("set-cookie"), null);
  }
  assert.ok(!catalog.some((g) => g.code === "S5"));
});

test("numero non valido: 400, nessuna chiamata", async () => {
  for (const phone of ["12345", "abc", "", undefined]) {
    const log = [];
    const r = await access(log, { phone, slug: R1.slug });
    assert.equal(r.status, 400, String(phone));
    assert.equal(log.length, 0);
  }
});

test("campo trappola: finto «non trovata», nessuna chiamata", async () => {
  const log = [];
  const r = await access(log, { phone: "3331112233", slug: R1.slug, company: "Acme" });
  assert.deepEqual(r.body, { ok: true, found: false });
  assert.equal(log.length, 0);
});

test("freno per IP: dal settimo tentativo 429; per numero: dal quinto", async () => {
  let last;
  for (let i = 0; i < 7; i++) last = await access([], { phone: `33311122${30 + i}`, slug: R1.slug }, { ip: "9.9.9.9" });
  assert.equal(last.status, 429);
  assert.equal((await access([], { phone: "3331112233", slug: R1.slug }, { ip: "8.8.8.8" })).status, 200);
  _resetForTests();
  for (let i = 0; i < 5; i++) last = await access([], { phone: "3330000001", slug: R1.slug }, { ip: `7.7.7.${i}` });
  assert.equal(last.status, 429);
});

test("senza chiavi: 501; GHL giù: 502; nessun cookie", async () => {
  const log = [];
  const r = await access(log, { phone: "3331112233", slug: R1.slug }, {}, {});
  assert.equal(r.status, 501);
  assert.equal(log.length, 0);
  const down = await handleLeggiAccesso(post("http://x/api", { phone: "3331112233", slug: R1.slug }, { ip: "5.5.5.5" }), {
    fetchImpl: async () => new Response("no", { status: 500 }), catalog, env: ENV,
  });
  assert.equal(down.status, 502);
  assert.equal(down.headers.get("set-cookie"), null);
});

test("il tag non riuscito non blocca la lettura", async () => {
  const f = async (url, init) => (String(url).endsWith("/tags") ? new Response("no", { status: 500 }) : makeFetch([])(url, init));
  const r = await handleLeggiAccesso(post("http://x/api", { phone: "3331112233", slug: R1.slug }, { ip: "4.4.4.4" }), { fetchImpl: f, catalog, env: ENV });
  assert.equal(r.status, 200);
  assert.ok(r.headers.get("set-cookie"));
});

test("cookie esistente dello stesso numero: i codici si sommano; di un altro numero no", async () => {
  const s1 = catalog.find((g) => g.code === "S1");
  const first = await access([], { phone: "3331112233", slug: R1.slug });
  const second = await access([], { phone: "3331112233", slug: s1.slug }, { cookie: ck(cookieOf(first)) });
  assert.deepEqual(readerSession(cookieOf(second), ENV).c, ["R1", "S1"]);
  // un altro numero (c4 ha R1) con il cookie del primo: solo il suo codice
  const other = await access([], { phone: "3339990000", slug: R1.slug }, { cookie: ck(cookieOf(second)) });
  assert.deepEqual(readerSession(cookieOf(other), ENV).c, ["R1"]);
});

// ---- cookie e pagine -------------------------------------------------------------------------------

test("cookie: valido, scaduto, manomesso, di un'altra chiave", () => {
  const h = hashPhone("+393331112233", ENV);
  const good = makeReaderToken(h, ["R1"], 1000, ENV);
  assert.deepEqual(readerSession(good, ENV), { h, c: ["R1"] });
  assert.equal(readerSession(makeReaderToken(h, ["R1"], -1000, ENV), ENV), null, "scaduto");
  const [body, sig] = good.split(".");
  const evil = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body, "base64url")), c: ["R1", "S1"] })).toString("base64url");
  assert.equal(readerSession(`${evil}.${sig}`, ENV), null, "manomesso");
  assert.equal(readerSession(good, { ...ENV, GUIDE_GATE_SECRET: "altra" }), null, "altra chiave");
  assert.equal(readerSession("spazzatura", ENV), null);
  assert.equal(readerSession(undefined, ENV), null);
  assert.equal(readCookie("a=1; ga_lettore=xyz; b=2", "ga_lettore"), "xyz");
});

const valid = () => ck(makeReaderToken(hashPhone("+393331112233", ENV), ["R1"], 60_000, ENV));

test("pagine: cookie valido -> link firmati di 10 minuti per le pagine chieste", async () => {
  const log = [];
  const r = await pagine(log, { slug: R1.slug, from: 1, to: 4 }, { cookie: valid() });
  assert.equal(r.status, 200);
  assert.equal(r.body.expiresIn, 600);
  assert.deepEqual(r.body.pages.map((p) => p.n), [1, 2, 3, 4]);
  assert.equal(r.body.pages[0].url, "https://progetto-finto.supabase.co/storage/v1/object/sign/guide/pagine/R1/001.webp?token=tok");
  const sign = log.find((l) => l.url.endsWith("/object/sign/guide"));
  assert.deepEqual(JSON.parse(sign.body).paths, ["pagine/R1/001.webp", "pagine/R1/002.webp", "pagine/R1/003.webp", "pagine/R1/004.webp"]);
  assert.equal(JSON.parse(sign.body).expiresIn, 600);
  assert.equal(sign.headers.Authorization, "Bearer service-finta");
  assert.equal(ghlWrites(log).length, 0);
  assert.ok(!log.some((l) => /\.pdf/.test(l.url)), "il PDF non si tocca mai");
});

test("pagine: al massimo BATCH_MAX per richiesta e mai oltre l'ultima pagina", async () => {
  const big = await pagine([], { slug: R1.slug, from: 1, to: 60 }, { cookie: valid() });
  assert.equal(big.body.pages.length, BATCH_MAX);
  const tail = await pagine([], { slug: R1.slug, from: 74, to: 90 }, { cookie: valid() });
  assert.deepEqual(tail.body.pages.map((p) => p.n), [74, 75]);
  assert.equal((await pagine([], { slug: R1.slug, from: 80, to: 82 }, { cookie: valid() })).status, 400);
});

test("pagine: senza cookie, scaduto, manomesso o di un'altra guida -> 401; guida non pubblica -> 404", async () => {
  const h = hashPhone("+393331112233", ENV);
  for (const cookie of [undefined, ck(makeReaderToken(h, ["R1"], -1000, ENV)), ck("xx.yy"), ck(makeReaderToken(h, ["S1"], 60_000, ENV))]) {
    const log = [];
    const r = await pagine(log, { slug: R1.slug, from: 1, to: 2 }, { cookie });
    assert.equal(r.status, 401);
    assert.equal(log.length, 0, "senza cookie buono nessuna chiamata a Supabase");
  }
  const m1 = await pagine([], { slug: M1.slug, from: 1, to: 2 }, { cookie: ck(makeReaderToken(hashPhone("+393331112233", ENV), ["M1"], 60_000, ENV)) });
  assert.equal(m1.status, 404);
});

test("pagine: Supabase giù o manifest rotto -> 502, nessun link", async () => {
  const bad = async () => new Response("no", { status: 500 });
  const r = await handleLeggiPagine(post("http://x/api", { slug: R1.slug, from: 1, to: 2 }, { cookie: valid() }), { fetchImpl: bad, catalog, env: ENV });
  assert.equal(r.status, 502);
  await assert.rejects(() => readManifest(async () => new Response(JSON.stringify({ pagine: 0 })), ENV, "R1"), /non valido/);
  await assert.rejects(() => signPages(async () => new Response(JSON.stringify([{ path: "x", signedURL: "/a" }])), ENV, "R1", 1, 2), /manca/);
});

// ---- guida web (pagina HTML nel lettore, stesso accesso) ---------------------------------------------

const web = (log, { slug = R1.slug, cookie, fetchOpts = { web: true }, env = ENV } = {}) =>
  handleLeggiWeb(new Request(`http://localhost/api/guide-leggi-web?slug=${slug}`, { headers: cookie ? { cookie } : {} }), { fetchImpl: makeFetch(log, fetchOpts), catalog, env })
    .then(async (r) => ({ status: r.status, text: await r.text(), headers: r.headers }));
const hitsHtml = (log) => log.filter((l) => /\/web\/.+\/index\.html$/.test(l.url));

test("guida web: cookie valido -> 200 con l'HTML, no-store, noindex, sandbox, chiave di servizio solo lato server", async () => {
  const log = [];
  const r = await web(log, { cookie: valid() });
  assert.equal(r.status, 200);
  assert.equal(r.text, WEB_HTML);
  assert.match(r.headers.get("content-type"), /^text\/html/);
  assert.equal(r.headers.get("cache-control"), "private, no-store");
  assert.match(r.headers.get("x-robots-tag"), /noindex/);
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  const csp = r.headers.get("content-security-policy");
  assert.match(csp, /sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox/);
  assert.ok(!/allow-same-origin/.test(csp), "mai same-origin: il JS della guida non legge cookie né storage del sito");
  assert.equal(r.headers.get("location"), null, "niente redirect a link pubblici o firmati");
  assert.ok(!r.text.includes("token="), "nessun link firmato nella risposta");
  const h = hitsHtml(log);
  assert.equal(h.length, 1);
  assert.equal(h[0].url, "https://progetto-finto.supabase.co/storage/v1/object/guide/web/R1/index.html");
  assert.equal(h[0].headers.Authorization, "Bearer service-finta");
  assert.ok(!log.some((l) => l.url.includes("/object/sign/")), "nessun link firmato");
  assert.equal(ghlWrites(log).length, 0);
});

test("guida web: senza cookie, scaduto o manomesso -> 401 e l'HTML non esce mai (nessuna chiamata a Supabase)", async () => {
  const h = hashPhone("+393331112233", ENV);
  for (const cookie of [undefined, ck(makeReaderToken(h, ["R1"], -1000, ENV)), ck("xx.yy"), ck(makeReaderToken(h, ["R1"], 60_000, { ...ENV, GUIDE_GATE_SECRET: "altra" }))]) {
    const log = [];
    const r = await web(log, { cookie });
    assert.equal(r.status, 401);
    assert.ok(!r.text.includes("CONTENUTO-RISERVATO"));
    assert.equal(log.length, 0, "senza cookie buono nessuna chiamata a Supabase");
  }
});

test("guida web: cookie valido ma per un'altra guida -> 403, l'HTML non esce", async () => {
  const log = [];
  const other = ck(makeReaderToken(hashPhone("+393331112233", ENV), ["S1"], 60_000, ENV));
  const r = await web(log, { cookie: other });
  assert.equal(r.status, 403);
  assert.ok(!r.text.includes("CONTENUTO-RISERVATO"));
  assert.equal(log.length, 0);
});

test("guida web: guida non pubblica o inesistente -> 404; guida a immagini -> 404 (non è web)", async () => {
  const m1 = ck(makeReaderToken(hashPhone("+393331112233", ENV), ["M1"], 60_000, ENV));
  for (const slug of [M1.slug, "non-esiste", "..%2Fetc", ""]) assert.equal((await web([], { slug, cookie: m1 })).status, 404, slug);
  const log = [];
  const img = await web(log, { cookie: valid(), fetchOpts: { web: false } });
  assert.equal(img.status, 404);
  assert.equal(hitsHtml(log).length, 0, "una guida a immagini non scarica nessun HTML");
});

test("guida web: Supabase giù o HTML vuoto -> 502; senza chiavi -> 502; nessun HTML in risposta", async () => {
  const bad = await handleLeggiWeb(new Request("http://x/api/guide-leggi-web?slug=" + R1.slug, { headers: { cookie: valid() } }), { fetchImpl: async () => new Response("no", { status: 500 }), catalog, env: ENV });
  assert.equal(bad.status, 502);
  assert.equal((await web([], { cookie: valid(), fetchOpts: { web: "vuota" } })).status, 502);
  assert.equal((await web([], { cookie: valid(), env: { GUIDE_GATE_SECRET: ENV.GUIDE_GATE_SECRET } })).status, 502);
});

test("guida web: il manifest web non rompe quello a immagini; /api/guide-leggi-pagine non firma pagine per una guida web", async () => {
  const wm = await readManifest(makeFetch([], { web: true }), ENV, "R1");
  assert.deepEqual(wm, { formato: "web", edizione: "novembre 2026" });
  assert.deepEqual(await readManifest(makeFetch([]), ENV, "R1"), { formato: "immagini", pagine: 75, larghezza: 1240, altezza: 1754, edizione: "novembre 2026" });
  const log = [];
  const r = await handleLeggiPagine(post("http://x/api", { slug: R1.slug, from: 1, to: 2 }, { cookie: valid() }), { fetchImpl: makeFetch(log, { web: true }), catalog, env: ENV });
  assert.equal(r.status, 400);
  assert.ok(!log.some((l) => l.url.includes("/object/sign/")));
});

test("guida web: nessuna guida web nei file pubblici (public/) né in private/", () => {
  const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`])) : []);
  for (const dir of ["../public", "../private"]) {
    assert.ok(!walk(new URL(dir, import.meta.url).pathname).some((f) => /\/web\/[A-Z]\d{1,2}\//.test(f)), `web/<CODICE>/ in ${dir}`);
  }
});

// ---- messaggi, numeri, catalogo ---------------------------------------------------------------------

test("normalizePhone", () => {
  assert.equal(normalizePhone("333 111 2233"), "+393331112233");
  assert.equal(normalizePhone("0039 333 111 2233"), "+393331112233");
  assert.equal(normalizePhone("+44 7911 123456"), "+447911123456");
  assert.equal(normalizePhone("081 1234567"), "+390811234567");
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("333 abc"), null);
});

test("parseReceived", () => {
  assert.deepEqual(parseReceived("R1, s1 ;T4\nA2"), ["R1", "S1", "T4", "A2"]);
  assert.deepEqual(parseReceived(null), []);
});

test("messaggi WhatsApp: contratto v3 §6, niente codici", () => {
  const t = "Il conto dell'IA";
  assert.equal(waMessage({ kind: "vorrei", titolo: t }), "Mandami la guida «Il conto dell'IA»");
  assert.equal(waMessage({ kind: "vorrei", titolo: t, source: "LI" }), "Mandami la guida «Il conto dell'IA» · da LinkedIn");
  assert.equal(waMessage({ kind: "vorrei", titolo: t, source: "LO" }), "Mandami la guida «Il conto dell'IA» · dal messaggio su LinkedIn");
  assert.equal(waMessage({ kind: "vorrei", titolo: t, source: "IG" }), "Mandami la guida «Il conto dell'IA» · da Instagram");
  assert.equal(waMessage({ kind: "vorrei", titolo: t, source: "TT" }), "Mandami la guida «Il conto dell'IA» · da TikTok");
  assert.equal(waMessage({ kind: "vorrei", titolo: t, source: "SITO" }), "Mandami la guida «Il conto dell'IA» · dal sito");
  assert.equal(waMessage({ kind: "avvisami", titolo: "Mini-guida: IA per palestre" }), "Avvisami quando esce «Mini-guida: IA per palestre»");
  assert.equal(waMessage({ kind: "avvisami", titolo: "X", source: "SITO" }), "Avvisami quando esce «X» · dal sito");
  assert.equal(waMessage({ kind: "domanda", titolo: t }), "Ciao Luca, ho letto «Il conto dell'IA» e ho una domanda");
  for (const source of ["", "LI", "LO", "IG", "TT", "SITO"]) {
    for (const kind of ["vorrei", "avvisami", "domanda"]) assert.ok(!/\([A-Z]\d{1,2}/.test(waMessage({ kind, titolo: t, source })), "nessun codice");
  }
  assert.ok(waLink({ titolo: "X" }).startsWith("https://wa.me/3908118653493?text="));
  assert.equal(parseSource("li"), "LI");
  assert.equal(parseSource("facebook"), "");
});

test("catalogo: 57 guide, 13 pronte (come guide-pubbliche.json), slug unici, le altre in arrivo", () => {
  assert.equal(catalog.length, 57);
  const pronte = catalog.filter((g) => g.pronta).map((g) => g.code);
  assert.deepEqual(pronte, ["R1", "R2", "R3", "R4", "S1", "S2", "S3", "S4", "V1", "T1", "T2", "T3", "T4"]);
  assert.ok(catalog.filter((g) => g.pronta).every((g) => g.file && g.promessa && g.capitoli.length));
  assert.ok(catalog.filter((g) => !g.pronta).every((g) => !g.file));
  assert.equal(new Set(catalog.map((g) => g.code)).size, 57);
  assert.equal(new Set(catalog.map((g) => g.slug)).size, 57);
  assert.equal(R1.slug, "il-conto-dell-ia");
});

// ---- loader del catalogo (bucket Supabase finto) ----
const CAT_ENV = { SUPABASE_URL: "https://progetto-finto.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "service-finta" };
const silent = { warn() {}, error() {} };
const mkBucket = (list, calls = []) => async (url, init = {}) => {
  calls.push({ url: String(url), headers: init.headers, cache: init.cache });
  return new Response(JSON.stringify(list), { status: 200 });
};
// il catalogo «nuovo»: una guida in più pubblica (X9) e M1 ancora in arrivo
const nuovo = [
  ...catalog.filter((g) => g.code !== "T1"),
  { code: "X9", porta: "strumento", titolo: "Guida nuova", per_chi: "Chi vuole provare", next: null, pronta: true, file: "X9-guida-nuova.pdf", promessa: "Una promessa.", capitoli: ["Uno", "Due"], pagine: 10, conti: 1, controlli: 2, caso_vero: null, edizione: "novembre 2026" },
];

test("loader: legge catalogo.json dal bucket privato con la chiave di servizio", async () => {
  resetCatalog();
  const calls = [];
  const list = await loadCatalogo({ fallback: catalog, fetchImpl: mkBucket(nuovo, calls), env: CAT_ENV, log: silent });
  assert.equal(_lastSource(), "bucket");
  assert.ok(list.some((g) => g.code === "X9" && g.pronta), "la guida nuova c'è, senza deploy");
  assert.ok(!list.some((g) => g.code === "T1"));
  assert.equal(calls[0].url, "https://progetto-finto.supabase.co/storage/v1/object/guide/catalogo.json");
  assert.equal(calls[0].headers.Authorization, "Bearer service-finta");
});

test("loader: cache di 5 minuti, poi rilegge", async () => {
  resetCatalog();
  const calls = [];
  let t = 1_000_000;
  const deps = { fallback: catalog, fetchImpl: mkBucket(nuovo, calls), env: CAT_ENV, log: silent, now: () => t };
  await loadCatalogo(deps);
  t += CATALOG_TTL_MS - 1000;
  await loadCatalogo(deps);
  assert.equal(calls.length, 1, "entro 5 minuti non rilegge");
  t += 2000;
  await loadCatalogo(deps);
  assert.equal(calls.length, 2, "dopo 5 minuti rilegge");
});

test("loader: errore di Supabase -> ripiego su data/guide-catalogo.json, scritto nei log", async () => {
  resetCatalog();
  const logs = [];
  const bad = async () => new Response("no", { status: 500 });
  const list = await loadCatalogo({ fallback: catalog, fetchImpl: bad, env: CAT_ENV, log: { warn: (m) => logs.push(m), error() {} } });
  assert.equal(_lastSource(), "ripiego");
  assert.equal(list.length, catalog.length);
  assert.ok(logs.some((m) => m.includes("ripiego") && m.includes("500")));
});

test("loader: rete giù o variabili mancanti -> ripiego, senza chiamare nessuno", async () => {
  resetCatalog();
  const down = async () => { throw new Error("rete giù"); };
  assert.equal((await loadCatalogo({ fallback: catalog, fetchImpl: down, env: CAT_ENV, log: silent })).length, catalog.length);
  resetCatalog();
  const calls = [];
  const logs = [];
  const list = await loadCatalogo({ fallback: catalog, fetchImpl: mkBucket(nuovo, calls), env: {}, log: { warn: (m) => logs.push(m), error() {} } });
  assert.equal(list.length, catalog.length);
  assert.equal(calls.length, 0);
  assert.ok(logs.some((m) => m.includes("SUPABASE_URL")));
});

test("loader: file rotto nel bucket (voce non valida) -> ripiego", async () => {
  resetCatalog();
  const rotto = [...nuovo, { code: "zz", porta: "boh", titolo: "", pronta: "sì" }];
  const list = await loadCatalogo({ fallback: catalog, fetchImpl: mkBucket(rotto), env: CAT_ENV, log: silent });
  assert.equal(_lastSource(), "ripiego");
  assert.ok(!list.some((g) => g.code === "X9"));
  assert.throws(() => normalizeCatalog({}), /lista/);
  assert.throws(() => normalizeCatalog([{ ...catalog[0], pronta: true, capitoli: [] }]), /capitoli/);
});

test("loader: dopo una lettura buona, un errore tiene l'ultima copia buona", async () => {
  resetCatalog();
  let t = 5_000_000;
  const ok = { fallback: catalog, fetchImpl: mkBucket(nuovo), env: CAT_ENV, log: silent, now: () => t };
  await loadCatalogo(ok);
  t += CATALOG_TTL_MS + 1;
  const list = await loadCatalogo({ ...ok, fetchImpl: async () => new Response("no", { status: 503 }) });
  assert.equal(_lastSource(), "ultima-copia");
  assert.ok(list.some((g) => g.code === "X9"));
});

test("loader + lettore: una guida pubblicata nel bucket si legge senza deploy (slug ricavato dal titolo)", async () => {
  resetCatalog();
  _resetForTests();
  const cat = await loadCatalogo({ fallback: catalog, fetchImpl: mkBucket(nuovo), env: CAT_ENV, log: silent });
  const x9 = cat.find((g) => g.code === "X9");
  assert.equal(x9.slug, "guida-nuova");
  const contacts = { ...CONTACTS, "+393331112233": { id: "c1", tags: [], customFields: [{ id: FIELD_ID, value: "R1, X9" }] } };
  const f = async (url, init) => {
    const u = String(url);
    if (u.includes("/contacts/search/duplicate")) return new Response(JSON.stringify({ contact: contacts[new URL(u).searchParams.get("number")] || null }));
    return makeFetch([])(url, init);
  };
  const r = await handleLeggiAccesso(post("http://x/api", { phone: "3331112233", slug: "guida-nuova" }, { ip: "6.6.6.6" }), { fetchImpl: f, catalog: cat, env: ENV });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).found, true);
  assert.deepEqual(readerSession(cookieOf({ headers: r.headers }), ENV).c, ["X9"]);
});
