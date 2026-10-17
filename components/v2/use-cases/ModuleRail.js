"use client";
import { useEffect, useRef } from "react";
import Tile from "@/components/v2/use-cases/Tile";
import { CHAINS, DATURA_SLUG } from "@/components/v2/use-cases/constants";

/*
  La rotaia dei moduli: il filo del corpo chiaro del caso. Una capsula di vetro scura con le quattro tessere in miniatura
  (le stesse della hero, dello schema e delle schede: presidio, feed, campagne, report), collegate da un filo.
  Resta ferma nello schermo mentre si legge: a sinistra, nel margine, da 1280 px in su; in alto, sotto l'intestazione,
  sul telefono e sul tablet. Si accende il modulo di cui stai leggendo la prova, e un pacchetto corre fra una tessera e
  l'altra; passando, ogni tessera lampeggia (a fine corsa sull'ultima, l'anello d'oro).

  Come sa cosa stai leggendo: ogni blocco del corpo porta data-mod="0 1 2 3" (gli indici dei moduli di CHAINS: 0 presidio,
  1 feed, 2 campagne, 3 report). Quelli che attraversano la fascia stretta al centro dello schermo (dal 46% al 54% dell'altezza)
  accendono i loro moduli. data-mod="" = nessun modulo (il problema: la rotaia è lì ma spenta, il sistema ancora non c'è).
  Un blocco che li porta tutti e quattro (lo schema del sistema) = tutta la catena accesa, con un pacchetto che la percorre
  in continuo (data-mode="all"). Se nella fascia non c'è nulla (fra due blocchi) resta lo stato di prima.

  Regole:
  - Decorativa: aria-hidden, nessun puntatore, nessun testo. Il legame con i nomi sta nel testo accanto (la scheda porta
    la stessa tessera con il nome del modulo).
  - Nessuno stato React: tutto con attributi sul DOM (data-show, data-live, data-mode) e la variabile CSS --f (quanta
    strada ha fatto il filo), da un solo listener di scroll con un requestAnimationFrame per fotogramma (si leggono i
    rettangoli, si scrive solo quando lo stato cambia). Il pacchetto e i lampi sono animazioni di transform e opacity.
  - Senza JavaScript non si vede (parte nascosta). Con prefers-reduced-motion si vede, senza pacchetti né lampi: le tessere
    si accendono e si spengono di colpo. A scheda nascosta o fuori dalla zona le animazioni stanno in pausa (data-live).
  Stile in use-cases.css (.v2c-rail).
*/

const reduced = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const parse = (v) =>
  (v || "")
    .split(/\s+/)
    .filter(Boolean)
    .map(Number)
    .filter((x) => Number.isInteger(x) && x >= 0);

