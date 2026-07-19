"use client";
import { usePathname } from "next/navigation";
import { Reveal } from "./_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { WavyBackground } from "@/components/ui/WavyBackground";
import HeroDemo from "./HeroDemo";
import ToolsStrip from "./ToolsStrip";
import { ArrowRight, Sparkles } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "AI Automation Agency",
    h1_pre: "We build the ",
    h1_word1: "systems",
    h1_mid: " your business is",
    h1_word2: "missing",
    h1_post: ".",
    subhead:
      "We map exactly where your business loses time and money: the calls you miss, the leads that go cold, the admin that piles up. Then we build the AI agents and automations to fix it.",
    ctaPrimary: "Book Discovery Call",
    ctaSecondary: "Find your AI opportunities",
  },
  it: {
    eyebrow: "Agenzia di automazione IA",
    h1_pre: "Costruiamo i ",
    h1_word1: "sistemi",
    h1_mid: " che mancano al tuo ",
    h1_word2: "business",
    h1_post: ".",
    subhead:
      "Scopriamo esattamente dove il tuo business perde tempo e soldi: le chiamate a cui non rispondi, i contatti che si raffreddano, le pratiche che si accumulano. Poi costruiamo gli agenti IA e le automazioni che risolvono il problema.",
    ctaPrimary: "Prenota una call",
    ctaSecondary: "Scopri le tue opportunità IA",
  },
  pt: {
    eyebrow: "Agência de automação IA",
    h1_pre: "Construímos os ",
    h1_word1: "sistemas",
    h1_mid: " que faltam ao seu ",
    h1_word2: "negócio",
    h1_post: ".",
    subhead:
      "Descobrimos exatamente onde o seu negócio perde tempo e dinheiro: as chamadas que perde, os contactos que arrefecem, a burocracia que se acumula. Depois construímos os agentes IA e as automações que resolvem o problema.",
    ctaPrimary: "Agende uma chamada",
    ctaSecondary: "Descubra as suas oportunidades IA",
  },
};

export default function HeroEN() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : locale === "pt" ? "https://api.leadconnectorhq.com/widget/bookings/pt-automis" : BOOKING;
  return (
    <section id="hero" className="relative overflow-hidden bg-deep-blue">
      {/* Animated wavy background (brand palette) — an aurora ribbon confined to
          the top band, behind the headline. Scrims keep the type readable and
          fade the waves to solid deep-blue before the tools strip + demo panel. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[460px] md:h-[560px]">
        <WavyBackground
          containerClassName="absolute inset-0 h-full w-full"
          blur={4}
          waveOpacity={0.62}
          waveWidth={52}
          amplitude={72}
          waveCenter={0.58}
          speed="slow"
        />
        {/* keep the headline crisp: soften the waves directly behind the type */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(115% 66% at 50% 34%, rgba(0,10,20,0.74) 0%, rgba(0,10,20,0.34) 46%, transparent 74%)" }} />
        <div className="absolute inset-x-0 top-0 h-28" style={{ background: "linear-gradient(to bottom, #000a14, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-56" style={{ background: "linear-gradient(to bottom, transparent, #000a14)" }} />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-4xl pt-32 pb-14 text-center sm:pt-36 md:pt-40">
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "linear-gradient(120deg,#3C91E6,#57C7E3)", boxShadow: "0 0 10px rgba(87,199,227,0.8)" }} />
              {t.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80} immediate>
            <h1 className="font-display mx-auto mt-7 max-w-[15ch] text-[2.6rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3.6rem] md:text-[4.4rem]">
              {t.h1_pre}<span className="text-[#3C91E6]">{t.h1_word1}</span>{t.h1_mid}{" "}
              <span className="text-[#3C91E6]">{t.h1_word2}</span>{t.h1_post}
            </h1>
          </Reveal>

          <Reveal delay={160} immediate>
            <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white/70 sm:mt-7 sm:text-[1.05rem] md:text-[1.2rem]">
              {t.subhead}
            </p>
          </Reveal>

          <Reveal delay={240} immediate>
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <InteractiveHoverButton
                href={booking}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                className="w-full sm:w-auto"
              >
                {t.ctaPrimary}
              </InteractiveHoverButton>
              <a
                href="#opportunity-finder"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-4 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
                {t.ctaSecondary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 sm:mt-14">
              <ToolsStrip />
            </div>
          </Reveal>
        </div>

        {/* Product panel — animated live-booking sequence */}
        <Reveal delay={200} className="mx-auto max-w-5xl pb-12 md:pb-16">
          <div className="relative">
            <div
              className="absolute -inset-x-6 -top-6 bottom-0 rounded-[2rem] opacity-60 blur-2xl"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(60,145,230,0.25), transparent 70%)" }}
            />
            <div className="relative">
              <HeroDemo />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
