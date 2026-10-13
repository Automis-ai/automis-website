import { wordsIn, riseIn } from "@/components/v2/wow/scroll/split";
import { tiltCards } from "@/components/v2/wow/scroll/pointer";
import { makeWire, pathBetween, chainTimeline } from "@/components/v2/wow/scroll/wires";
import { offsetIn } from "@/components/v2/wow/scroll/measure";
import journeyFx from "./journey";

/*
  Categorie.
  - Il titolo entra a parole (SplitText).
  - L'animazione «journey» parte come una carta piccola, inclinata, e si allarga fino a tutta larghezza mentre scorri:
    si compone (i quattro angoli arrivano da fuori, l'alone si accende).
  - I cinque moduli (schede di vetro) arrivano dalla profondità, sfalsati; ognuno ha la sua piastrella che si compone
    sopra la scheda. Poi si inclinano al passaggio del mouse (con la piastrella in rilievo).
  - Fra le schede passano i fili: si disegnano a schede composte e un pacchetto di luce corre da un modulo all'altro
    (una catena che va da sola), accendendo il bordo di chi riceve. Si ferma fuori schermo.
  Telefono (lite): carta che si allarga meno, schede che salgono una alla volta, fili in colonna fra le schede.
  Passaggio dalla hero (stages/handoff.js, env.hs): il titolo entra quando la pista della hero sta finendo. Nel modo «a» (schermo
  largo) le cinque card sono nello stesso punto delle tessere della hero e compaiono sopra di loro mentre la pista finisce (la
  dissolvenza è legata allo scroll, senza ritardo: atterrano esattamente a fine pista); i fili passano da piastra a piastra.
*/
export default function cats(section, env) {
  const { gsap, ScrollTrigger, SplitText, rich, cleanups } = env;
  const deps = { gsap, SplitText, ScrollTrigger };
  const $ = (s) => section.querySelector(s);
  const head = $(".v2-head");

  const hs = env.hs && env.hs.mode ? env.hs : null; // la hero è fissata e le categorie si sovrappongono alla sua fine
  const modeA = !!hs && hs.mode === "a";
  // il titolo è già sotto (o sopra) le tessere a fine pista: entra quando la pista sta per finire, non quando sale dal fondo
  const at = hs ? hs.at(modeA ? 0.93 : 0.8) : null;
  wordsIn($(".v2-title"), deps, hs ? { trigger: hs.trigger, start: at } : { start: "top 88%" });
  riseIn([$(".v2-eyebrow")], deps, hs ? { trigger: hs.trigger, start: at, y: 14, duration: 0.7 } : { trigger: head, start: "top 90%", y: 14, duration: 0.7 });
  riseIn([$(".v2-lead")], deps, hs ? { trigger: hs.trigger, start: at, y: 20, delay: 0.35 } : { trigger: head, start: "top 88%", y: 20, delay: 0.35 });

  // ---- Journey: la carta che si compone ----
  const j = $("[data-wow-journey]");
  const card = j && j.querySelector("[data-wow-journey-card]");
  const jst = { start: modeA ? "top 92%" : "top 96%", end: rich ? "top 24%" : "top 42%" }; // tratto di scroll in cui la carta si compone
  let jTl = null;
  let jFull = 1;
  if (j && card) {
    const corners = Array.from(j.querySelectorAll("[data-corner]"));
    const glow = j.querySelector("[data-journey-glow]");
    gsap.set(card, { transformPerspective: 1400 });
    // Scala finale: quasi tutta la larghezza della finestra, mai oltre 1,16 (lo spazio sopra e sotto la carta lo lascia il CSS).
    const full = Math.max(1, Math.min(1.16, (window.innerWidth - 32) / Math.max(1, j.offsetWidth)));
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: j, start: jst.start, end: jst.end, scrub: 0.7 },
    });
    jTl = tl;
    jFull = rich ? full : 1;
    tl.fromTo(
      card,
      { scale: rich ? 0.56 : 0.84, rotationX: rich ? 26 : 6, y: rich ? 90 : 30, opacity: 0, transformOrigin: "50% 50%" },
      { scale: rich ? full : 1, rotationX: 0, y: 0, opacity: 1, ease: "power2.out" },
      0
    );
    if (corners.length) {
      tl.fromTo(
        corners,
        { opacity: 0, x: (i) => (i % 2 ? 54 : -54), y: (i) => (i < 2 ? -54 : 54), scale: 2 },
        { opacity: 1, x: 0, y: 0, scale: 1, stagger: 0.05, ease: "power3.out" },
        0.08
      );
    }
    if (glow) tl.fromTo(glow, { opacity: 0 }, { opacity: 1 }, 0);
  }

  // ---- La rete dei cinque moduli ----
  const net = $("[data-wow-net]");
  const grid = $("[data-wow-catgrid]");
  const wiresBox = $("[data-wires]");
  const cards = Array.from(section.querySelectorAll("[data-wow-cat]"));
  if (!net || !grid || !wiresBox || !cards.length) return;
  const tiles = cards.map((c) => c.querySelector(".v2hp-cat__mod"));
  const lits = cards.map((c) => c.querySelector(".v2hp-cat__lit"));

  let net_ = null; // fili e catena correnti
  let composed = false;
  let inView = false;
  let loop = null;

  const flash = (i, port) => {
    const lit = lits[i];
    if (lit) gsap.fromTo(lit, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: "power2.out", overwrite: true });
    const ring = tiles[i] && tiles[i].querySelector(".v2hp-mod__ring");
    // la piastra del modo «a» è già grande (fino a 190 px): l'anello si allarga poco
    if (ring) gsap.fromTo(ring, { scale: 0.92, opacity: 0.95 }, { scale: modeA ? 1.28 : 2.1, opacity: 0, duration: 0.85, ease: "power2.out", overwrite: true });
    if (port) gsap.fromTo(port, { scale: 2.2, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", overwrite: true });
  };

  function sync() {
    if (!loop) return;
    if (composed && inView) loop.play();
    else loop.pause();
  }

  function build() {
    if (net_) {
      if (loop) loop.kill();
      loop = null;
      net_.wires.forEach((w) => w.dispose());
      net_ = null;
    }
    const ox = grid.offsetLeft;
    const oy = grid.offsetTop;
    // modo «a»: i fili vanno da piastra a piastra (come le linee fra le tessere della hero); altrimenti da scheda a scheda
    const R = modeA
      ? tiles.map((t) => ({ l: offsetIn(t, net, "x"), t: offsetIn(t, net, "y"), w: t.offsetWidth, h: t.offsetHeight }))
      : cards.map((c) => ({ l: c.offsetLeft + ox, t: c.offsetTop + oy, w: c.offsetWidth, h: c.offsetHeight }));
    const edges = [];
    for (let i = 0; i < R.length; i++) {
      for (let k = i + 1; k < R.length; k++) {
        const A = R[i];
        const B = R[k];
        if (Math.abs(A.t - B.t) < 4) {
          const gapX = B.l - (A.l + A.w);
          if (gapX > 0 && gapX < 150) edges.push({ i, k, a: { x: A.l + A.w, y: A.t + A.h / 2 }, b: { x: B.l, y: B.t + B.h / 2 } });
        } else if (B.t > A.t) {
          const gapY = B.t - (A.t + A.h);
          const left = Math.max(A.l, B.l);
          const right = Math.min(A.l + A.w, B.l + B.w);
          if (gapY > 0 && gapY < 150 && right - left > 48) {
            const x = (left + right) / 2;
            edges.push({ i, k, a: { x, y: A.t + A.h }, b: { x, y: B.t } });
          }
        }
      }
    }
    const wires = edges.map((e) => {
      const w = makeWire(wiresBox, e.a, e.b);
      w.edge = e;
      gsap.set(w.fill, { scaleX: composed ? 1 : 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: composed ? 0.7 : 0, scale: 1 }));
      return w;
    });

    // catena: i moduli nell'ordine di lettura, passando dai fili che esistono, e di nuovo al primo
    const adj = new Map(R.map((_, i) => [i, []]));
    const byKey = new Map();
    wires.forEach((w) => {
      adj.get(w.edge.i).push(w.edge.k);
      adj.get(w.edge.k).push(w.edge.i);
      byKey.set(`${w.edge.i}-${w.edge.k}`, w);
    });
    const seq = [0];
    const seen = new Set([0]);
    let cur = 0;
    for (let w = 1; w < R.length; w++) {
      if (seen.has(w)) continue;
      const path = pathBetween(adj, cur, w);
      if (!path) continue;
      path.slice(1).forEach((n) => {
        seq.push(n);
        seen.add(n);
      });
      cur = w;
    }
    const back = pathBetween(adj, cur, 0);
    if (back) back.slice(1).forEach((n) => seq.push(n));
    const steps = [];
    for (let s = 1; s < seq.length; s++) {
      const a = seq[s - 1];
      const b = seq[s];
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const wire = byKey.get(`${lo}-${hi}`);
      if (!wire) continue;
      steps.push({ wire, dir: a < b ? 1 : -1, to: b });
    }
    net_ = { wires, steps };
    if (steps.length) {
      loop = chainTimeline(gsap, steps, {
        speed: 340,
        repeatDelay: 1.6,
        onArrive: (step) => {
          const port = step.wire.ports[step.dir > 0 ? 1 : 0];
          flash(step.to, port);
        },
      });
      sync();
    }
  }

  // i fili si disegnano quando le schede sono composte
  function draw() {
    composed = true;
    if (!net_) return;
    net_.wires.forEach((w, i) => {
      gsap.to(w.fill, { scaleX: 1, duration: 0.7, delay: i * 0.07, ease: "power2.out" });
      w.ports.forEach((p) => gsap.to(p, { opacity: 0.7, duration: 0.5, delay: 0.3 + i * 0.07 }));
    });
    gsap.delayedCall(0.9, sync);
  }

  // si torna su con lo scroll (modo «a»): le card si dissolvono e i fili si spengono con loro
  function undraw() {
    composed = false;
    if (net_) {
      net_.wires.forEach((w) => {
        gsap.killTweensOf([w.fill, ...w.ports]);
        gsap.set(w.fill, { scaleX: 0 });
        w.ports.forEach((p) => gsap.set(p, { opacity: 0, scale: 1 }));
      });
    }
    sync();
  }

  build();
  const onRefresh = () => build();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  ScrollTrigger.create({
    trigger: net,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });
  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    if (loop) loop.kill();
    if (net_) net_.wires.forEach((w) => w.dispose());
    net_ = null;
  });

  // La carta «journey» come uscita del sistema: materiale, inclinazione, riflesso, e (modo «a») i fili dalle card alle tre scene del video
  if (j && card) journeyFx(section, env, { modeA, full: jFull, tl: jTl, st: jst, flashCard: flash });

  if (modeA) {
    // Le card nascono sopra le tessere della hero: stessa posizione, la piastra è la stessa icona alla stessa grandezza.
    // Dissolvenza e salita legate allo scroll (scrub senza ritardo): atterrano un soffio prima della fine della pista (96,5%) e
    // da lì restano esattamente sopra le tessere.
    const faces = cards.map((c) => c.querySelector(".v2hp-cat__card"));
    let tilted = false;
    gsap.set(grid, { perspective: 1200 });
    const reveal = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: hs.trigger, start: hs.at(0.8), end: hs.at(0.965), scrub: true, invalidateOnRefresh: true },
      onUpdate: () => {
        const done = reveal.progress() > 0.995;
        if (done && !composed) {
          faces.forEach((f) => (f.style.pointerEvents = ""));
          draw();
          tiles.forEach((_, i) => gsap.delayedCall(0.05 + i * 0.09, () => flash(i, null)));
          if (rich && !tilted) {
            tilted = true;
            cleanups.push(tiltCards(cards, deps, { perspective: 0, max: 7, lift: 24 }));
          }
        } else if (!done && composed) {
          faces.forEach((f) => (f.style.pointerEvents = "none"));
          undraw();
        }
      },
    });
    // Stato iniziale scritto a mano: le tween sfalsate (stagger) partono dopo lo zero e GSAP non le disegna prima di arrivarci.
    // Solo opacità (non autoAlpha): con visibility: hidden i link «Scopri di più» sparirebbero dall'ordine di Tab. Finché le card non
    // sono composte non prendono il mouse (pointer-events), e col focus da tastiera la pagina salta a card composte (wow/scroll/focus.js).
    const from = { opacity: 0, y: 64, scale: 0.96, rotationX: -12, transformPerspective: 1000, transformOrigin: "50% 100%" };
    gsap.set(faces, from);
    faces.forEach((f) => (f.style.pointerEvents = "none"));
    reveal.fromTo(
      faces,
      from,
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.7, ease: "power2.out", stagger: { each: 0.06, from: "center" }, immediateRender: false },
      0
    );
  } else if (rich) {
    gsap.set(grid, { perspective: 1200 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: grid, start: "top 84%", once: true },
      onComplete: () => {
        draw();
        cleanups.push(tiltCards(cards, deps, { perspective: 0, max: 7, lift: 24 }));
      },
    });
    tl.from(
      cards,
      {
        opacity: 0,
        z: -440,
        rotationX: -42,
        y: 90,
        transformOrigin: "50% 100%",
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.11, from: "start" },
      },
      0
    );
    // la piastrella si compone sopra la scheda: parte da lontano, inclinata e piccola, e si posa
    tl.from(
      tiles,
      {
        opacity: 0,
        scale: 0.3,
        x: (i) => (i % 2 ? 46 : -46),
        y: -70,
        rotationZ: (i) => (i % 2 ? 28 : -28),
        rotationY: -70,
        duration: 0.95,
        ease: "back.out(1.5)",
        stagger: 0.11,
      },
      0.45
    );
  } else {
    gsap.set(cards, { opacity: 0, y: 34 });
    ScrollTrigger.batch(cards, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
    });
    ScrollTrigger.create({ trigger: net, start: "top 70%", once: true, onEnter: draw });
  }
}
