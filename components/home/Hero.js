"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Grad, Eyebrow, GoldCTA, GhostLink } from "./home-ui";

/* ── Graph geometry, in a 0-100 square coordinate space ──
   HTML node chips and the SVG wire layer share these coords so they stay
   locked together at every screen size. */
const CORE = { x: 50, y: 50 };
const PILLARS = [
  {
    key: "marketing",
    x: 20,
    y: 24,
    sats: [
      { x: 6, y: 13, label: "ADS" },
      { x: 9, y: 41, label: "SEO" },
    ],
  },
  {
    key: "sales",
    x: 80,
    y: 33,
    featured: true,
    sats: [
      { x: 94, y: 19, label: "VOICE" },
      { x: 94, y: 48, label: "WHATSAPP" },
    ],
  },
  {
    key: "admin",
    x: 46,
    y: 82,
    sats: [
      { x: 22, y: 94, label: "RAG" },
      { x: 70, y: 93, label: "OCR" },
    ],
  },
];

function SystemGraph({ labels }) {
  const reduce = useReducedMotion();
  const pillarLabel = (key) => labels.pillars.find((p) => p.key === key)?.label || key;

  return (
    <div className="hx-grain relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Wire + pulse layer */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {/* pillar -> satellite (faint) */}
        {PILLARS.map((p) =>
          p.sats.map((s, i) => (
            <line
              key={`sat-${p.key}-${i}`}
              x1={p.x}
              y1={p.y}
              x2={s.x}
              y2={s.y}
              stroke="rgba(180,194,255,0.22)"
              strokeWidth="0.35"
            />
          ))
        )}

        {/* core -> pillar (primary, energized) */}
        {PILLARS.map((p, i) => (
          <motion.path
            key={`wire-${p.key}`}
            d={`M ${CORE.x} ${CORE.y} L ${p.x} ${p.y}`}
            fill="none"
            stroke={p.featured ? "rgba(254,196,88,0.55)" : "rgba(60,145,230,0.55)"}
            strokeWidth="0.6"
            strokeLinecap="round"
            className={reduce ? "" : "hx-wire"}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? {} : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeOut" }}
          />
        ))}

        {/* data pulses travelling core -> pillar */}
        {!reduce &&
          PILLARS.map((p, i) => (
            <motion.circle
              key={`pulse-${p.key}`}
              r="1.15"
              fill={p.featured ? "#FEC458" : "#B4C2FF"}
              initial={{ cx: CORE.x, cy: CORE.y, opacity: 0 }}
              animate={{
                cx: [CORE.x, p.x],
                cy: [CORE.y, p.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: 1.2 + i * 0.5,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
      </svg>

      {/* Satellite chips */}
      {PILLARS.map((p) =>
        p.sats.map((s, i) => (
          <motion.span
            key={`satchip-${p.key}-${i}`}
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-plex-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/55 backdrop-blur-sm md:block"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={reduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
          >
            {s.label}
          </motion.span>
        ))
      )}

      {/* Pillar chips */}
      {PILLARS.map((p, i) => (
        <motion.div
          key={`pillar-${p.key}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={reduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.15, type: "spring", stiffness: 220, damping: 18 }}
        >
          <div
            className={`av-gradient-border flex items-center gap-2 rounded-full px-3.5 py-2 backdrop-blur-md ${
              p.featured ? "bg-warm-yellow/[0.08]" : "bg-white/[0.05]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                p.featured ? "bg-warm-yellow" : "bg-bright-blue"
              }`}
            />
            <span className="whitespace-nowrap font-montserrat text-xs font-bold text-white sm:text-sm">
              {pillarLabel(p.key)}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Core node */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
        initial={reduce ? false : { opacity: 0, scale: 0.5 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
          <div className="hx-spin absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent,rgba(60,145,230,0.6),transparent_40%,rgba(254,196,88,0.5),transparent_75%)] opacity-70 blur-[1px]" />
          <div className="absolute inset-[3px] rounded-full bg-deep-blue" />
          <div className="av-orb relative grid h-16 w-16 place-items-center rounded-full border border-bright-blue/40 bg-[radial-gradient(circle_at_30%_30%,rgba(60,145,230,0.35),rgba(0,10,20,0.9))] sm:h-20 sm:w-20">
            <span className="font-plex-mono text-[0.55rem] uppercase tracking-[0.16em] text-soft-blue">
              {labels.core}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ content }) {
  const reduce = useReducedMotion();
  const h = content;

  return (
    <section className="hx-grain relative overflow-hidden px-4 pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Ambient aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hx-aurora-a absolute -left-32 top-0 h-[36rem] w-[36rem] rounded-full bg-bright-blue/20 blur-[130px]" />
        <div className="hx-aurora-b absolute -right-24 top-40 h-[32rem] w-[32rem] rounded-full bg-warm-yellow/10 blur-[130px]" />
        <div className="av-grid absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-montserrat text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {h.titleLead} <Grad>{h.titleAccent}</Grad>
          </h1>
          <p className="mt-6 max-w-xl font-open-sans text-lg leading-relaxed text-white/65">
            {h.subhead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <GoldCTA href={h.primaryCta.href} external>
              {h.primaryCta.label}
            </GoldCTA>
            <GhostLink href={h.secondaryCta.href}>{h.secondaryCta.label}</GhostLink>
          </div>
          <p className="mt-10 max-w-md font-plex-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
            {h.trustLabel}
          </p>
        </motion.div>

        {/* Signature system graph */}
        <div className="relative">
          <SystemGraph labels={h.graph} />
        </div>
      </div>
    </section>
  );
}
