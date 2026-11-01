"use client";

// Branded voice-agent demo page for prospects. Talks to an ElevenLabs agent through
// the SDK instead of the embed widget, so the page carries no third-party branding.
import { useEffect, useRef, useState } from "react";
import "@/components/site/design-system.css";
import s from "./VoiceDemo.module.css";

const STATUS_LABEL = {
  idle: "",
  connecting: "Connecting…",
  listening: "Listening…",
  speaking: "Speaking…",
  ended: "Call ended. You can start again any time.",
};

export default function VoiceDemo({ agentId, practice, headline, intro, tips = [], notes = [] }) {
  const [phase, setPhase] = useState("idle"); // idle | connecting | listening | speaking | ended
  const [error, setError] = useState("");
  const [lines, setLines] = useState([]);
  const convRef = useRef(null);
  const orbRef = useRef(null);
  const wakeRef = useRef(null);
  const logRef = useRef(null);

  const inCall = phase === "connecting" || phase === "listening" || phase === "speaking";

  // Drive the orb from the live audio level (agent voice while speaking, mic while listening).
  useEffect(() => {
    if (!inCall) return;
    let raf;
    const tick = () => {
      const c = convRef.current;
      if (c && orbRef.current) {
        const v = phase === "speaking" ? c.getOutputVolume() : c.getInputVolume();
        orbRef.current.style.setProperty("--level", Math.min(1, v * 2.2).toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inCall, phase]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  // Close the session if the visitor leaves the page mid-call.
  useEffect(() => () => convRef.current?.endSession(), []);

  async function start() {
    setError("");
    setLines([]);
    setPhase("connecting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setPhase("idle");
      setError("The microphone is blocked. Allow it for this page in your browser settings, then try again.");
      return;
    }
    try {
      wakeRef.current = await navigator.wakeLock?.request("screen");
    } catch {
      // Not supported or refused: the call still works, the screen may just dim.
    }
    try {
      const { Conversation } = await import("@elevenlabs/client");
      convRef.current = await Conversation.startSession({
        agentId,
        onConnect: () => setPhase("listening"),
        onModeChange: ({ mode }) => setPhase(mode === "speaking" ? "speaking" : "listening"),
        onMessage: ({ message, role, source }) => {
          // Strip voice tags such as [short pause]: they shape delivery, they are not words.
          const text = (message || "").replace(/\[[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim();
          if (!text || text === "...") return;
          const who = (role || source) === "user" ? "user" : "agent";
          setLines((prev) => [...prev, { who, text }]);
        },
        onDisconnect: () => {
          convRef.current = null;
          wakeRef.current?.release?.().catch(() => {});
          setPhase("ended");
        },
        onError: () => setError("Something went wrong with the call. Please try again."),
      });
    } catch {
      convRef.current = null;
      setPhase("idle");
      setError("We couldn't connect the call. Check your connection and try again.");
    }
  }

  async function stop() {
    await convRef.current?.endSession();
  }

  return (
    <div className={`automis-en ${s.page}`}>
      <header className={s.top}>
        <img src="/assets/images/logos/logo-automis-white.png" alt="Automis" className={s.logo} width="469" height="122" />
        <span className={s.badge}>Private demo · {practice}</span>
      </header>

      <main className={s.main}>
        <h1 className={s.h1}>{headline}</h1>
        <p className={s.intro}>{intro}</p>

        <section className={s.callCard} aria-live="polite">
          <div ref={orbRef} className={`${s.orb} ${inCall ? s.orbLive : ""} ${phase === "speaking" ? s.orbSpeaking : ""}`} aria-hidden="true">
            <span className={s.orbCore} />
          </div>
          <p className={s.practice}>{practice}</p>
          <p className={s.status}>{STATUS_LABEL[phase]}</p>

          {inCall ? (
            <button type="button" className={`${s.btn} ${s.btnEnd}`} onClick={stop} disabled={phase === "connecting"}>
              End call
            </button>
          ) : (
            <button type="button" className={s.btn} onClick={start}>
              {phase === "ended" ? "Call again" : "Start the call"}
            </button>
          )}
          {error && <p className={s.error}>{error}</p>}
          {!inCall && !error && (
            <p className={s.hint}>Your browser will ask to use the microphone. Best on a phone, or with headphones.</p>
          )}

          {lines.length > 0 && (
            <div className={s.log} ref={logRef}>
              {lines.map((l, i) => (
                <p key={i} className={l.who === "user" ? s.lineUser : s.lineAgent}>
                  <span className={s.who}>{l.who === "user" ? "You" : "Assistant"}</span>
                  {l.text}
                </p>
              ))}
            </div>
          )}
        </section>

        {tips.length > 0 && (
          <section className={s.block}>
            <h2 className={s.h2}>Things to try</h2>
            <ul className={s.tips}>
              {tips.map((t) => (
                <li key={t}>“{t}”</li>
              ))}
            </ul>
          </section>
        )}

        {notes.length > 0 && (
          <section className={`${s.block} ${s.notes}`}>
            <h2 className={s.h2}>About this demo</h2>
            <ul>
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className={s.foot}>
        Built by <a href="https://automis.ai" target="_blank" rel="noopener">Automis</a>
      </footer>
    </div>
  );
}
