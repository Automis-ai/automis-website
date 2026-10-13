/*
  Condizioni condivise dagli effetti del kit (components/v2/wow/fx).
  Tutto qui è sicuro lato server: fuori dal browser le funzioni rispondono «no».
  gsap + ScrollTrigger + SplitText si caricano UNA volta sola, con la stessa promessa dello scroll fluido
  (components/v2/wow/scroll/gsap.js): chi arriva per secondo non scarica niente.
*/
export { loadGsap } from "../scroll/gsap";

const REDUCED_Q = "(prefers-reduced-motion: reduce)";
const HOVER_Q = "(hover: hover) and (pointer: fine)";

export function mq(query) {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}

/** L'utente ha chiesto meno movimento: gli effetti non partono. */
export const reducedMotion = () => mq(REDUCED_Q);

/** Mouse vero (o penna): solo lì ci sono inclinazione, magnete e alone. Sul tocco niente. */
export const canHover = () => mq(HOVER_Q);

/** Schermo stretto o tocco: entrate più corte, niente rotazioni in profondità. */
export const isLite = () => typeof window !== "undefined" && (window.innerWidth < 768 || !canHover());

/** L'elemento sta sotto la piega: solo questi si preparano all'entrata (quelli già visibili restano com'erano). */
export function belowFold(el, frac = 0.93) {
  if (typeof window === "undefined") return false;
  return el.getBoundingClientRect().top > window.innerHeight * frac;
}

export const lerp = (a, b, k) => a + (b - a) * k;
