"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Play,
  Pause,
  AudioLines,
  Check,
  ShieldCheck,
  Clock,
  Globe,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";

/* Deterministic bar heights so the idle waveform looks like live speech. */
const WAVE_BARS = [
  0.3, 0.55, 0.85, 0.45, 0.7, 1, 0.4, 0.62, 0.9, 0.5, 0.78, 0.58, 0.34, 0.72,
  0.95, 0.46, 0.66, 0.88, 0.5, 0.8, 0.36, 0.68, 0.6,
];

function fmt(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
}

const HeroSection = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [active, setActive] = useState(-1);
  const [cur, setCur] = useState(0);
  const [audioMsg, setAudioMsg] = useState("");

  const cuesRef = useRef([]);
  const audioRef = useRef(null);
  const envRef = useRef(null); // amplitude envelope (Float32Array, normalized 0..1)
  const envFps = 30;
  const rafRef = useRef(0);
  const barsRef = useRef([]);

  // Load caption cues once.
  useEffect(() => {
    let alive = true;
    fetch("/audio/hero-call.cues.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (alive) cuesRef.current = Array.isArray(d) ? d : [];
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Build a normalized loudness envelope from the file (for the reactive waveform).
  // Decoding is only used for analysis — playback stays on the <audio> element.
  const buildEnvelope = async () => {
    if (envRef.current) return;
    try {
      const res = await fetch("/audio/hero-call.wav");
      const arr = await res.arrayBuffer();
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const audioBuf = await ctx.decodeAudioData(arr);
      ctx.close();
      const ch = audioBuf.getChannelData(0);
      const frames = Math.max(1, Math.round(audioBuf.duration * envFps));
      const block = Math.floor(ch.length / frames) || 1;
      const env = new Float32Array(frames);
      let max = 1e-4;
      for (let i = 0; i < frames; i++) {
        let sum = 0;
        const s = i * block;
        for (let j = s; j < s + block; j += 8) {
          const v = ch[j] || 0;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / (block / 8 || 1));
        env[i] = rms;
        if (rms > max) max = rms;
      }
      for (let i = 0; i < frames; i++) env[i] /= max;
      envRef.current = env;
    } catch {
      /* fall back to the CSS waveform */
    }
  };

  const startViz = () => {
    const half = Math.floor(WAVE_BARS.length / 2);
    const loop = () => {
      const env = envRef.current;
      const audio = audioRef.current;
      if (env && audio) {
        const f = Math.floor(audio.currentTime * envFps);
        const bars = barsRef.current;
        for (let i = 0; i < bars.length; i++) {
          const el = bars[i];
          if (!el) continue;
          const idx = Math.min(env.length - 1, Math.max(0, f - half + i));
          const v = env[idx] ?? 0;
          el.style.animation = "none";
          el.style.transform = `scaleY(${0.12 + Math.min(1, v * 1.4) * 0.9})`;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  const stopViz = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    barsRef.current.forEach((el) => {
      if (el) {
        el.style.transform = "";
        el.style.animation = "";
      }
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setPlaying(true);
      setAudioMsg("");
      startViz();
    };
    const onPause = () => {
      setPlaying(false);
      setActive(-1);
      stopViz();
    };
    const onEnded = () => {
      setPlaying(false);
      setActive(-1);
      setCur(0);
      stopViz();
      audio.currentTime = 0;
    };
    const onTime = () => {
      const ct = audio.currentTime;
      setCur(ct);
      const i = cuesRef.current.findIndex((c) => ct >= c.start && ct < c.end);
      setActive(i);
    };
    const onError = () => {
      const code = audio.error?.code;
      const map = { 1: "abortado", 2: "rede", 3: "descodificação", 4: "formato não suportado" };
      setAudioMsg(`Erro de áudio: ${map[code] || code || "desconhecido"}`);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("error", onError);
      stopViz();
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioMsg("");
    if (audio.paused) {
      buildEnvelope();
      try {
        await audio.play();
      } catch (e) {
        setAudioMsg(`Não foi possível reproduzir: ${e?.name || ""} ${e?.message || ""}`.trim());
      }
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCur(0);
  };

  const cue = active >= 0 ? cuesRef.current[active] : null;

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
              Automis Portugal · agente ativo
            </span>

            <h1
              className="mt-6 font-montserrat text-[2.5rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              data-aos="fade-up"
              data-aos-delay={80}
              data-aos-duration={1100}
            >
              O Seu Assistente de Voz{" "}
              <span className="bg-gradient-to-r from-soft-blue via-bright-blue to-soft-blue bg-clip-text text-transparent">
                Inteligente, 24 horas por dia
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl font-open-sans text-lg leading-relaxed text-white/75 lg:mx-0"
              data-aos="fade-up"
              data-aos-delay={160}
              data-aos-duration={1100}
            >
              Transforme cada chamada numa oportunidade. A nossa inteligência
              artificial de voz gere contactos, qualifica clientes e agenda
              marcações — enquanto se concentra no crescimento do seu negócio.
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
                Agende uma chamada
              </CTAButton>
            </div>

            <ul
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
              data-aos="fade-up"
              data-aos-delay={320}
              data-aos-duration={1100}
            >
              {[
                { icon: Clock, label: "Configuração em 72 horas" },
                { icon: ShieldCheck, label: "Conforme com o RGPD" },
                { icon: Globe, label: "Suporte em português" },
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

          {/* ── Right: the signature — a LIVE PHONE CALL you can hear ── */}
          <div
            className="relative mx-auto w-full max-w-md"
            data-aos="fade-left"
            data-aos-delay={200}
            data-aos-duration={1200}
          >
            <div className="av-gradient-border rounded-[28px] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7">
              <audio ref={audioRef} src="/audio/hero-call.wav" preload="metadata" />

              {/* Call header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bright-blue/15">
                    <Phone className="h-5 w-5 text-bright-blue" strokeWidth={2.2} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-montserrat text-sm font-bold text-white">
                      Cliente
                    </p>
                    <p className="font-plex-mono text-[11px] uppercase tracking-wider text-soft-blue/70">
                      {playing ? "Em chamada" : "Demonstração"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-bright-blue/10 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    {playing && (
                      <span className="av-ping absolute inline-flex h-full w-full rounded-full bg-bright-blue" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-bright-blue" />
                  </span>
                  <span className="font-plex-mono text-xs tabular-nums text-soft-blue">
                    {fmt(cur)}
                  </span>
                </div>
              </div>

              {/* Voice orb with concentric call rings (rings only animate while playing) */}
              <div className="relative my-7 flex flex-col items-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  {playing && (
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
                      playing ? "av-orb" : ""
                    }`}
                  >
                    <AudioLines className="h-8 w-8 text-white" strokeWidth={2} />
                  </span>
                </div>

                {/* Waveform (reacts to real audio while playing) */}
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
                        animationPlayState: playing ? "paused" : "running",
                      }}
                    />
                  ))}
                </div>

                {/* Caption — synced while playing, prompt while idle */}
                <div
                  key={playing ? `cue-${active}` : "idle"}
                  className="av-fade-swap mt-5 flex min-h-[3.5rem] max-w-[92%] flex-col items-center text-center"
                >
                  {playing && cue ? (
                    <>
                      <span
                        className={`mb-1 font-plex-mono text-[10px] font-medium uppercase tracking-[0.16em] ${
                          cue.speaker === "agent"
                            ? "text-bright-blue"
                            : "text-soft-blue/70"
                        }`}
                      >
                        {cue.name}
                      </span>
                      <p className="font-open-sans text-sm leading-snug text-white/90">
                        {cue.text}
                      </p>
                    </>
                  ) : (
                    <p className="font-open-sans text-sm italic leading-snug text-white/70">
                      {playing
                        ? "A ligar…"
                        : "Ouça uma chamada real, em português."}
                    </p>
                  )}
                </div>
              </div>

              {/* Call controls — functional */}
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Reativar som" : "Silenciar"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
                >
                  {muted ? (
                    <MicOff className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <Mic className="h-5 w-5" strokeWidth={2} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pausar chamada" : "Ouvir a chamada"}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bright-blue to-[#1f6fc0] text-white shadow-lg shadow-bright-blue/30 transition-transform hover:scale-105"
                >
                  {playing ? (
                    <Pause className="h-6 w-6 fill-current" strokeWidth={1.5} />
                  ) : (
                    <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={1.5} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={stop}
                  aria-label="Terminar chamada"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/90 text-white shadow-lg shadow-red-500/20 transition-transform hover:scale-105"
                >
                  <PhoneOff className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>

              <p className="mt-3 text-center font-plex-mono text-[11px] uppercase tracking-wider text-soft-blue/60">
                {playing ? "A reproduzir a chamada" : "Carregue em ▶ para ouvir"}
              </p>
              {audioMsg && (
                <p className="mt-1 text-center font-plex-mono text-[11px] text-red-300">
                  {audioMsg}
                </p>
              )}

              {/* Outcome */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-warm-yellow/30 bg-warm-yellow/10 px-4 py-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-yellow/20">
                  <Check className="h-4 w-4 text-warm-yellow" strokeWidth={3} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">
                    Consulta marcada — Qui, 10:30
                  </p>
                  <p className="font-plex-mono text-[11px] text-soft-blue/80">
                    SMS de confirmação enviado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
