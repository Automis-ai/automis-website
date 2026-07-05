"use client";
import { Reveal, Eyebrow, GradientText, GRAD } from "@/components/home/_ui";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-deep-blue pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.26), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal immediate>
            <Eyebrow>The team behind Automis</Eyebrow>
          </Reveal>
          <Reveal immediate delay={60}>
            <h1 className="font-display mt-6 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.4rem]">
              Two founders, hands-on with <GradientText>your build</GradientText>
            </h1>
          </Reveal>
          <Reveal immediate delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/65 [text-wrap:pretty]">
              Automis is a strategic AI integrator. We build the AI systems your business is
              missing, end to end, shaped around how your business actually works. No handoffs
              to a junior team: the people who design your system are the people who build it.
            </p>
          </Reveal>
          <Reveal immediate delay={180}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl px-6 py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5"
                style={{ background: GRAD }}
              >
                Book a discovery call
              </a>
              <a
                href="#process"
                className="inline-flex rounded-xl border border-white/15 bg-white/[0.03] px-6 py-4 text-[15px] font-semibold text-white/85 transition-colors hover:bg-white/[0.06]"
              >
                See how we work
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
