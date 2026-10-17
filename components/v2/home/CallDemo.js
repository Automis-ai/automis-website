"use client";
import { useRef, useState } from "react";
import "@/components/v2/ui/v2.css";
import "./home.css";
import Icon from "@/components/v2/ui/icons";
import Disclosure from "@/components/v2/ui/Disclosure";

/*
  La chiamata da ascoltare, nell'apertura della home. Nessuna rete e nessun modello: è il file audio
  già pubblicato sulle landing voice (voci di esempio), con la conversazione scritta sotto.
  - Non parte da sola: l'audio si scarica solo quando si preme play (preload="none"), così non pesa sulla prima schermata.
  - Senza JavaScript si legge la prima battuta e, nel Disclosure, tutta la conversazione.
  - Le battute (`t.lines`) arrivano dal copy; qui stanno solo i tempi del file audio.
  Props: lang ("en" | "it" | "pt"), t (= home.hero.call del copy).
*/

const AUDIO = {
  en: { src: "/audio/hero-call-en.wav", length: 20.7, starts: [0, 2.88, 5.37, 10.41, 12.17, 16.59, 18.27] },
  it: { src: "/audio/hero-call-it.wav", length: 24.46, starts: [0, 3.32, 6.93, 12.3, 14.03, 19.99, 21.93] },
  pt: { src: "/audio/hero-call.wav", length: 20.88, starts: [0, 2.64, 5.52, 10.49, 12.09, 17.3, 19.16] },
};

// Altezze fisse (0..1): la forma resta uguale a ogni caricamento, niente che cambi tra server e browser.
const BARS = [0.3, 0.55, 0.85, 0.45, 0.7, 1, 0.4, 0.62, 0.9, 0.5, 0.78, 0.58, 0.34, 0.72, 0.95, 0.46, 0.66, 0.88, 0.5, 0.8, 0.36, 0.68, 0.6, 0.42];

function activeLine(starts, time) {
  let idx = 0;
  for (let i = 0; i < starts.length; i++) if (time >= starts[i]) idx = i;
  return idx;
}

export default function CallDemo({ lang = "en", t }) {
  const cfg = AUDIO[lang] || AUDIO.en;
  const audioRef = useRef(null);
  const pending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);

  const active = ended ? t.lines.length - 1 : activeLine(cfg.starts, time);
  const progress = ended ? 1 : Math.min(1, time / cfg.length);
  const label = playing ? t.pause : ended ? t.replay : t.play;

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    // Un secondo tocco mentre il file sta ancora caricando vale come pausa, non come un secondo play.
    if (pending.current || !a.paused) {
      a.pause();
      return;
    }
    if (ended) {
      a.currentTime = 0;
      setEnded(false);
      setTime(0);
    }
    pending.current = true;
    setPlaying(true);
    try {
      await a.play();
    } catch {
      /* pausa durante il caricamento, o riproduzione rifiutata dal browser: si torna fermi */
      setPlaying(false);
    } finally {
      pending.current = false;
    }
  };

  const who = (i) => (i % 2 === 0 ? t.agent : t.caller);

  return (
    <div className="v2-win v2h-call" role="group" aria-label={t.aria}>
      <audio
        ref={audioRef}
        src={cfg.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
      <div className="v2-win__bar">
        <span className="v2-win__avatar" aria-hidden="true">
          <Icon name="phone" size={18} />
        </span>
        <div>
          <span className="v2-win__name">{t.title}</span>
          <span className="v2-win__status">{t.status}</span>
        </div>
      </div>

      <div className="v2h-call__body">
        <div className="v2h-player">
          <button type="button" className="v2h-play" onClick={toggle} aria-label={label}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4.5" height="14" rx="1.2" />
                <rect x="13.5" y="5" width="4.5" height="14" rx="1.2" />
              </svg>
            ) : ended ? (
              <Icon name="repeat" size={24} strokeWidth={2.2} />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            )}
          </button>
          <div className="v2h-wave" aria-hidden="true">
            {BARS.map((h, i) => (
              <i key={i} style={{ "--h": `${Math.round(h * 100)}%` }} data-on={(i + 1) / BARS.length <= progress ? "1" : "0"} />
            ))}
          </div>
        </div>

        <div className="v2h-caption" aria-hidden="true">
          {t.lines.map((text, i) => (
            <p key={i} className="v2h-line" data-on={i === active ? "1" : "0"}>
              <span className="v2h-who">{who(i)}</span>
              <span className="v2h-said">{text}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="v2h-call__foot">
        <Disclosure summary={t.transcript}>
          <ol className="v2h-tr">
            {t.lines.map((text, i) => (
              <li key={i}>
                <b>{who(i)}</b>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </Disclosure>
      </div>
      <p className="v2h-note">{t.note}</p>
    </div>
  );
}
