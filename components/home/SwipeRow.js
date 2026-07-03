"use client";
import { useRef, useState, useEffect } from "react";

/*
  Mobile-first content row.
  - On mobile: horizontal scroll-snap carousel with peek + dot indicators
    (shortens the page and invites interaction).
  - On >= md: falls back to a normal responsive grid (pass gridClassName).
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

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll("[data-swipe-card]")[i];
    if (card) el.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <div className={className}>
      {/* Mobile carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="swipe-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollPaddingLeft: 20, WebkitOverflowScrolling: "touch" }}
        >
          {items.map((it, i) => (
            <div key={i} data-swipe-card className="flex w-[82%] flex-shrink-0 snap-center first:ml-0">
              <div className="w-full">{it}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 22 : 6,
                background: active === i ? "linear-gradient(90deg,#3C91E6,#57C7E3)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className={`hidden gap-4 md:grid ${gridClassName}`}>
        {items.map((it, i) => (
          <div key={i} className="h-full">{it}</div>
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
