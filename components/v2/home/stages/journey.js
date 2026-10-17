import { tiltCards } from "@/components/v2/wow/scroll/pointer";
import { makeWire, packetTween } from "@/components/v2/wow/scroll/wires";
import { offsetIn } from "@/components/v2/wow/scroll/measure";

/*
  La carta «journey» (il video di Arcangelo) come uscita del sistema, non come un rettangolo incollato in fondo.

  - Materiale delle tessere: bordo sfumato di 1 px, spessore a gradini, bordo interno luminoso (tutto in CSS, home.css: .v2hp-journey__*).
    Qui si aggiunge quello che si muove: un riflesso che attraversa la carta mentre si compone e a ogni segnale che arriva, e
    l'inclinazione al mouse (come le card: pochi gradi, la luce segue il puntatore). L'inclinazione sta sull'involucro interno
    (data-journey-tilt) e non sulla carta, perché la carta la scala e la ruota lo scroll (stages/cats.js).
  - Tre fili legano le card Marketing, Vendita e Amministrazione alla carta: sono le tre scene del video (Annunci con IA, Calendario e chat,
    Scheda cliente e Company Brain). I fili si allungano dalle card verso la carta mentre questa si compone (stesso tratto di scroll, stesso
    smorzamento) e si agganciano quando arriva. Poi, mentre il video passa da una scena all'altra, dalla card di quella scena parte un
    pacchetto di luce che scende nella carta e ne accende il bordo; alla scena finale («Un solo sistema integrato») partono tutti e tre.
    I tempi si leggono dal video (timeupdate), quindi seguono il video anche quando riparte da capo. Fuori schermo, o col video fermo, niente scatta.
    Solo schermo largo con le cinque card in fila sopra la carta (modo «a» del passaggio dalla hero, stages/handoff.js): altrove la carta sta
    sopra le card e i fili non servono.
  Tutto è solo transform e opacità. Restituisce la pulizia (via env.cleanups).
*/

// Tempi della scena nel video (secondi): Marketing, Vendite, Amministrazione. Il finale (tutti e tre) a 17,3 s. Il video dura ~19 s.
const SCENES = [
  { slug: "marketing", at: 0.6 },
  { slug: "sales", at: 5.2 },
  { slug: "admin", at: 14.0 },
];
const FINALE = 17.3;
const DOCK = 0.66; // da questo punto del tratto di scroll la carta è composta e i fili agganciati

