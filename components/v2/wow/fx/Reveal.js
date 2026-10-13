"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { reducedMotion, loadGsap } from "./env";
import { revealItem, staggerGroup } from "./scrollFx";

/*
  Reveal: entrata in profondità allo scroll. Il contenuto arriva dal server già visibile; se sta sotto la piega
  si prepara e entra quando ci arrivi (sale, si raddrizza dalla prospettiva, compare). Quello già in vista resta fermo.
  - Reveal: entra il blocco intero.
  - <Reveal stagger>: entrano i suoi figli diretti, una scheda dopo l'altra.
  Section lo applica da sola ai suoi figli (vedi FxScope): questo componente serve fuori da una Section.
*/
export default function Reveal({ as: Tag = "div", stagger = false, className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    let dead = false;
    let ctx = null;
    let undo = null;
    loadGsap()
      .then((libs) => {
        if (dead) return;
        ctx = libs.gsap.context(() => {
          undo = stagger ? staggerGroup(el, libs) : revealItem(el, libs);
        }, el);
      })
      .catch(() => {});
    return () => {
      dead = true;
      if (ctx) ctx.revert();
      if (undo) undo();
    };
  }, [stagger]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
