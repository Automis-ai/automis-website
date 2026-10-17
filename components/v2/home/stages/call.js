import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";
import { makeWire, chainTimeline } from "@/components/v2/wow/scroll/wires";

/*
  La chiusura: la rete si ricompone intorno al bottone, che è il nodo centrale.
  - Il titolo entra a righe (ha una parte in gradiente), le tre promesse una dopo l'altra, il calendario (solo in produzione)
    arriva in profondità.
  - I sei moduli arrivano da lontano (scomposti: piccoli, ruotati, in profondità) e si posano intorno al bottone mentre
    scorri; tornando indietro si scompongono di nuovo. A moduli posati si disegnano i fili verso il bottone.
  - Poi la catena va da sola: da ogni modulo parte un pacchetto verso il bottone, uno dopo l'altro (una chiamata, un
    appuntamento, una fattura, la scheda cliente...). Ogni arrivo fa pulsare il bottone, con un anello d'oro. Si ferma
    fuori schermo.
  - Con il mouse i moduli si inclinano verso il puntatore, a profondità diverse (parallasse). I bottoni con data-magnetic
    li gestisce HomeStory.
  - Il filo della pagina (stages/spine.js) arriva dal margine e entra nel bottone: quando arriva, il bottone ha la classe is-lit.
  Telefono (lite): stessa composizione, più leggera (niente parallasse, meno rotazione).
*/
export default function call(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich, cleanups } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const pitch = $("[data-wow-title]") && $("[data-wow-title]").parentElement;

  // il titolo ha una parte in gradiente: si anima per righe, non per parole (vedi split.js)
  wordsIn($("[data-wow-title]"), deps, { start: "top 88%", by: "lines" });
  riseIn([$("[data-wow-eyebrow]")], deps, { trigger: pitch, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$("[data-wow-lead]")], deps, { trigger: pitch, start: "top 86%", y: 20, delay: 0.3 });

  const bullets = Array.from(section.querySelectorAll("[data-wow-bullets] li"));
  if (bullets.length) {
    gsap.from(bullets, {
      opacity: 0,
      y: 18,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.14,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: bullets[0], start: "top 94%", once: true },
    });
  }

  const panel = $("[data-wow-panel]");
  if (panel) {
    gsap.from(panel, {
      opacity: 0,
      y: rich ? 80 : 44,
      z: rich ? -220 : 0,
      rotationX: rich ? 14 : 0,
      transformPerspective: 1200,
      transformOrigin: "50% 100%",
      duration: rich ? 1.2 : 0.95,
      ease: "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: panel, start: "top 92%", once: true },
    });
  }

  // ---------- La rete intorno al bottone ----------
  const stage = $("[data-wow-stage]");
  const box = $("[data-wires]");
  const core = $("[data-wow-core]");
  const tiles = Array.from(section.querySelectorAll("[data-stage-tile]"));
  if (!stage || !box || !core || !tiles.length) return;
  const mods = tiles.map((t) => t.querySelector(".v2hp-mod"));
  const ring = core.querySelector("[data-core-ring]");
  const halo = core.querySelector(".v2hp-core__halo");

  gsap.set(stage, { perspective: 1100 });

  // Composizione legata allo scroll: da scomposti a posati.
  const far = rich ? 1 : 0.55;
  tiles.forEach((tile, i) => {
    const cx = tile.offsetLeft + tile.offsetWidth / 2 - stage.clientWidth / 2;
    const cy = tile.offsetTop + tile.offsetHeight / 2 - stage.clientHeight / 2;
    const len = Math.hypot(cx, cy) || 1;
    tile._from = {
      x: (cx / len) * 360 * far + (i % 2 ? 60 : -60),
      y: (cy / len) * 240 * far - 80,
      z: rich ? -420 : 0,
      rotationZ: (i % 2 ? 1 : -1) * (52 + i * 11),
      rotationY: rich ? (i % 2 ? 1 : -1) * 80 : 0,
      scale: 0.25,
      opacity: 0,
    };
  });
  const comp = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: stage, start: "top 92%", end: rich ? "top 34%" : "top 46%", scrub: 0.8, invalidateOnRefresh: true },
  });
  tiles.forEach((tile, i) => {
    comp.fromTo(tile, tile._from, { x: 0, y: 0, z: 0, rotationZ: 0, rotationY: 0, scale: 1, opacity: 1, duration: 1, ease: "back.out(1.25)" }, i * 0.07);
  });
  comp.fromTo(core, { scale: 0.82, opacity: 0.0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.05);

  // ---- fili e catena ----
  let wires = [];
  let loop = null;
  let drawn = false;
  let inView = false;
  const sync = () => {
    if (!loop) return;
    if (drawn && inView) loop.play();
    else loop.pause();
  };
  const bump = () => {
    gsap.fromTo(core, { scale: 1.035 }, { scale: 1, duration: 0.55, ease: "power2.out", overwrite: "auto" });
    if (ring) gsap.fromTo(ring, { scale: 1, opacity: 0.8 }, { scale: 1.32, opacity: 0, duration: 0.85, ease: "power2.out", overwrite: true });
    if (halo) gsap.fromTo(halo, { opacity: 1 }, { opacity: 0.55, duration: 0.7, ease: "power2.out", overwrite: true });
  };
  function build() {
    if (loop) loop.kill();
    loop = null;
    wires.forEach((w) => w.dispose());
    const c = { x: core.offsetLeft + core.offsetWidth / 2, y: core.offsetTop + core.offsetHeight / 2 };
    wires = tiles.map((tile) => {
      const a = { x: tile.offsetLeft + tile.offsetWidth / 2, y: tile.offsetTop + tile.offsetHeight / 2 };
      const w = makeWire(box, a, c, { ports: false });
      gsap.set(w.fill, { scaleX: drawn ? 1 : 0 });
      return w;
    });
    const steps = wires.map((wire, i) => ({ wire, dir: 1, i }));
    loop = chainTimeline(gsap, steps, {
      speed: 420,
      gap: 0.18,
      repeatDelay: 1.3,
      onStart: (step) => {
        const ringEl = mods[step.i] && mods[step.i].querySelector(".v2hp-mod__ring");
        if (ringEl) gsap.fromTo(ringEl, { scale: 0.95, opacity: 0.95 }, { scale: 1.75, opacity: 0, duration: 0.8, ease: "power2.out", overwrite: true });
      },
      onArrive: bump,
    });
    sync();
  }
  build();
  const onRefresh = () => build();
  ScrollTrigger.addEventListener("refresh", onRefresh);

  ScrollTrigger.create({
    trigger: stage,
    start: "top 52%",
    onEnter: () => {
      drawn = true;
      wires.forEach((w, i) => gsap.to(w.fill, { scaleX: 1, duration: 0.7, delay: i * 0.08, ease: "power2.out", overwrite: true }));
      gsap.delayedCall(1.0, sync);
    },
    onLeaveBack: () => {
      drawn = false;
      sync();
      wires.forEach((w) => gsap.to(w.fill, { scaleX: 0, duration: 0.4, overwrite: true }));
    },
  });
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });

  // ---- parallasse con il mouse: i moduli si inclinano verso il puntatore a profondità diverse ----
  if (rich) {
    const qs = mods.map((m, i) => {
      gsap.set(m, { transformPerspective: 700 });
      const d = i % 2 ? 1 : 0.62;
      return {
        d,
        rx: gsap.quickTo(m, "rotationX", { duration: 0.7, ease: "power3.out" }),
        ry: gsap.quickTo(m, "rotationY", { duration: 0.7, ease: "power3.out" }),
        x: gsap.quickTo(m, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(m, "y", { duration: 0.8, ease: "power3.out" }),
      };
    });
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      qs.forEach((q) => {
        q.ry(nx * 16 * q.d);
        q.rx(-ny * 12 * q.d);
        q.x(nx * 12 * q.d);
        q.y(ny * 9 * q.d);
      });
    };
    const leave = () => qs.forEach((q) => (q.ry(0), q.rx(0), q.x(0), q.y(0)));
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    });
  }

  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    if (loop) loop.kill();
    wires.forEach((w) => w.dispose());
    wires = [];
  });
}
