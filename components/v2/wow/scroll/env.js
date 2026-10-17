/*
  Media query condivise dalle animazioni a scroll (usate con gsap.matchMedia).
  - REDUCED: l'utente chiede meno movimento -> nessuna animazione, pagina statica.
  - TOUCH: telefono o tablet senza mouse -> scroll nativo, niente inclinazione al passaggio.
  - RICH: mouse vero e schermo da almeno 768 px -> 3D, inclinazioni, magneti.
  - PIN: RICH + schermo largo e alto abbastanza per fissare una sezione senza tagliarla.
  - LITE: tutto il resto (con movimento consentito) -> entrate semplici, niente sezioni fissate.
*/
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const TOUCH = "(hover: none), (pointer: coarse)";
export const RICH = "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (hover: hover) and (pointer: fine)";
export const PIN =
  "(prefers-reduced-motion: no-preference) and (min-width: 1100px) and (min-height: 640px) and (hover: hover) and (pointer: fine)";
export const LITE =
  "(prefers-reduced-motion: no-preference) and (not ((min-width: 768px) and (hover: hover) and (pointer: fine)))";

export function matches(query) {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}
