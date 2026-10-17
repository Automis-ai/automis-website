// Avanzamento (0..1) dello scorrimento dentro la «pista» della hero della home, e la variabile CSS --wow-s sul testo.
// La pista è CSS (hero.css): la sezione è alta 100svh + 110svh e sfondo e testo restano fermi (sticky) mentre si scorre.
// Questo modulo non ha dipendenze: si importa nel guscio (serve anche quando il 3D non parte) e il motore lo legge.

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function bindRunway(section) {
  const copy = section ? section.querySelector(".v2-phero__copy") : null;
  const stick = section ? section.querySelector(":scope > .v2-phero__bg") : null;
  let s = 0;
  let raf = 0;
  let shown = -1;
  let disposed = false;

  function measure() {
    if (!section) return 0;
    const r = section.getBoundingClientRect();
    const stuckH = stick ? stick.offsetHeight : window.innerHeight;
    const run = section.offsetHeight - stuckH;
    // con la pista attiva (sticky) la corsa è quella; senza (browser vecchi) vale lo scorrimento della sezione che se ne va
    if (run > 40) return clamp(-r.top / run);
    return clamp(-r.top / Math.max(1, section.offsetHeight * 0.7));
  }

  function update() {
    raf = 0;
    if (disposed) return;
    s = measure();
    if (copy && Math.abs(s - shown) > 0.0004) {
      shown = s;
      copy.style.setProperty("--wow-s", s.toFixed(4));
      if (s > 0.32) copy.setAttribute("data-wow-out", "");
      else copy.removeAttribute("data-wow-out");
    }
  }
  const onScroll = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  return {
    get s() {
      return s;
    },
    // il motore lo chiama a ogni fotogramma: rilegge senza aspettare l'evento
    read() {
      s = measure();
      return s;
    },
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (copy) {
        copy.style.removeProperty("--wow-s");
        copy.removeAttribute("data-wow-out");
      }
    },
  };
}
