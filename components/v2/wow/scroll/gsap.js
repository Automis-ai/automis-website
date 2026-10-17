/*
  Carica gsap + ScrollTrigger + SplitText una volta sola, solo nel browser, con dynamic import:
  il testo della pagina arriva dal server e non aspetta queste librerie.
  Se il caricamento fallisce la promessa rifiuta: chi la usa lascia la pagina nello stato finale (visibile).
*/
let pending = null;
let ready = null;

// Se gsap è già caricato lo restituisce subito, altrimenti null (non avvia nessun download: serve a chi deve solo guardare).
export function getLoaded() {
  return ready;
}

export function loadGsap() {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")])
      .then(([g, st, sp]) => {
        const gsap = g.gsap || g.default;
        const ScrollTrigger = st.ScrollTrigger || st.default;
        const SplitText = sp.SplitText || sp.default;
        gsap.registerPlugin(ScrollTrigger, SplitText);
        ready = { gsap, ScrollTrigger, SplitText };
        return ready;
      })
      .catch((err) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}
