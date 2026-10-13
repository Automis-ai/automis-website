"use client";
import { useEffect, useRef } from "react";
import "./fx.css";
import { canHover, reducedMotion, lerp } from "./env";

/*
  Tilt3D: la scheda si inclina verso il puntatore, con un riflesso che lo segue e l'icona che scivola in controluce.
  Il riflesso è un elemento (.fx-glare) che si SPOSTA con transform dentro un ritaglio: niente gradiente ridisegnato a ogni
  pointermove (prima si cambiavano le coordinate di un radial-gradient: ridisegno continuo).
  - Solo mouse o penna: sul tocco e con prefers-reduced-motion non fa niente (la scheda resta com'era).
  - Smorzamento a ogni fotogramma (nessuna transizione CSS): il movimento è sempre in corsa verso il puntatore.
  - Mentre la scheda sta entrando allo scroll (data-fx-hidden) non reagisce, così non litiga con l'entrata.
  - Si ferma da sola quando la scheda è tornata ferma: nessun ciclo che gira a vuoto.
  Il kit lo attiva con data-fx="tilt" (vedi FxScope); qui sotto la stessa cosa come funzione e come componente.
*/

const EASE = "border-color .25s ease, background-color .25s ease, box-shadow .3s ease";

export function attachTilt(el, { max = 6, lift = 3, perspective = 900, press = 0.985 } = {}) {
  if (!el || !canHover() || reducedMotion()) return () => {};

  // stato corrente e obiettivo
  const cur = { rx: 0, ry: 0, ly: 0, gx: 50, gy: 50, ga: 0, px: 0, py: 0, sc: 1 };
  const tgt = { rx: 0, ry: 0, ly: 0, gx: 50, gy: 50, ga: 0, px: 0, py: 0, sc: 1 };
  let raf = 0;
  let inside = false;
  let on = false;
  let glare = null;
  let glareDot = null;
  let box = { w: 1, h: 1 };

  const apply = () => {
    el.style.transform = `perspective(${perspective}px) translate3d(0,${cur.ly.toFixed(2)}px,0) rotateX(${cur.rx.toFixed(
      2
    )}deg) rotateY(${cur.ry.toFixed(2)}deg) scale(${cur.sc.toFixed(4)})`;
    if (glareDot) {
      glareDot.style.transform = `translate3d(${((cur.gx / 100) * box.w).toFixed(1)}px,${((cur.gy / 100) * box.h).toFixed(1)}px,0)`;
      glare.style.opacity = cur.ga.toFixed(3);
    }
    el.style.setProperty("--fx-px", cur.px.toFixed(3));
    el.style.setProperty("--fx-py", cur.py.toFixed(3));
  };

  const settle = () => {
    on = false;
    el.classList.remove("fx-tilt-on");
    el.style.transform = "";
    el.style.transition = "";
    if (glare && glare.parentNode) glare.parentNode.removeChild(glare);
    glare = null;
    glareDot = null;
    ["--fx-px", "--fx-py"].forEach((p) => el.style.removeProperty(p));
  };

  const tick = () => {
    raf = 0;
    let moving = false;
    for (const k of Object.keys(cur)) {
      // il riflesso segue più veloce dell'inclinazione
      cur[k] = lerp(cur[k], tgt[k], k === "gx" || k === "gy" || k === "ga" ? 0.3 : 0.16);
      if (Math.abs(cur[k] - tgt[k]) > (k === "gx" || k === "gy" ? 0.4 : 0.015)) moving = true;
    }
    apply();
    if (moving || inside) raf = requestAnimationFrame(tick);
    else settle();
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const toTarget = (e) => {
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / (r.width || 1)));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / (r.height || 1)));
    tgt.ry = (x - 0.5) * 2 * max;
    tgt.rx = (0.5 - y) * 2 * max;
    tgt.gx = x * 100;
    tgt.gy = y * 100;
    tgt.px = (x - 0.5) * 2;
    tgt.py = (y - 0.5) * 2;
  };

  const onEnter = (e) => {
    if (e.pointerType === "touch" || el.dataset.fxHidden) return;
    inside = true;
    if (!on) {
      on = true;
      el.classList.add("fx-tilt-on");
      const r0 = el.getBoundingClientRect();
      box = { w: r0.width || 1, h: r0.height || 1 };
      glare = document.createElement("span");
      glare.className = "fx-glare";
      glare.setAttribute("aria-hidden", "true");
      glareDot = document.createElement("i");
      glare.appendChild(glareDot);
      el.appendChild(glare);
      el.style.transition = EASE; // niente transizione sul transform: lo smorza il ciclo
    }
    tgt.ly = -lift;
    tgt.ga = 1;
    toTarget(e);
    kick();
  };
  const onMove = (e) => {
    if (!inside || e.pointerType === "touch") return;
    toTarget(e);
    kick();
  };
  const onLeave = () => {
    inside = false;
    tgt.rx = 0;
    tgt.ry = 0;
    tgt.ly = 0;
    tgt.ga = 0;
    tgt.px = 0;
    tgt.py = 0;
    tgt.sc = 1;
    kick();
  };
  const onDown = () => {
    if (!inside) return;
    tgt.sc = press;
    kick();
  };
  const onUp = () => {
    tgt.sc = 1;
    if (inside) kick();
  };

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("pointercancel", onLeave);
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointerup", onUp);

  return () => {
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
    el.removeEventListener("pointercancel", onLeave);
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointerup", onUp);
    if (raf) cancelAnimationFrame(raf);
    settle();
  };
}

/*
  Componente: avvolge i figli in un div che si inclina. `as` = tag, `max` = gradi massimi (6), `lift` = px di alzata (3).
  Il div è posizionato (relative) perché il riflesso lo copra tutto. Le schede del kit non lo usano: portano data-fx="tilt".
*/
export default function Tilt3D({ as: Tag = "div", max, lift, perspective, className, style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => attachTilt(ref.current, { max, lift, perspective }), [max, lift, perspective]);
  return (
    <Tag ref={ref} className={className} style={{ position: "relative", ...style }} {...rest}>
      {children}
    </Tag>
  );
}
