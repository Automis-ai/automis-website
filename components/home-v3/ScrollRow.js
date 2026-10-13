"use client";
import { useEffect, useRef } from "react";

/*
  Fila di schede che avanza con lo scroll della pagina (proposta di Arcangelo, 12/10): la sezione resta ferma
  mentre le schede scorrono di lato, senza doverle trascinare a mano.
  - Se le schede ci stanno tutte, la fila è ferma e centrata (is-static).
  - Con prefers-reduced-motion niente aggancio: la fila si scorre di lato a mano (is-native).
  - onProgress(k, track) riceve l'avanzamento 0..1, per accendere il capitolo giusto.
*/
export default function ScrollRow({ head, children, className = "", onProgress }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let over = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (row.classList.contains("is-static") || row.classList.contains("is-native")) return;
      const run = row.offsetHeight - window.innerHeight;
      const k = run > 0 ? Math.min(1, Math.max(0, -row.getBoundingClientRect().top / run)) : 0;
      track.style.transform = `translate3d(${(-k * over).toFixed(1)}px,0,0)`;
      if (barRef.current) barRef.current.style.width = `${(k * 100).toFixed(1)}%`;
      cb.current?.(k, track);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const layout = () => {
      track.style.transform = "";
      row.classList.remove("is-static", "is-native");
      row.style.height = "";
      over = track.scrollWidth - track.clientWidth;
      if (over <= 8) {
        row.classList.add("is-static");
        cb.current?.(0, track);
        return;
      }
      if (reduce) {
        row.classList.add("is-native");
        return;
      }
      // la sezione resta agganciata per il tempo che serve a far passare tutte le schede
      row.style.height = `${window.innerHeight + over * 1.1}px`;
      update();
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rowRef} className={`hv3-srow ${className}`}>
      <div className="hv3-srow__stick">
        {head}
        <div ref={trackRef} className="hv3-srow__track">
          {children}
        </div>
        <div className="hv3-prog">
          <i ref={barRef} />
        </div>
      </div>
    </div>
  );
}
