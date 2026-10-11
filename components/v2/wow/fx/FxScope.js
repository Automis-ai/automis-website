"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { canHover, reducedMotion, loadGsap } from "./env";
import { attachTilt } from "./Tilt3D";
import { attachMagnetic } from "./Magnetic";
import CursorGlow from "./CursorGlow";
import { bindScrollFx } from "./scrollFx";

/*
  FxScope: il contenitore che accende gli effetti di una fascia. Section e PageHero lo usano al posto del loro
  <div class="v2-wrap">, quindi il DOM non cambia. Cerca dentro di sé gli attributi data-fx che i componenti del kit
  mettono sul server e li lega:
    data-fx="tilt"      inclinazione 3D al puntatore (Tilt3D). Nelle pagine .v2-pg la hanno tutte le .v2-card (anche senza l'attributo)
    data-fx="magnetic"  il pulsante segue appena il cursore (Magnetic)
    data-fx="split"     titolo che entra a parole (SplitReveal)
    data-fx="rise"      sopratitolo o riga che sale (Reveal)
    data-fx="stagger"   griglia le cui schede entrano una dopo l'altra (Reveal)
    data-fx="count"     numero che si compone cifra per cifra (CountUp), sempre al valore vero
    data-fx="own"       blocco che si gestisce da solo: l'entrata generale lo salta
    data-fx="skip"      blocco che non entra mai (ha già una sua animazione)
  Tutti gli altri figli diretti entrano in profondità quando arrivano in vista.
  Con prefers-reduced-motion non succede niente. Sul tocco restano solo le entrate (corte), senza inclinazione, magnete e alone.
  `glow`: aggiunge CursorGlow (per le fasce scure). `as`: il tag (default div).
*/
export default function FxScope({ as: Tag = "div", glow = false, className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return undefined;
    const undo = [];
    if (canHover()) {
      root.querySelectorAll('[data-fx="tilt"]').forEach((el) => undo.push(attachTilt(el)));
      // pagine interne (.v2-pg): ogni scheda di vetro si inclina, come quelle della home. Restano ferme le schede con campi
      // (moduli), con video e quelle alte (demo): lì un'inclinazione darebbe fastidio.
      if (root.closest(".v2-pg")) {
        root.querySelectorAll(".v2-card:not([data-fx])").forEach((el) => {
          if (el.querySelector("input, textarea, select, iframe, video") || el.offsetHeight > 480) return;
          undo.push(attachTilt(el, { max: 4.5, lift: 2 }));
        });
      }
      root.querySelectorAll('[data-fx="magnetic"]').forEach((el) => undo.push(attachMagnetic(el)));
    }
    let dead = false;
    let ctx = null;
    let undoScroll = null;
    loadGsap()
      .then((libs) => {
        if (dead) return;
        ctx = libs.gsap.context(() => {
          undoScroll = bindScrollFx(root, libs);
        }, root);
      })
      .catch(() => {
        /* se le librerie non arrivano, la pagina resta nel suo stato finale */
      });
    return () => {
      dead = true;
      undo.forEach((fn) => fn());
      if (ctx) ctx.revert();
      if (undoScroll) undoScroll();
    };
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {glow ? <CursorGlow /> : null}
      {children}
    </Tag>
  );
}
