// Titolo della hero che entra a parole: ogni parola arriva dalla profondità, una dopo l'altra, in sincro con le tessere.
// Web Animations API (solo transform e opacità, nessuna libreria). Solo desktop con mouse: sul telefono il titolo resta quello del server.
//
// Il titolo arriva dal server e a prima vista è già in pagina (CSS: parte sotto-opacità e sale da sé dopo ~0,75 s se il JS non c'è).
// Se il JS arriva prima, spezza le parole e fa partire l'entrata a parole al posto di quella CSS: nessuna doppia entrata.
// A fine entrata le parole tornano «inline» (la riga è la stessa di prima) e l'animazione CSS resta spenta per sempre (inline `animation: none`).

const WS = /([ \t\r\n]+)/; // solo spazi veri: il non-breaking resta dentro la parola (nb() lega le parole corte)

function splitNode(node, words) {
  if (node.nodeType === 3) {
    const frag = document.createDocumentFragment();
    node.textContent.split(WS).forEach((part) => {
      if (!part) return;
      if (WS.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const w = document.createElement("span");
        w.className = "wow-hero-w1";
        w.textContent = part;
        frag.appendChild(w);
        words.push(w);
      }
    });
    return frag;
  }
  if (node.nodeType === 1) {
    const c = node.cloneNode(false);
    node.childNodes.forEach((ch) => c.appendChild(splitNode(ch, words)));
    return c;
  }
  return node.cloneNode(true);
}

/*
  h1: il titolo (.v2-phero__h1). Ritorna true se l'entrata a parole è partita, false se no (già fatta, entrata CSS già cominciata, niente WAAPI, una parola sola).
  Non si annulla allo smontaggio: le animazioni finiscono da sole su nodi staccati, e il doppio avvio di React in sviluppo non la rifà.
  delay: ms prima della prima parola. stagger: ms fra una parola e la successiva.
*/
export function revealTitle(h1, { delay = 0, stagger = 45, duration = 820 } = {}) {
  if (!h1 || !h1.animate || !h1.getAnimations || h1.dataset.wowSplit) return false;
  const css = h1.getAnimations().find((a) => a.animationName === "wow-hero-rise");
  // l'entrata CSS è già partita (pagina lenta): niente seconda entrata
  if (css && css.effect) {
    const ct = css.effect.getComputedTiming();
    if (ct.localTime !== null && ct.localTime > ct.delay + 16) return false;
  }
  const orig = Array.from(h1.childNodes);
  const words = [];
  const frag = document.createDocumentFragment();
  orig.forEach((n) => frag.appendChild(splitNode(n, words)));
  if (words.length < 2) return false;
  h1.dataset.wowSplit = "1";
  h1.classList.add("wow-hero-split");
  h1.replaceChildren(frag);
  h1.style.animation = "none";
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const anims = words.map((w, i) =>
    w.animate(
      [
        { opacity: 0.01, transform: "translate3d(0, 0.4em, -150px) rotateX(-40deg)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) rotateX(0deg)" },
      ],
      { duration, delay: delay + i * stagger, easing: ease, fill: "both" }
    )
  );
  const finish = () => {
    anims.forEach((a) => {
      try {
        a.cancel();
      } catch (e) {
        /* già chiusa */
      }
    });
    h1.classList.remove("wow-hero-split");
  };
  Promise.all(anims.map((a) => a.finished)).then(finish, () => {
    /* animazione annullata: niente da ripristinare */
  });
  return true;
}
