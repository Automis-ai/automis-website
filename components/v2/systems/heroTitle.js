/*
  Titolo e parole in blu di PageHero, con le parole corte (1-2 lettere: il, la, o, ai, di…) dentro l'evidenza
  attaccate alla parola dopo (spazio non separabile): niente «il» in blu solo a fine riga.
  Uso: <PageHero {...heroTitle(t.hero.title, t.hero.highlight)} … />. Se `highlight` non compare nel titolo,
  il titolo esce com'è.
*/
export function heroTitle(title, highlight) {
  const i = highlight ? title.indexOf(highlight) : -1;
  if (i < 0) return { title, highlight };
  const glued = highlight.replace(/(^|\s)(\p{L}{1,2}) (?=\S)/gu, "$1$2 ");
  return { title: title.slice(0, i) + glued + title.slice(i + highlight.length), highlight: glued };
}

export default heroTitle;
