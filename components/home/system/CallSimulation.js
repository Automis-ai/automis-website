"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { RotateCcw, CalendarCheck2 } from "lucide-react";
import { LiveDot } from "../home-ui";

/* Staged after-hours call: plays once when scrolled into view.
   Steps: bubbles appear one by one (with a typing beat before the AI),
   then the gold booking confirmation, then the closing mono line. */

const BAR_DELAYS = [0, 0.18, 0.34, 0.12, 0.26];

function Waveform({ playing }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {BAR_DELAYS.map((d, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-bright-blue ${playing ? "av-wave-bar" : ""}`}
          style={playing ? { animationDelay: `${d}s` } : { height: "55%" }}
        />
      ))}
    </span>
  );
}

function Bubble({ msg }) {
  const isAi = msg.from === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
          isAi
            ? "rounded-bl-md border border-bright-blue/25 bg-bright-blue/10 text-white/90"
            : "rounded-br-md bg-white/[0.07] text-white/75"
        }`}
      >
        {!isAi && (
          <span className="mb-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">
            Caller
          </span>
        )}
        {isAi && (
          <span className="mb-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-bright-blue/80">
            Automis VoiceAI
          </span>
        )}
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function CallSimulation({ call }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  const TOTAL_STEPS = call.transcript.length + 2; // bubbles + confirmation + closing
  const [rawStep, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  // Reduced motion resolves after mount: always derive, never trust initial state
  const step = reduce ? TOTAL_STEPS : rawStep;

  useEffect(() => {
    if (reduce || !inView) return;
    setStep(0);
    setTyping(false);
    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };

    let t = 500;
    call.transcript.forEach((msg, i) => {
      if (msg.from === "ai") {
        later(() => setTyping(true), t);
        t += 1100;
        later(() => {
          setTyping(false);
          setStep(i + 1);
        }, t);
      } else {
        later(() => setStep(i + 1), t);
      }
      t += 900;
    });
    later(() => setStep(call.transcript.length + 1), t + 300); // confirmation
    later(() => setStep(TOTAL_STEPS), t + 1100); // closing line

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, run]);

  const done = step >= TOTAL_STEPS;
  const playing = inView && !done && !reduce;

  return (
    <div
      ref={ref}
      className="av-gradient-border relative flex min-h-[26rem] flex-col rounded-3xl bg-white/[0.02] p-5 sm:p-6"
    >
      {/* Call header */}
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <span className="inline-flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/60">
          <LiveDot />
          {call.meta}
        </span>
        <Waveform playing={playing} />
      </div>

      {/* Transcript */}
      <div className="flex flex-1 flex-col justify-end gap-3 pt-5">
        {call.transcript.slice(0, step).map((msg, i) => (
          <Bubble key={i} msg={msg} />
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <span className="hx3-typing inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-bright-blue/20 bg-bright-blue/[0.07] px-4 py-3">
                <span />
                <span />
                <span />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {step >= call.transcript.length + 1 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold-400">
              <CalendarCheck2 size={14} strokeWidth={2} />
              {call.confirmation}
            </span>
          </motion.div>
        )}

        {done && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-2 flex items-center justify-between"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/40">
              {call.closing}
            </span>
            {!reduce && (
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soft-blue/70 transition-colors hover:text-white"
              >
                <RotateCcw size={12} />
                {call.replayLabel}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
