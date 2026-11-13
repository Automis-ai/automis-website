// Catalogo guide su WhatsApp: numero, fonti e messaggi precompilati (contratto v3 §6, 10/11/2026).
// Niente codici nei messaggi: la guida si riconosce dal titolo tra «», la fonte è scritta a parole.
//   Mandami la guida «<titolo>» · da LinkedIn
//   Mandami la guida «<titolo>»                          (senza fonte)
//   Avvisami quando esce «<titolo>» · dal sito
//   Ciao Luca, ho letto «<titolo>» e ho una domanda      (dal lettore online, §1)
// Nel wa.me il numero va senza + e senza spazi, con lo 0 del fisso.

export const WA_NUMBER = "3908118653493";
export const WA_NUMBER_LABEL = "+39 081 1865 3493";

// ?da=li -> LI. Qualunque altro valore (o niente) = nessuna fonte.
export const SOURCES = ["LI", "LO", "IG", "TT", "SITO"];

export function parseSource(raw) {
  const v = String(Array.isArray(raw) ? raw[0] : raw || "").trim().toUpperCase();
  return SOURCES.includes(v) ? v : "";
}

export function parseCode(raw) {
  const v = String(Array.isArray(raw) ? raw[0] : raw || "").trim().toUpperCase();
  return /^[A-Z]\d{1,2}$/.test(v) ? v : "";
}

// Frase della fonte, con la preposizione articolata.
export const SOURCE_PHRASE = {
  LI: "da LinkedIn",
  LO: "dal messaggio su LinkedIn",
  IG: "da Instagram",
  TT: "da TikTok",
  SITO: "dal sito",
};

export function waMessage({ kind = "vorrei", titolo, source = "" }) {
  // «Non so quale scegliere»: nessun titolo, il bot lo legge come conversazione normale
  if (kind === "aiuto") return "Ciao Luca, non so quale guida scegliere";
  // domanda dall'interno del lettore: la fonte non c'entra più
  if (kind === "domanda") return `Ciao Luca, ho letto «${titolo}» e ho una domanda`;
  const from = source && SOURCE_PHRASE[source] ? ` · ${SOURCE_PHRASE[source]}` : "";
  return kind === "avvisami"
    ? `Avvisami quando esce «${titolo}»${from}`
    : `Mandami la guida «${titolo}»${from}`;
}

export function waLink(opts) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage(opts))}`;
}
