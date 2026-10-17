"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { canHover, reducedMotion, lerp } from "./env";

/*
  CursorGlow: un alone azzurro che segue il puntatore dentro una fascia scura.
  Va messo DENTRO la fascia (la fascia è position: relative): ascolta il puntatore sulla fascia intera, non solo su di sé.
  Sta dietro al testo (z-index -1), dentro una scatola che lo taglia ai bordi della fascia. Solo mouse; spento con
  prefers-reduced-motion e sul tocco (il CSS lo nasconde anche senza JavaScript).
*/
export function attachCursorGlow(box) {
  if (!box || !canHover() || reducedMotion()) return () => {};
  const area = box.closest("section") || box.parentElement;
  const glow = box.firstElementChild;
  if (!area || !glow) return () => {};

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let raf = 0;
  let live = false;

  const tick = () => {
    raf = 0;
    x = lerp(x, tx, 0.14);
    y = lerp(y, ty, 0.14);
    glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    if (live || Math.abs(x - tx) > 0.5 || Math.abs(y - ty) > 0.5) raf = requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const aim = (e) => {
    const r = box.getBoundingClientRect(); // la scatola dell'alone, non la fascia: nella hero fissata la fascia scorre, la scatola no
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
  };
  const onEnter = (e) => {
    if (e.pointerType === "touch") return;
    aim(e);
    if (!live) {
      x = tx;
      y = ty; // la prima volta l'alone nasce sotto il puntatore, non viene da un angolo
    }
    live = true;
    box.classList.add("is-on");
    kick();
  };
  const onMove = (e) => {
    if (!live || e.pointerType === "touch") return;
    aim(e);
    kick();
  };
  const onLeave = () => {
    live = false;
    box.classList.remove("is-on");
  };

  area.addEventListener("pointerenter", onEnter);
  area.addEventListener("pointermove", onMove);
  area.addEventListener("pointerleave", onLeave);
  return () => {
    area.removeEventListener("pointerenter", onEnter);
    area.removeEventListener("pointermove", onMove);
    area.removeEventListener("pointerleave", onLeave);
    if (raf) cancelAnimationFrame(raf);
    box.classList.remove("is-on");
    glow.style.transform = "";
  };
}

/* Componente: la scatola dell'alone. Mettilo come primo figlio di una fascia scura (Section lo fa da sola con tone dark/deep). */
export default function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => attachCursorGlow(ref.current), []);
  return (
    <span ref={ref} className="v2-fx-glowbox" aria-hidden="true">
      <i className="v2-fx-glow" />
    </span>
  );
}