export default function journeyFx(section, env, { modeA, full, st, flashCard }) {
  const { gsap, ScrollTrigger, rich, cleanups } = env;
  const deps = { gsap };
  const j = section.querySelector("[data-wow-journey]");
  if (!j) return;
  const tilt = j.querySelector("[data-journey-tilt]");
  const sheen = j.querySelector("[data-journey-sheen]");
  const ping = j.querySelector("[data-journey-ping]");
  const lit = j.querySelector("[data-journey-lit]");
  const stack = section.querySelector(".v2hp-catstack");
  const box = section.querySelector("[data-journey-wires]");
  const off = [];

  // Due riflessi, due elementi: uno legato allo scroll (la carta si compone) e uno a tempo (arriva un segnale). Sullo stesso elemento
  // l'overwrite del secondo ucciderebbe la tween scrub del primo.
  [sheen, ping].forEach((e) => e && gsap.set(e, { xPercent: -170, skewX: -18, opacity: 0 }));
  const sweep = (dur = 1.4) => {
    if (!ping) return;
    gsap.fromTo(ping, { xPercent: -170, opacity: 1 }, { xPercent: 420, duration: dur, ease: "power2.inOut", overwrite: true, onComplete: () => gsap.set(ping, { opacity: 0 }) });
  };
  const flashLit = () => lit && gsap.fromTo(lit, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: "power2.out", overwrite: true });
  const flashPort = (port) => port && gsap.fromTo(port, { scale: 2.4, opacity: 1 }, { scale: 1, opacity: 0.7, duration: 0.8, ease: "power2.out", overwrite: true });

  // ---- inclinazione al mouse ----
  if (rich && tilt) off.push(tiltCards([tilt], deps, { perspective: 1100, max: 2.6, lift: 0 }));

  // ---- la timeline legata allo scroll: riflesso e fili. Una sua, perché aggiungere tween a quella di cats.js ne cambierebbe la durata
  // e quindi quanto scroll serve alla carta per comporsi. Dura sempre 1 (c'è un tween vuoto di spaziatura). ----
  let wires = [];
  let composed = false;
  let inView = false;
  let last = 0;
  let sig = "";
  const live = new Set();

  const wtl = gsap.timeline({
    scrollTrigger: { trigger: j, start: st.start, end: st.end, scrub: 0.7 },
    onUpdate: () => {
      const done = wtl.progress() >= DOCK;
      if (done && !composed) dock();
      else if (!done && composed) undock();
    },
  });

  function fill() {
    wtl.clear();
    wtl.to({}, { duration: 1 }, 0);
    if (sheen) {
      wtl.fromTo(sheen, { xPercent: -170, opacity: 1 }, { xPercent: 420, ease: "none", duration: 0.4 }, 0.5);
      wtl.set(sheen, { opacity: 0 }, 0.92);
    }
    wires.forEach((w) => {
      wtl.fromTo(w.fill, { scaleX: 0 }, { scaleX: 1, ease: "power1.out", duration: DOCK - 0.08 }, 0.04);
      wtl.fromTo(w.ports, { opacity: 0 }, { opacity: 0.7, ease: "none", duration: 0.06 }, DOCK - 0.04);
    });
  }

  function clearWires() {
    live.forEach((t) => t.kill());
    live.clear();
    wires.forEach((w) => {
      gsap.killTweensOf([w.fill, w.pkt, ...w.ports]);
      w.dispose();
    });
    wires = [];
  }

  function build() {
    if (!modeA || !stack || !box) {
      // niente fili (la carta sta sopra le card): solo il riflesso, una volta
      if (sig !== "none") {
        sig = "none";
        fill();
      }
      return;
    }
    const jt = offsetIn(j, stack, "y");
    // la carta, scalata a fine scroll, sale sopra il suo riquadro: il filo finisce sul bordo che si vede
    const top = jt - (j.offsetHeight * (full - 1)) / 2;
    const cards = Array.from(section.querySelectorAll("[data-wow-cat]"));
    const spec = [];
    SCENES.forEach((sc) => {
      const li = section.querySelector(`[data-wow-cat][data-slug="${sc.slug}"]`);
      if (!li) return;
      const x = offsetIn(li, stack, "x") + li.offsetWidth / 2;
      const y0 = offsetIn(li, stack, "y") + li.offsetHeight;
      if (top - y0 < 24) return; // non c'è spazio per un filo (schermo basso)
      spec.push({ sc, x, y0, i: cards.indexOf(li) });
    });
    const next = JSON.stringify([spec.map((s) => [Math.round(s.x), Math.round(s.y0)]), Math.round(top)]);
    if (next === sig) return; // stessa geometria: le tween legate allo scroll restano dove sono
    sig = next;
    clearWires();
    spec.forEach((s) => {
      const w = makeWire(box, { x: s.x, y: s.y0 + 1 }, { x: s.x, y: top - 1 });
      w.at = s.sc.at;
      w.i = s.i;
      gsap.set(w.fill, { scaleX: 0 });
      w.ports.forEach((p) => gsap.set(p, { opacity: 0, scale: 1 }));
      wires.push(w);
    });
    fill();
    wtl.progress(wtl.scrollTrigger ? wtl.scrollTrigger.progress : 0);
  }

  function fire(w, delay = 0) {
    if (!composed || !inView || !w) return;
    flashCard(w.i, null);
    const t = packetTween(gsap, w, {
      dir: 1,
      speed: 260,
      minTime: 0.55,
      onArrive: () => {
        flashPort(w.ports[1]);
        flashLit();
        sweep(1.4);
      },
    });
    if (delay) t.delay(delay);
    live.add(t);
    t.eventCallback("onComplete", () => live.delete(t));
  }

  // il tempo lo detta il video
  const onTime = (e) => {
    const v = e.target;
    if (!(v instanceof HTMLVideoElement) || v.paused) return;
    const t = v.currentTime;
    if (t < last - 0.5) last = 0; // il video è ripartito
    wires.forEach((w) => {
      if (last < w.at && t >= w.at) fire(w);
    });
    if (last < FINALE && t >= FINALE) wires.forEach((w, k) => fire(w, k * 0.16));
    last = t;
  };
  j.addEventListener("timeupdate", onTime, true); // timeupdate non risale: si ascolta in cattura
  off.push(() => j.removeEventListener("timeupdate", onTime, true));

  let hello = null;
  function dock() {
    composed = true;
    // un saluto a fili agganciati: partono in fila, anche se il video è a metà di una scena
    hello = gsap.delayedCall(0.6, () => wires.forEach((w, k) => fire(w, k * 0.22)));
  }
  function undock() {
    composed = false;
    if (hello) hello.kill();
    live.forEach((t) => t.kill());
    live.clear();
    wires.forEach((w) => gsap.set(w.pkt, { opacity: 0 }));
  }

  build();
  const onRefresh = () => build();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  off.push(() => ScrollTrigger.removeEventListener("refresh", onRefresh));

  // i fili servono finché si vede la pila (card + carta)
  const view = ScrollTrigger.create({
    trigger: stack || j,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (inView = self.isActive),
  });
  off.push(() => view.kill());

  cleanups.push(() => {
    off.forEach((fn) => fn());
    if (hello) hello.kill();
    wtl.scrollTrigger && wtl.scrollTrigger.kill();
    wtl.kill();
    clearWires();
    [sheen, ping].forEach((e) => e && gsap.set(e, { clearProps: "all" }));
  });
}
