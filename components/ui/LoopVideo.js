"use client";
import { useEffect, useRef, useState } from "react";

// Muted autoplay loop with a dedicated mobile cut (4:5 under 768px, 16:9 above).
// The source loads only once the panel is near the viewport, pauses off-screen,
// and prefers-reduced-motion gets a still image instead of the video.
export default function LoopVideo({ base, className = "" }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return setReady(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setReduced(rm.matches);
      setReady(true);
    };
    sync();
    mq.addEventListener?.("change", sync);
    rm.addEventListener?.("change", sync);
    return () => {
      mq.removeEventListener?.("change", sync);
      rm.removeEventListener?.("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variant = mobile ? "mobile" : "desktop";
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (visible && !reduced) setSrc(`${base}/${variant}.mp4`);
  }, [visible, reduced, variant, base]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    if (visible) v.play?.().catch(() => {});
    else v.pause?.();
  }, [visible, src]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#04101c] shadow-2xl aspect-[4/5] md:aspect-video ${className}`}
    >
      {!ready ? null : reduced ? (
        <img src={`${base}/${variant}-still.webp`} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          key={variant}
          ref={videoRef}
          src={src || undefined}
          poster={`${base}/${variant}-poster.webp`}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
