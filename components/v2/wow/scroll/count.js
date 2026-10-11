/*
  Numeri che contano fino al valore vero.
  Il numero finale sta già nel testo della pagina (arriva dal server): `data-wow-count="2.329"` ne porta la forma
  esatta, con il suo separatore delle migliaia. Qui si conta da 0 a quel valore e alla fine il testo torna
  identico all'originale. Nessuna conversione di lingua: il separatore si legge da data-wow-count.

  Il conteggio è un tween su `textContent` con un modifier: il testo viene scritto a ogni render, quindi anche quando
  una timeline legata allo scroll salta direttamente alla fine (ancora, ricarica a metà pagina) il numero è quello vero.
*/
export function parseCount(raw) {
  const digits = String(raw).replace(/\D/g, "");
  const target = parseInt(digits, 10);
  const sep = (String(raw).match(/\D/) || [""])[0];
  const fmt = (n) => (sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n));
  return { target: Number.isFinite(target) ? target : 0, fmt, raw: String(raw) };
}

/* Valori per gsap: gsap.fromTo(el, from, to) oppure timeline.fromTo(el, from, to, position). */
export function countVars(el, extra = {}) {
  const { target, fmt } = parseCount(el.dataset.wowCount);
  return {
    from: { textContent: 0 },
    to: {
      textContent: target,
      duration: 1.6,
      ease: "power2.out",
      ...extra,
      modifiers: { textContent: (v) => fmt(Math.round(Number(v))) },
    },
  };
}

/* Rimette il testo originale (da usare nella pulizia). */
export function restoreCount(el) {
  el.textContent = el.dataset.wowCount;
}
