// Guide correlate per la pagina «guida in evidenza» (/it/guide?g=CODICE).
// Si mostrano al massimo 3 guide, scelte da noi: prima quelle della mappa (nell'ordine), poi la «next» del catalogo,
// poi le altre della stessa porta. Solo guide pronte e mai la stessa guida.
// Outbound LinkedIn (decisione del 16/11/2026): PMI → guida di ruolo + guide di settore; studi → Company Brain.
export const RELATED = {
  R1: ["S7", "S8", "S9"],
  R2: ["S7", "S8", "S9"],
  S4: ["A1", "R2", "R4"],
};

export const RELATED_MAX = 3;

export function relatedFor(code, catalogo, max = RELATED_MAX) {
  const pronte = catalogo.filter((g) => g.pronta && g.code !== code);
  const byCode = new Map(pronte.map((g) => [g.code, g]));
  const me = catalogo.find((g) => g.code === code);
  const wanted = [...(RELATED[code] || []), me?.next].filter(Boolean);
  const out = [];
  const add = (g) => {
    if (g && !out.includes(g) && out.length < max) out.push(g);
  };
  wanted.forEach((c) => add(byCode.get(c)));
  if (me) pronte.filter((g) => g.porta === me.porta).forEach(add);
  return out;
}

// Pagine brevi per l'outreach LinkedIn: automis.ai/it/guide/<bersaglio> mostra la guida promessa nell'invito.
// Un indirizzo corto e pulito per il messaggio dopo l'accettazione; la fonte è «dal messaggio su LinkedIn» (LO).
export const TARGETS = {
  cfo: "R1", // CFO delle PMI (gruppo 2)
  ceo: "R2", // CEO e direttori generali delle PMI (gruppo 2)
  studi: "S4", // studi legali e commercialisti (gruppo 1)
};
