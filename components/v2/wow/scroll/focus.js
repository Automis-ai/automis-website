import { getLoaded } from "./gsap";
import { smooth } from "./smooth";

/*
  Il focus da tastiera dentro le scene a scorrimento.

  Il problema: una scena fissata (pin) o legata allo scroll (scrub) mostra i suoi elementi solo quando lo scroll arriva al punto
  giusto. Con Tab il focus può arrivare prima: il link sta lì, ma la carta è ancora impilata, trasparente o rimpicciolita, e
  l'anello di focus non si vede (WCAG 2.4.7). Finora i link nascosti con visibility venivano anche saltati.

  La regola (una volta per pagina, la monta SmoothScroll):
  - quando un elemento prende il focus ed è dentro una scena legata allo scroll che non è ancora composta, la pagina salta al punto
    in cui la scena è composta (la fine del suo tratto) e la scena si compone subito, senza aspettare lo smorzamento dello scrub;
  - se invece è una entrata «una volta sola» (parte quando arriva in vista) ancora a metà, la porta a fine;
  - uno scatto istantaneo, non una scivolata: chi usa la tastiera non attraversa tutta la scena, e non dipende da prefers-reduced-motion.
  Vale per qualunque pagina: guarda i ScrollTrigger vivi, non conosce le scene. Se gsap non è caricato (movimento ridotto, niente
  JavaScript) non fa niente: lì non c'è nessuna scena e i link sono già visibili.
*/

const VISIBLE = 0.6; // sotto questa opacità (somma degli antenati) l'anello non si legge
const SCALE = 0.75; // sotto questa scala (larghezza vista / larghezza a riposo) il link è troppo piccolo

function visibleEnough(el) {
  let o = 1;
  for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
    const cs = getComputedStyle(n);
    if (cs.visibility === "hidden" || cs.display === "none") return false;
    o *= parseFloat(cs.opacity);
    if (!(o >= VISIBLE)) return false;
  }
  const r = el.getBoundingClientRect();
  const w = el.offsetWidth;
  if (w > 0 && r.width < w * SCALE) return false;
  return true;
}

// Gli elementi mossi da un'animazione (tween o timeline) contengono `el`?
function animates(anim, el) {
  if (!anim) return false;
  const hit = (t) => t && t.nodeType === 1 && t.contains(el);
  if (typeof anim.targets === "function") return anim.targets().some(hit);
  if (typeof anim.getChildren === "function") {
    return anim.getChildren(true, true, false).some((ch) => typeof ch.targets === "function" && ch.targets().some(hit));
  }
  return false;
}

// Scatto istantaneo. Il sito ha html { scroll-behavior: smooth } e Lenis, da fermo, non lo annulla: senza `auto` anche
// lenis.scrollTo(..., { immediate }) partirebbe come una scivolata, e il browser sta già scivolando verso l'elemento col suo scroll.
function jump(y, ScrollTrigger) {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  const lenis = smooth.lenis;
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo({ top: y, left: 0, behavior: "instant" });
  ScrollTrigger.update();
  requestAnimationFrame(() => root.style.removeProperty("scroll-behavior"));
}

function settle(el) {
  const loaded = getLoaded();
  if (!loaded || !el.isConnected) return;
  const { ScrollTrigger } = loaded;
  const all = ScrollTrigger.getAll();

  // 1) scene legate allo scroll che contengono l'elemento
  if (!visibleEnough(el)) {
    let end = -1;
    const scenes = [];
    all.forEach((st) => {
      const scrubbed = !!(st.vars && (st.vars.scrub || st.vars.pin));
      if (!scrubbed || !st.animation) return;
      if (st.progress >= 0.999) return; // già a fine tratto: spostarsi non cambierebbe niente
      if (animates(st.animation, el) || (st.trigger && st.trigger.contains && st.trigger.contains(el))) {
        scenes.push(st);
        end = Math.max(end, st.end);
      }
    });
    if (scenes.length && end >= 0) {
      jump(end, ScrollTrigger);
      scenes.forEach((st) => {
        const tw = typeof st.getTween === "function" ? st.getTween(false) : null;
        if (tw) tw.progress(1); // lo scrub con smorzamento arriva subito, senza la scivolata
      });
    }
  }

  // 2) entrate che partono una volta sola e sono ancora a metà (un ScrollTrigger «once» si spegne appena parte: si cercano le
  // animazioni degli antenati, non i ScrollTrigger)
  const { gsap } = loaded;
  const root = gsap.globalTimeline;
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    gsap.getTweensOf(n).forEach((t) => {
      let top = t;
      while (top.parent && top.parent !== root) top = top.parent;
      const st = top.scrollTrigger;
      if (st && st.vars && (st.vars.scrub || st.vars.pin)) return; // la scena legata allo scroll è il caso 1
      if (top.totalDuration() === Infinity || top.repeat() !== 0) return; // catene e cicli che vanno da soli
      if (top.progress() < 1) top.progress(1);
    });
  }

  // 3) entrate senza ScrollTrigger (le «reveal» del kit, con IntersectionObserver): partono quando l'elemento è ben dentro lo schermo, e Tab
  // lo lascia in un bordo. Se è ancora trasparente lo si porta a metà schermo, dove partono di sicuro.
  if (!visibleEnough(el)) {
    const r0 = el.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    const delta = r0.top + r0.height / 2 - mid;
    if (Math.abs(delta) > 80) jump(Math.max(0, window.scrollY + delta), ScrollTrigger);
  }

  // se dopo tutto l'elemento è fuori dallo schermo (es. secondo giro di Tab con Lenis a metà strada), lo si porta in vista
  const r = el.getBoundingClientRect();
  const fixed = getComputedStyle(el).position === "fixed" || !!el.closest("header, [role=dialog], [data-v2hp-sticky]");
  if (!fixed && (r.bottom < 0 || r.top > window.innerHeight)) {
    const y = Math.max(0, window.scrollY + r.top - window.innerHeight / 2 + r.height / 2);
    jump(y, ScrollTrigger);
  }
}

export function installFocusGuard() {
  if (typeof document === "undefined") return () => {};
  let raf = 0;
  let last = null;
  const onFocusIn = (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement) || el === document.body) return;
    last = el;
    if (raf) cancelAnimationFrame(raf);
    // un fotogramma: il browser ha già fatto il suo scroll fino all'elemento e ScrollTrigger ha letto la nuova posizione
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (last && document.activeElement === last) settle(last);
    });
  };
  document.addEventListener("focusin", onFocusIn);
  return () => {
    document.removeEventListener("focusin", onFocusIn);
    if (raf) cancelAnimationFrame(raf);
  };
}
