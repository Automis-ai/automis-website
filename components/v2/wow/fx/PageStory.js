"use client";
import { useEffect } from "react";
import "./story.css";
import { loadGsap } from "../scroll/gsap";
import { RICH, PIN, LITE, REDUCED } from "../scroll/env";
import FxTile from "./FxTile";
import net from "./stages/net";
import steps from "./stages/steps";
import rail from "./stages/rail";
import spine from "./stages/spine";

/*
  Le pagine interne raccontate dallo scroll. Si mette UNA volta dentro <main className={pageClass(...)}> (accanto a SmoothScroll):
  disegna solo il filo della pagina (decorativo, invisibile finché non lo prepara lo script) e monta le coreografie gsap +
  ScrollTrigger sui blocchi marcati con data-story:
    data-story="net"    rete di schede: hub = ricomposizione dei moduli (data-net="assemble"), categorie = catena (data-net="chain")
    data-story="steps"  la catena dei passi di «Come lavoriamo»
    data-story="rail"   la catena di moduli di una pagina (fx/Rail.js): modulo per modulo, con le schede e il numero del caso
  Come HomeStory (home): il HTML del server è già lo stato FINALE (senza JavaScript, o se gsap non si carica, tutto si legge);
  con prefers-reduced-motion non si scarica niente (niente gsap, niente rAF) e la pagina resta ferma; gsap.matchMedia sceglie la
  versione: rich = mouse e da 768 px · pin = rich + schermo grande (la sezione si fissa se ci sta) · lite = telefono e tablet.
  Cambiando finestra o preferenza, tutto si annulla e si ricrea da solo. Nell'ordine: prima i blocchi, per ultimo il filo
  (misura le altre fasce, comprese le altezze delle sezioni fissate).
*/
const STAGES = [
  ["net", net],
  ["steps", steps],
  ["rail", rail],
];
const GLYPHS = ["phone", "calendar", "receipt", "contact", "chat", "target", "pen", "calendar", "phone"];

export default function PageStory() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const main = document.querySelector("main.v2-pg");
    if (!main) return undefined;
    const reduced = window.matchMedia(REDUCED);
    let teardown = null;
    let starting = false;
    let gone = false;

    const mount = () => {
      if (gone || teardown || starting || reduced.matches) return;
      starting = true;
      let cancelled = false;
      let mm = null;
      const timers = [];
      let onLoad = null;
      teardown = () => {
        cancelled = true;
        timers.forEach(clearTimeout);
        if (onLoad) window.removeEventListener("load", onLoad);
        if (mm) mm.revert();
        teardown = null;
      };
      loadGsap()
        .then(({ gsap, ScrollTrigger, SplitText }) => {
          starting = false;
          if (cancelled) return;
          ScrollTrigger.config({ ignoreMobileResize: true });
          mm = gsap.matchMedia();
          mm.add({ rich: RICH, pin: PIN, lite: LITE }, (ctx) => {
            const { rich, pin, lite } = ctx.conditions;
            if (!rich && !lite) return undefined; // prefers-reduced-motion: niente movimento
            const env = { gsap, ScrollTrigger, SplitText, rich: !!rich, pin: !!pin, lite: !!lite, cleanups: [] };
            STAGES.forEach(([name, build]) => {
              main.querySelectorAll(`[data-story="${name}"]`).forEach((el) => {
                try {
                  build(el, env);
                } catch (err) {
                  if (process.env.NODE_ENV !== "production") console.warn(`[page-story] ${name}`, err);
                }
              });
            });
            const sp = main.querySelector('[data-story="spine"]');
            if (sp) {
              try {
                spine(sp, env);
              } catch (err) {
                if (process.env.NODE_ENV !== "production") console.warn("[page-story] spine", err);
              }
            }
            return () => {
              env.cleanups.splice(0).forEach((fn) => {
                try {
                  fn();
                } catch (_) {}
              });
            };
          });
          // font e immagini cambiano le altezze: si ricalcolano le posizioni
          const refresh = () => {
            if (!cancelled) ScrollTrigger.refresh();
          };
          document.fonts?.ready?.then(refresh);
          onLoad = refresh;
          window.addEventListener("load", onLoad);
          timers.push(setTimeout(refresh, 1200));
        })
        .catch(() => {
          // gsap non si è caricato: la pagina resta nello stato finale, leggibile
          starting = false;
          teardown = null;
        });
    };

    const sync = () => {
      if (reduced.matches) {
        if (teardown) teardown();
      } else mount();
    };
    sync();
    reduced.addEventListener?.("change", sync);
    return () => {
      gone = true;
      reduced.removeEventListener?.("change", sync);
      if (teardown) teardown();
    };
  }, []);

  return (
    <div className="v2fx-spine" data-story="spine" aria-hidden="true">
      <i className="v2fx-spine__track" data-s-track />
      <i className="v2fx-spine__fill" data-s-fill />
      <i className="v2fx-spine__feed" data-s-feed />
      <i className="v2fx-spine__feedfill" data-s-feedfill />
      <span className="v2fx-spine__run" data-s-run />
      {GLYPHS.map((g, i) => (
        <span className="v2fx-spine__node" data-s-node key={i}>
          <FxTile glyph={g} size="sm" />
        </span>
      ))}
      <span className="v2fx-spine__pkt" data-s-pkt>
        <b className="v2fx-spine__trail" data-s-trail />
        <b className="v2fx-spine__head" />
      </span>
      <b className="v2fx-spine__head v2fx-spine__feedhead" data-s-feedhead />
    </div>
  );
}
