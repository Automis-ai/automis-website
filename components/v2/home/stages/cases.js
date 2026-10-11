import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";
import { gyroTilt } from "@/components/v2/wow/scroll/pointer";
import { makeWire, chainTimeline } from "@/components/v2/wow/scroll/wires";

/*
  Casi studio: quattro carte a pila in 3D che si aprono a ventaglio mentre scorri.
  I NUMERI SONO SEMPRE QUELLI VERI: stanno nel testo e nessuna animazione li porta mai a 0 o a un valore intermedio. Mentre la
  pila si apre e le carte sono inclinate si vedono solo logo e numero grande (che regge l'inclinazione); il testo piccolo
  (data-wow-detail) si accende quando la carta è quasi dritta (sotto ~4°), così non è mai sfocato né storto.
  - Schermo grande (pin): le carte restano fissate al centro della finestra finché non sono aperte (pila -> ventaglio -> fila).
  - Portatile basso o tablet largo (rich senza pin): stessa apertura, ma legata allo scroll senza fissare la sezione.
  - Telefono (lite): niente sezioni fissate dallo script; le carte sono una pila di carte sticky (CSS): ognuna arriva dalla
    profondità sopra la precedente, che si ritira; col giroscopio (Android) seguono anche il telefono. Il filo della pagina
    (stages/spine.js) ha un nodo per ogni caso.
  A fila composta (da 1100 px) sopra le carte passa un bus: un filo con un pacchetto di luce che corre di carta in carta e
  ne accende il bordo a turno. Si ferma fuori schermo.
  Le carte aperte sono già la posizione naturale della griglia: l'animazione le porta dalla pila a lì (x, y relativi).
*/
export default function cases(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich, pin, cleanups } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const head = $("[data-wow-head]");

  wordsIn($("[data-wow-title]"), deps, { start: "top 88%" });
  riseIn([$("[data-wow-eyebrow]")], deps, { trigger: head, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$("[data-wow-lead]")], deps, { trigger: head, start: "top 88%", y: 20, delay: 0.35 });

  const deck = $("[data-wow-deck]");
  if (!deck) return;
  const cards = Array.from(deck.querySelectorAll("[data-wow-case]"));
  const details = cards.map((c) => Array.from(c.querySelectorAll("[data-wow-detail]")));

  // ---------- Telefono ----------
  // Una pila di carte (home.css: position sticky): ognuna arriva sopra la precedente, che si ritira in profondità (scala e
  // opacità, legate allo scroll). Dove c'è il giroscopio le carte seguono anche l'inclinazione del telefono (pointer.js).
  if (!rich) {
    const faces = cards.map((c) => c.querySelector("[data-wow-case-in]"));
    // stessa condizione del CSS della pila (home.css): telefono, almeno 620 px di altezza
    const pile = window.innerWidth < 768 && window.innerHeight >= 620;
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 54,
        rotationX: 14,
        transformPerspective: 900,
        transformOrigin: "50% 0%",
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
      // il testo piccolo si accende quando la carta è già dritta
      gsap.from(details[i], {
        opacity: 0,
        y: 10,
        duration: 0.6,
        delay: 0.55,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
      if (pile && i < cards.length - 1 && faces[i]) {
        const stuck = 80 + (i + 1) * 10; // dove si ferma la carta dopo (top del CSS)
        // la carta si ritira in scala e si scurisce con un velo (.v2hp-case__dim): niente opacità sulla carta, altrimenti
        // le carte sotto di lei trasparirebbero
        const st = { trigger: cards[i + 1], start: "top 88%", end: `top ${stuck}px`, scrub: true };
        gsap.to(faces[i], { scale: 0.92, y: 6, transformOrigin: "50% 0%", ease: "none", scrollTrigger: st });
        const dim = faces[i].querySelector("[data-wow-dim]");
        if (dim) gsap.to(dim, { opacity: 0.55, ease: "none", scrollTrigger: st });
      }
    });
    cleanups.push(gyroTilt(faces, deps, { max: 6 }));
    return;
  }

  // ---------- Schermo con mouse: pila -> ventaglio -> fila ----------
  const n = cards.length;
  const mid = (i) => i - (n - 1) / 2;
  const dx = (el) => deck.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
  const dy = (el) => deck.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2);

  // Si fissa solo la griglia delle carte (il titolo sopra scorre via), centrata nella finestra, e solo se ci sta con un
  // po' di respiro: mai un elemento fissato più alto dello schermo.
  const canPin = pin && deck.offsetHeight + 140 <= window.innerHeight;

  gsap.set(deck, { perspective: 1500 });

  // ---- il bus: fili sopra la fila, solo con le quattro carte su una riga ----
  const busBox = $("[data-wow-bus]");
  const lits = cards.map((c) => c.querySelector(".v2hp-case__lit"));
  let bus = null;
  let busLoop = null;
  let rowDone = false;
  let inView = false;
  const syncBus = () => {
    if (!busLoop) return;
    if (rowDone && inView) busLoop.play();
    else busLoop.pause();
  };
  const flash = (i, port) => {
    const lit = lits[i];
    if (lit) gsap.fromTo(lit, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: "power2.out", overwrite: true });
    if (port) gsap.fromTo(port, { scale: 2.2, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", overwrite: true });
  };
  function buildBus() {
    if (busLoop) busLoop.kill();
    busLoop = null;
    if (bus) bus.forEach((w) => w.dispose());
    bus = null;
    if (!busBox) return;
    const oneRow = cards.every((c) => Math.abs(c.offsetTop - cards[0].offsetTop) < 4) && deck.clientWidth >= 900;
    if (!oneRow) return;
    const Y = -30;
    const cx = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    const top = cards[0].offsetTop;
    const stubs = cards.map((_, i) => makeWire(busBox, { x: cx[i], y: top + Y }, { x: cx[i], y: top }));
    const segs = cards.slice(1).map((_, i) => makeWire(busBox, { x: cx[i], y: top + Y }, { x: cx[i + 1], y: top + Y }, { ports: false }));
    bus = [...stubs, ...segs];
    gsap.set(busBox, { opacity: rowDone ? 1 : 0 }); // il bus compare quando la fila è composta
    bus.forEach((w) => {
      gsap.set(w.fill, { scaleX: rowDone ? 1 : 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: rowDone ? 0.7 : 0, scale: 1 }));
    });
    const steps = segs.map((wire, i) => ({ wire, dir: 1, to: i + 1 }));
    busLoop = chainTimeline(gsap, steps, {
      speed: 520,
      repeatDelay: 1.4,
      onArrive: (step) => flash(step.to, stubs[step.to].ports[0]),
    });
    syncBus();
  }
  function drawBus() {
    rowDone = true;
    if (!bus) return;
    gsap.to(busBox, { opacity: 1, duration: 0.3, overwrite: true });
    bus.forEach((w, i) => {
      gsap.to(w.fill, { scaleX: 1, duration: 0.6, delay: i * 0.05, ease: "power2.out", overwrite: true });
      w.ports.forEach((p) => gsap.to(p, { opacity: 0.7, duration: 0.4, delay: 0.2 + i * 0.05, overwrite: true }));
    });
    gsap.delayedCall(0.6, syncBus);
  }
  function hideBus() {
    rowDone = false;
    syncBus();
    if (!bus) return;
    gsap.set(busBox, { opacity: 0 });
    bus.forEach((w) => {
      gsap.set(w.fill, { scaleX: 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: 0 }));
    });
  }
  buildBus();
  const onRefresh = () => buildBus();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  ScrollTrigger.create({
    trigger: deck,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      syncBus();
    },
  });
  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    if (busLoop) busLoop.kill();
    if (bus) bus.forEach((w) => w.dispose());
    bus = null;
  });

  const st = canPin
    ? { trigger: deck, start: "center center", end: "+=115%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true }
    : { trigger: deck, start: "top 88%", end: "top 24%", scrub: 0.8, invalidateOnRefresh: true };
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: st,
    onComplete: drawBus,
    onReverseComplete: hideBus,
  });

  // Pila: tutte al centro della griglia, sfalsate di poco, inclinate (qui il testo piccolo è spento: restano logo e numero).
  tl.fromTo(
    cards,
    {
      x: (i, el) => dx(el),
      y: (i, el) => dy(el) + i * 5,
      rotationZ: (i) => mid(i) * 2.2,
      rotationY: -18,
      z: (i) => i * 24,
      scale: 0.93,
      transformOrigin: "50% 60%",
    },
    {
      // Ventaglio: si aprono ad arco, i due esterni più bassi. Angolo piccolo (max ~7°): il testo non si storce.
      x: (i, el) => dx(el) * 0.4,
      y: (i, el) => dy(el) * 0.4 + mid(i) * mid(i) * 18,
      rotationZ: (i) => mid(i) * 4.6,
      rotationY: 0,
      z: 0,
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    },
    0
  );
  // Fila: ognuna va al suo posto.
  tl.to(cards, { x: 0, y: 0, rotationZ: 0, duration: 1.1, ease: "power3.out" }, 1);
  // Il testo piccolo si accende quando la carta è quasi dritta (la fila è già a meno di ~3° dopo il primo quarto).
  details.forEach((list, i) => {
    if (list.length) tl.fromTo(list, { opacity: 0 }, { opacity: 1, duration: 0.55, stagger: 0.04, ease: "power1.out" }, 1.28 + i * 0.06);
  });
  tl.to({}, { duration: 0.25 }); // un attimo di fermo a carte aperte prima di sbloccare la pagina
}
