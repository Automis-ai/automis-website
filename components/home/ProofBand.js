"use client";

import { Section, SectionHeading, Stat, Reveal } from "./home-ui";

export default function ProofBand({ content }) {
  const c = content;
  return (
    <Section id="proof" surface="accent">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="mt-16 grid gap-y-12 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
        {c.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="px-6 text-center">
            <Stat
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              gold={s.gold}
              className="mx-auto max-w-[16rem]"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
