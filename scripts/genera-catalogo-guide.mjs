#!/usr/bin/env node
// Genera data/guide-catalogo.json dalle guide di Luca (catalogo.json + guide/<CODICE>/scheda.json).
// Serve SOLO per il file di ripiego incluso nel build: la fonte vera è catalogo.json nel bucket Supabase
// `guide` (stesso formato, vedi lib/guideCatalogoLoader.js), letto dal sito con cache di 5 minuti.
//
//   node scripts/genera-catalogo-guide.mjs [cartella-guide-luca]
//
// La cartella è, in ordine: l'argomento, GUIDE_LUCA_DIR, ~/Automations/sandbox/guide-luca.
// Fonte unica di cosa è scaricabile: setter-guide/guide-pubbliche.json ("pronte" e "escluse"; override con
// GUIDE_PUBBLICHE). Una guida è «pronta» solo se sta in "pronte": per quelle la scheda deve avere `pdf`
// il file dovrebbe esistere (se manca c'è solo un avviso). Tutte le altre, anche con il PDF, sono «in arrivo».
// Le "escluse" non entrano nel catalogo.
// Nel file pubblico NON finiscono `base` e `stato` (note interne: bozze, fonti).
// Esce 1 se qualcosa non torna (codici doppi o non validi, pronte senza dati). Un PDF mancante è solo un avviso.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.resolve(
  process.argv[2] || process.env.GUIDE_LUCA_DIR || path.join(os.homedir(), "Automations/sandbox/guide-luca"),
);
const out = path.join(root, "data/guide-catalogo.json");
const pubbliche = path.resolve(
  process.env.GUIDE_PUBBLICHE || path.join(os.homedir(), "Automations/sandbox/setter-guide/guide-pubbliche.json"),
);

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const problems = [];

const pub = readJson(pubbliche);
const pronte = new Set(pub.pronte || []);
const escluse = new Set(pub.escluse || []);
const catalogo = readJson(path.join(src, "catalogo.json"));
for (const c of [...pronte, ...escluse]) {
  if (!catalogo.some((g) => g.code === c)) problems.push(`guide-pubbliche.json: ${c} non è nel catalogo`);
}
for (const c of pronte) if (escluse.has(c)) problems.push(`${c} è sia pronta sia esclusa`);
const seen = new Set();
const guide = catalogo.filter((g) => !escluse.has(g.code)).map((g) => {
  if (seen.has(g.code)) problems.push(`codice doppio: ${g.code}`);
  seen.add(g.code);
  if (!/^[A-Z]\d{1,2}$/.test(g.code)) problems.push(`codice non valido: ${g.code}`);

  const schedaPath = path.join(src, "guide", g.code, "scheda.json");
  const s = fs.existsSync(schedaPath) ? readJson(schedaPath) : null;
  const pdfName = s?.pdf || null;
  const pdfOk = !!pdfName && fs.existsSync(path.join(src, "guide", g.code, pdfName));
  const pronta = pronte.has(g.code);
  if (pronta && !pdfOk) console.warn(`avviso: ${g.code} è pubblica ma il PDF non c'è (${pdfName || "campo pdf mancante"})`);

  if (pronta) {
    for (const k of ["promessa", "capitoli", "pagine"]) {
      if (!s[k] || (Array.isArray(s[k]) && !s[k].length)) problems.push(`${g.code}: pronta ma senza ${k}`);
    }
  }

  return {
    code: g.code,
    slug: g.slug,
    porta: g.porta,
    titolo: g.titolo,
    per_chi: g.per_chi,
    next: g.next && !escluse.has(g.next) ? g.next : null,
    pronta,
    file: pronta ? pdfName : null,
    // le guide non pubbliche mostrano solo titolo e «per chi»: niente promessa, capitoli o numeri
    promessa: pronta ? s?.promessa || null : null,
    capitoli: pronta ? s?.capitoli || [] : [],
    pagine: pronta ? s?.pagine ?? null : null,
    conti: pronta ? s?.conti ?? null : null,
    controlli: pronta ? s?.controlli ?? null : null,
    caso_vero: pronta ? s?.caso_vero || null : null,
    edizione: pronta ? s?.edizione || null : null,
  };
});

for (const g of guide) {
  if (g.next && !seen.has(g.next) && !escluse.has(g.next)) problems.push(`${g.code}: next ${g.next} non esiste`);
}

if (problems.length) {
  console.error("Catalogo NON generato:\n- " + problems.join("\n- "));
  process.exit(1);
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(guide, null, 2) + "\n");
const nPronte = guide.filter((g) => g.pronta).length;
console.log(`${path.relative(root, out)}: ${guide.length} guide, ${nPronte} pronte, ${guide.length - nPronte} in arrivo`);
