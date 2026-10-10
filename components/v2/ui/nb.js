/* Le parole con il trattino (e-commerce, melhoramo-lo, 74-ter) non vanno a capo in mezzo: ogni composto sta
   in uno <span class="v2-nb"> con white-space: nowrap. Il testo non cambia (copia, ricerca e SEO restano gli
   stessi). Uso: {nb(title)}. Se non è una stringa (es. un elemento React) torna com'è. */
const COMPOUND = /([\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+)/gu;

export function nb(text) {
  if (typeof text !== "string" || !text.includes("-")) return text;
  const parts = text.split(COMPOUND);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 ? (
      <span className="v2-nb" key={i}>
        {p}
      </span>
    ) : (
      p
    )
  );
}

export default nb;
