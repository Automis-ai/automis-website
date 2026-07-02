"use client";

import { TrendingUp, Phone, Brain, Check } from "lucide-react";
import { Section, SectionHeading, Card, Reveal } from "./home-ui";

const ICON = { "01": TrendingUp, "02": Phone, "03": Brain };
const GOLD_TEXT = "#B07A12"; // readable gold on white

export default function Pillars({ content }) {
  const c = content;
  return (
    <Section id="pillars" surface="light">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-start">
        {c.items.map((p, i) => {
          const Icon = ICON[p.tag] || Phone;
          return (
            <Reveal key={p.tag} delay={i * 0.1} className="h-full">
              <Card
                gold={p.featured}
                className={`flex h-full flex-col p-8 ${p.featured ? "lg:-mt-3 lg:pb-10" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      p.featured ? "bg-warm-yellow/15 text-[#B07A12]" : "bg-bright-blue/10 text-bright-blue"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#0A1B2A]/40">
                    Pillar {p.tag}
                    {p.featured && <span style={{ color: GOLD_TEXT }} className="ml-2">flagship</span>}
                  </span>
                </div>

                <span className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-bright-blue">
                  {p.name}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-[#0A1B2A]">
                  {p.statement}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-[#0A1B2A]/65">
                  {p.outcome}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[#0A1B2A]/10 pt-6">
                  {p.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-2.5 font-body text-sm text-[#0A1B2A]/75"
                    >
                      <Check
                        size={15}
                        strokeWidth={3}
                        className={`mt-0.5 shrink-0 ${p.featured ? "text-[#B07A12]" : "text-bright-blue"}`}
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
