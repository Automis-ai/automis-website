import { makeWire, packetTween, chainTimeline, el } from "../wires";

/*
  La rete di schede: le schede di un gruppo sono moduli di una stessa rete, uniti da fili con pacchetti di luce.
  data-net="assemble" (hub /systems): i cinque moduli stanno scomposti al centro, in profondità, e con lo scroll si
    RICOMPONGONO nella griglia; a griglia composta si disegnano i fili e la catena parte da sola.
  data-net="chain" (pagine di categoria): le schede entrano IN CATENA, una dopo l'altra. Il filo si disegna dalla scheda
    che c'è a quella che arriva, un pacchetto lo percorre e la scheda che riceve si accende (bordo di luce) e si compone.
    Come la catena della hero: chiamata -> CRM -> chat.
  - Da 1100 px con il mouse e lo schermo abbastanza alto la sezione resta FISSATA (circa un'altezza di schermo di scroll) e la
    coreografia è legata allo scroll (scrub): si ricompone anche tornando indietro. Se la rete non sta nella finestra non si fissa:
    lo scrub corre lo stesso, senza pin. Da 768 px con il mouse: scrub senza pin.
  - Telefono e tablet: le schede salgono una alla volta, i fili in colonna si disegnano e la catena gira da sola.
  - A rete composta il pacchetto corre da una scheda all'altra, senza fine, e accende il bordo di chi riceve. Si ferma quando la
    rete esce dallo schermo.
  - L'oro è solo sull'ultimo nodo della catena. Solo transform e opacità. Con prefers-reduced-motion non si crea niente.
  - Il server manda le schede già al loro posto (stato finale): senza JavaScript tutto si legge. Prima che la catena parta le schede
    sono «fantasmi» (opacità .12, i fili spenti come tracce): una rete in attesa, mai un buco vuoto sotto la hero.
*/
const SNAKE_GAP = 1.25; // secondi di timeline fra una scheda e la successiva (chain)

function rectsOf(cells, grid) {
  const ox = grid.offsetLeft;
  const oy = grid.offsetTop;
  return cells.map((c) => ({ l: c.offsetLeft + ox, t: c.offsetTop + oy, w: c.offsetWidth, h: c.offsetHeight }));
}

// ordine «a serpentina»: la prima riga da sinistra a destra, la seconda da destra a sinistra, ecc. Ogni passo è una scheda vicina.
function snake(R) {
  const rows = [];
  R.forEach((r, i) => {
    let row = rows.find((x) => Math.abs(x.t - r.t) < 6);
    if (!row) {
      row = { t: r.t, idx: [] };
      rows.push(row);
    }
    row.idx.push(i);
  });
  rows.sort((a, b) => a.t - b.t);
  const seq = [];
  rows.forEach((row, k) => {
    const idx = row.idx.slice().sort((a, b) => R[a].l - R[b].l);
    if (k % 2) idx.reverse();
    seq.push(...idx);
  });
  return seq;
}

// i fili: uno per ogni coppia di schede vicine (nei varchi), dal centro del bordo di una al centro del bordo dell'altra
function edgesOf(R) {
  const edges = [];
  for (let i = 0; i < R.length; i++) {
    for (let k = i + 1; k < R.length; k++) {
      const A = R[i];
      const B = R[k];
      if (Math.abs(A.t - B.t) < 6) {
        const gapX = B.l - (A.l + A.w);
        if (gapX > 8 && gapX < 160) edges.push({ i, k, a: { x: A.l + A.w, y: A.t + A.h / 2 }, b: { x: B.l, y: B.t + B.h / 2 } });
      } else if (B.t > A.t) {
        const gapY = B.t - (A.t + A.h);
        const left = Math.max(A.l, B.l);
        const right = Math.min(A.l + A.w, B.l + B.w);
        if (gapY > 8 && gapY < 160 && right - left > 40) {
          const x = (left + right) / 2;
          edges.push({ i, k, a: { x, y: A.t + A.h }, b: { x, y: B.t } });
        }
      }
    }
  }
  return edges;
}

