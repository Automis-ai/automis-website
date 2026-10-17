/*
  Il filo della pagina (vedi Spine.js). Qui si misura la pagina e si muove il pacchetto.

  - Una linea-segnale al margine sinistro, dal primo nodo (categorie) fino al bottone della call. Un pacchetto di luce la
    percorre mentre scorri: sta sempre a ~58% dell'altezza della finestra, con un po' di ritardo (smorzamento), e la
    coda si allunga con la velocità dello scroll. La parte già percorsa si illumina.
  - Un nodo (la piastrella di un modulo) per ogni sezione; su telefono uno per ogni passo di «Come lavoriamo» e per ogni
    caso. Il nodo si accende quando il pacchetto lo raggiunge: piastrella piena, alone, anello d'oro che si allarga.
  - Fra i nodi già accesi, ogni tanto, parte da solo un pacchetto veloce (la «catena che scatta»): scende dal nodo al
    successivo e ne fa pulsare l'anello.
  - In fondo il filo gira l'angolo e corre fino al bottone della call: quando arriva, il bottone si accende.

  Tutto si calcola da qui, senza ScrollTrigger per nodo: la posizione del pacchetto (già smorzata) è l'unica verità, e i
  nodi si accendono quando la supera. Le misure si rifanno a ogni refresh di ScrollTrigger (font, immagini, ridimensionamento).
  Solo transform e opacità. Non si monta con prefers-reduced-motion (HomeStory non costruisce nulla).
*/
const ANCHOR = 0.58; // frazione dell'altezza della finestra dove sta il pacchetto

const CONFIG = [
  { name: "cats", sel: ".v2-head", dy: 12 },
  { name: "how", sel: "[data-wow-head]", dy: 12, sm: "[data-wow-step]", smDy: 34 },
  { name: "cases", sel: "[data-wow-head]", dy: 12, sm: "[data-wow-case]", smDy: 34 },
  { name: "finder", sel: "[data-wow-head]", dy: 12 },
  { name: "authority", sel: "[data-wow-founders]", dy: 16 },
  { name: "call", sel: "[data-wow-core]", core: true },
];

// Posizione di un elemento dentro `stop`, senza i transform (le schede in entrata sono inclinate e spostate): catena degli offset.
function offsetIn(el, stop, axis) {
  const prop = axis === "x" ? "offsetLeft" : "offsetTop";
  let v = 0;
  let n = el;
  while (n && n !== stop) {
    v += n[prop];
    n = n.offsetParent;
  }
  if (n === stop) return v;
  const a = el.getBoundingClientRect();
  const b = stop.getBoundingClientRect();
  return axis === "x" ? a.left - b.left : a.top - b.top;
}

