/*
  Traduce il parametro `?tono=` della preview nella classe del tono di pagina:
  "a" -> "v2-tone-a", "b" -> "v2-tone-b", qualsiasi altro valore -> "" (il sito di oggi, senza toni).
  Uso: <div className={toneClass(searchParams?.tono)}> … tutte le <Section> … </div>
*/
export function toneClass(value) {
  const v = String(Array.isArray(value) ? value[0] : value || "").toLowerCase();
  return v === "a" ? "v2-tone-a" : v === "b" ? "v2-tone-b" : "";
}

export default toneClass;
