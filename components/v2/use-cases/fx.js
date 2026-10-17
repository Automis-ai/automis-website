"use client";
import { useEffect, useRef } from "react";

/*
  Movimento delle pagine dei casi studio. Le entrate allo scroll, i titoli a parole e l'inclinazione delle schede
  non stanno qui: li dà il kit (components/v2/wow/fx) con gli attributi data-fx (Section, SectionHeader, data-fx="tilt",
  data-fx="stagger"). Qui resta solo ciò che il kit non ha:

  InView     segna quando un disegno è arrivato nello schermo (data-iv), così pallini, barre e foto si accendono a tempo.
  CountUp    il numero entra cifra per cifra quando arriva nello schermo. Il valore è SEMPRE quello vero, in ogni istante:
             niente conteggio da zero (a metà corsa si leggeva un numero sbagliato). Come la pila della home.
  LiveStage  palco che segue il puntatore (se max > 0) e mette in pausa le animazioni CSS fuori schermo.

  Regole comuni:
  - Lo stato di partenza (server, primo render, senza JavaScript) è quello FINALE: il testo c'è sempre.
    Solo dopo il montaggio, e solo per ciò che sta sotto la piega, il disegno passa a "nascosto" e poi entra.
  - prefers-reduced-motion: niente di tutto questo, si vede subito il risultato.
  - Solo transform e opacity.
  Stile in use-cases.css (.v2c-cu, .v2c-live, e le regole [data-iv]).
*/

const reduced = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- InView ---------- */
/* data-iv: assente = visibile (server, senza JS) · "out" = in attesa · "in" = arrivato. Non muove il contenitore:
   cambiano solo i disegni che contiene (regole [data-iv] in use-cases.css). */
export function InView({ as: Tag = "div", className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || typeof IntersectionObserver === "undefined") return;
    // già nello schermo al montaggio: parte subito
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.dataset.iv = "in";
      return;
    }
    el.dataset.iv = "out";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.iv = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- CountUp ---------- */
/*
  `text` è la cifra come si legge («872», «2.329», «Circa 280»). Il valore vero sta nel DOM dal server e non cambia mai:
  ogni carattere è un suo span e l'entrata muove solo transform e opacity (le cifre si alzano e si raddrizzano a scaglioni,
  come tessere che si compongono). Nessun conteggio da zero, quindi nessun istante con un numero sbagliato.
  Si prepara solo ciò che sta sotto la piega al montaggio (data-cu="out"); quello che si vede già resta fermo.
  Con prefers-reduced-motion e senza JavaScript il numero è fermo e intero. Chi usa uno screen reader legge il valore intero.
  data-cu: assente (server, già visibile, reduced motion) · "out" (in attesa, sotto la piega) · "in" (entrata in corso).
*/
export function CountUp({ text, delay = 0, className }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el || reduced() || typeof IntersectionObserver === "undefined") return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return undefined;
    el.dataset.cu = "out";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        el.dataset.cu = "in";
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.cu;
    };
  }, [text]);

  return (
    <span ref={root} className={`v2c-cu${className ? ` ${className}` : ""}`} style={{ "--cu-delay": `${delay}ms` }}>
      <span className="v2c-sr">{text}</span>
      <span className="v2c-cu__txt" aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span key={i} className="v2c-cu__ch" style={{ "--k": i }}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ---------- puntatore → inclinazione (solo per il palco) ---------- */
/*
  Imposta --rx, --ry (gradi) e --gx, --gy (px dentro l'elemento) mentre il puntatore si muove, con un solo
  requestAnimationFrame per fotogramma. Mouse e penna: al passaggio. Tocco: finché il dito è giù (se il browser
  prende lo scroll arriva pointercancel e tutto torna a zero). data-tilt="on" accende la transizione veloce.
*/
function useTilt(ref, max) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !max || reduced()) return;
    let raf = 0;
    let nx = 0;
    let ny = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--rx", `${(-ny * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(nx * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${px.toFixed(0)}px`);
      el.style.setProperty("--gy", `${py.toFixed(0)}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const track = (e) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      nx = Math.max(-1, Math.min(1, (px / r.width) * 2 - 1));
      ny = Math.max(-1, Math.min(1, (py / r.height) * 2 - 1));
      schedule();
    };
    const on = (e) => {
      el.dataset.tilt = "on";
      track(e);
    };
    const off = () => {
      delete el.dataset.tilt;
      nx = 0;
      ny = 0;
      schedule();
    };
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerdown", on);
    el.addEventListener("pointermove", track);
    el.addEventListener("pointerleave", off);
    const up = (e) => {
      if (e.pointerType !== "mouse") off();
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", off);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointerdown", on);
      el.removeEventListener("pointermove", track);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", off);
    };
  }, [ref, max]);
}

/* ---------- LiveStage ---------- */
/* data-live="true" solo quando il palco è nello schermo e la scheda è visibile: altrimenti le animazioni CSS
   dentro stanno in pausa (regola .v2c-live[data-live="false"] in use-cases.css). */
export function LiveStage({ max = 5, className, children, ...rest }) {
  const ref = useRef(null);
  useTilt(ref, max);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    const sync = () => {
      el.dataset.live = inView && !document.hidden ? "true" : "false";
    };
    sync();
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "80px 0px" }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div ref={ref} className={`v2c-live${className ? ` ${className}` : ""}`} {...rest}>
      {children}
    </div>
  );
}
