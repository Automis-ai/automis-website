"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck, Zap, MessageSquare, Check } from "lucide-react";

/*
  Hero "signature" moment: a live-feeling booking, scripted.
  A single `step` counter advances on a timer; every visual state (which chat
  bubbles show, whether a typing indicator is up, which automation rows have
  fired) is derived from it. Runs only while in view, loops, and jumps straight
  to the finished state for reduced-motion users.
*/

const CHAT = [
  { from: "bot", text: "Hi! Automis at Clínica Santa Maria. Would you like to book a check-up?" },
  { from: "user", text: "Yes, is Thursday morning possible?" },
  { from: "bot", text: "Thursday 9:30 is open. Booked, and you’ll get an SMS confirmation. 👋" },
];

const STEPS = [
  { icon: Phone, label: "Call answered & qualified", meta: "0s" },
  { icon: CalendarCheck, label: "Slot booked in calendar", meta: "4s" },
  { icon: MessageSquare, label: "SMS + WhatsApp confirmation sent", meta: "6s" },
  { icon: Zap, label: "Lead pushed to CRM + follow-up set", meta: "8s" },
];

// step: 0 idle · 1 bot-typing · 2 bot1 · 3 user-typing · 4 user · 5 bot-typing
//       · 6 bot2 · 7 booked · 8 complete (hold, then loop)
const LAST_STEP = 8;
const DELAYS = [800, 1100, 900, 1000, 800, 1300, 1000, 900, 2800];

// How many chat bubbles are visible at a given step.
const VISIBLE_AT = { 0: 0, 1: 0, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 3, 8: 3 };
// Whether a typing indicator is showing, and for whom.
const TYPING_AT = { 1: "bot", 3: "user", 5: "bot" };

export default function HeroDemo() {
  const [step, setStep] = useState(0);
  const rootRef = useRef(null);
  const timerRef = useRef(null);
  const inView = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStep(LAST_STEP);
      return;
    }

    const schedule = (s) => {
      timerRef.current = setTimeout(() => {
        const next = s >= LAST_STEP ? 0 : s + 1;
        setStep(next);
        schedule(next);
      }, DELAYS[s]);
    };

    const el = rootRef.current;
    let io;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !inView.current) {
            inView.current = true;
            schedule(0);
          }
        },
        { threshold: 0.35 }
      );
      io.observe(el);
    } else {
      schedule(0);
    }

    return () => {
      clearTimeout(timerRef.current);
      if (io) io.disconnect();
    };
  }, []);

  const visible = VISIBLE_AT[step];
  const typing = TYPING_AT[step];
  const booked = step >= 7;
  // Automation rows fire in step with the conversation.
  const rowActiveAt = [2, 6, 7, 8];

  return (
    <div ref={rootRef} className="grid gap-4 rounded-2xl border border-white/[0.08] bg-[#04101c]/80 p-4 shadow-2xl backdrop-blur-md md:grid-cols-[1.1fr_1fr] md:p-5">
      {/* Left: live call + chat */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(120deg,#3C91E6,#57C7E3)" }}
            >
              <Phone className="h-4 w-4 text-[#04101c]" strokeWidth={2.4} />
              <span className="absolute -inset-0.5 rounded-full border border-[#57C7E3]/40 animate-ping" style={{ animationDuration: "2.2s" }} />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Incoming call</p>
              <p className="text-[12px] text-white/45">+351 · new patient</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#57C7E3]/12 px-2.5 py-1 text-[11px] font-semibold text-[#8fe0f0]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#57C7E3]" /> AI answering
          </span>
        </div>

        <div className="mt-4 min-h-[188px] space-y-2.5">
          {CHAT.map((m, i) => {
            const shown = i < visible;
            const isUser = m.from === "user";
            return (
              <div
                key={i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity .4s ease, transform .4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  className={`max-w-[86%] px-3.5 py-2.5 text-left text-[13px] ${
                    isUser
                      ? "rounded-2xl rounded-tr-sm text-white/90"
                      : "rounded-2xl rounded-tl-sm bg-white/[0.05] text-white/80"
                  }`}
                  style={isUser ? { background: "rgba(60,145,230,0.16)" } : undefined}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {typing ? (
            <div className={`flex ${typing === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-center gap-1 rounded-2xl px-3.5 py-3 ${
                  typing === "user" ? "rounded-tr-sm" : "rounded-tl-sm bg-white/[0.05]"
                }`}
                style={typing === "user" ? { background: "rgba(60,145,230,0.16)" } : undefined}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/50"
                    style={{ animation: "heroDot 1s ease-in-out infinite", animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="mt-4 flex items-center gap-2 rounded-lg border border-[#57C7E3]/20 bg-[#57C7E3]/[0.06] px-3 py-2 text-left"
          style={{
            opacity: booked ? 1 : 0,
            transform: booked ? "translateY(0)" : "translateY(6px)",
            transition: "opacity .5s ease, transform .5s ease",
          }}
        >
          <CalendarCheck className="h-4 w-4 flex-shrink-0 text-[#8fe0f0]" strokeWidth={2} />
          <p className="text-[12.5px] text-white/75">Appointment booked · synced to calendar · CRM updated</p>
        </div>
      </div>

      {/* Right: automation timeline */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Automation running</p>
        <div className="mt-4 space-y-3.5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = step >= rowActiveAt[i];
            return (
              <div key={i} className="flex items-center gap-3" style={{ transition: "opacity .4s ease", opacity: active ? 1 : 0.4 }}>
                <span
                  className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-500"
                  style={{
                    borderColor: active ? "rgba(87,199,227,0.45)" : "rgba(255,255,255,0.1)",
                    background: active ? "rgba(87,199,227,0.12)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} style={{ color: active ? "#8fe0f0" : "rgba(255,255,255,0.4)" }} />
                </span>
                <div className="flex flex-1 items-center justify-between border-b border-white/[0.05] pb-2.5">
                  <span className="text-left text-[13px]" style={{ color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>
                    {s.label}
                  </span>
                  {active ? (
                    <span className="flex items-center gap-1.5">
                      <span className="font-plex-mono text-[11px] text-white/35">{s.meta}</span>
                      <Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="font-plex-mono text-[11px] text-white/20">{s.meta}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="mt-4 rounded-lg px-3 py-2.5 text-left"
          style={{ background: "rgba(245,205,121,0.08)", border: "1px solid rgba(245,205,121,0.22)" }}
        >
          <p className="text-[12.5px] font-medium text-[#F5CD79]">Zero staff time · runs 24/7</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
