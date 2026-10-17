import { makeWire, packetTween, chainTimeline, el } from "../wires";
import { splitDigits } from "../scrollFx";

/*
  La catena di moduli (fx/Rail.js): moduli di vetro in fila uniti da fili, con un pacchetto di luce che li attraversa; ogni modulo
  si accende quando il pacchetto arriva e, se la catena ha le schede (RailCell), la scheda del modulo entra con lui, dalla profondità.
  A fine catena, se c'è, il nodo d'oro con il numero vero del caso: le cifre arrivano come tessere (il valore resta sempre quello vero).
  - Da 768 px con il mouse la coreografia è legata allo scroll (scrub): si compone e si scompone anche tornando indietro. Con le
    schede (data-rail-pin="1") e da 1100 px, se ci sta nella finestra, la sezione resta FISSATA per circa un'altezza di schermo.
  - Telefono e tablet: i moduli entrano uno dopo l'altro appena la catena arriva in vista, i fili si disegnano, il pacchetto corre;
    le schede salgono ciascuna quando arriva lei.
  - A catena composta il pacchetto corre da un modulo all'altro, senza fine, e fa scattare l'anello di chi riceve (e il bordo della
    scheda). Si ferma quando la catena esce dallo schermo.
  - L'oro è solo sull'ultimo nodo. Solo transform e opacità. Con prefers-reduced-motion non si crea niente: lo stato finale del server.
*/
const GAP_RICH = 1.15; // secondi di timeline fra un passo e il successivo (scrub)
const GAP_LITE = 0.5;

// posizione di un elemento dentro `root` senza i transform (offsetLeft/Top): la rete misura la geometria a riposo, mai a metà entrata
function place(n, root) {
  let x = 0;
  let y = 0;
  let e = n;
  while (e && e !== root) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  if (e !== root) {
    const a = n.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    x = a.left - b.left;
    y = a.top - b.top;
  }
  return { l: x, t: y, w: n.offsetWidth, h: n.offsetHeight };
}

// il filo da A a B: esce dal bordo di A che guarda B ed entra nel bordo di B che guarda A (dritto se i centri sono quasi allineati)
function link(A, B, gap = 7) {
  const ax = A.l + A.w / 2;
  const ay = A.t + A.h / 2;
  const bx = B.l + B.w / 2;
  const by = B.t + B.h / 2;
  const dx = bx - ax;
  const dy = by - ay;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const s = dx >= 0 ? 1 : -1;
    // dritto: sul centro di A se cade dentro B (la capsula del numero è più alta del modulo), altrimenti sul centro di B, altrimenti a metà
    const inB = ay >= B.t + 14 && ay <= B.t + B.h - 14;
    const inA = by >= A.t + 14 && by <= A.t + A.h - 14;
    const y = inB ? ay : inA ? by : (ay + by) / 2;
    return { a: { x: ax + s * (A.w / 2 + gap), y }, b: { x: bx - s * (B.w / 2 + gap), y } };
  }
  const s = dy >= 0 ? 1 : -1;
  return { a: { x: ax, y: ay + s * (A.h / 2 + gap) }, b: { x: ax, y: by - s * (B.h / 2 + gap) } };
}

