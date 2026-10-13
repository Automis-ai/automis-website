"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { canHover, reducedMotion, lerp } from "./env";

/*
  Magnetic: un pulsante segue appena il cursore quando gli è vicino, poi torna al suo posto.
  - Si sposta con la proprietà CSS `translate` (non `transform`): non litiga con l'alzata al passaggio del mouse.
  - Solo mouse; con prefers-reduced-motion non parte. Un solo ascoltatore sul documento, attivo solo mentre il puntatore è vicino.
  - Il kit lo attiva con data-fx="magnetic" (vedi FxScope e la prop `magnetic` di Button).
*/
export function attachMagnetic(el, { radius = 90, pull = 0.32, max = 6 } = {}) {
  if (!el || !canHover() || reducedMotion()) return () => {};
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let raf = 0;
  let near = false;

  const tick = () => {
    raf = 0;
    x = lerp(x, tx, 0.18);
    y = lerp(y, ty, 0.18);
    if (Math.abs(x - tx) < 0.05 && Math.abs(y - ty) < 0.05) {
      x = tx;
      y = ty;
      el.style.translate = x === 0 && y === 0 ? "" : `${x}px ${y}px`;
      return;
    }
    el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
    raf = requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onMove = (e) => {
    if (e.pointerType === "touch" || el.dataset.fxHidden) return;
    const r = el.getBoundingClientRect();
    // il rettangolo del bottone è già spostato dal translate: si misura dal suo centro «di riposo»
    const cx = r.left + r.width / 2 - x;
    const cy = r.top + r.height / 2 - y;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const inside = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;
    if (inside) {
      near = true;
      tx = Math.max(-max, Math.min(max, dx * pull));
      ty = Math.max(-max, Math.min(max, dy * pull));
      kick();
    } else if (near) {
      near = false;
      tx = 0;
      ty = 0;
      kick();
    }
  };
  const onOut = (e) => {
    if (e.relatedTarget === null && near) {
      near = false;
      tx = 0;
      ty = 0;
      kick();
    }
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  return () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    if (raf) cancelAnimationFrame(raf);
    el.style.translate = "";
  };
}

/* Componente: avvolge i figli in uno span che segue il cursore (`as`, `radius`, `pull`, `max`). */
export default function Magnetic({ as: Tag = "span", radius, pull, max, className, style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => attachMagnetic(ref.current, { radius, pull, max }), [radius, pull, max]);
  return (
    <Tag ref={ref} className={className} style={{ display: "inline-flex", ...style }} {...rest}>
      {children}
    </Tag>
  );
}
