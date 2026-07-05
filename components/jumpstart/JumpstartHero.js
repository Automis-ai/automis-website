"use client";
import { Reveal, GradientText, GRAD } from "@/components/home/_ui";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const CHIPS = [
  "Where you lose time & money",
  "Your highest-ROI automations",
  "A clear path to fix it",
];

export default function JumpstartHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-deep-blue">
      {/* Ambient glow, confined to the top band */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.28), transparent 70%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, #000a14)" }} />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-4xl pt-32 pb-16 text-center sm:pt-36 md:pt-40">
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <Clock className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} />
              Free 30-minute AI Audit
            </span>
          </Reveal>

          <Reveal delay={80} immediate>
            <h1 className="font-display mx-auto mt-7 max-w-[18ch] text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-[3.4rem] md:text-[4.1rem]">
              See exactly where your business{" "}
              <GradientText>leaks time and money</GradientText>.
            </h1>
          </Reveal>

          <Reveal delay={160} immediate>
            <p className="mx-auto mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-white/70 md:text-[1.2rem]">
              In one 30-minute call, we map where your business loses hours and revenue,
              then hand you the top AI automations to fix it. No pressure, no commitment.
            </p>
          </Reveal>

          <Reveal delay={220} immediate>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-white/75 backdrop-blur-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300} immediate>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl px-7 py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5 sm:w-auto"
                style={{ background: GRAD }}
              >
                Book your free AI Audit
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-4 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                See how it works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-white/50">
              <ShieldCheck className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
              GDPR-aligned · read-only · nothing changes in your accounts
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
