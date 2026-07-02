"use client";

import { Section, Kicker, Reveal } from "./home-ui";

export default function Problem({ content }) {
  const c = content;
  return (
    <Section id="problem" surface="panel" grid>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky statement */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Kicker>{c.kicker}</Kicker>
          <h2 className="mt-5 font-display text-[2.2rem] font-semibold tracking-[-0.02em] leading-[1.03] text-white sm:text-[2.7rem] lg:text-[3.2rem]">
            {c.title}
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-white/60">{c.lead}</p>
        </Reveal>

        {/* Pain -> fix rows */}
        <div className="flex flex-col divide-y divide-white/10">
          {c.rows.map((row, i) => (
            <Reveal
              key={i}
              delay={i * 0.06}
              className="py-7 first:pt-0 last:pb-0"
            >
              <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                {row.pain}
              </p>
              <p className="mt-2.5 flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-white/55">
                <span className="mt-0.5 font-semibold text-bright-blue">→</span>
                <span>{row.fix}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
