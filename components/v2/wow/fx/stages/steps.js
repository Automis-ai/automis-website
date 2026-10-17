/*
  Come lavoriamo: la catena letterale dei passi (la stessa della home, qui con tre moduli grandi e le schede sotto).
  I tre passi sono tre MODULI (lente, chiave, grafico: piastrelle di vetro come quelle della hero) uniti da un filo che passa dal
  loro centro; un pacchetto di luce li attraversa e ogni modulo si accende quando il pacchetto arriva.
  - Da 1100 px con il mouse (e se ci sta nella finestra) la sezione resta FISSATA per circa un'altezza di schermo: il filo si disegna
    da un passo al successivo, il modulo arriva ruotando dalla profondità e la scheda si raddrizza. Legato allo scroll (scrub): si
    ricompone anche tornando indietro. Da 768 px con il mouse lo stesso scrub, senza pin.
  - A catena completa il pacchetto corre da un modulo al successivo, il modulo che riceve scatta (anello), poi da capo. L'anello
    d'oro è solo sull'ultimo modulo. Si ferma quando la sezione esce dallo schermo.
  - Telefono e tablet: i passi sono in colonna, il filo scende da un modulo al successivo; entrano uno alla volta e il pacchetto corre.
  Solo transform e opacità. Il server manda già lo stato finale (catena completa): senza JavaScript tutto si legge.
*/
export default function steps(root, env) {
  const { gsap, ScrollTrigger, rich, pin, cleanups } = env;
  const list = root.querySelector("[data-steps-list]");
  const items = Array.from(root.querySelectorAll("[data-step]"));
  if (!list || items.length < 2) return;
  const vertical = window.innerWidth < 768;
  const prop = vertical ? "y" : "x";
  const scaleProp = vertical ? "scaleY" : "scaleX";
  const S = items.map((li, i) => {
    const tile = li.querySelector("[data-node]");
    return {
      li,
      tile,
      ring: tile && tile.querySelector(".v2fx-mod__ring"),
      glow: tile && tile.querySelector(".v2fx-mod__glow"),
      card: li.querySelector(".v2fx-step__card"),
      seg: li.querySelector("[data-seg]"),
      packet: li.querySelector("[data-packet]"),
      end: i === items.length - 1,
    };
  });
  if (S[S.length - 1].tile) S[S.length - 1].tile.classList.add("is-end"); // l'oro è solo sull'ultimo nodo

  let live = false;
  let inView = false;
  let loop = null;
  const sync = () => {
    if (!loop) return;
    if (live && inView) loop.play();
    else loop.pause();
  };
  let io = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(root);
  } else inView = true;

  const dist = (seg) => (vertical ? seg.offsetHeight : seg.offsetWidth);
  function makeLoop() {
    loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4, repeatRefresh: true, paused: true });
    let t = 0;
    S.forEach((s, i) => {
      if (!s.packet || !s.seg) return;
      const next = S[i + 1];
      loop.fromTo(s.packet, { [prop]: 0, opacity: 0 }, { [prop]: () => dist(s.seg), opacity: 1, duration: 0.62, ease: "power2.in" }, t);
      loop.to(s.packet, { opacity: 0, duration: 0.12, ease: "none" }, t + 0.54);
      if (next && next.ring) {
        loop.fromTo(next.ring, { scale: 0.9, opacity: 0.95 }, { scale: 2.3, opacity: 0, duration: 0.8, ease: "power2.out" }, t + 0.6);
        if (next.glow) loop.fromTo(next.glow, { scale: 1, opacity: 1 }, { scale: 1.5, opacity: 0.55, duration: 0.8, ease: "power2.out", yoyo: true, repeat: 1 }, t + 0.6);
      }
      t += 0.72;
    });
  }

  let tl = null;
  let armTimer = 0;
  const killers = [];

  // ---------- Telefono e tablet ----------
  if (!rich) {
    S.forEach((s) => {
      gsap.set(s.seg, { [scaleProp]: 0 });
      const trig = ScrollTrigger.create({
        trigger: s.li,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.from(s.li, { opacity: 0, y: 36, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" });
          if (s.tile) gsap.from(s.tile, { scale: 0.4, rotationY: -80, transformPerspective: 600, duration: 0.9, delay: 0.15, ease: "back.out(1.6)", clearProps: "transform" });
          if (s.seg) gsap.to(s.seg, { [scaleProp]: 1, duration: 0.9, delay: 0.5, ease: "power1.inOut" });
        },
      });
      killers.push(() => trig.kill());
    });
    const last = ScrollTrigger.create({
      trigger: items[items.length - 1],
      start: "top 82%",
      once: true,
      onEnter: () => {
        live = true;
        makeLoop();
        sync();
      },
    });
    killers.push(() => last.kill());
  } else {
    // ---------- Mouse e schermo largo: costruzione legata allo scroll ----------
    // passaggio allo stato di partenza con una transizione CSS (0,6 s) e non a scatto, per ciò che si vede già al caricamento
    root.classList.add("is-arming");
    armTimer = setTimeout(() => root.classList.remove("is-arming"), 900);
    gsap.set(list, { perspective: 1200 });
    const fits = pin && root.offsetHeight <= window.innerHeight - 140;
    tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: fits ? "center center" : "top 80%",
        end: fits ? "+=110%" : "top 26%",
        scrub: 0.6,
        pin: fits ? root : false,
        anticipatePin: 1,
        onUpdate: (self) => {
          const on = self.progress > 0.985;
          if (on !== live) {
            live = on;
            sync();
          }
        },
      },
    });
    const gap = 1.5;
    S.forEach((s, i) => {
      // il primo passo è già lì (mai una scena vuota sotto il titolo): la catena parte da lui e arrivano gli altri
      const at = Math.max(0, i - 1) * gap;
      if (i > 0) {
        tl.fromTo(
          s.li,
          fits ? { opacity: 0.12, z: -260, rotationX: -22, y: 40, transformOrigin: "50% 100%" } : { opacity: 0.12, y: 34 },
          { opacity: 1, z: 0, rotationX: 0, y: 0, duration: 0.9, ease: "power3.out" },
          at + 0.35
        );
        // il modulo si compone: arriva ruotando dalla profondità e si accende
        if (s.tile) {
          tl.fromTo(
            s.tile,
            { scale: 0.35, rotationY: -95, z: -120, transformPerspective: 700 },
            { scale: 1, rotationY: 0, z: 0, duration: 0.7, ease: "back.out(1.7)" },
            at + 0.45
          );
        }
        if (s.glow) tl.fromTo(s.glow, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, at + 0.7);
      }
      // il filo che parte da questo passo si disegna mentre arriva il successivo
      if (s.seg) tl.fromTo(s.seg, { [scaleProp]: 0 }, { [scaleProp]: 1, duration: gap - 0.2, ease: "power1.inOut" }, at);
    });
    // il primo modulo si compone appena la sezione entra (una volta): la scena non parte mai da vuota
    if (S[0].tile) {
      const t0 = ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.from(S[0].tile, { scale: 0.35, rotationY: -95, z: -120, transformPerspective: 700, duration: 0.9, ease: "back.out(1.7)", clearProps: "transform" }),
      });
      killers.push(() => t0.kill());
    }
    makeLoop();
  }

  cleanups.push(() => {
    if (loop) loop.kill();
    if (tl) {
      if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
      tl.kill();
    }
    killers.forEach((k) => k());
    if (io) io.disconnect();
    clearTimeout(armTimer);
    root.classList.remove("is-arming");
    S.forEach((s) => {
      gsap.killTweensOf([s.li, s.tile, s.ring, s.glow, s.seg, s.packet]);
      gsap.set([s.li, s.tile, s.ring, s.glow, s.seg, s.packet].filter(Boolean), { clearProps: "all" });
      if (s.tile) s.tile.classList.remove("is-end");
    });
    gsap.set(list, { clearProps: "perspective" });
  });
}
