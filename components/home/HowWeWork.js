"use client";

import { Section, SectionHeading, Reveal } from "./home-ui";

export default function HowWeWork({ content }) {
  const c = content;
  return (
    <Section id="how" surface="light">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-bright-blue/30 to-transparent md:block" />

        {c.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.12} className="relative">
            <div className="flex items-center gap-4 md:block">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-bright-blue/30 bg-white font-display text-lg font-bold text-bright-blue shadow-sm">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-bold text-[#0A1B2A] md:mt-6">{step.title}</h3>
            </div>
            {step.tag && (
              <span className="mt-3 inline-block rounded-full bg-warm-yellow/25 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#B07A12]">
                {step.tag}
              </span>
            )}
            <p className="mt-4 font-body text-sm leading-relaxed text-[#0A1B2A]/65">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
