"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { renderCanvas } from "@/components/ui/canvas";
import { Grad, Eyebrow, GoldCTA, GhostLink } from "./home-ui";

export default function Hero({ content }) {
  const reduce = useReducedMotion();
  const h = content;

  useEffect(() => {
    if (reduce) return; // respect reduced-motion: skip the animated canvas
    const cleanup = renderCanvas();
    return cleanup;
  }, [reduce]);

  return (
    <section className="hx-grain relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-24 pt-28 md:pt-32">
      {/* Mouse-trailing flowing-lines background (brand blue) */}
      <canvas
        id="automis-canvas"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Ambient glow + edge fades to blend the effect into the page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[42%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-bright-blue/10 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep-blue to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-deep-blue to-transparent" />
      </div>

      {/* Centered content */}
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex justify-center">
            <Eyebrow>{h.eyebrow}</Eyebrow>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-[2.9rem] font-semibold tracking-[-0.03em] leading-[0.98] text-white sm:text-6xl lg:text-[5rem]">
            {h.titleLead} <Grad>{h.titleAccent}</Grad>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-body text-lg leading-relaxed text-white/70">
            {h.subhead}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <GoldCTA href={h.primaryCta.href} external>
              {h.primaryCta.label}
            </GoldCTA>
            <GhostLink href={h.secondaryCta.href}>{h.secondaryCta.label}</GhostLink>
          </div>
          <p className="mx-auto mt-12 max-w-md font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
            {h.trustLabel}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
