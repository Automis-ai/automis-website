/*
  Traduce il parametro `?tono=` della preview nella classe del tono di pagina.
  Senza parametro vale il tono A, lo stesso della home (niente salti netti scuro -> chiaro in nessuna pagina):
    undefined / null  -> "v2-tone-a"
    "a"               -> "v2-tone-a"
    "b"               -> "v2-tone-b"
    qualsiasi altro   -> ""  (il sito di oggi, senza toni: solo per il confronto)
  Uso: <main id="main" className={toneClass(searchParams?.tono)}> … tutte le <Section> … </main>
*/
export function toneClass(value) {
  if (value === undefined || value === null) return "v2-tone-a";
  const v = String(Array.isArray(value) ? value[0] : value).toLowerCase();
  return v === "a" || v === "" ? "v2-tone-a" : v === "b" ? "v2-tone-b" : "";
}

/*
  Classe del contenitore di una pagina interna: il tono + `v2-pg`, che attiva le sfumature lunghe fra le fasce
  (mai un taglio netto) e le schede di vetro scuro con bordo che si schiarisce (v2.css, blocco «Pagine interne»).
*/
export function pageClass(value) {
  return `${toneClass(value)} v2-pg`.trim();
}

export default toneClass;
