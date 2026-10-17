"use client";
import { useEffect } from "react";
import { loadGsap } from "./gsap";
import { REDUCED, TOUCH } from "./env";
import { smooth } from "./smooth";
import { installFocusGuard } from "./focus";
import "./scroll.css";

/*
  Scroll fluido: Lenis agganciato a gsap ScrollTrigger.
  - Non disegna nulla (restituisce null): si monta una volta per pagina, in qualunque punto dell'albero.
  - Spento con prefers-reduced-motion e sui dispositivi touch: lì resta lo scroll nativo del browser.
    Se l'utente cambia preferenza mentre la pagina è aperta, si accende o si spegne da solo.
  - I link a #ancora (es. «Scopri i sistemi» -> #sistemi) scorrono con Lenis e tengono la distanza
    dall'header fisso (prop `offset`, 88 px come scroll-margin-top del kit).
  - Lenis e ScrollTrigger sono caricati con dynamic import: il primo disegno della pagina non li aspetta.
*/
export default function SmoothScroll({ offset = 88, lerp = 0.1 }) {
  // Il focus da tastiera dentro le scene a scorrimento (focus.js): vale per tutte le pagine che montano SmoothScroll, anche sul tablet con tastiera.
  useEffect(() => installFocusGuard(), []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const reduced = window.matchMedia(REDUCED);
    const touch = window.matchMedia(TOUCH);
    let lenis = null;
    let stop = null;
    let gone = false;
    let starting = false;

    const mount = async () => {
      if (gone || lenis || starting || reduced.matches || touch.matches) return;
      starting = true;
      try {
        const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), loadGsap()]);
        starting = false;
        if (gone || lenis || reduced.matches || touch.matches) return;

        // dentro una finestra di dialogo (es. il banner dei cookie) la rotella resta alla finestra, non alla pagina
        const instance = new Lenis({
          lerp,
          smoothWheel: true,
          prevent: (node) => !!(node && node.closest && node.closest('[role="dialog"], [aria-modal="true"]')),
        });
        lenis = instance;
        smooth.lenis = instance;
        instance.on("scroll", ScrollTrigger.update);
        const tick = (time) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const onClick = (e) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
          if (!a || (a.target && a.target !== "_self")) return;
          const url = new URL(a.href, window.location.href);
          if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
          const id = decodeURIComponent(url.hash.slice(1));
          const el = id ? document.getElementById(id) : null;
          if (!el) return;
          e.preventDefault();
          instance.scrollTo(el, { offset: -offset, duration: 1.3 });
          try {
            window.history.pushState(null, "", url.hash);
          } catch (_) {}
        };
        document.addEventListener("click", onClick, true);

        stop = () => {
          document.removeEventListener("click", onClick, true);
          gsap.ticker.remove(tick);
          instance.off("scroll", ScrollTrigger.update);
          instance.destroy();
          lenis = null;
          if (smooth.lenis === instance) smooth.lenis = null;
          stop = null;
        };
      } catch (_) {
        starting = false; // se Lenis non si carica resta lo scroll del browser
      }
    };

    const unmount = () => {
      if (stop) stop();
    };
    const sync = () => (reduced.matches || touch.matches ? unmount() : mount());

    sync();
    reduced.addEventListener?.("change", sync);
    touch.addEventListener?.("change", sync);
    return () => {
      gone = true;
      reduced.removeEventListener?.("change", sync);
      touch.removeEventListener?.("change", sync);
      unmount();
    };
  }, [offset, lerp]);

  return null;
}
