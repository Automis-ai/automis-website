import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";

/*
  Opportunity Finder: il titolo entra a parole, la scheda arriva dalla profondità (rotateX + translateZ), i moduli del
  «sistema che risponde» (la fila accanto alla scheda, OpportunityFinderClassic.js) arrivano uno dopo l'altro.
  Su telefono sale e basta. A fine entrata si tolgono transform e opacità inline: la scheda torna quella del CSS.
*/
export default function finder(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const head = $("[data-wow-head]");

  wordsIn($("[data-wow-title]"), deps, { start: "top 88%" });
  riseIn([$("[data-wow-eyebrow]")], deps, { trigger: head, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$("[data-wow-lead]")], deps, { trigger: head, start: "top 88%", y: 20, delay: 0.35 });

  // il sistema che risponde (la fila di moduli accanto alla scheda): i moduli arrivano uno dopo l'altro dalla profondità
  const rail = $("[data-wow-frail]");
  if (rail) {
    gsap.from(Array.from(rail.children), {
      opacity: 0,
      x: rich ? -34 : 0,
      y: rich ? 0 : 14,
      scale: 0.6,
      duration: 0.9,
      ease: "back.out(1.5)",
      stagger: 0.09,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: rail, start: "top 90%", once: true },
    });
  }

  const card = $("[data-wow-finder-card]");
  if (!card) return;
  gsap.from(card, {
    opacity: 0,
    y: rich ? 100 : 40,
    z: rich ? -240 : 0,
    rotationX: rich ? 16 : 0,
    transformPerspective: 1100,
    transformOrigin: "50% 100%",
    duration: rich ? 1.25 : 0.9,
    ease: "power3.out",
    clearProps: "transform,opacity",
    scrollTrigger: { trigger: card, start: "top 90%", once: true },
  });
}
