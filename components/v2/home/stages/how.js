import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";

/*
  Come lavoriamo: la catena letterale. I tre passi sono tre moduli (piastrelle di vetro) uniti da un filo che passa dal
  loro centro; un pacchetto di luce li attraversa e ogni modulo si accende quando il pacchetto arriva.
  - Scroll (da 768 px): ogni passo entra, il modulo si compone (arriva ruotando dalla profondità), il tratto verso il
    passo dopo si disegna. È legato allo scroll, quindi si ricompone anche tornando indietro.
  - A catena completa: il pacchetto corre da un modulo al successivo, il modulo che riceve scatta (anello d'oro, alone), poi
    da capo. Si ferma quando la sezione esce dallo schermo.
  - Telefono (sotto 768 px): niente filo orizzontale, i passi sono in colonna e a collegarli è il filo della pagina
    (stages/spine.js, un nodo per passo). Qui restano le entrate, una dopo l'altra.
*/
export default function how(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const head = $("[data-wow-head]");

  wordsIn($("[data-wow-title]"), deps, { start: "top 88%" });
  riseIn([$("[data-wow-eyebrow]")], deps, { trigger: head, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$("[data-wow-lead]")], deps, { trigger: head, start: "top 88%", y: 20, delay: 0.35 });

  const list = $("[data-wow-steps]");
  if (!list) return;
  const steps = Array.from(list.querySelectorAll("[data-wow-step]")).map((li) => {
    const tile = li.querySelector("[data-node]");
    return {
      li,
      tile,
      ring: tile && tile.querySelector(".v2hp-mod__ring"),
      glow: tile && tile.querySelector(".v2hp-mod__glow"),
      seg: li.querySelector("[data-seg]"),
      packet: li.querySelector("[data-packet]"),
    };
  });

  // ---------- Telefono ----------
  if (window.innerWidth < 768) {
    steps.forEach((s) => {
      gsap.from(s.li, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: s.li, start: "top 90%", once: true },
      });
      if (s.tile) {
        gsap.from(s.tile, {
          scale: 0.4,
          rotationY: -80,
          transformPerspective: 600,
          duration: 0.9,
          delay: 0.15,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: s.li, start: "top 88%", once: true },
        });
      }
    });
    return;
  }

  if (rich) gsap.set(list, { perspective: 1200 });

  // ---------- Costruzione, legata allo scroll ----------
  let live = false;
  let inView = false;
  let loop = null;
  const sync = () => {
    if (!loop) return;
    if (live && inView) loop.play();
    else loop.pause();
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: list,
      start: rich ? "top 80%" : "top 82%",
      end: rich ? "top 26%" : "bottom 72%",
      scrub: 0.6,
      onUpdate: (self) => {
        live = self.progress > 0.985;
        sync();
      },
    },
  });
  const gap = 1.5;
  steps.forEach((s, i) => {
    const at = i * gap;
    tl.fromTo(
      s.li,
      rich ? { opacity: 0, z: -260, rotationX: -22, y: 40, transformOrigin: "50% 100%" } : { opacity: 0, y: 34 },
      { opacity: 1, z: 0, rotationX: 0, y: 0, duration: 0.9, ease: "power3.out" },
      at
    );
    // il modulo si compone: arriva ruotando dalla profondità e si accende
    if (s.tile) {
      tl.fromTo(
        s.tile,
        { scale: 0.35, rotationY: rich ? -95 : 0, z: rich ? -120 : 0, transformPerspective: 700 },
        { scale: 1, rotationY: 0, z: 0, duration: 0.7, ease: "back.out(1.7)" },
        at + 0.1
      );
    }
    if (s.glow) tl.fromTo(s.glow, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, at + 0.3);
    if (s.seg) tl.fromTo(s.seg, { scaleX: 0 }, { scaleX: 1, duration: gap - 0.35, ease: "power1.inOut" }, at + 0.45);
  });

  // ---------- Pacchetti di luce: catena che parte a catena completa ----------
  const dist = (seg) => seg.offsetWidth;
  loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4, repeatRefresh: true, paused: true });
  let t = 0; // cursore: ogni pacchetto parte appena il precedente è arrivato
  steps.forEach((s, i) => {
    if (!s.packet || !s.seg) return;
    const next = steps[i + 1];
    loop.fromTo(
      s.packet,
      { x: 0, opacity: 0 },
      { x: () => dist(s.seg), opacity: 1, duration: 0.62, ease: "power2.in" },
      t
    );
    loop.to(s.packet, { opacity: 0, duration: 0.12, ease: "none" }, t + 0.54);
    if (next && next.ring) {
      loop.fromTo(next.ring, { scale: 0.9, opacity: 0.95 }, { scale: 2.3, opacity: 0, duration: 0.8, ease: "power2.out" }, t + 0.6);
      if (next.glow) loop.fromTo(next.glow, { scale: 1, opacity: 1 }, { scale: 1.5, opacity: 0.55, duration: 0.8, ease: "power2.out", yoyo: true, repeat: 1 }, t + 0.6);
    }
    t += 0.72;
  });

  ScrollTrigger.create({
    trigger: list,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });
  env.cleanups.push(() => loop && loop.kill());
}
