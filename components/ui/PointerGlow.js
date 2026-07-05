"use client";
import { useEffect } from "react";

/*
  Publishes the pointer position as CSS custom properties on <html>
  (--glow-x / --glow-y in viewport px, --glow-xp as 0..1 across the width).
  Cards with the `.card-glow` class read these to light their border where the
  cursor is (see home-en-fonts.css). One shared listener drives every card.

  Skipped for touch (no fine pointer) and reduced-motion users. rAF-throttled.
*/
export default function PointerGlow() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    let raf = 0;
    let x = 0;
    let y = 0;

    const flush = () => {
      raf = 0;
      root.style.setProperty("--glow-x", x.toFixed(1));
      root.style.setProperty("--glow-y", y.toFixed(1));
      root.style.setProperty("--glow-xp", (x / window.innerWidth).toFixed(3));
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
