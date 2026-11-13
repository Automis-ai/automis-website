// Catalogo guide: legge `catalogo.json` dal bucket PRIVATO Supabase `guide`, così pubblicare una guida nuova
// non richiede un deploy. Cache in memoria di 5 minuti per istanza; se la lettura fallisce o mancano le
// variabili (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) ripiega su data/guide-catalogo.json, incluso nel build,
// e lo scrive nei log. Se una lettura riuscita in precedenza esiste ancora in memoria, in caso di errore si
// tiene quella (meglio un catalogo vecchio di 10 minuti che uno vecchio di settimane).
//
// FORMATO di catalogo.json (lo stesso di data/guide-catalogo.json): una lista di oggetti, uno per guida.
//   code        "R1"                 obbligatorio, /^[A-Z]\d{1,2}$/, unico
//   porta       "ruolo" | "settore" | "strumento" | "servizio" | "mini"      obbligatorio
//   slug        "il-conto-dell-ia"    indirizzo del lettore online: /it/guide/leggi/<slug>; se manca si ricava dal titolo
//   titolo      "Il conto dell'IA"   obbligatorio (finisce nel messaggio WhatsApp)
//   per_chi     "CFO e direzione finanziaria"                                obbligatorio
//   pronta      true = pubblica e scaricabile (serve pdf/<CODICE>.pdf nel bucket);
//               false = «in arrivo» con «Avvisami su WhatsApp»               obbligatorio
//   next        codice della guida consigliata dopo questa, o null
//   file        nome del PDF scaricato (es. "R1-il-conto-dell-ia.pdf"), o null
//   promessa, capitoli[], pagine, conti, controlli, caso_vero, edizione     solo per le pronte
// Le guide «in arrivo» mostrano solo titolo e «per chi». Il PDF sta in `pdf/<CODICE>.pdf` (non si manda più);
// le pagine del lettore stanno in `pagine/<CODICE>/NNN.webp` + `pagine/<CODICE>/manifest.json`.
// Una voce non valida scarta TUTTO il file (si usa il ripiego): meglio un catalogo vecchio che mezzo rotto.
// Per rigenerare il file di ripiego: `npm run guide:catalogo`.

export const CATALOG_TTL_MS = 5 * 60 * 1000;
const FAIL_TTL_MS = 60 * 1000; // dopo un errore si riprova dopo 1 minuto, non a ogni richiesta
const BUCKET_DEFAULT = "guide";
const PORTE = new Set(["ruolo", "settore", "strumento", "servizio", "mini"]);

let cache = null; // { at, ttl, value, source }
let lastGood = null; // ultima lettura riuscita dal bucket
let inflight = null;

export function _resetForTests() {
  cache = null;
  lastGood = null;
  inflight = null;
}

export const slugify = (t) =>
  String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const str = (v) => (typeof v === "string" && v.trim() ? v : null);
const int = (v) => (Number.isInteger(v) && v >= 0 ? v : null);

/** Controlla e normalizza la lista. Lancia un Error con il motivo se qualcosa non torna. */
export function normalizeCatalog(raw) {
  if (!Array.isArray(raw) || !raw.length) throw new Error("catalogo.json non è una lista");
  const seen = new Set();
  const slugs = new Set();
  return raw.map((g, i) => {
    const where = `voce ${i}${g && g.code ? ` (${g.code})` : ""}`;
    if (!g || typeof g !== "object") throw new Error(`${where}: non è un oggetto`);
    if (typeof g.code !== "string" || !/^[A-Z]\d{1,2}$/.test(g.code)) throw new Error(`${where}: code non valido`);
    if (seen.has(g.code)) throw new Error(`${where}: codice doppio`);
    seen.add(g.code);
    if (!PORTE.has(g.porta)) throw new Error(`${where}: porta non valida`);
    if (!str(g.titolo) || !str(g.per_chi)) throw new Error(`${where}: titolo o per_chi mancante`);
    if (typeof g.pronta !== "boolean") throw new Error(`${where}: pronta deve essere true o false`);
    const slug = str(g.slug) ? slugify(g.slug) : slugify(g.titolo);
    if (!slug || slugs.has(slug)) throw new Error(`${where}: slug vuoto o doppio`);
    slugs.add(slug);
    const pronta = g.pronta;
    if (pronta && (!str(g.promessa) || !Array.isArray(g.capitoli) || !g.capitoli.length)) {
      throw new Error(`${where}: pronta ma senza promessa o capitoli`);
    }
    return {
      code: g.code,
      slug,
      porta: g.porta,
      titolo: g.titolo,
      per_chi: g.per_chi,
      next: typeof g.next === "string" && /^[A-Z]\d{1,2}$/.test(g.next) ? g.next : null,
      pronta,
      file: pronta ? str(g.file) : null,
      promessa: pronta ? g.promessa : null,
      capitoli: pronta ? g.capitoli.filter((c) => typeof c === "string") : [],
      pagine: pronta ? int(g.pagine) : null,
      conti: pronta ? int(g.conti) : null,
      controlli: pronta ? int(g.controlli) : null,
      caso_vero: pronta ? str(g.caso_vero) : null,
      edizione: pronta ? str(g.edizione) : null,
    };
  });
}

async function readFromBucket(f, env) {
  const base = String(env.SUPABASE_URL).replace(/\/+$/, "");
  const bucket = env.GUIDE_BUCKET || BUCKET_DEFAULT;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  const res = await f(`${base}/storage/v1/object/${bucket}/catalogo.json`, {
    headers: { Authorization: `Bearer ${key}`, apikey: key },
    cache: "no-store", // la cache di 5 minuti è qui sotto, non quella di fetch (force-dynamic la disattiverebbe)
  });
  if (!res.ok) throw new Error(`Supabase ha risposto ${res.status}`);
  return normalizeCatalog(await res.json());
}

/**
 * @param {{ fallback: unknown[], fetchImpl?: typeof fetch, env?: object, now?: () => number, log?: Pick<Console,'warn'|'error'> }} deps
 * @returns {Promise<Array>} lista di guide, sempre valida (dal bucket o di ripiego)
 */
export async function loadCatalogo(deps) {
  const env = deps.env || process.env;
  const now = (deps.now || Date.now)();
  const log = deps.log || console;
  if (cache && now - cache.at < cache.ttl) return cache.value;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY non impostate");
      const value = await readFromBucket(deps.fetchImpl || fetch, env);
      lastGood = value;
      cache = { at: now, ttl: CATALOG_TTL_MS, value, source: "bucket" };
      return value;
    } catch (err) {
      const reason = err?.message || String(err);
      if (lastGood) {
        log.warn(`guide-catalogo: lettura dal bucket fallita (${reason}), tengo l'ultima copia buona`);
        cache = { at: now, ttl: FAIL_TTL_MS, value: lastGood, source: "ultima-copia" };
        return lastGood;
      }
      log.warn(`guide-catalogo: uso il ripiego data/guide-catalogo.json (${reason})`);
      const value = normalizeCatalog(deps.fallback);
      cache = { at: now, ttl: FAIL_TTL_MS, value, source: "ripiego" };
      return value;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

/** Da dove viene l'ultima lettura: "bucket" | "ultima-copia" | "ripiego" | null. Per le prove. */
export const _lastSource = () => cache?.source || null;
