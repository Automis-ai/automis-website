"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { reducedMotion, loadGsap } from "./env";
import { splitReveal } from "./scrollFx";

/*
  SplitReveal: un titolo che entra parola per parola, in profondità, quando arriva in vista.
  Il testo arriva dal server (si legge subito, anche senza JavaScript); a fine entrata il DOM torna quello di prima.
  I titoli di SectionHeader lo ottengono già con data-fx="split": questo componente serve per titoli tuoi.
  `as`: il tag (default h2).
*/
export default function SplitReveal({ as: Tag = "h2", className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    let dead = false;
    let ctx = null;
    let undo = null;
    loadGsap()
      .then((libs) => {
        if (!dead) ctx = libs.gsap.context(() => (undo = splitReveal(el, libs)), el);
      })
      .catch(() => {});
    return () => {
      dead = true;
      if (ctx) ctx.revert();
      if (undo) undo();
    };
  }, []);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
