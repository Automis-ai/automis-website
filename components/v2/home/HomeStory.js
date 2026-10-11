"use client";
import { useEffect } from "react";
import { loadGsap } from "@/components/v2/wow/scroll/gsap";
import { RICH, PIN, LITE, REDUCED } from "@/components/v2/wow/scroll/env";
import { magnetic } from "@/components/v2/wow/scroll/pointer";
import handoff from "./stages/handoff";
import cats from "./stages/cats";
import how from "./stages/how";
import cases from "./stages/cases";
import finder from "./stages/finder";
import authority from "./stages/authority";
import call from "./stages/call";
import spine from "./stages/spine";

/*
  La home raccontata dallo scroll: tutto ciò che sta SOTTO la hero.
  Non disegna niente (null): cerca le sezioni per attributo data-wow e ci monta le coreografie gsap + ScrollTrigger,
  nell'ordine in cui compaiono nella pagina (serve a ScrollTrigger per calcolare bene le sezioni fissate).

  - Il HTML che arriva dal server è già lo stato FINALE: senza JavaScript, o se gsap non si carica, tutto si legge.
  - gsap è caricato con dynamic import (components/v2/wow/scroll/gsap.js) dopo il primo disegno, e SOLO se il movimento è
    consentito: con prefers-reduced-motion non si scarica niente (niente gsap, niente ScrollTrigger, niente ciclo di
    requestAnimationFrame) e la pagina resta ferma. Se la preferenza cambia a pagina aperta, parte o si spegne da sola.
  - gsap.matchMedia sceglie la versione:
      rich = mouse vero e almeno 768 px (3D, inclinazioni, magneti)
      pin  = rich + schermo grande abbastanza per fissare una sezione (casi studio)
      lite = telefono e tablet (entrate semplici, niente sezioni fissate, niente inclinazione)
      nessuno dei due = prefers-reduced-motion: non si crea niente, la pagina resta ferma e leggibile.
    Cambiando finestra o preferenza, tutto si annulla e si ricrea da solo (revert).
*/

// «spine» per ultimo: misura le altre sezioni (comprese le altezze delle sezioni fissate) e ci appoggia il filo.
// «handoff» per primo: sovrappone le categorie alla fine della pista della hero (prima che le altre misurino la pagina).
const STAGES = [
  ["cats", handoff],
  ["cats", cats],
  ["how", how],
  ["cases", cases],
  ["finder", finder],
  ["authority", authority],
  ["call", call],
  ["spine", spine],
];

/*
  Il bottone fisso del telefono («Raccontaci il tuo caso», sta in layouts/AkpagerLayout.js) a larghezza piena restava sopra il
  testo per tutto lo scroll. Sulla home: pillola compatta (attributo data-v2hp-sticky, stile in home.css) che sparisce
  (data-v2hp-sticky="off") in due casi:
  - una CTA di sezione o una scheda con i suoi comandi è in vista: le schede delle categorie, le carte dei casi, la carta
    «journey», il Finder (le risposte stanno proprio dove sta la pillola) e la chiusura con la call;
  - un titolo di sezione (h2) sta nella fascia bassa dello schermo, cioè dove sta la pillola: la pillola non copre mai un titolo.
  Si usano attributi data-* e non classi: React riscrive className a ogni cambio di stato del layout e cancellerebbe le
  classi aggiunte da qui. Solo IntersectionObserver: niente gsap, niente rAF, quindi vale anche con prefers-reduced-motion.
*/
function useStickyPill() {
  useEffect(() => {
    const glow = document.querySelector(".mobile-sticky-glow");
    const pill = glow && glow.parentElement;
    if (!pill || typeof IntersectionObserver === "undefined") return undefined;
    pill.setAttribute("data-v2hp-sticky", "on");
    const big = new Set(); // sezioni con i loro comandi
    const zone = new Set(); // titoli nella fascia della pillola
    const apply = () => pill.setAttribute("data-v2hp-sticky", big.size + zone.size > 0 ? "off" : "on");
    const track = (set) => (entries) => {
      entries.forEach((e) => (e.isIntersecting ? set.add(e.target) : set.delete(e.target)));
      apply();
    };
    const ioBig = new IntersectionObserver(track(big), { rootMargin: "-8% 0px -8% 0px" });
    // la fascia della pillola: il 30% più basso dello schermo, più 24 px sopra (la pillola è alta 44 e sta a ~16 px dal fondo)
    const ioZone = new IntersectionObserver(track(zone), { rootMargin: "-70% 0px 0px 0px" });
    document
      .querySelectorAll(".v2hp-net, [data-wow-deck], [data-wow-journey], [data-wow-finder-card], [data-wow=call]")
      .forEach((t) => ioBig.observe(t));
    document.querySelectorAll("main h2").forEach((t) => ioZone.observe(t));
    return () => {
      ioBig.disconnect();
      ioZone.disconnect();
      pill.removeAttribute("data-v2hp-sticky");
    };
  }, []);
}

export default function HomeStory() {
  useStickyPill();

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const reduced = window.matchMedia(REDUCED);
    let teardown = null;
    let starting = false;
    let gone = false;
    let rebuilding = false;
    // il passaggio hero -> categorie cambia modo (rotazione, ridimensionamento, ripiego della hero): si rifà tutto da capo
    const rebuild = () => {
      if (rebuilding || gone) return;
      rebuilding = true;
      setTimeout(() => {
        rebuilding = false;
        if (gone || reduced.matches) return;
        if (teardown) teardown();
        mount();
      }, 80);
    };

    const mount = () => {
      if (gone || teardown || starting || reduced.matches) return;
      starting = true;
      let cancelled = false;
      let mm = null;
      const timers = [];
      let onLoad = null;
      // cleanup già pronta: se si smonta mentre gsap sta ancora caricando, si annulla tutto
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
          mm.add({ rich: RICH, pin: PIN, lite: LITE, wide: "(min-width: 768px)" }, (ctx) => {
            const { rich, pin, lite } = ctx.conditions;
            if (!rich && !lite) return undefined; // prefers-reduced-motion: niente movimento
            const env = { gsap, ScrollTrigger, SplitText, rich: !!rich, pin: !!pin, lite: !!lite, cleanups: [], hs: null, rebuild };
            STAGES.forEach(([name, build]) => {
              const el = document.querySelector(`[data-wow="${name}"]`);
              if (!el) return;
              try {
                build(el, env);
              } catch (err) {
                if (process.env.NODE_ENV !== "production") console.warn(`[home] ${name}`, err);
              }
            });
            if (rich) env.cleanups.push(magnetic(Array.from(document.querySelectorAll("[data-magnetic]")), { gsap }));
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
      } else {
        mount();
      }
    };

    sync();
    reduced.addEventListener?.("change", sync);
    return () => {
      gone = true;
      reduced.removeEventListener?.("change", sync);
      if (teardown) teardown();
    };
  }, []);

  return null;
}
