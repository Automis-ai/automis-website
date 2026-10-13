"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { reducedMotion, loadGsap } from "./env";
import { countUp } from "./scrollFx";

/*
  CountUp: un numero che si compone quando arriva in vista: le cifre arrivano una dopo l'altra, come tessere (transform e opacità).
  Il valore vero è nel DOM in ogni istante («2.329», «872», «97%», «30»): mai un conteggio da zero, mai un numero sbagliato a metà corsa.
  Se il testo non è un numero, non fa niente. I numeri di ProofStrip e CaseTeaser lo ottengono già con data-fx="count".
  `as`: il tag (default span).
*/
export default function CountUp({ as: Tag = "span", className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    let dead = false;
    let ctx = null;
    let undo = null;
    loadGsap()
      .then((libs) => {
        if (!dead) ctx = libs.gsap.context(() => (undo = countUp(el, libs)), el);
      })
      .catch(() => {});
    return () => {
      dead = true;
      if (ctx) ctx.revert();
      if (undo) undo();
    };
  }, []);
  return (
    <Tag ref={ref} data-fx="count" className={className} {...rest}>
      {children}
    </Tag>
  );
}
