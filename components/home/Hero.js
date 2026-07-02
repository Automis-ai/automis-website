"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Grad, Kicker, GoldCTA, GhostLink, LiveDot } from "./home-ui";
import SystemDiagram from "./system/SystemDiagram";
import EventTicker from "./system/EventTicker";

function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

/* Compact live feed for small screens: same scripted events as the diagram,
   without mounting the diagram's scheduler or SVG. */
function MobileFeed({ diagram }) {
  const reduce = useReducedMotion();
  const lines = diagram.scenarios.flatMap((sc) => sc.events);
  const [events, setEvents] = useState(() =>
    lines.slice(0, 3).map((text, i) => ({ id: `m-${i}`, text }))
  );
  const idx = useRef(3);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      const text = lines[idx.current % lines.length];
      idx.current += 1;
      setEvents((prev) =>
        [{ id: `m-${Date.now()}`, text, at: Date.now() }, ...prev].slice(0, 4)
      );
    }, 2600);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return <EventTicker events={events} note={diagram.note} />;
}

export default function Hero({ content }) {
  const reduce = useReducedMotion();
  const h = content;
  const isDesktop = useMedia("(min-width: 1024px)");

  const enter = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        };

  return (
    <section className="hx3-surface-deep hx-grain relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-20 pt-28 md:pt-32">
      {/* Ambient aurora depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hx-aurora-a absolute -left-[10%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-bright-blue/[0.13] blur-[150px]" />
        <div className="hx-aurora-b absolute -right-[8%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-soft-blue/[0.07] blur-[160px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Copy column */}
          <motion.div {...enter(0)}>
            <Kicker>{h.kicker}</Kicker>
            <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.6rem,4.3vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance]">
              {h.titleLead} <Grad>{h.titleAccent}</Grad>
            </h1>
            <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-white/70">
              {h.subhead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <GoldCTA href={h.primaryCta.href} external>
                {h.primaryCta.label}
              </GoldCTA>
              <GhostLink href={h.secondaryCta.href}>{h.secondaryCta.label}</GhostLink>
            </div>

            {/* Live status chips (the old proof band, now above the fold) */}
            <div className="mt-12 flex flex-wrap items-center gap-2.5">
              {h.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm"
                >
                  <LiveDot />
                  {chip}
                </span>
              ))}
            </div>

            {/* Mobile: compact live feed instead of the full diagram */}
            {!isDesktop && (
              <motion.div {...enter(0.15)} className="mt-10 lg:hidden">
                <MobileFeed diagram={h.diagram} />
              </motion.div>
            )}
          </motion.div>

          {/* The system, live */}
          <motion.div {...enter(0.2)} className="hidden lg:block">
            <SystemDiagram diagram={h.diagram} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
