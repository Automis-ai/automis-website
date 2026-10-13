import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";
import { tiltCards } from "@/components/v2/wow/scroll/pointer";
import { makeWire, chainTimeline } from "@/components/v2/wow/scroll/wires";
import { offsetIn } from "@/components/v2/wow/scroll/measure";

/*
  Founder e garanzie, a pezzi.
  - Il titolo entra a parole; le due persone arrivano una dopo l'altra, inclinate in avanti, e si raddrizzano.
  - Le tre garanzie sono una pila di carte (come i quattro casi, ma senza fissare la pagina): partono impilate al centro della
    colonna, inclinate, con il solo titolo; si aprono a ventaglio e si mettono in colonna mentre scorri, e il testo si accende
    quando la carta è quasi dritta (mai sfocato o storto). Poi seguono il mouse (inclinazione) e un filo le collega:
    un pacchetto di luce scende da una garanzia all'altra (sempre uno solo, e si ferma fuori schermo).
  - Telefono: le garanzie salgono una alla volta, inclinate in avanti.
*/
export default function authority(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich, cleanups } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const founders = $("[data-wow-founders]");

  wordsIn($("[data-wow-title]"), deps, { start: "top 88%" });
  riseIn([$("[data-wow-eyebrow]")], deps, { trigger: founders, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$("[data-wow-lead]")], deps, { trigger: founders, start: "top 85%", y: 20, delay: 0.3 });

  const people = Array.from(section.querySelectorAll("[data-wow-founder]"));
  if (people.length) {
    gsap.from(people, {
      opacity: 0,
      scale: 0.6,
      y: 34,
      rotationX: rich ? 52 : 0,
      rotation: rich ? 0 : -8,
      transformPerspective: 800,
      transformOrigin: "50% 100%",
      duration: 1,
      ease: "back.out(1.6)",
      stagger: 0.18,
      scrollTrigger: { trigger: people[0], start: "top 92%", once: true },
    });
  }

  const pillars = Array.from(section.querySelectorAll("[data-wow-pillar]"));
  const box = $("[data-wow-pillars]");
  if (!pillars.length) return;

  // ---------- Telefono ----------
  if (!rich || !box || window.innerWidth < 1024) {
    pillars.forEach((p) => {
      gsap.from(p, {
        opacity: 0,
        y: 44,
        rotationX: rich ? 0 : 16,
        transformPerspective: 900,
        transformOrigin: "50% 0%",
        duration: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: p, start: "top 90%", once: true },
      });
    });
    return;
  }

  // ---------- Schermo con mouse: pila -> ventaglio -> colonna ----------
  const n = pillars.length;
  const mid = (i) => i - (n - 1) / 2;
  const centerOf = (el) => offsetIn(el, box, "y") + el.offsetHeight / 2;
  const bodies = pillars.map((p) => Array.from(p.querySelectorAll("[data-wow-pbody]")));
  const boxCenter = () => box.clientHeight / 2;

  // stato iniziale scritto a mano (le tween sfalsate non si disegnano prima di partire)
  gsap.set(box, { perspective: 1300 });
  const from = {
    y: (i, el) => boxCenter() - centerOf(el) + i * 8,
    rotationZ: (i) => mid(i) * 3.4,
    rotationY: -20,
    z: (i) => i * 28,
    scale: 0.92,
    opacity: 0,
    transformOrigin: "50% 50%",
  };
  gsap.set(pillars, from);
  gsap.set(bodies.flat(), { opacity: 0 });

  // il filo: una linea a sinistra delle garanzie, con un breve tratto verso ogni carta; un pacchetto che scende
  let wires = null;
  let loop = null;
  let landed = false;
  let inView = false;
  let tilted = false;
  const sync = () => {
    if (!loop) return;
    if (landed && inView) loop.play();
    else loop.pause();
  };
  const flash = (port) => port && gsap.fromTo(port, { scale: 2.2, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", overwrite: true });
  function buildWires() {
    if (loop) loop.kill();
    loop = null;
    if (wires) wires.forEach((w) => w.dispose());
    wires = null;
    const X = -26;
    const ys = pillars.map(centerOf);
    const stubs = ys.map((y) => makeWire(box.querySelector("[data-wow-pwires]"), { x: X, y }, { x: 0, y }));
    const segs = ys.slice(1).map((y, i) => makeWire(box.querySelector("[data-wow-pwires]"), { x: X, y: ys[i] }, { x: X, y }, { ports: false }));
    wires = [...stubs, ...segs];
    wires.forEach((w) => {
      gsap.set(w.fill, { scaleX: landed ? 1 : 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: landed ? 0.7 : 0, scale: 1 }));
    });
    loop = chainTimeline(
      gsap,
      segs.map((wire, i) => ({ wire, dir: 1, to: i + 1 })),
      { speed: 220, repeatDelay: 1.6, onArrive: (step) => flash(stubs[step.to].ports[0]) }
    );
    sync();
  }
  function draw() {
    landed = true;
    if (!wires) return;
    wires.forEach((w, i) => {
      gsap.to(w.fill, { scaleX: 1, duration: 0.6, delay: i * 0.06, ease: "power2.out", overwrite: true });
      w.ports.forEach((p) => gsap.to(p, { opacity: 0.7, duration: 0.4, delay: 0.25 + i * 0.06, overwrite: true }));
    });
    gsap.delayedCall(0.8, sync);
  }
  function undraw() {
    landed = false;
    if (wires) {
      wires.forEach((w) => {
        gsap.killTweensOf([w.fill, ...w.ports]);
        gsap.set(w.fill, { scaleX: 0 });
        w.ports.forEach((p) => gsap.set(p, { opacity: 0, scale: 1 }));
      });
    }
    sync();
  }
  buildWires();
  const onRefresh = () => buildWires();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  ScrollTrigger.create({
    trigger: box,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });
  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    if (loop) loop.kill();
    if (wires) wires.forEach((w) => w.dispose());
    wires = null;
  });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: box, start: "top 86%", end: "top 28%", scrub: 0.6, invalidateOnRefresh: true },
    onUpdate: () => {
      const done = tl.progress() > 0.995;
      if (done && !landed) {
        draw();
        if (!tilted) {
          tilted = true;
          cleanups.push(tiltCards(pillars, deps, { perspective: 0, max: 5, lift: 18 }));
        }
      } else if (!done && landed) undraw();
    },
  });
  // Pila -> ventaglio -> colonna; poi il testo.
  tl.fromTo(
    pillars,
    from,
    { y: 0, rotationZ: 0, rotationY: 0, z: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.inOut", stagger: 0.06, immediateRender: false },
    0
  );
  bodies.forEach((list, i) => {
    if (list.length) tl.fromTo(list, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out", immediateRender: false }, 0.85 + i * 0.05);
  });
}
