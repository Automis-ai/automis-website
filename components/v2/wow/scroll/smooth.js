/*
  Il Lenis in funzione, se c'è (lo scrive SmoothScroll.js). Serve a chi deve spostare la pagina da codice (focus.js): con Lenis
  attivo uno scroll nativo fatto a metà di una scivolata verrebbe rimangiato dalla scivolata; con `lenis.scrollTo(y, { immediate })` no.
*/
export const smooth = { lenis: null };