export default function net(root, env) {
  const { gsap, ScrollTrigger, rich, pin, cleanups } = env;
  const mode = root.getAttribute("data-net") === "assemble" ? "assemble" : "chain";
  const box = root.querySelector("[data-net-wires]");
  const cells = Array.from(root.querySelectorAll("[data-net-cell]"));
  const grid = cells[0] && cells[0].parentElement;
  if (!box || !grid || cells.length < 2) return;
  const cards = cells.map((c) => c.querySelector(".v2-card") || c.firstElementChild);

  let teardownCur = null;
  let lastSig = null;

  const signature = () =>
    `${pin ? 1 : 0}${rich ? 1 : 0}|` + cells.map((c) => `${c.offsetLeft}.${c.offsetTop}.${c.offsetWidth}.${c.offsetHeight}`).join("|") + `|${window.innerHeight >> 5}`;

  function mount() {
    const R = rectsOf(cells, grid);
    const seq = snake(R);
    const edges = edgesOf(R);
    const wires = edges.map((e) => {
      const w = makeWire(box, e.a, e.b);
      w.edge = e;
      gsap.set(w.fill, { scaleX: 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: 0, scale: 1 }));
      return w;
    });
    const byKey = new Map(wires.map((w) => [`${w.edge.i}-${w.edge.k}`, w]));
    // i passi della catena: da una scheda alla successiva, sul filo che le unisce (se c'è)
    const steps = [];
    for (let s = 1; s < seq.length; s++) {
      const a = seq[s - 1];
      const b = seq[s];
      const w = byKey.get(`${Math.min(a, b)}-${Math.max(a, b)}`);
      steps.push({ a, b, wire: w || null, dir: a < b ? 1 : -1, to: b });
    }
    // chiusura: dall'ultima alla prima, se c'è un filo (la catena riparte da capo)
    {
      const a = seq[seq.length - 1];
      const b = seq[0];
      const w = byKey.get(`${Math.min(a, b)}-${Math.max(a, b)}`);
      if (w) steps.push({ a, b, wire: w, dir: a < b ? 1 : -1, to: b, back: true });
    }
    const last = seq[seq.length - 1];

    // bordo di luce di ogni scheda (acceso dal pacchetto che arriva); l'ultima della catena ha l'oro
    const lits = cards.map((c, i) => {
      const lit = el("i", `v2fx-lit${i === last && mode === "chain" ? " v2fx-lit--end" : ""}`, c);
      lit.setAttribute("aria-hidden", "true");
      return lit;
    });
    const flash = (i, port) => {
      const lit = lits[i];
      if (lit) gsap.fromTo(lit, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: "power2.out", overwrite: true });
      if (port) gsap.fromTo(port, { scale: 2.2, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", overwrite: true });
    };

    let composed = false;
    let inView = false;
    let loop = null;
    const sync = () => {
      if (!loop) return;
      if (composed && inView) loop.play();
      else loop.pause();
    };
    const runnable = steps.filter((s) => s.wire);
    if (runnable.length) {
      loop = chainTimeline(gsap, runnable, {
        speed: 340,
        repeatDelay: 1.6,
        onArrive: (step) => flash(step.to, step.wire.ports[step.dir > 0 ? 1 : 0]),
      });
    }
    // «è nello schermo»: IntersectionObserver e non ScrollTrigger, perché la sezione può essere fissata (pin) da un altro trigger
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      });
      io.observe(root);
    } else {
      inView = true;
    }

    const setHidden = (on) => cards.forEach((c) => c && (on ? c.setAttribute("data-fx-hidden", "1") : c.removeAttribute("data-fx-hidden")));
    let tl = null;
    let st = null;
    let batchTriggers = [];
    let armTimer = 0;

    // ---------- Telefono e tablet: entrate semplici, fili che si disegnano ----------
    if (!rich) {
      gsap.set(cells, { opacity: 0, y: 34 });
      const drawAll = () => {
        composed = true;
        wires.forEach((w, i) => {
          gsap.to(w.fill, { scaleX: 1, duration: 0.7, delay: i * 0.08, ease: "power2.out" });
          w.ports.forEach((p) => gsap.to(p, { opacity: 0.7, duration: 0.5, delay: 0.3 + i * 0.08 }));
        });
        gsap.delayedCall(0.9, sync);
      };
      batchTriggers = ScrollTrigger.batch(cells, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true, clearProps: "transform,opacity" }),
      });
      st = ScrollTrigger.create({ trigger: root, start: "top 72%", once: true, onEnter: drawAll });
      return () => teardown();
    }

    // ---------- Mouse e schermo largo: coreografia legata allo scroll ----------
    // Le schede che si vedono già al caricamento passano allo stato di partenza con una transizione CSS (0,6 s), non a scatto:
    // la classe is-arming la accende solo il tempo di prepararsi, poi lo scrub riprende il controllo senza ritardi.
    root.classList.add("is-arming");
    armTimer = setTimeout(() => root.classList.remove("is-arming"), 900);
    gsap.set(grid, { perspective: 1200 });
    setHidden(true);
    const fits = pin && root.offsetHeight <= window.innerHeight - 130;
    tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: fits ? "center center" : "top 82%",
        end: fits ? "+=100%" : "top 22%",
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

    if (mode === "assemble") {
      // i moduli stanno scomposti al centro, in profondità, inclinati: arrivano al loro posto con un piccolo rimbalzo
      const gw = grid.offsetWidth;
      const gh = grid.offsetHeight;
      cells.forEach((c, i) => {
        const r = R[i];
        const side = i % 2 ? 1 : -1;
        tl.fromTo(
          c,
          {
            x: gw / 2 - (r.l - grid.offsetLeft + r.w / 2),
            y: gh / 2 - (r.t - grid.offsetTop + r.h / 2),
            z: -560,
            scale: 0.34,
            rotationY: side * (48 + i * 10),
            rotationZ: side * (9 + i * 3),
            transformOrigin: "50% 50%",
          },
          { x: 0, y: 0, z: 0, scale: 1, rotationY: 0, rotationZ: 0, duration: 1.15, ease: "back.out(1.25)" },
          i * 0.12
        );
        // l'opacità arriva subito: nella scomposizione i moduli si vedono già
        tl.fromTo(c, { opacity: 0.9 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, i * 0.12);
      });
      const tEnd = cells.length * 0.12 + 1.15;
      wires.forEach((w, i) => {
        tl.fromTo(w.fill, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.out" }, tEnd - 0.2 + i * 0.07);
        w.ports.forEach((p) => tl.fromTo(p, { opacity: 0 }, { opacity: 0.7, duration: 0.3 }, tEnd + 0.1 + i * 0.07));
      });
      tl.to({}, { duration: 0.35 }, tEnd + wires.length * 0.07 + 0.3); // un respiro prima della fine
    } else {
      // la catena: la scheda arriva quando il pacchetto ha percorso il filo che la porta
      const order = seq;
      order.forEach((ci, k) => {
        const at = k * SNAKE_GAP;
        tl.fromTo(
          cells[ci],
          { opacity: 0.12, z: -420, rotationX: -32, y: 72, transformOrigin: "50% 100%" },
          { opacity: 1, z: 0, rotationX: 0, y: 0, duration: 0.95, ease: "power3.out" },
          k === 0 ? 0 : at - 0.15
        );
        const nxt = order[k + 1];
        if (nxt === undefined) return;
        const w = byKey.get(`${Math.min(ci, nxt)}-${Math.max(ci, nxt)}`);
        if (!w) return;
        const dir = ci < nxt ? 1 : -1;
        tl.fromTo(w.fill, { scaleX: 0 }, { scaleX: 1, duration: SNAKE_GAP * 0.62, ease: "power1.inOut" }, at + 0.35);
        tl.add(packetTween(gsap, w, { dir, speed: w.len / (SNAKE_GAP * 0.55), minTime: 0.2 }), at + 0.45);
        w.ports.forEach((p, pi) => tl.fromTo(p, { opacity: 0 }, { opacity: 0.7, duration: 0.2 }, at + 0.35 + (pi ? SNAKE_GAP * 0.55 : 0)));
        // la scheda che riceve si accende
        const lit = lits[nxt];
        tl.fromTo(lit, { opacity: 0 }, { opacity: 1, duration: 0.18 }, at + SNAKE_GAP * 0.92);
        tl.to(lit, { opacity: 0, duration: 0.7, ease: "power2.out" }, at + SNAKE_GAP * 0.92 + 0.18);
      });
      // il filo di chiusura (dall'ultima alla prima) si disegna a catena finita
      const closing = steps.find((s) => s.back);
      if (closing) {
        const tz = order.length * SNAKE_GAP;
        tl.fromTo(closing.wire.fill, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, tz - 0.2);
        closing.wire.ports.forEach((p) => tl.fromTo(p, { opacity: 0 }, { opacity: 0.7, duration: 0.3 }, tz + 0.2));
      }
      tl.to({}, { duration: 0.4 }, order.length * SNAKE_GAP + 0.3);
    }
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
      batchTriggers.forEach((t) => t.kill());
      if (io) io.disconnect();
      clearTimeout(armTimer);
      root.classList.remove("is-arming");
      gsap.killTweensOf(cells);
      gsap.killTweensOf(lits);
      gsap.set(cells, { clearProps: "transform,opacity" });
      gsap.set(grid, { clearProps: "perspective" });
      wires.forEach((w) => w.dispose());
      lits.forEach((l) => l.remove());
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
  // «Leggi di più» dentro una scheda cambia le altezze: i fili vanno rimisurati (il refresh li ricostruisce se la geometria è cambiata)
  const onToggle = () => requestAnimationFrame(() => ScrollTrigger.refresh());
  root.addEventListener("toggle", onToggle, true);
  cleanups.push(() => {
    root.removeEventListener("toggle", onToggle, true);
    ScrollTrigger.removeEventListener("refresh", rebuild);
    if (teardownCur) teardownCur();
    teardownCur = null;
  });
}
