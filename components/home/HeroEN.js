"use client";
import { Reveal, GradientText } from "./_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { WavyBackground } from "@/components/ui/WavyBackground";
import HeroDemo from "./HeroDemo";
import ToolsStrip from "./ToolsStrip";
import { ArrowRight, Sparkles } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

export default function HeroEN() {
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
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "linear-gradient(120deg,#3C91E6,#57C7E3)", boxShadow: "0 0 10px rgba(87,199,227,0.8)" }} />
              Strategic AI Automation Agency
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mx-auto mt-7 max-w-[15ch] text-[2.6rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3.6rem] md:text-[4.4rem]">
              We build the{" "}
              <GradientText>systems your business is missing</GradientText>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-white/65 md:text-[1.2rem]">
              We find where your business leaks time and money (missed calls, slow follow-up,
              hours lost to admin) and build the AI agents and automations that fix it end to end.
              One system, designed around how you actually work.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <InteractiveHoverButton
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Book Discovery Call
              </InteractiveHoverButton>
              <a
                href="#opportunity-finder"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-4 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
                Find your AI opportunities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-14">
              <ToolsStrip />
            </div>
          </Reveal>
        </div>

        {/* Product panel — animated live-booking sequence */}
        <Reveal delay={200} className="mx-auto max-w-5xl pb-24">
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
