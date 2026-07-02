"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Phone, Brain, Check } from "lucide-react";
import { Section, SectionHeading, Reveal, MonoTag } from "./home-ui";
import PillarMap from "./system/PillarMap";

const ICON = { "01": TrendingUp, "02": Phone, "03": Brain };

function PillarCard({ pillar, onEnter }) {
  const Icon = ICON[pillar.tag] || Phone;
  const featured = Boolean(pillar.featured);
  return (
    <motion.div
      onViewportEnter={onEnter}
      viewport={{ margin: "-45% 0px -45% 0px", amount: 0 }}
      className="scroll-mt-28"
    >
      <Reveal>
        <div
          className={`av-gradient-border hx-orbit ${featured ? "hx-orbit-on" : ""} rounded-3xl bg-white/[0.03] p-8 sm:p-9`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl ${
                featured ? "bg-gold-500/15 text-gold-400" : "bg-bright-blue/10 text-bright-blue"
              }`}
            >
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className="inline-flex items-center gap-2.5">
              {featured && <MonoTag tone="gold">Flagship</MonoTag>}
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                Pillar {pillar.tag}
              </span>
            </span>
          </div>

          <span className="mt-7 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-bright-blue">
            {pillar.name}
          </span>
          <h3 className="mt-2 font-display text-display-lg font-bold text-white">
            {pillar.statement}
          </h3>
          <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-white/60">
            {pillar.outcome}
          </p>

          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
            {pillar.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5 font-body text-sm text-white/75">
                <Check
                  size={15}
                  strokeWidth={3}
                  className={`mt-0.5 shrink-0 ${featured ? "text-gold-400" : "text-bright-blue"}`}
                />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </motion.div>
  );
}

export default function SystemPillars({ content }) {
  const c = content;
  const [active, setActive] = useState(0);

  return (
    <Section id="pillars" surface="raised" grid>
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Sticky system map (desktop): lights up per pillar in view */}
        <div className="hidden lg:block">
          <div className="sticky top-28 flex justify-center">
            <PillarMap items={c.items} activeIndex={active} />
          </div>
        </div>

        {/* Pillar cards; each also carries a static glyph context on mobile */}
        <div className="flex flex-col gap-8 lg:gap-40 lg:py-24">
          {c.items.map((p, i) => (
            <PillarCard key={p.tag} pillar={p} onEnter={() => setActive(i)} />
          ))}
        </div>
      </div>
    </Section>
  );
}
