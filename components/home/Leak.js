"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, Kicker, Reveal, MonoTag } from "./home-ui";

/* A leak that repairs itself as it scrolls into view: the red cost tag
   crossfades to a blue "Handled" state and the fix line draws in. */
function LeakRow({ row, fixedLabel, index }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="py-7 first:pt-0 last:pb-0">
        <MonoTag tone="blue">{fixedLabel}</MonoTag>
        <p className="mt-3 font-display text-lg font-semibold leading-snug text-white sm:text-xl">
          {row.pain}
        </p>
        <p className="mt-2.5 flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-white/55">
          <span className="mt-0.5 font-semibold text-bright-blue">→</span>
          <span>{row.fix}</span>
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="py-7 first:pt-0 last:pb-0"
      initial="leaking"
      whileInView="handled"
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* Tag crossfade: cost state -> handled state */}
      <div className="relative h-6">
        <motion.span
          className="absolute left-0 top-0"
          variants={{ leaking: { opacity: 1 }, handled: { opacity: 0 } }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
        >
          <MonoTag tone="red">{row.tag}</MonoTag>
        </motion.span>
        <motion.span
          className="absolute left-0 top-0"
          variants={{ leaking: { opacity: 0 }, handled: { opacity: 1 } }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
        >
          <MonoTag tone="blue">{fixedLabel}</MonoTag>
        </motion.span>
      </div>

      <motion.p
        className="mt-3 font-display text-lg font-semibold leading-snug text-white sm:text-xl"
        variants={{ leaking: { opacity: 0, y: 14 }, handled: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {row.pain}
      </motion.p>
      <motion.p
        className="mt-2.5 flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-white/55"
        variants={{ leaking: { opacity: 0, y: 10 }, handled: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <span className="mt-0.5 font-semibold text-bright-blue">→</span>
        <span>{row.fix}</span>
      </motion.p>
    </motion.div>
  );
}

export default function Leak({ content }) {
  const c = content;
  return (
    <Section id="problem" surface="panel" grid>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky statement */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Kicker>{c.kicker}</Kicker>
          <h2 className="mt-5 font-display text-display-xl font-semibold text-white">{c.title}</h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-white/60">{c.lead}</p>
        </Reveal>

        {/* Leaks that repair on scroll */}
        <div className="flex flex-col divide-y divide-white/10">
          {c.rows.map((row, i) => (
            <LeakRow key={row.tag} row={row} fixedLabel={c.fixedLabel} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
