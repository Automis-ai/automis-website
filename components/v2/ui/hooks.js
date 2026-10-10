"use client";
import { useEffect, useRef, useState } from "react";

// true quando l'utente ha chiesto meno movimento.
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Fa partire una demo a copione quando entra nello schermo.
  - Lo stato iniziale (server e primo render) è quello FINALE: senza JavaScript e con
    prefers-reduced-motion si vede subito il risultato.
  - Solo se il movimento è consentito e c'è IntersectionObserver, `armed` diventa true e il
    componente riparte da zero, poi `visible` scatta quando la demo entra nello schermo.
  - `run` cambia quando si chiede di rivedere la demo.
*/
export function useScriptedStart(threshold = 0.45) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    // Parte quando almeno `threshold` della demo è visibile, oppure quando ne occupa una bella fetta di schermo
    // (così una demo più alta dello schermo parte lo stesso).
    const io = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (e) => e.isIntersecting && (e.intersectionRatio >= threshold || e.intersectionRect.height >= window.innerHeight * 0.4)
          )
        ) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1], rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, armed, visible, run, replay: () => setRun((n) => n + 1) };
}
