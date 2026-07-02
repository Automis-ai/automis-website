"use client";

import { ShieldCheck } from "lucide-react";
import { Section, SectionHeading, Reveal } from "./home-ui";

export default function Guarantee({ content }) {
  const c = content;
  return (
    <Section id="guarantee">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} />

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        {c.items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.1}
            className="hx-orbit av-gradient-border flex h-full flex-col rounded-2xl bg-white/[0.03] p-7"
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-warm-yellow/12 text-warm-yellow">
              <ShieldCheck size={24} strokeWidth={1.8} />
            </span>
            <h3 className="font-display text-lg font-bold leading-snug text-white">
              {item.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
