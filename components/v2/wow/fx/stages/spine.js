/*
  Il filo della pagina, nelle pagine interne (lo stesso della home: components/v2/home/stages/spine.js, adattato).
  Una linea-segnale al margine sinistro, dalla prima fascia sotto la hero fino alla chiusura. Un pacchetto di luce la percorre mentre
  scorri (sta a ~58% dell'altezza della finestra, con un po' di ritardo; la coda si allunga con la velocità dello scroll) e la
  parte già percorsa si illumina. Un nodo (un modulo) per ogni fascia: si accende quando il pacchetto lo raggiunge, con un anello
  che si allarga. Fra i nodi già accesi, ogni tanto, parte da solo un pacchetto veloce (la «catena che scatta»).
  In fondo il filo gira l'angolo e corre fino al pannello della chiusura (CtaBand): quando arriva, il pannello si accende.

  Le fasce le trova da sé: i figli diretti di <main> che sono .v2-section (tranne la hero). Il nodo sta sul titolo della fascia (.v2-head)
  o sul primo blocco. Le misure si rifanno a ogni refresh di ScrollTrigger (font, immagini, ridimensionamento).
  Si legge senza i transform (catena di offsetTop): le schede in entrata sono inclinate e spostate da gsap.
  Solo transform e opacità. Non si monta con prefers-reduced-motion (PageStory non costruisce niente).
*/
const ANCHOR = 0.58; // frazione dell'altezza della finestra dove sta il pacchetto

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

// l'elemento su cui sta il nodo di una fascia: il titolo, o il primo blocco visibile
function anchorOf(sec) {
  const head = sec.querySelector(".v2-head");
  if (head) return { el: head, dy: 12 };
  const wrap = sec.querySelector(".v2-wrap") || sec;
  const first = Array.from(wrap.children).find((c) => !c.classList.contains("v2-sr") && c.getAttribute("aria-hidden") !== "true" && !c.classList.contains("v2-fx-glowbox"));
  return first ? { el: first, dy: 26 } : null;
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
    const ring = tile && tile.querySelector(".v2fx-mod__ring");
    if (!ring) return;
    gsap.fromTo(ring, { scale: 0.9, opacity: 0.95 }, { scale: 2.5, opacity: 0, duration: 0.95, ease: "power2.out", overwrite: true });
  };

  // ---------- misure ----------
  function measure() {
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const small = vw < 768;
    const n = small ? 16 : Math.round(Math.min(34, Math.max(22, 22 + (vw - 1152) / 16)));
    const sx = Math.max(n / 2 + 1, (vw - 1152) / 4);
    root.style.setProperty("--sx", `${sx}px`);
    root.style.setProperty("--n", `${n}px`);

    // le fasce: i figli diretti di <main> che sono .v2-section, oppure la .v2-section dentro un involucro <div class="v2-tone-…"> (es. il Finder in /contact)
    const secs = Array.from(page.children)
      .map((c) => (c.matches && c.matches("section.v2-section") ? c : c.tagName === "DIV" && c.className && /v2-tone-/.test(c.className) ? c.querySelector(":scope > section.v2-section") : null))
      .filter((c) => c && !c.classList.contains("v2-phero"));
    const items = [];
    let core = null;
    secs.forEach((sec) => {
      const cta = sec.querySelector(".v2-cta");
      if (cta) {
        const y = offsetIn(cta, page, "y") + cta.offsetHeight / 2;
        core = { el: cta, y, core: true, node: null, on: false };
        return;
      }
      const a = anchorOf(sec);
      if (!a) return;
      const y = offsetIn(a.el, page, "y") + a.dy;
      const prev = items[items.length - 1];
      if (prev && y - prev.y < 64) return; // due nodi quasi sovrapposti: ne basta uno
      items.push({ el: a.el, y, core: false, node: null, on: false });
    });
    if (!items.length || (!core && items.length < 2)) {
      M = null;
      return false;
    }
    if (core) items.push(core);
    if (items.length > nodeEls.length) items.length = nodeEls.length;
    items.forEach((it, i) => {
      it.node = nodeEls[i];
      it.tile = it.node.querySelector(".v2fx-mod");
    });
    nodeEls.forEach((nd, i) => (nd.style.display = i < items.length ? "" : "none"));

    const hasCore = items[items.length - 1].core;
    const y0 = items[0].y;
    const yEnd = items[items.length - 1].y;
    const H = Math.max(40, yEnd - y0);
    const coreLeft = hasCore ? offsetIn(coreEl_of(items), page, "x") : 0;
    const F = hasCore ? Math.max(14, coreLeft - sx) : 0;
    const extra = hasCore ? 0.2 * vh : 0; // scroll dopo il pannello: il filo gira l'angolo e ci entra
    const pageTop = page.getBoundingClientRect().top + window.scrollY;
    const prevOn = M ? M.items.map((it) => it.on) : [];
    M = { items, y0, yC: yEnd, H, F, extra, fv: H / (H + extra), sx, n, pageTop, vh, hasCore };
    items.forEach((it, i) => (it.on = !!prevOn[i]));

    items.forEach((it) => {
      it.node.style.top = `${(it.y - n / 2).toFixed(1)}px`;
    });
    track.style.top = `${(y0 - 150).toFixed(1)}px`;
    track.style.height = `${(H + 150).toFixed(1)}px`;
    fill.style.top = `${y0.toFixed(1)}px`;
    fill.style.height = `${H.toFixed(1)}px`;
    pkt.style.top = `${y0.toFixed(1)}px`;
    if (hasCore) {
      feed.style.top = `${(yEnd - 0.75).toFixed(1)}px`;
      feed.style.width = `${F.toFixed(1)}px`;
      feedFill.style.top = `${(yEnd - 0.75).toFixed(1)}px`;
      feedFill.style.width = `${F.toFixed(1)}px`;
      feedHead.style.top = `${yEnd.toFixed(1)}px`;
    }
    coreEl = hasCore ? coreEl_of(items) : null;
    root.classList.add("is-ready");
    return true;
  }
  function coreEl_of(items) {
    return items[items.length - 1].el;
  }

  // ---------- disegno (a ogni passo dello smorzamento) ----------
  function render() {
    if (!M) return;
    const { H, F, fv, y0, items, hasCore } = M;
    const p = proxy.p;
    const v = fv > 0 ? Math.min(p, fv) / fv : 1; // tratto verticale 0..1
    const h = hasCore && p > fv ? (p - fv) / (1 - fv) : 0; // tratto verso il pannello 0..1
    const y = v * H;
    gsap.set(pkt, { y, opacity: h > 0 ? Math.max(0, 1 - h * 4) : p > 0.0005 ? 1 : 0 });
    gsap.set(fill, { scaleY: v });
    if (hasCore) {
      if (h > 0) {
        gsap.set(feedFill, { scaleX: h });
        gsap.set(feedHead, { x: h * F, opacity: h < 0.995 ? 1 : 0 });
      } else {
        gsap.set(feedFill, { scaleX: 0 });
        gsap.set(feedHead, { opacity: 0, x: 0 });
      }
    }
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
    if (hasCore) {
      const lit = h >= 0.985;
      if (lit !== coreOn) {
        coreOn = lit;
        const last = items[items.length - 1];
        coreEl.classList.toggle("is-lit", lit);
        last.node.classList.toggle("is-on", lit);
        last.on = lit;
        if (lit) pulse(last.tile);
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