export default function rail(root, env) {
  const { gsap, ScrollTrigger, rich, pin, cleanups } = env;
  const box = root.querySelector("[data-rail-wires]");
  const stepEls = Array.from(root.querySelectorAll("[data-rail-step]"));
  if (!box || stepEls.length < 2) return;
  const nodes = stepEls.map((s) => s.querySelector("[data-node]"));
  const extras = stepEls.map((s) => Array.from(s.querySelectorAll("[data-rail-x]")));
  const isRes = stepEls.map((s) => s.hasAttribute("data-rail-result"));
  const cells = stepEls.map((_, k) => root.querySelector(`[data-rail-card="${k}"]`));
  const cards = cells.map((c) => (c ? c.querySelector(".v2-card") || c.firstElementChild : null));
  const grid = cells.find(Boolean) ? cells.find(Boolean).parentElement : null;
  const doPin = root.getAttribute("data-rail-pin") === "1";
  const numEl = root.querySelector("[data-rail-num]");
  const count = nodes.length;
  const last = count - 1;
  const GAP = rich ? GAP_RICH : GAP_LITE;
  const hasCards = cells.some(Boolean);

  let teardownCur = null;
  let lastSig = null;
  const signature = () =>
    `${pin ? 1 : 0}${rich ? 1 : 0}|` +
    nodes.map((n) => `${n.offsetLeft}.${n.offsetTop}.${n.offsetWidth}.${n.offsetHeight}`).join("|") +
    `|${root.offsetHeight}|${window.innerHeight >> 5}`;

  function mount() {
    const P = nodes.map((n) => place(n, root));
    const wires = [];
    for (let k = 0; k < count - 1; k++) {
      const { a, b } = link(P[k], P[k + 1]);
      const w = makeWire(box, a, b);
      gsap.set(w.fill, { scaleX: 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: 0, scale: 1 }));
      wires.push(w);
    }
    // i fili veri ci sono: il filo fermo del CSS (senza JavaScript / reduced motion) si spegne
    root.classList.add("is-wired");
    // l'oro: sul nodo del numero se c'è, altrimenti sull'ultimo modulo
    nodes[last].classList.add("is-end");
    const rings = nodes.map((n) => n.querySelector(".v2fx-mod__ring"));
    const glows = nodes.map((n) => n.querySelector(".v2fx-mod__glow") || n.querySelector(".v2fx-rail__resglow"));
    const endCard = isRes[last] ? -1 : last;
    const lits = cards.map((c, i) => {
      if (!c) return null;
      const lit = el("i", `v2fx-lit${i === endCard ? " v2fx-lit--end" : ""}`, c);
      lit.setAttribute("aria-hidden", "true");
      return lit;
    });
    const digits = numEl ? splitDigits(numEl) : null;
    const chars = digits ? digits.chars : [];

    const pulse = (k) => {
      const ring = rings[k];
      if (ring) gsap.fromTo(ring, { scale: 0.9, opacity: 0.95 }, { scale: 2.3, opacity: 0, duration: 0.85, ease: "power2.out", overwrite: true });
      const lit = lits[k];
      if (lit) gsap.fromTo(lit, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: "power2.out", overwrite: true });
    };
    const portFlash = (port) => port && gsap.fromTo(port, { scale: 2.2, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", overwrite: true });

    let composed = false;
    let inView = false;
    let loop = null;
    const sync = () => {
      if (!loop) return;
      if (composed && inView) loop.play();
      else loop.pause();
    };
    if (wires.length) {
      loop = chainTimeline(
        gsap,
        wires.map((w, k) => ({ wire: w, dir: 1, to: k + 1 })),
        {
          speed: 300,
          repeatDelay: 1.5,
          onArrive: (step) => {
            pulse(step.to);
            portFlash(step.wire.ports[1]);
          },
        }
      );
    }
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      });
      io.observe(root);
    } else inView = true;

    const setHidden = (on) => cards.forEach((c) => c && (on ? c.setAttribute("data-fx-hidden", "1") : c.removeAttribute("data-fx-hidden")));
    let tl = null;
    let st = null;
    let batch = [];
    let armTimer = 0;

    // ---------- la coreografia (la stessa legata allo scroll o a tempo) ----------
    const build = (tlx, withCards) => {
      nodes.forEach((n, k) => {
        const at = k * GAP;
        if (isRes[k]) {
          tlx.fromTo(n, { opacity: 0.16, scale: 0.7, rotationX: -50, y: 22, transformPerspective: 700 }, { opacity: 1, scale: 1, rotationX: 0, y: 0, duration: 0.85, ease: "back.out(1.6)" }, at);
          if (glows[k]) tlx.fromTo(glows[k], { opacity: 0.2, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7 }, at + 0.1);
          if (chars.length) {
            tlx.fromTo(
              chars,
              { opacity: 0, y: "0.55em", rotationX: -80, transformPerspective: 600, transformOrigin: "50% 100%" },
              { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.07, ease: "back.out(1.5)" },
              at + 0.2
            );
          }
        } else {
          tlx.fromTo(
            n,
            { opacity: 0.18, scale: 0.55, rotationY: -85, z: -120, transformPerspective: 700 },
            { opacity: 1, scale: 1, rotationY: 0, z: 0, duration: 0.7, ease: "back.out(1.7)" },
            at
          );
          if (glows[k]) tlx.fromTo(glows[k], { opacity: 0.1, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, at + 0.2);
        }
        if (extras[k].length) tlx.fromTo(extras[k], { opacity: 0.18, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, at + 0.12);
        if (rings[k]) {
          tlx.fromTo(rings[k], { scale: 0.9, opacity: 0.95 }, { scale: 2.3, opacity: 0, duration: 0.8, ease: "power2.out" }, at + 0.35);
        }
        if (k > 0) {
          const w = wires[k - 1];
          if (w) {
            tlx.fromTo(w.fill, { scaleX: 0 }, { scaleX: 1, duration: GAP * 0.6, ease: "power1.inOut" }, at - GAP * 0.62);
            tlx.add(packetTween(gsap, w, { dir: 1, speed: w.len / (GAP * 0.52), minTime: 0.2 }), at - GAP * 0.55);
            w.ports.forEach((p, pi) => tlx.fromTo(p, { opacity: 0 }, { opacity: 0.7, duration: 0.2 }, at - GAP * 0.62 + (pi ? GAP * 0.5 : 0)));
          }
        }
        if (withCards && cells[k]) {
          tlx.fromTo(
            cells[k],
            { opacity: 0.12, z: -420, rotationX: -32, y: 72, transformOrigin: "50% 100%" },
            { opacity: 1, z: 0, rotationX: 0, y: 0, duration: 0.95, ease: "power3.out" },
            at + 0.05
          );
          const lit = lits[k];
          if (lit) {
            tlx.fromTo(lit, { opacity: 0 }, { opacity: 1, duration: 0.18 }, at + 0.55);
            tlx.to(lit, { opacity: 0, duration: 0.7, ease: "power2.out" }, at + 0.73);
          }
        }
      });
      tlx.to({}, { duration: 0.5 }, last * GAP + 1);
    };

    // ---------- Telefono e tablet ----------
    if (!rich) {
      gsap.set(nodes, { opacity: 0.18, scale: 0.6 });
      extras.forEach((x) => x.length && gsap.set(x, { opacity: 0.18 }));
      if (chars.length) gsap.set(chars, { opacity: 0 });
      if (hasCards) {
        gsap.set(cells.filter(Boolean), { opacity: 0, y: 34 });
        batch = ScrollTrigger.batch(cells.filter(Boolean), {
          start: "top 92%",
          once: true,
          onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true, clearProps: "transform,opacity" }),
        });
      }
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onComplete: () => {
          composed = true;
          sync();
        },
      });
      build(tl, false);
      st = ScrollTrigger.create({ trigger: root, start: "top 80%", once: true, onEnter: () => tl.play() });
      return () => teardown();
    }

    // ---------- Mouse e schermo largo: coreografia legata allo scroll ----------
    root.classList.add("is-arming");
    armTimer = setTimeout(() => root.classList.remove("is-arming"), 900);
    if (grid) gsap.set(grid, { perspective: 1200 });
    setHidden(true);
    const fits = pin && doPin && root.offsetHeight <= window.innerHeight - 130;
    tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: fits ? "center center" : "top 82%",
        end: fits ? "+=110%" : hasCards ? "top 22%" : "bottom 58%",
        pin: fits ? root : false,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          const live = self.progress > 0.985;
          if (live !== composed) {
            composed = live;
            setHidden(!live);
            sync();
          }
        },
      },
    });
    build(tl, true);
    st = tl.scrollTrigger;
    return () => teardown();

    function teardown() {
      composed = false;
      if (loop) loop.kill();
      if (tl) {
        if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
        tl.kill();
      }
      if (st && st !== (tl && tl.scrollTrigger)) st.kill();
      batch.forEach((t) => t.kill());
      if (io) io.disconnect();
      clearTimeout(armTimer);
      root.classList.remove("is-arming");
      const all = [...nodes, ...cells.filter(Boolean), ...rings.filter(Boolean), ...glows.filter(Boolean), ...lits.filter(Boolean), ...chars, ...extras.flat()];
      gsap.killTweensOf(all);
      gsap.set(all, { clearProps: "all" });
      if (grid) gsap.set(grid, { clearProps: "perspective" });
      wires.forEach((w) => w.dispose());
      lits.forEach((l) => l && l.remove());
      nodes[last].classList.remove("is-end");
      root.classList.remove("is-wired");
      if (digits) digits.restore();
      setHidden(false);
    }
  }

  const rebuild = () => {
    const s = signature();
    if (s === lastSig) return;
    lastSig = s;
    if (teardownCur) teardownCur();
    teardownCur = mount();
  };
  rebuild();
  ScrollTrigger.addEventListener("refresh", rebuild);
  const onToggle = () => requestAnimationFrame(() => ScrollTrigger.refresh());
  root.addEventListener("toggle", onToggle, true);
  cleanups.push(() => {
    root.removeEventListener("toggle", onToggle, true);
    ScrollTrigger.removeEventListener("refresh", rebuild);
    if (teardownCur) teardownCur();
    teardownCur = null;
  });
}
