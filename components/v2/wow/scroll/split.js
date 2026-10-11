/*
  Titoli che entrano a parole (SplitText, maschera per riga).
  - Il testo resta intero nel DOM: SplitText mette aria-label sull'elemento e nasconde i pezzi agli screen reader.
  - Parte una volta sola quando il titolo entra nello schermo. Se arriva dopo un salto di scroll (ancora, ricarica)
    parte subito.
  - Va chiamata dentro gsap.matchMedia().add(...) (o gsap.context): così la modifica del DOM si annulla da sola.
  `deps` = { gsap, SplitText } da loadGsap().
*/
export function wordsIn(el, { gsap, SplitText }, opts = {}) {
  if (!el) return null;
  const {
    trigger = el,
    start = "top 86%",
    stagger = 0.07,
    duration = 1,
    yPercent = 115,
    delay = 0,
    rotate = 0,
    // by: "lines" per i titoli con parole in gradiente (background-clip: text): lì i pezzi non possono avere un
    // transform proprio (Chrome smette di ritagliare il gradiente sul testo), quindi si anima per riga.
    by = "words",
  } = opts;
  const lines = by === "lines";
  return SplitText.create(el, {
    type: lines ? "lines" : "lines,words",
    mask: "lines",
    autoSplit: true,
    aria: "auto",
    linesClass: "wow-line",
    wordsClass: "wow-word",
    onSplit(self) {
      return gsap.from(lines ? self.lines : self.words, {
        yPercent,
        rotate,
        duration,
        delay,
        ease: "power4.out",
        stagger: lines ? stagger * 2 : stagger,
        scrollTrigger: { trigger, start, once: true },
      });
    },
  });
}

/* Entrata semplice dal basso (opacità + spostamento), una volta sola, per un elenco di elementi. */
export function riseIn(els, { gsap }, opts = {}) {
  const list = Array.isArray(els) ? els.filter(Boolean) : els ? [els] : [];
  if (!list.length) return null;
  const { trigger = list[0], start = "top 88%", y = 28, duration = 0.9, stagger = 0.08, delay = 0, ease = "power3.out" } = opts;
  return gsap.from(list, {
    opacity: 0,
    y,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: { trigger, start, once: true },
  });
}
