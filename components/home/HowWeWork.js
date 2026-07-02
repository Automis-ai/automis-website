"use client";

import { useReducedMotion } from "framer-motion";
import { Section, SectionHeading, Reveal, MonoTag } from "./home-ui";

export default function HowWeWork({ content }) {
  const c = content;
  const reduce = useReducedMotion();

  return (
    <Section id="how" surface="panel" grid>
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {/* Energized rail (desktop): a pulse sweeps the line, left to right */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block">
          <div className="hx3-rail absolute inset-0" />
          {!reduce && <div className="hx3-rail-pulse absolute inset-0" />}
        </div>
        {/* Vertical rail (mobile) */}
        <div className="pointer-events-none absolute bottom-4 left-7 top-4 w-px bg-gradient-to-b from-bright-blue/30 via-bright-blue/20 to-transparent md:hidden" />

        {c.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.12} className="relative pl-20 md:pl-0">
            <div className="flex items-center gap-4 md:block">
              <span className="absolute left-0 top-0 z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-bright-blue/40 bg-ink-800 font-display text-lg font-bold text-bright-blue md:static md:bg-ink-900">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-bold text-white md:mt-6">{step.title}</h3>
            </div>
            {step.tag && <MonoTag tone="gold" className="mt-3">{step.tag}</MonoTag>}
            <p className="mt-4 font-body text-sm leading-relaxed text-white/60">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