export default function spine(root, env) {
  const { gsap, ScrollTrigger, cleanups } = env;
  const page = root.parentElement;
  const $ = (s) => root.querySelector(s);
  const track = $("[data-s-track]");
  const fill = $("[data-s-fill]");
  const feed = $("[data-s-feed]");
  const feedFill = $("[data-s-feedfill]");
  const feedHead = $("[data-s-feedhead]");
  const run = $("[data-s-run]");
  const pkt = $("[data-s-pkt]");
  const trail = $("[data-s-trail]");
  const nodeEls = Array.from(root.querySelectorAll("[data-s-node]"));
  if (!page || !track || !fill || !pkt || !nodeEls.length) return;

  let M = null; // modello della pagina, misurato
  let coreEl = null;
  let coreOn = false;
  let lastY = null;
  const proxy = { p: 0 };

  const pulse = (tile) => {
    const ring = tile && tile.querySelector(".v2hp-mod__ring");
    if (!ring) return;
    const k = document.documentElement.clientWidth < 800 ? 1.6 : 2.5;
    gsap.fromTo(ring, { scale: 0.9, opacity: 0.95 }, { scale: k, opacity: 0, duration: 0.95, ease: "power2.out", overwrite: true });
  };

  // ---------- misure ----------
  function measure() {
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const small = vw < 768;
    // telefono e tablet stretto (fino a 799 px): nodo da 14 px (con l'alone resta sotto i 16 px del margine della pagina: non copre mai la
    // prima lettera di un titoletto). A 768-799 px i testi a sinistra (eyebrow del team) partono ancora a 16 px: col nodo da 22 px ne coprivano 7.
    const narrow = vw < 800;
    const n = narrow ? 14 : Math.round(Math.min(34, Math.max(22, 22 + (vw - 1152) / 16)));
    const sx = Math.max(n / 2 + 1, (vw - 1152) / 4);
    root.style.setProperty("--sx", `${sx}px`);
    root.style.setProperty("--n", `${n}px`);

    const items = [];
    CONFIG.forEach((cfg) => {
      const sec = document.querySelector(`[data-wow="${cfg.name}"]`);
      if (!sec) return;
      const list = small && cfg.sm ? Array.from(sec.querySelectorAll(cfg.sm)) : [sec.querySelector(cfg.sel)].filter(Boolean);
      list.forEach((el) => {
        let y = offsetIn(el, page, "y");
        if (cfg.core) y += el.offsetHeight / 2;
        else y += small && cfg.sm ? cfg.smDy : cfg.dy;
        items.push({ name: cfg.name, el, y, core: !!cfg.core, node: null, on: false });
      });
    });
    if (items.length > nodeEls.length) items.length = nodeEls.length;
    const core = items.find((it) => it.core);
    if (!core || items.length < 2) {
      M = null;
      return false;
    }
    // il nodo del bottone sta all'angolo (ultimo); i nodi che avanzano nel pool si nascondono
    items.forEach((it, i) => {
      it.node = nodeEls[i];
      it.tile = it.node.querySelector(".v2hp-mod");
    });
    nodeEls.forEach((nd, i) => (nd.style.display = i < items.length ? "" : "none"));

    const y0 = items[0].y;
    const yC = core.y;
    const H = Math.max(40, yC - y0);
    const coreLeft = offsetIn(core.el, page, "x");
    const F = Math.max(36, coreLeft - sx - 10);
    const extra = 0.2 * vh; // scroll dopo il bottone: il filo gira l'angolo e ci entra
    const pageTop = page.getBoundingClientRect().top + window.scrollY;
    const prevOn = M ? M.items.map((it) => it.on) : [];
    M = { items, y0, yC, H, F, extra, fv: H / (H + extra), sx, n, pageTop, vh };
    items.forEach((it, i) => (it.on = !!prevOn[i]));

    items.forEach((it) => {
      it.node.style.top = `${(it.y - n / 2).toFixed(1)}px`;
    });
    track.style.top = `${(y0 - 150).toFixed(1)}px`;
    track.style.height = `${(H + 150).toFixed(1)}px`;
    fill.style.top = `${y0.toFixed(1)}px`;
    fill.style.height = `${H.toFixed(1)}px`;
    pkt.style.top = `${y0.toFixed(1)}px`;
    feed.style.top = `${(yC - 0.75).toFixed(1)}px`;
    feed.style.width = `${F.toFixed(1)}px`;
    feedFill.style.top = `${(yC - 0.75).toFixed(1)}px`;
    feedFill.style.width = `${F.toFixed(1)}px`;
    feedHead.style.top = `${yC.toFixed(1)}px`;
    coreEl = core.el;
    root.classList.add("is-ready");
    return true;
  }

  // ---------- disegno (a ogni passo dello smorzamento) ----------
  function render() {
    if (!M) return;
    const { H, F, fv, y0, yC, items } = M;
    const p = proxy.p;
    const v = fv > 0 ? Math.min(p, fv) / fv : 1; // tratto verticale 0..1
    const h = p > fv ? (p - fv) / (1 - fv) : 0; // tratto verso il bottone 0..1
    const y = v * H;
    gsap.set(pkt, { y, opacity: h > 0 ? Math.max(0, 1 - h * 4) : p > 0.0005 ? 1 : 0 });
    gsap.set(fill, { scaleY: v });
    if (h > 0) {
      gsap.set(feedFill, { scaleX: h });
      gsap.set(feedHead, { x: h * F, opacity: h < 0.995 ? 1 : 0 });
    } else {
      gsap.set(feedFill, { scaleX: 0 });
      gsap.set(feedHead, { opacity: 0, x: 0 });
    }
    // coda: più lunga quanto più il pacchetto corre
    if (lastY !== null) {
      const speed = Math.abs(y - lastY);
      gsap.set(trail, { scaleY: Math.min(4.2, 0.35 + speed * 0.28) });
    }
    lastY = y;

    const yAbs = y0 + y;
    items.forEach((it) => {
      if (it.core) return;
      const on = yAbs >= it.y - 3;
      if (on !== it.on) {
        it.on = on;
        it.node.classList.toggle("is-on", on);
        if (on) pulse(it.tile);
      }
    });
    const lit = h >= 0.985;
    if (lit !== coreOn) {
      coreOn = lit;
      if (coreEl) {
        coreEl.classList.toggle("is-lit", lit);
        const last = items[items.length - 1];
        last.node.classList.toggle("is-on", lit);
        last.on = lit;
        if (lit) {
          pulse(last.tile);
          const ring = coreEl.querySelector("[data-core-ring]");
          if (ring) gsap.fromTo(ring, { scale: 1, opacity: 0.95 }, { scale: 1.6, opacity: 0, duration: 1.1, ease: "power2.out", overwrite: true });
        }
      }
    }
  }

  const toP = gsap.quickTo(proxy, "p", {
    duration: 0.7,
    ease: "power3.out",
    onUpdate: render,
    onComplete: () => gsap.to(trail, { scaleY: 0.35, duration: 0.5, ease: "power2.out", overwrite: true }),
  });

  function target() {
    if (!M) return 0;
    const sy = window.scrollY;
    const raw = (sy + ANCHOR * M.vh - M.pageTop - M.y0) / (M.H + M.extra);
    return Math.max(0, Math.min(1, raw));
  }
  function update() {
    if (M) toP(target());
  }
  function snap() {
    // dopo una misura (o un refresh) il pacchetto salta alla posizione giusta, senza ritardo
    if (!M) return;
    proxy.p = target();
    lastY = null;
    render();
  }

  // ---------- la catena che scatta da sola ----------
  let runCall = null;
  let runTl = null;
  const schedule = (sec) => {
    if (runCall) runCall.kill();
    runCall = gsap.delayedCall(sec, runOnce);
  };
  function runOnce() {
    if (!M) return schedule(1);
    if (document.hidden) return schedule(1.5);
    const sy = window.scrollY;
    const top = sy - M.pageTop;
    const bottom = top + M.vh;
    const lit = M.items.filter((it) => it.on);
    let best = null;
    let bestD = Infinity;
    for (let k = 0; k < lit.length - 1; k++) {
      const a = lit[k];
      const b = lit[k + 1];
      if (b.y < top - 20 || a.y > bottom + 20 || b.y - a.y < 60) continue;
      const d = Math.abs((a.y + b.y) / 2 - (top + M.vh * 0.5));
      if (d < bestD) {
        bestD = d;
        best = [a, b];
      }
    }
    if (!best) return schedule(0.8);
    const [a, b] = best;
    const len = b.y - a.y;
    gsap.set(run, { top: a.y - 44, y: 0, opacity: 0 });
    runTl = gsap
      .timeline({ onComplete: () => schedule(0.9 + Math.random() * 1.4) })
      .to(run, { opacity: 1, duration: 0.08, ease: "none" }, 0)
      .to(run, { y: len, duration: Math.min(0.85, Math.max(0.38, len / 1500)), ease: "power2.in" }, 0)
      .add(() => pulse(b.tile), ">-0.06")
      .to(run, { opacity: 0, duration: 0.1, ease: "none" }, ">");
  }

  // ---------- avvio ----------
  const onRefresh = () => {
    if (measure()) snap();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);
  if (measure()) snap();

  const st = ScrollTrigger.create({
    trigger: page,
    start: "top bottom",
    end: "bottom top",
    onUpdate: update,
    onRefresh: update,
  });
  schedule(1.4);

  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    st.kill();
    if (runCall) runCall.kill();
    if (runTl) runTl.kill();
    gsap.killTweensOf([proxy, pkt, fill, feedFill, feedHead, trail, run]);
    root.classList.remove("is-ready");
    root.style.removeProperty("--sx");
    root.style.removeProperty("--n");
    [pkt, fill, feedFill, feedHead, trail, run].forEach((e) => e && gsap.set(e, { clearProps: "all" }));
    nodeEls.forEach((nd) => {
      nd.classList.remove("is-on");
      nd.style.display = "";
      nd.style.top = "";
    });
    [track, fill, feed, feedFill, feedHead, pkt].forEach((e) => e && (e.style.cssText = ""));
    if (coreEl) coreEl.classList.remove("is-lit");
  });
}
