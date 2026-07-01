"use client";

import { PhoneOff, Clock, TimerReset, Boxes } from "lucide-react";
import { Section, SectionHeading, Reveal } from "./home-ui";

const ICONS = {
  "phone-missed": PhoneOff,
  clock: Clock,
  reply: TimerReset,
  boxes: Boxes,
};

export default function PainPoints({ content }) {
  const c = content;
  return (
    <Section id="problem" grid>
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((item, i) => {
          const Icon = ICONS[item.icon] || Clock;
          return (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="av-gradient-border group flex h-full flex-col rounded-2xl bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-bright-blue/10 text-bright-blue transition-colors duration-300 group-hover:bg-warm-yellow/15 group-hover:text-warm-yellow">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-lg font-bold leading-snug text-white">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                {item.body}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
