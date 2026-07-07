"use client";
import { useEffect } from "react";

/*
  Drives the cursor-follow gold border glow on `.card-glow` cards.

  One delegated pointermove listener: for whichever `.card-glow` the cursor is
  over, it writes --mx / --my as LOCAL coordinates (px from that card's own
  top-left). The CSS (components/site/design-system.css) paints a masked gold
  spotlight on the border at (--mx, --my). Local per-card coords are the fix for
  the old viewport-based approach, which — because a filter makes a fixed-attach
  background resolve per element — only lit cards near the viewport origin.

  Skipped for touch (no fine pointer) and reduced-motion users. rAF-throttled;
  only the hovered card is ever written to.
*/
export default function PointerGlow() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let el = null;
    let x = 0;
    let y = 0;

    const flush = () => {
      raf = 0;
      if (el) {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      }
    };

    const onMove = (e) => {
      const card = e.target.closest ? e.target.closest(".card-glow") : null;
      if (!card) {
        el = null;
        return;
      }
      const r = card.getBoundingClientRect();
      el = card;
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