export default function ModuleRail({ glyphs = CHAINS[DATURA_SLUG] }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const scope = el && el.parentElement;
    if (!el || !scope) return undefined;
    const marks = Array.from(scope.querySelectorAll("[data-mod]")).map((node) => ({ node, mods: parse(node.getAttribute("data-mod")) }));
    if (!marks.length) return undefined;
    const items = Array.from(el.querySelectorAll(".v2c-rail__item"));
    const n = items.length;
    const calm = reduced();
    let lit = [];
    let p = -1;
    let shown = false;
    let raf = 0;
    const pkt = el.querySelector(".v2c-rail__pkt");
    let run = null;

    /* il pacchetto corre dalla tessera `a` alla `b` (passo --step lungo l'asse della rotaia) e sparisce all'arrivo,
       dove si accende l'anello: a riposo non copre l'icona */
    const send = (a, b, dur) => {
      if (calm || !pkt || !pkt.animate) return;
      if (run) run.cancel();
      const at = (k) => `translate3d(calc(var(--step) * ${k} * var(--ax-x)), calc(var(--step) * ${k} * var(--ax-y)), 0)`;
      run = pkt.animate(
        [
          { opacity: 0, transform: at(a) },
          { opacity: 1, transform: at(a + (b - a) * 0.1), offset: 0.1 },
          { opacity: 1, transform: at(a + (b - a) * 0.88), offset: 0.88 },
          { opacity: 0, transform: at(b) },
        ],
        { duration: dur, easing: "cubic-bezier(0.3, 0.7, 0.2, 1)" }
      );
    };

    /* un lampo su una tessera: l'anello (azzurro, d'oro sull'ultima) e l'alone che si gonfia */
    const flash = (i, delay) => {
      if (calm || !items[i] || !items[i].animate) return;
      const ring = items[i].querySelector(".v2c-tile__ring");
      const glow = items[i].querySelector(".v2c-tile__glow");
      const opt = { duration: 900, delay, easing: "ease-out" };
      if (ring) {
        ring.animate(
          [
            { opacity: 0, transform: "scale(0.9)" },
            { opacity: 1, transform: "scale(1)", offset: 0.18 },
            { opacity: 0, transform: "scale(1.32)" },
          ],
          opt
        );
      }
      if (glow) {
        glow.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.28)", offset: 0.2 },
            { transform: "scale(1)" },
          ],
          opt
        );
      }
    };

    const setLit = (next, whole = false) => {
      const prev = lit;
      const wasAll = el.dataset.mode === "all";
      if (prev.length === next.length && prev.every((v, k) => v === next[k]) && wasAll === whole) return;
      lit = next;
      items.forEach((it, i) => it.classList.toggle("is-lit", next.includes(i)));
      const all = whole && next.length === n;
      el.dataset.mode = all ? "all" : next.length ? "one" : "idle";

      // dove va il pacchetto: sull'ultimo modulo arrivato; tutta la catena accesa = corsa continua (un altro elemento)
      const from = p;
      let np = p;
      if (all || !next.length) np = -1;
      else {
        const fresh = next.filter((i) => !prev.includes(i));
        if (fresh.length) np = Math.max(...fresh);
        else if (!next.includes(p)) np = Math.max(...next);
      }
      p = np;
      el.style.setProperty("--f", String(all ? 1 : np < 0 ? 0 : np / (n - 1)));

      if (np < 0) {
        if (run) run.cancel();
      } else if (from < 0) {
        flash(np, 160);
      } else if (np !== from) {
        const d = Math.abs(np - from);
        const dur = 0.36 + 0.16 * d;
        send(from, np, Math.round(dur * 1000));
        const dir = np > from ? 1 : -1;
        for (let k = 1; k <= d; k += 1) flash(from + dir * k, Math.round(dur * 1000 * (k / d) * 0.82));
      }
      // il sistema si accende: la catena scatta da cima a fondo
      if (all && !wasAll) for (let k = 0; k < n; k += 1) flash(k, k * 110);
    };

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      const rects = marks.map((m) => m.node.getBoundingClientRect());
      const first = rects[0];
      const last = rects[rects.length - 1];
      const show = first.top < vh * 0.78 && last.bottom > vh * 0.3;
      if (show !== shown) {
        shown = show;
        el.dataset.show = show ? "true" : "false";
      }
      el.dataset.live = shown && !document.hidden ? "true" : "false";
      if (!show && first.top >= vh * 0.78) {
        setLit([]);
        return;
      }
      const focus = new Set();
      let any = false;
      let wholeChain = false;
      rects.forEach((r, k) => {
        if (r.height > 0 && r.top < vh * 0.54 && r.bottom > vh * 0.46) {
          any = true;
          if (marks[k].mods.length >= n) wholeChain = true;
          marks[k].mods.forEach((i) => i < n && focus.add(i));
        }
      });
      if (any) setLit(Array.from(focus).sort((a, b) => a - b), wholeChain);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(raf);
      if (run) run.cancel();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return (
    <div ref={root} className="v2c-rail" aria-hidden="true" data-fx="skip" data-show="false" data-live="false" data-mode="idle">
      <div className="v2c-rail__track" style={{ "--n": glyphs.length }}>
        <span className="v2c-rail__wire">
          <i className="v2c-rail__fill" />
        </span>
        {glyphs.map((g, i) => (
          <span key={`${g}-${i}`} className="v2c-rail__item" style={{ "--i": i }}>
            <Tile glyph={g} size="sm" className={i === glyphs.length - 1 ? "v2c-tile--last" : undefined} />
          </span>
        ))}
        <i className="v2c-rail__pkt" />
        <i className="v2c-rail__loop" />
      </div>
    </div>
  );
}
