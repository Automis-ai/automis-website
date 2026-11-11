"use client";
import "@css/fontawesome-5.14.0.min.css";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  AudioLines,
  Check,
  CalendarCheck,
  ShieldCheck,
  Clock,
  Globe,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";

// Lana: the EN lead-qualification + demo-booking agent. The hero card talks to her live through
// the ElevenLabs SDK (no widget, no third-party branding). Her booking tool is `book_appointment`.
const AGENT_ID = "agent_4001k7szwpqcetwvp9de8c3dqm25";
const BOOKING_TOOL = "book_appointment";

/* Bar heights for the idle waveform (CSS-animated until a call starts). */
const WAVE_BARS = [
  0.3, 0.55, 0.85, 0.45, 0.7, 1, 0.4, 0.62, 0.9, 0.5, 0.78, 0.58, 0.34, 0.72,
  0.95, 0.46, 0.66, 0.88, 0.5, 0.8, 0.36, 0.68, 0.6,
];

const STATUS = {
  idle: "AI assistant",
  connecting: "Connecting…",
  listening: "Listening",
  speaking: "Speaking",
  ended: "Call ended",
};

function fmt(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
}

// Voice tags such as [short pause] shape delivery, they are not words.
const clean = (t) => (t || "").replace(/\[[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim();

// A booking counts only on the full tool payload (client event agent_tool_response_full_payload, enabled on
// Lana) when the n8n webhook answered booked:true. A rejected slot also returns HTTP 200 (booked:false), and
// the short agent_tool_response event carries no result at all, so it never counts.
const isBooked = (r) => {
  if (r?.tool_name !== BOOKING_TOOL || r.is_error || r.is_called === false) return false;
  if (typeof r.full_tool_result !== "string") return false;
  try {
    return JSON.parse(r.full_tool_result)?.booked === true;
  } catch {
    return /["']?booked["']?\s*[:=]\s*true/i.test(r.full_tool_result);
  }
};

const HeroSection = () => {
  const [phase, setPhase] = useState("idle"); // idle | connecting | listening | speaking | ended
  const [muted, setMuted] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [secs, setSecs] = useState(0);
  const [line, setLine] = useState(null); // { who: "agent" | "user", text }
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");
  const [cardInView, setCardInView] = useState(true);
  const [bookingInView, setBookingInView] = useState(false);

  const convRef = useRef(null);
  const wakeRef = useRef(null);
  const cardRef = useRef(null);
  const barsRef = useRef([]);
  const mountedRef = useRef(true);

  const inCall = phase === "connecting" || phase === "listening" || phase === "speaking";
  const live = phase === "listening" || phase === "speaking";

  // Call timer.
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [live]);

  // Waveform driven by the live audio: Lana's voice while she speaks, the mic while she listens.
  useEffect(() => {
    if (!live) return;
    const bars = barsRef.current;
    const n = WAVE_BARS.length;
    const half = Math.floor(n / 2);
    let raf;
    const tick = () => {
      const c = convRef.current;
      if (c) {
        let data;
        try {
          data = phase === "speaking" ? c.getOutputByteFrequencyData() : c.getInputByteFrequencyData();
        } catch {
          data = null;
        }
        const vol = (() => {
          try {
            return phase === "speaking" ? c.getOutputVolume() : c.getInputVolume();
          } catch {
            return 0;
          }
        })();
        // Speech energy sits in the lower bins: centre bar = lowest band, edges = higher bands.
        const usable = data && data.length ? Math.max(half + 1, Math.floor(data.length * 0.35)) : 0;
        for (let i = 0; i < n; i++) {
          const el = bars[i];
          if (!el) continue;
          const d = Math.abs(i - half);
          let v;
          if (usable) {
            const bin = Math.min(usable - 1, 1 + Math.floor((d / (half + 1)) * usable));
            v = data[bin] / 255;
          } else {
            v = vol * WAVE_BARS[i];
          }
          el.style.animation = "none";
          el.style.transform = `scaleY(${0.12 + Math.min(1, v * 1.25) * 0.88})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      bars.forEach((el) => {
        if (el) {
          el.style.transform = "";
          el.style.animation = "";
        }
      });
    };
  }, [live, phase]);

  // Phones: once the card scrolls away, a sticky pill brings the visitor back to it
  // (hidden again over the booking calendar, so it never covers its buttons).
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setCardInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    const booking = document.getElementById("agendar");
    const io2 = booking
      ? new IntersectionObserver(([e]) => setBookingInView(e.isIntersecting), { threshold: 0 })
      : null;
    if (booking) io2.observe(booking);
    return () => {
      io.disconnect();
      io2?.disconnect();
    };
  }, []);

  const releaseWake = () => {
    wakeRef.current?.release?.().catch(() => {});
    wakeRef.current = null;
  };

  // Close the session (and free the screen) if the visitor leaves the page, even mid-connect:
  // start() checks mountedRef after each await and hangs up a session that arrives too late.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      convRef.current?.endSession();
      convRef.current = null;
      releaseWake();
    };
  }, []);

  const start = async () => {
    setError("");
    setLine(null);
    setBooked(false);
    setMuted(false);
    setSpeakerOff(false);
    setSecs(0);
    setPhase("connecting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      if (!mountedRef.current) return;
      setPhase("idle");
      setError("Your microphone is blocked. Allow it for this page, then try again.");
      return;
    }
    if (!mountedRef.current) return;
    try {
      const lock = await navigator.wakeLock?.request("screen");
      if (!mountedRef.current) {
        lock?.release?.().catch(() => {});
        return;
      }
      wakeRef.current = lock || null;
    } catch {
      // Not supported or refused: the call still works, the screen may just dim.
    }
    try {
      const { Conversation } = await import("@elevenlabs/client");
      if (!mountedRef.current) return;
      const conv = await Conversation.startSession({
        agentId: AGENT_ID,
        onConnect: () => setPhase("listening"),
        onModeChange: ({ mode }) => setPhase(mode === "speaking" ? "speaking" : "listening"),
        onMessage: ({ message, role, source }) => {
          const text = clean(message);
          if (!text || text === "...") return;
          setLine({ who: (role || source) === "user" ? "user" : "agent", text });
        },
        onAgentToolResponse: (r) => {
          if (isBooked(r)) setBooked(true);
        },
        onDisconnect: () => {
          convRef.current = null;
          releaseWake();
          if (mountedRef.current) setPhase("ended");
        },
        onError: () => {
          if (mountedRef.current) setError("Something went wrong with the call. Please try again.");
        },
      });
      // The visitor left while we were connecting: hang up instead of leaving a billed call running.
      if (!mountedRef.current) {
        conv.endSession();
        return;
      }
      convRef.current = conv;
    } catch {
      convRef.current = null;
      releaseWake();
      if (!mountedRef.current) return;
      setPhase("idle");
      setError("We couldn't connect the call. Check your connection and try again.");
    }
  };

  const hangUp = async () => {
    await convRef.current?.endSession();
  };

  const toggleMute = () => {
    const c = convRef.current;
    if (!c) return;
    c.setMicMuted(!muted);
    setMuted(!muted);
  };

  const toggleSpeaker = () => {
    const c = convRef.current;
    if (!c) return;
    c.setVolume({ volume: speakerOff ? 1 : 0 });
    setSpeakerOff(!speakerOff);
  };

  // Vertical-only scroll: scrollIntoView would also shift the body sideways (it hides horizontal overflow).
  const goToCard = () => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const top = window.scrollY + r.top - Math.max(16, (window.innerHeight - r.height) / 2);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const idleLine =
    phase === "ended"
      ? "Call ended. Tap the phone to talk to Lana again."
      : "Talk to Lana, live. Ask her anything, or let her book you a call with our team.";

  return (
    <section
      id="hero"
      className="relative block overflow-hidden bg-deep-blue hero-padding"
    >
      {/* Ambient brand glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="av-glow absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-bright-blue/25 blur-[120px]" />
        <div
          className="av-glow absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-warm-yellow/10 blur-[130px]"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180,194,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(180,194,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Left: message ── */}
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-bright-blue/25 bg-bright-blue/10 px-4 py-2 font-plex-mono text-xs font-medium uppercase tracking-[0.14em] text-soft-blue backdrop-blur-md"
              data-aos="fade-up"
              data-aos-duration={900}
            >
              <span className="relative flex h-2 w-2">
                <span className="av-ping absolute inline-flex h-full w-full rounded-full bg-bright-blue" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bright-blue" />
              </span>
              Automis · agent live
            </span>

            <h1
              className="mt-6 font-montserrat text-[2.5rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              data-aos="fade-up"
              data-aos-delay={80}
              data-aos-duration={1100}
            >
              Every call answered, day and night,{" "}
              <span className="bg-gradient-to-r from-soft-blue via-bright-blue to-soft-blue bg-clip-text text-transparent">
                so you stop losing customers to voicemail
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl font-open-sans text-lg leading-relaxed text-white/75 lg:mx-0"
              data-aos="fade-up"
              data-aos-delay={160}
              data-aos-duration={1100}
            >
              Our voice assistant answers every call, takes the details and books the
              appointment while you get on with your day.
            </p>

            <div
              className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
              data-aos="fade-up"
              data-aos-delay={240}
              data-aos-duration={1100}
            >
              <CTAButton
                href="#agendar"
                variant="primary"
                size="large"
                icon="fas fa-calendar-check"
              >
                Book a free 30-minute call
              </CTAButton>
            </div>

            <ul
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
              data-aos="fade-up"
              data-aos-delay={320}
              data-aos-duration={1100}
            >
              {[
                { icon: Clock, label: "Live in about 7 days" },
                { icon: ShieldCheck, label: "GDPR compliant" },
                { icon: Globe, label: "Natural English voice" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-white/70"
                >
                  <Icon className="h-4 w-4 text-warm-yellow" strokeWidth={2.2} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: the signature — a LIVE CALL with Lana, from the browser ── */}
          <div
            className="relative mx-auto w-full max-w-md"
            data-aos="fade-left"
            data-aos-delay={200}
            data-aos-duration={1200}
          >
            <div
              ref={cardRef}
              id="hero-call"
              className="av-gradient-border scroll-mt-24 rounded-[28px] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7"
            >
              {/* Call header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bright-blue/15">
                    <Phone className="h-5 w-5 text-bright-blue" strokeWidth={2.2} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-montserrat text-sm font-bold text-white">Lana</p>
                    <p className="font-plex-mono text-[11px] uppercase tracking-wider text-soft-blue/70">
                      {STATUS[phase]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-bright-blue/10 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    {live && (
                      <span className="av-ping absolute inline-flex h-full w-full rounded-full bg-bright-blue" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-bright-blue" />
                  </span>
                  <span className="font-plex-mono text-xs tabular-nums text-soft-blue">
                    {live ? fmt(secs) : "Live"}
                  </span>
                </div>
              </div>

              {/* Voice orb with concentric call rings (rings only animate during a call) */}
              <div className="relative my-7 flex flex-col items-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  {inCall && (
                    <>
                      <span className="av-ring absolute inset-0 rounded-full border border-bright-blue/40" />
                      <span
                        className="av-ring absolute inset-0 rounded-full border border-bright-blue/40"
                        style={{ animationDelay: "0.85s" }}
                      />
                      <span
                        className="av-ring absolute inset-0 rounded-full border border-bright-blue/40"
                        style={{ animationDelay: "1.7s" }}
                      />
                    </>
                  )}
                  <span
                    className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-bright-blue to-[#1f6fc0] ${
                      phase === "speaking" || phase === "connecting" ? "av-orb" : ""
                    }`}
                  >
                    <AudioLines className="h-8 w-8 text-white" strokeWidth={2} />
                  </span>
                </div>

                {/* Waveform (follows the real voices during a call) */}
                <div className="mt-6 flex h-10 items-center justify-center gap-[3px]">
                  {WAVE_BARS.map((h, i) => (
                    <span
                      key={i}
                      ref={(el) => (barsRef.current[i] = el)}
                      className="av-wave-bar w-[3px] rounded-full bg-gradient-to-t from-bright-blue/40 to-bright-blue"
                      style={{
                        height: `${Math.round(h * 100)}%`,
                        animationDelay: `${(i % 10) * 0.09}s`,
                        animationDuration: `${0.85 + (i % 4) * 0.18}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Caption: the live conversation during a call, an invitation otherwise */}
                <div
                  key={live && line ? `${line.who}-${line.text}` : phase}
                  className="av-fade-swap mt-5 flex min-h-[3.5rem] max-w-[92%] flex-col items-center text-center"
                  aria-live="polite"
                >
                  {live && line ? (
                    <>
                      <span
                        className={`mb-1 font-plex-mono text-[10px] font-medium uppercase tracking-[0.16em] ${
                          line.who === "agent" ? "text-bright-blue" : "text-soft-blue/70"
                        }`}
                      >
                        {line.who === "agent" ? "Lana" : "You"}
                      </span>
                      <p
                        className="font-open-sans text-sm leading-snug text-white/90"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {line.text}
                      </p>
                    </>
                  ) : (
                    <p className="font-open-sans text-sm italic leading-snug text-white/70">
                      {inCall ? "Connecting you to Lana…" : idleLine}
                    </p>
                  )}
                </div>
              </div>

              {/* Call controls: mic, call / hang up, speaker */}
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!live}
                  aria-label={muted ? "Unmute your microphone" : "Mute your microphone"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
                >
                  {muted ? <MicOff className="h-5 w-5" strokeWidth={2} /> : <Mic className="h-5 w-5" strokeWidth={2} />}
                </button>

                {inCall ? (
                  <button
                    type="button"
                    onClick={hangUp}
                    disabled={phase === "connecting"}
                    aria-label="End the call"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/90 text-white shadow-lg shadow-red-500/25 transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <PhoneOff className="h-6 w-6" strokeWidth={2.2} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={start}
                    aria-label="Call Lana"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bright-blue to-[#1f6fc0] text-white shadow-lg shadow-bright-blue/30 transition-transform hover:scale-105"
                  >
                    <Phone className="h-6 w-6 fill-current" strokeWidth={1.5} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={toggleSpeaker}
                  disabled={!live}
                  aria-label={speakerOff ? "Turn Lana's voice back on" : "Mute Lana's voice"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
                >
                  {speakerOff ? (
                    <VolumeX className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <Volume2 className="h-5 w-5" strokeWidth={2} />
                  )}
                </button>
              </div>

              <p className="mt-3 text-center font-plex-mono text-[11px] uppercase tracking-wider text-soft-blue/60">
                {live ? "Live call · speak normally" : inCall ? "Allow the microphone" : "Tap the phone to talk · uses your mic"}
              </p>
              {error && (
                <p className="mt-1 text-center font-plex-mono text-[11px] text-red-300">{error}</p>
              )}

              {/* Outcome: lights up only when Lana has really booked the call */}
              {booked ? (
                <div className="av-fade-swap mt-5 flex items-center gap-3 rounded-xl border border-warm-yellow/30 bg-warm-yellow/10 px-4 py-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-yellow/20">
                    <Check className="h-4 w-4 text-warm-yellow" strokeWidth={3} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">Call booked with our team</p>
                    <p className="font-plex-mono text-[11px] text-soft-blue/80">It's in our calendar</p>
                  </div>
                </div>
              ) : (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-bright-blue/20 bg-bright-blue/[0.06] px-4 py-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-bright-blue/15">
                    <CalendarCheck className="h-4 w-4 text-bright-blue" strokeWidth={2.4} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">She can book your call, live</p>
                    <p className="font-plex-mono text-[11px] text-soft-blue/80">
                      The same tech we build for your business
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Phones: sticky way back to the call once the card has scrolled away */}
      <button
        type="button"
        onClick={goToCard}
        aria-hidden={cardInView || bookingInView}
        tabIndex={cardInView || bookingInView ? -1 : 0}
        className={`fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-bright-blue/30 bg-[#000a14]/90 px-5 py-3 font-montserrat text-sm font-bold text-white shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 lg:hidden ${
          cardInView || bookingInView ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {live ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="av-ping absolute inline-flex h-full w-full rounded-full bg-bright-blue" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bright-blue" />
            </span>
            On call with Lana · <span className="font-plex-mono tabular-nums">{fmt(secs)}</span>
          </>
        ) : (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-bright-blue to-[#1f6fc0]">
              <Phone className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
            </span>
            Talk to Lana live
          </>
        )}
      </button>
    </section>
  );
};

export default HeroSection;
