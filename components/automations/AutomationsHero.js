"use client";
import { usePathname } from "next/navigation";
import { Reveal, GradientText } from "@/components/home/_ui";
import { ArrowDown } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "The catalog",
    headlinePre: "The automations ",
    headlineAccent: "we build",
    subhead:
      "A working catalog of AI systems we deploy, from voice receptionists to your own Company Brain. Filter by your industry and your goal to see what fits.",
    cta: "Explore the catalog",
  },
  it: {
    eyebrow: "Il catalogo",
    headlinePre: "Le automazioni ",
    headlineAccent: "che costruiamo",
    subhead:
      "Un catalogo concreto di sistemi IA che mettiamo in produzione, dalle receptionist vocali al tuo Company Brain. Filtra per settore e obiettivo e scopri cosa fa al caso tuo.",
    cta: "Esplora il catalogo",
  },
  pt: {
    eyebrow: "O catálogo",
    headlinePre: "As automações ",
    headlineAccent: "que construímos",
    subhead:
      "Um catálogo concreto de sistemas de IA que colocamos em produção, desde assistentes de voz até ao seu próprio Company Brain. Filtre pelo seu setor e pelo seu objetivo para ver o que lhe serve.",
    cta: "Explore o catálogo",
  },
};

export default function AutomationsHero() {
  const locale = usePathname()?.startsWith("/pt")
    ? "pt"
    : usePathname()?.startsWith("/it")
    ? "it"
    : "en";
  const t = COPY[locale];
  return (
    <section id="automations-hero" className="relative overflow-hidden bg-deep-blue">
      {/* soft aurora glow behind the headline */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-120px] h-[520px] w-[860px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.30), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-3xl pt-32 pb-16 text-center sm:pt-36 md:pt-40">
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "linear-gradient(120deg,#3C91E6,#57C7E3)", boxShadow: "0 0 10px rgba(87,199,227,0.8)" }}
              />
              {t.eyebrow}
            </span>
          </Reveal>

          <Reveal immediate delay={60}>
            <h1 className="font-display mt-6 text-[2.2rem] leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.4rem]">
              {t.headlinePre}<GradientText>{t.headlineAccent}</GradientText>
            </h1>
          </Reveal>

          <Reveal immediate delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/60 [text-wrap:pretty]">
              {t.subhead}
            </p>
          </Reveal>

          <Reveal immediate delay={180}>
            <a
              href="#explorer"
              className="mt-9 inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[14px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              {t.cta}
              <ArrowDown className="h-4 w-4" strokeWidth={2} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
