"use client";
import { useEffect, useRef, useState } from "react";
import "./hero.css";
import { bindRunway } from "./runway";
import { revealTitle } from "./title";

/*
  Sfondo della hero della home: la rete 3D dei moduli Automis (brief §13).
  - Il server rende lo sfondo statico (.v2hp-aurora) e l'immagine ferma (still): il testo della hero non aspetta il 3D.
    Lo still è nel DOM dall'inizio, sotto il canvas, già scaricato ma invisibile (non entra nell'LCP): diventa pieno solo nei ripieghi.
  - Il 3D parte dopo il primo disegno (dynamic import senza SSR, poi three con import() dentro l'effetto).
    Su desktop subito dopo l'idratazione; sul telefono dopo «load», nel tempo morto, per non rubare banda al testo.
  - Con prefers-reduced-motion, senza WebGL, con risparmio dati, se la scena fallisce o il dispositivo è troppo lento:
    lo still diventa pieno, mai uno scatto.
  - Telefono: la stessa scena in versione leggera (altra disposizione, meno punti, meno pacchetti, niente mouse).
  - La pista di scorrimento (hero ferma per ~110svh) è CSS (hero.css); runway.js ne misura l'avanzamento.
*/
// Il guscio della scena si carica a mano (non con next/dynamic): se il chunk non arriva la hero ripiega sullo still,
// mentre con next/dynamic l'errore salirebbe fino al bordo d'errore e porterebbe giù tutta la pagina.
const loadScene = () => import("./NetworkScene");

// Desktop: il 3D comincia a scendere appena il modulo viene eseguito, prima ancora dell'idratazione, così le tessere
// possono comparire mentre il titolo entra (~0,5 s con la cache calda). Telefono, risparmio dati e reduced motion: no (resta il rinvio al «load»).
let prefetched = false;
function prefetch3d() {
  if (prefetched || typeof window === "undefined") return;
  try {
    const mm = window.matchMedia;
    if (!mm) return;
    if (mm("(prefers-reduced-motion: reduce)").matches) return;
    if (mm("(max-width: 767px)").matches || mm("(pointer: coarse)").matches) return;
    if (navigator.connection && navigator.connection.saveData) return;
    prefetched = true;
    loadScene().catch(() => {});
    import("./scene/engine").catch(() => {});
  } catch (e) {
    /* nessun prefetch: il 3D parte comunque dopo l'idratazione */
  }
}
prefetch3d();

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return false;
    const lose = gl.getExtension("WEBGL_lose_context");
    if (lose) lose.loseContext();
    return true;
  } catch (e) {
    return false;
  }
}

function isMobileProfile() {
  return window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(pointer: coarse)").matches;
}

export default function NetworkHeroBg({ lang = "en" }) {
  // idle: solo sfondo statico · scene: 3D montato · still: immagine ferma piena
  const [mode, setMode] = useState("idle");
  const [mobile, setMobile] = useState(false);
  const [Scene, setScene] = useState(null);
  const rootRef = useRef(null);
  const runwayRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sec = rootRef.current ? rootRef.current.closest(".v2-phero") : null;
    if (sec && !mq.matches) runwayRef.current = bindRunway(sec);
    // titolo a parole (solo desktop con mouse); la prima parola non prima di ~0,3 s dall'apertura
    if (sec && !mq.matches && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches) {
      try {
        revealTitle(sec.querySelector(".v2-phero__h1"), { delay: Math.max(0, 300 - performance.now()) });
      } catch (e) {
        /* il titolo resta quello del server */
      }
    }
    let cancelled = false;
    let idleHandle = null;
    let timer = null;
    let onLoad = null;
    let raf = 0;

    const cancelPending = () => {
      if (idleHandle && window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
      if (timer) clearTimeout(timer);
      if (onLoad) window.removeEventListener("load", onLoad);
      if (raf) cancelAnimationFrame(raf);
      idleHandle = timer = onLoad = null;
      raf = 0;
    };

    const start = () => {
      if (cancelled) return;
      if (mq.matches) return setMode("still");
      // risparmio dati attivo: niente 3D da scaricare
      if (navigator.connection && navigator.connection.saveData) return setMode("still");
      if (!hasWebGL()) return setMode("still");
      setMobile(isMobileProfile());
      loadScene()
        .then((m) => {
          if (cancelled) return;
          setScene(() => m.default);
          setMode("scene");
        })
        .catch(() => !cancelled && setMode("still"));
    };

    const schedule = () => {
      cancelPending();
      if (mq.matches) return setMode("still");
      setMode((m) => (m === "scene" ? "idle" : m));
      const phone = isMobileProfile();
      if (!phone) {
        // desktop: il chunk è già in arrivo (prefetch3d) e il primo disegno del testo c'è stato prima dell'idratazione: la scena parte subito
        start();
        return;
      }
      const go = () => {
        if (cancelled) return;
        if (window.requestIdleCallback) idleHandle = window.requestIdleCallback(start, { timeout: 900 });
        else timer = setTimeout(start, 200);
      };
      if (document.readyState === "complete") go();
      else {
        onLoad = go;
        window.addEventListener("load", onLoad, { once: true });
        // se «load» tarda (rete lenta), parte comunque
        timer = setTimeout(go, 3500);
      }
    };

    schedule();
    const onChange = () => {
      if (mq.matches && runwayRef.current) {
        runwayRef.current.dispose();
        runwayRef.current = null;
      } else if (!mq.matches && !runwayRef.current && sec) runwayRef.current = bindRunway(sec);
      schedule();
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);

    // da telefono a desktop (rotazione, ridimensionamento): serve l'altro profilo della scena
    const bp = window.matchMedia("(max-width: 767px)");
    const onBp = () => setMobile(isMobileProfile());
    if (bp.addEventListener) bp.addEventListener("change", onBp);

    return () => {
      cancelled = true;
      cancelPending();
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
      if (bp.removeEventListener) bp.removeEventListener("change", onBp);
      if (runwayRef.current) {
        runwayRef.current.dispose();
        runwayRef.current = null;
      }
    };
  }, []);

  // senza 3D la pista di scorrimento non serve: la sezione si ritira a uno schermo e il testo non sfuma più
  useEffect(() => {
    const sec = rootRef.current ? rootRef.current.closest(".v2-phero") : null;
    if (!sec || mode !== "still") return undefined;
    sec.setAttribute("data-wow-fallback", "");
    // il motore toglie data-wow-live smontandosi; qui si è sicuri che lo still non resti nascosto
    const bg = rootRef.current.parentElement;
    if (bg) bg.removeAttribute("data-wow-live");
    if (runwayRef.current) {
      runwayRef.current.dispose();
      runwayRef.current = null;
    }
    return () => sec.removeAttribute("data-wow-fallback");
  }, [mode]);

  return (
    <>
      <div ref={rootRef} className="v2hp-aurora wow-hero-aurora" data-lang={lang}>
        <i />
        <i />
      </div>
      <picture className={`wow-hero-still${mode === "still" ? " is-on" : ""}`}>
        <source media="(max-width: 767px)" srcSet="/media/hero-network/still-mobile.webp" />
        <img
          src="/media/hero-network/still-desktop.webp"
          alt=""
          width="1440"
          height="900"
          loading="eager"
          decoding="async"
        />
      </picture>
      {mode === "scene" && Scene ? (
        <Scene key={mobile ? "m" : "d"} mobile={mobile} lang={lang} runwayRef={runwayRef} onFail={() => setMode("still")} />
      ) : null}
    </>
  );
}
