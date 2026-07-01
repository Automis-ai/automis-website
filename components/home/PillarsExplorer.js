"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, TrendingUp, Phone, Brain } from "lucide-react";
import { Section, SectionHeading } from "./home-ui";

const PILLAR_ICON = { marketing: TrendingUp, sales: Phone, admin: Brain };

export default function PillarsExplorer({ content }) {
  const c = content;
  const reduce = useReducedMotion();
  const initial = c.items.find((p) => p.featured)?.key || c.items[0].key;
  const [active, setActive] = useState(initial);
  const activePillar = c.items.find((p) => p.key === active);
  const ActiveIcon = PILLAR_ICON[active] || Phone;

  return (
    <Section id="pillars">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.25fr] lg:items-start">
        {/* Selector rail */}
        <div
          role="tablist"
          aria-label="Automis pillars"
          className="flex min-w-0 gap-3 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {c.items.map((p) => {
            const isActive = p.key === active;
            const Icon = PILLAR_ICON[p.key];
            return (
              <button
                key={p.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(p.key)}
                className={`av-gradient-border group relative flex min-w-[15rem] flex-1 items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 lg:min-w-0 ${
                  isActive ? "bg-white/[0.06]" : "bg-white/[0.02] opacity-70 hover:opacity-100"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                    p.featured && isActive
                      ? "bg-warm-yellow/15 text-warm-yellow"
                      : "bg-bright-blue/10 text-bright-blue"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-plex-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
                    {p.tag}
                    {p.featured && (
                      <span className="ml-2 text-warm-yellow">flagship</span>
                    )}
                  </span>
                  <span className="mt-1 block font-montserrat text-base font-bold text-white">
                    {p.name}
                  </span>
                  <span className="mt-1 hidden font-open-sans text-sm leading-snug text-white/55 lg:block">
                    {p.body}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="av-gradient-border relative min-w-0 min-h-[22rem] overflow-hidden rounded-3xl bg-white/[0.03] p-8 sm:p-10">
          <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
          <div
            className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-[90px] ${
              activePillar.featured ? "bg-warm-yellow/15" : "bg-bright-blue/15"
            }`}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl ${
                  activePillar.featured
                    ? "bg-warm-yellow/15 text-warm-yellow"
                    : "bg-bright-blue/12 text-bright-blue"
                }`}
              >
                <ActiveIcon size={26} strokeWidth={1.7} />
              </span>
              <h3 className="mt-6 font-montserrat text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                {activePillar.headline}
              </h3>
              <p className="mt-4 max-w-xl font-open-sans text-base leading-relaxed text-white/65">
                {activePillar.body}
              </p>
              <ul className="mt-7 space-y-3">
                {activePillar.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        activePillar.featured
                          ? "bg-warm-yellow/20 text-warm-yellow"
                          : "bg-bright-blue/20 text-bright-blue"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="font-open-sans text-sm leading-relaxed text-white/75">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
