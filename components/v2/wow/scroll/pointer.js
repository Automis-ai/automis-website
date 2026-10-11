/*
  Effetti legati al mouse. Tutti da usare SOLO dove c'è un mouse vero (gsap.matchMedia con RICH):
  sul telefono non si montano. Restituiscono una funzione che li smonta.
*/

/* Inclinazione 3D di una scheda al passaggio del mouse, con alone che segue il puntatore (--mx / --my). */
export function tiltCards(cards, { gsap }, opts = {}) {
  // perspective: 0 se il contenitore ha già la sua prospettiva (CSS perspective sul genitore).
  const { max = 8, lift = 26, perspective = 900 } = opts;
  const offs = [];
  cards.forEach((card) => {
    if (perspective) gsap.set(card, { transformPerspective: perspective });
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3.out" });
    const z = gsap.quickTo(card, "z", { duration: 0.6, ease: "power3.out" });
    let box = null;
    const enter = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      box = card.getBoundingClientRect(); // presa prima dell'inclinazione: il riquadro non si sposta mentre si muove
    };
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!box) box = card.getBoundingClientRect();
      const nx = (e.clientX - box.left) / box.width;
      const ny = (e.clientY - box.top) / box.height;
      ry((nx - 0.5) * max * 2);
      rx(-(ny - 0.5) * max * 2);
      z(lift);
      card.style.setProperty("--mx", `${(nx * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(ny * 100).toFixed(1)}%`);
    };
    const leave = () => {
      box = null;
      rx(0);
      ry(0);
      z(0);
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    offs.push(() => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });
  return () => offs.forEach((off) => off());
}

/* Bottoni «magnetici»: si spostano di poco verso il puntatore quando gli passa vicino. */
export function magnetic(els, { gsap }, opts = {}) {
  const { radius = 90, pull = 0.32, max = 14 } = opts;
  const items = els.filter(Boolean);
  if (!items.length) return () => {};
  let raf = 0;
  let px = -9999;
  let py = -9999;

  const settle = (el) => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
      onComplete: () => gsap.set(el, { clearProps: "x,y" }),
    });
  };

  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < -radius || r.top > vh + radius) return; // nascosto o lontano dallo schermo
      const ox = Number(gsap.getProperty(el, "x")) || 0;
      const oy = Number(gsap.getProperty(el, "y")) || 0;
      const cx = r.left + r.width / 2 - ox;
      const cy = r.top + r.height / 2 - oy;
      const dx = px - cx;
      const dy = py - cy;
      const near =
        px > r.left - radius - ox && px < r.right + radius - ox && py > r.top - radius - oy && py < r.bottom + radius - oy;
      if (near) {
        const tx = Math.max(-max, Math.min(max, dx * pull));
        const ty = Math.max(-max, Math.min(max, dy * pull));
        gsap.to(el, { x: tx, y: ty, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        el.dataset.magnetOn = "1";
      } else if (el.dataset.magnetOn) {
        delete el.dataset.magnetOn;
        settle(el);
      }
    });
  };
  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    px = e.clientX;
    py = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    if (raf) cancelAnimationFrame(raf);
    items.forEach((el) => {
      delete el.dataset.magnetOn;
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "x,y" });
    });
  };
}

/*
  Inclinazione dal giroscopio del telefono (il «mouse» di chi non ha il mouse). Le carte (`faces`) si inclinano di pochi gradi
  seguendo il telefono e il bordo dorato (.card-glow::before, che legge --mx / --my in px) segue la luce.
  - La posizione neutra è quella in cui si tiene il telefono e la segue piano: conta il MOVIMENTO, non l'angolo assoluto
    (altrimenti da sdraiati o in piedi sarebbe tutto storto).
  - Sull'iPhone il giroscopio si legge solo dopo un permesso con una finestra di sistema: non la chiediamo (non si apre una
    finestra mentre qualcuno scorre una pagina). Lì le carte si muovono comunque con lo scroll, vedi stages/cases.js.
    Dove non serve il permesso (Android) l'ascoltatore parte da solo, e solo quando una carta è sullo schermo.
  - L'ascoltatore c'è solo mentre almeno una carta è sullo schermo. Con prefers-reduced-motion nessuno chiama questa funzione.
  Restituisce la funzione che smonta tutto.
*/
export function gyroTilt(faces, { gsap }, opts = {}) {
  const { max = 6, range = 24 } = opts;
  const none = () => {};
  if (typeof window === "undefined" || typeof window.DeviceOrientationEvent === "undefined") return none;
  // Safari (iPhone, iPad) chiede un permesso con una finestra di sistema. Chrome ha la stessa funzione ma non chiede niente e
  // manda gli eventi da subito: perciò si guarda il dispositivo, non la sola presenza della funzione.
  const apple = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (apple && typeof window.DeviceOrientationEvent.requestPermission === "function") return none;
  const list = faces.filter(Boolean);
  if (!list.length || typeof IntersectionObserver === "undefined") return none;
  const items = list.map((face) => {
    gsap.set(face, { transformPerspective: 900 });
    return {
      face,
      seen: false,
      rx: gsap.quickTo(face, "rotationX", { duration: 0.5, ease: "power3.out" }),
      ry: gsap.quickTo(face, "rotationY", { duration: 0.5, ease: "power3.out" }),
    };
  });
  let g0 = null;
  let b0 = null;
  let listening = false;
  const clamp = (v) => (v < -1 ? -1 : v > 1 ? 1 : v);
  const onEvent = (e) => {
    if (e.gamma == null || e.beta == null) return;
    if (g0 === null) {
      g0 = e.gamma;
      b0 = e.beta;
    }
    g0 += (e.gamma - g0) * 0.012;
    b0 += (e.beta - b0) * 0.012;
    const gx = clamp((e.gamma - g0) / range);
    const gy = clamp((e.beta - b0) / range);
    items.forEach((it) => {
      if (!it.seen) return;
      it.ry(gx * max);
      it.rx(-gy * max * 0.8);
      const w = it.face.offsetWidth;
      const h = it.face.offsetHeight;
      it.face.style.setProperty("--mx", `${((0.5 + gx * 0.5) * w).toFixed(0)}px`);
      it.face.style.setProperty("--my", `${((0.35 + gy * 0.4) * h).toFixed(0)}px`);
      if (!it.face.hasAttribute("data-gyro")) it.face.setAttribute("data-gyro", "");
    });
  };
  const sync = () => {
    const any = items.some((it) => it.seen);
    if (any && !listening) {
      window.addEventListener("deviceorientation", onEvent, { passive: true });
      listening = true;
    } else if (!any && listening) {
      window.removeEventListener("deviceorientation", onEvent);
      listening = false;
    }
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const it = items.find((x) => x.face === en.target);
      if (it) it.seen = en.isIntersecting;
    });
    sync();
  });
  items.forEach((it) => io.observe(it.face));
  return () => {
    io.disconnect();
    if (listening) window.removeEventListener("deviceorientation", onEvent);
    items.forEach((it) => {
      gsap.killTweensOf(it.face);
      gsap.set(it.face, { clearProps: "rotationX,rotationY,transformPerspective" });
      it.face.removeAttribute("data-gyro");
      it.face.style.removeProperty("--mx");
      it.face.style.removeProperty("--my");
    });
  };
}
