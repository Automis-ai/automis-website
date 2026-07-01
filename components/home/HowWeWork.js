"use client";

import { Section, SectionHeading, Reveal } from "./home-ui";

export default function HowWeWork({ content }) {
  const c = content;
  return (
    <Section id="how-we-work" grid>
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        {/* connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-bright-blue/40 to-transparent md:block" />

        {c.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.12} className="relative">
            <div className="flex items-center gap-4 md:block">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-bright-blue/40 bg-deep-blue font-montserrat text-lg font-extrabold text-bright-blue">
                {step.n}
              </span>
              <h3 className="font-montserrat text-xl font-bold text-white md:mt-6">
                {step.title}
              </h3>
            </div>
            <p className="mt-4 font-open-sans text-sm leading-relaxed text-white/60">
              {step.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
