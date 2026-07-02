"use client";

import { ShieldCheck, Search, KeyRound, BadgeCheck } from "lucide-react";
import { Section, SectionHeading, Reveal } from "./home-ui";

const ITEM_ICON = [Search, KeyRound, BadgeCheck];

export default function Wedge({ content }) {
  const c = content;
  return (
    <Section id="why" surface="accent">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      {/* Differentiators */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {c.items.map((item, i) => {
          const Icon = ITEM_ICON[i] || BadgeCheck;
          return (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="av-gradient-border rounded-2xl bg-white/[0.03] p-7"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-bright-blue/12 text-bright-blue">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white">{item.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/60">{item.body}</p>
            </Reveal>
          );
        })}
      </div>

      {/* Guarantees, made prominent (ambient gold) */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {c.guarantees.map((g, i) => (
          <Reveal
            key={g.title}
            delay={i * 0.1}
            className="hx-orbit-on av-gradient-border flex items-start gap-4 rounded-2xl bg-warm-yellow/[0.04] p-7"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-warm-yellow/15 text-warm-yellow">
              <ShieldCheck size={24} strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold leading-snug text-white">{g.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/60">{g.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
