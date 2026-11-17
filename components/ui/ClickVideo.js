"use client";
import { useEffect, useRef, useState } from "react";
import "./click-video.css";

// Video con voce: parte solo al click (mai in autoplay con l'audio), 4:5 sotto i 768px e 16:9 sopra.
// Il file non si scarica finché non si preme play (preload="none"): la pagina non paga nulla a chi non lo guarda.
// File attesi in public, per ogni `base`: <base>-16x9.mp4, <base>-4x5.mp4 e i due poster .webp con lo stesso nome.
export default function ClickVideo({ base, label, hint = "Guarda il video", caption = "", className = "" }) {
  const videoRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 767px)");
    if (!mq) return undefined;
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const variant = mobile ? "4x5" : "16x9";
  const poster = `${base}-${variant}.webp`;

  // cambio di formato a video già partito (ruota il telefono): si riparte dal poster, si preme di nuovo
  useEffect(() => setStarted(false), [variant]);

  const start = () => {
    setStarted(true);
    // il play parte dopo che il <video> ha la sorgente
    requestAnimationFrame(() => videoRef.current?.play?.().catch(() => {}));
  };

  return (
    <figure className={`cv-wrap ${mobile ? "cv-m" : "cv-d"} ${className}`}>
      <div className="cv">
      {started ? (
        <video
          key={variant}
          ref={videoRef}
          className="cv-v"
          controls
          playsInline
          autoPlay
          preload="auto"
          poster={poster}
          aria-label={label}
        >
          <source src={`${base}-${variant}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <button type="button" className="cv-play" onClick={start} aria-label={`${hint}: ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="cv-poster" decoding="async" />
          <span className="cv-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
      </div>
      {caption ? <figcaption className="cv-cap">{caption}</figcaption> : null}
    </figure>
  );
}
