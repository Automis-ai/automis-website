"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LiveDot } from "../home-ui";

function age(at) {
  const s = Math.round((Date.now() - at) / 1000);
  return s < 4 ? "just now" : `${s}s ago`;
}

/* Live activity feed: newest event first, max 4 rows.
   Purely presentational; the parent decides what "happened". */
export default function EventTicker({ events, note, label = "Live activity", className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`rounded-xl border border-white/[0.07] bg-black/25 p-3.5 backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/50">
          <LiveDot /> {label}
        </span>
        {note && (
          <span className="truncate font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/25">
            {note}
          </span>
        )}
      </div>
      <ul className="mt-2.5 space-y-1.5">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.li
              key={e.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline justify-between gap-3 font-mono text-[0.7rem] text-soft-blue/85"
            >
              <span className="truncate">▸ {e.text}</span>
              {e.at ? <span className="shrink-0 text-white/30">{age(e.at)}</span> : null}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
