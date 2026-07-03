"use client";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "./_ui";

/*
  Mobile-first content row.
  - On mobile: horizontal scroll-snap carousel with peek + dot indicators
    (shortens the page and invites interaction). Cards are STATIC vertically —
    they only move horizontally with the scroll. The reveal animation lives on
    the desktop grid only, because a vertical translate inside the horizontal
    scroller clips the card's top frame and fights page scroll.
  - On >= md: falls back to a normal responsive grid (pass gridClassName), with
    a staggered scroll-reveal per card.
*/
export default function SwipeRow({ items, gridClassName = "md:grid-cols-2", className = "" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll("[data-swipe-card]");
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle auto-play on mobile: drift one card at a time, ping-ponging back and
  // forth. Touching / swiping / scrolling the row pauses it; it resumes a few
  // seconds after the last interaction. Never runs on desktop, off-screen,
  // when the tab is hidden, or for reduced-motion users.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mq = window.matchMedia("(max-width: 767px)");
    const STEP_MS = 3800; // dwell time per card
    const RESUME_MS = 4000; // idle time before auto-play resumes after a touch

    let paused = false;
    let inView = false;
    let dir = 1;
    let resumeTimer;

    const advance = () => {
      if (paused || !inView || document.hidden || !mq.matches) return;
      const cards = el.querySelectorAll("[data-swipe-card]");
      if (cards.length < 2) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let cur = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
        if (d < best) { best = d; cur = i; }
      });
      let next = cur + dir;
      if (next >= cards.length) { dir = -1; next = cur - 1; }
      else if (next < 0) { dir = 1; next = cur + 1; }
      el.scrollTo({ left: cards[next].offsetLeft - 20, behavior: "smooth" });
    };

    const timer = setInterval(advance, STEP_MS);

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, RESUME_MS);
    };
    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.5 });
      io.observe(el);
    } else {
      inView = true;
    }

    return () => {
      clearInterval(timer);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
      if (io) io.disconnect();
    };
  }, []);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll("[data-swipe-card]")[i];
    if (card) el.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <div className={className}>
      {/* Mobile carousel — cards static, horizontal scroll only. Vertical
          padding gives the card frame + gold top-line room inside the
          overflow-x clip so the top border is never cut. */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="swipe-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-0.5 pt-2 pb-2"
          style={{ scrollPaddingLeft: 20, WebkitOverflowScrolling: "touch" }}
        >
          {items.map((it, i) => (
            <div key={i} data-swipe-card className="flex w-[82%] flex-shrink-0 snap-center first:ml-0">
              <div className="w-full">{it}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1}`}
              className="block rounded-full transition-all duration-300"
              style={{
                // Override the template's global 44px min tap-target so the
                // pagination dots render at their true (small) size.
                minWidth: 0,
                minHeight: 0,
                padding: 0,
                border: 0,
                height: 5,
                width: active === i ? 16 : 5,
                background: active === i ? "linear-gradient(90deg,#3C91E6,#57C7E3)" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid — staggered reveal per card */}
      <div className={`hidden gap-4 md:grid ${gridClassName}`}>
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">{it}</Reveal>
        ))}
      </div>

      <style jsx global>{`
        .swipe-track {
          scrollbar-width: none;
        }
        .swipe-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
