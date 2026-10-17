/*
  Effetti a scroll del kit, in funzioni semplici (nessun React qui). Li usano FxScope e i componenti
  Reveal, SplitReveal e CountUp. Tutto parte da `libs` = { gsap, ScrollTrigger, SplitText }.

  Regole che valgono per tutti:
  - il server manda la pagina già nello stato finale: niente è nascosto prima che parta JavaScript;
  - si prepara all'entrata solo ciò che sta SOTTO la piega al momento del montaggio: quello che si vede già resta fermo;
  - si anima solo transform e opacity; a fine entrata gli stili inline si tolgono (clearProps);
  - sullo schermo stretto o con il tocco l'entrata è più corta e senza rotazioni (lite);
  - l'elemento in entrata porta data-fx-hidden finché non ha finito: Tilt3D e Magnetic lo aspettano.
*/
import { belowFold, isLite } from "./env";

const CLEAR = "transform,opacity";

const depthOf = (lite) => (lite ? { y: 26, rx: 0, s: 1, d: 0.7 } : { y: 52, rx: 8, s: 0.975, d: 0.95 });

function hide(gsap, targets, dp) {
  gsap.set(targets, {
    opacity: 0,
    y: dp.y,
    rotationX: dp.rx,
    scale: dp.s,
    transformPerspective: 1000,
    transformOrigin: "50% 100%",
  });
}
function show(gsap, targets, dp, extra = {}) {
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    scale: 1,
    duration: dp.d,
    ease: "power3.out",
    clearProps: CLEAR,
    onComplete: () => [].concat(targets).forEach((t) => t.removeAttribute && t.removeAttribute("data-fx-hidden")),
    ...extra,
  });
}

/* Un blocco che entra in profondità quando arriva in vista. */
export function revealItem(el, libs, lite = isLite()) {
  const { gsap, ScrollTrigger } = libs;
  if (!el || !belowFold(el)) return;
  const dp = depthOf(lite);
  el.setAttribute("data-fx-hidden", "1");
  hide(gsap, el, dp);
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    show(gsap, el, dp);
  };
  ScrollTrigger.create({ trigger: el, start: "top 93%", once: true, onEnter: go, onEnterBack: go, onLeave: go });
  return () => el.removeAttribute("data-fx-hidden");
}

/* Le schede di una griglia entrano una dopo l'altra (quelle che arrivano in vista insieme, scaglionate). */
export function staggerGroup(container, libs, lite = isLite()) {
  const { gsap, ScrollTrigger } = libs;
  const kids = [...container.children].filter((k) => !k.classList.contains("v2-sr") && belowFold(k));
  if (!kids.length) return;
  const dp = depthOf(lite);
  kids.forEach((k) => k.setAttribute("data-fx-hidden", "1"));
  hide(gsap, kids, dp);
  const seen = new Set();
  const go = (batch) => {
    const fresh = batch.filter((b) => !seen.has(b));
    fresh.forEach((b) => seen.add(b));
    if (fresh.length) show(gsap, fresh, dp, { stagger: lite ? 0.07 : 0.1 });
  };
  ScrollTrigger.batch(kids, { start: "top 93%", once: true, interval: 0.1, batchMax: 6, onEnter: go, onEnterBack: go, onLeave: go });
  return () => kids.forEach((k) => k.removeAttribute("data-fx-hidden"));
}

/* Sopratitolo e riga di apertura: salgono e compaiono. */
export function riseItem(el, libs, lite = isLite()) {
  const { gsap, ScrollTrigger } = libs;
  if (!el || !belowFold(el)) return;
  el.setAttribute("data-fx-hidden", "1");
  gsap.set(el, { opacity: 0, y: lite ? 14 : 22 });
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.12,
      ease: "power3.out",
      clearProps: CLEAR,
      onComplete: () => el.removeAttribute("data-fx-hidden"),
    });
  };
  ScrollTrigger.create({ trigger: el, start: "top 93%", once: true, onEnter: go, onEnterBack: go, onLeave: go });
  return () => el.removeAttribute("data-fx-hidden");
}

/* Un titolo che entra parola per parola, in profondità. A fine entrata il testo torna intero com'era. */
export function splitReveal(el, libs, lite = isLite()) {
  const { gsap, ScrollTrigger, SplitText } = libs;
  if (!el || !SplitText || !belowFold(el)) return;
  let split;
  try {
    split = SplitText.create(el, { type: "words", wordsClass: "fx-w" });
  } catch (_) {
    return;
  }
  const words = split.words || [];
  if (!words.length) {
    split.revert();
    return;
  }
  gsap.set(words, {
    opacity: 0,
    yPercent: lite ? 45 : 85,
    rotationX: lite ? 0 : -50,
    transformOrigin: "50% 100%",
    transformPerspective: 700,
  });
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    gsap.to(words, {
      opacity: 1,
      yPercent: 0,
      rotationX: 0,
      duration: lite ? 0.65 : 0.9,
      ease: "power3.out",
      stagger: lite ? 0.04 : 0.055,
      onComplete: () => split.revert(),
    });
  };
  ScrollTrigger.create({ trigger: el, start: "top 93%", once: true, onEnter: go, onEnterBack: go, onLeave: go });
  return () => split.revert();
}

/* ---------- Numeri che si compongono ----------
   Un numero di promessa o di caso non passa MAI da un valore sbagliato: niente conteggio da zero (a metà corsa si leggeva
   «7 giorni» di garanzia, o «13» dove il caso dice 2.329). Il valore vero è nel testo dal server e non cambia: a entrata
   preparata ogni carattere è una tessera (span inline-block) che arriva alzandosi dalla profondità, a scaglioni da sinistra,
   solo con transform e opacità. Chi legge con uno screen reader trova il numero intero in un testo nascosto (.v2-sr).
   Il numero resta spezzato in tessere finché vive la pagina (rimetterlo intero a fine corsa sposterebbe di un pixel quello
   che gli sta accanto). Senza JavaScript, già nello schermo al montaggio e con prefers-reduced-motion è fermo e intero. */
/* Spezza il testo di `el` in tessere (una per carattere), con una copia leggibile per gli screen reader. Torna { chars, restore }. */
export function splitDigits(el) {
  const raw = el.getAttribute("data-fx-raw") ?? el.textContent;
  el.setAttribute("data-fx-raw", raw);
  const sr = document.createElement("span");
  sr.className = "v2-sr";
  sr.textContent = raw;
  const vis = document.createElement("span");
  vis.className = "v2fx-cu";
  vis.setAttribute("aria-hidden", "true");
  const chars = Array.from(raw).map((c) => {
    const ch = document.createElement("span");
    ch.className = "v2fx-cu__ch";
    ch.textContent = c;
    vis.appendChild(ch);
    return ch;
  });
  el.textContent = "";
  el.appendChild(sr);
  el.appendChild(vis);
  return {
    chars,
    restore() {
      el.textContent = raw;
      el.removeAttribute("data-fx-raw");
    },
  };
}

export function countUp(el, libs) {
  const { gsap, ScrollTrigger } = libs;
  if (!el || el.children.length || !belowFold(el)) return;
  if (!/\d/.test(el.getAttribute("data-fx-raw") ?? el.textContent)) return;
  const { chars, restore } = splitDigits(el);
  el.setAttribute("data-fx-hidden", "1");
  gsap.set(chars, { opacity: 0, y: "0.55em", rotationX: -80, transformPerspective: 600, transformOrigin: "50% 100%" });
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.85,
      ease: "back.out(1.5)",
      stagger: 0.06,
      clearProps: CLEAR,
      onComplete: () => el.removeAttribute("data-fx-hidden"),
    });
  };
  ScrollTrigger.create({ trigger: el, start: "top 93%", once: true, onEnter: go, onEnterBack: go, onLeave: go });
  return () => {
    done = true;
    gsap.killTweensOf(chars);
    restore();
    el.removeAttribute("data-fx-hidden");
  };
}

/* ---------- Tutto quello che sta dentro una fascia ---------- */
const hasFx = (el) => Boolean(el.querySelector('[data-fx="stagger"],[data-fx="split"],[data-fx="own"]'));
const isSkipped = (el) => {
  const v = el.getAttribute("data-fx");
  return v === "own" || v === "skip" || v === "stagger" || el.classList.contains("v2-fx-glowbox") || el.classList.contains("v2-sr") || el.getAttribute("aria-hidden") === "true";
};

/* I blocchi che non hanno un effetto proprio entrano da soli; se ne contengono uno, si scende ai loro figli. */
function collect(el, depth = 0, out = []) {
  [...el.children].forEach((c) => {
    if (isSkipped(c)) return;
    if (depth < 2 && hasFx(c)) collect(c, depth + 1, out);
    else out.push(c);
  });
  return out;
}

/*
  Arrivo da una transizione di pagina (PageTransition): la hero entra mentre le lastre si ritirano. Il titolo parola per
  parola, il resto (pillola, sottotitolo, bottoni) sale e compare. Si prepara subito (siamo sotto la copertura) e parte
  all'evento «v2:arrive». Senza transizione (primo caricamento, link aperti altrove) non fa niente: il testo del server
  resta com'è e l'LCP non cambia.
*/
export function heroArrive(copy, libs) {
  if (typeof window === "undefined" || !window.__v2Arrive || !copy) return;
  const { gsap, SplitText } = libs;
  const kids = [...copy.children];
  kids.forEach((k) => (k.style.animation = "none"));
  const h1 = copy.querySelector(".v2-phero__h1");
  const rest = kids.filter((k) => k !== h1);
  let split = null;
  if (h1 && SplitText) {
    try {
      split = SplitText.create(h1, { type: "words", wordsClass: "fx-w" });
    } catch (_) {
      split = null;
    }
  }
  const words = split && split.words ? split.words : [];
  if (words.length) {
    gsap.set(words, { opacity: 0, yPercent: 85, rotationX: -45, transformOrigin: "50% 100%", transformPerspective: 700 });
  } else if (h1) {
    gsap.set(h1, { opacity: 0, y: 20 });
  }
  gsap.set(rest, { opacity: 0, y: 18 });
  let started = false;
  const run = () => {
    if (started) return;
    started = true;
    if (words.length) {
      gsap.to(words, {
        opacity: 1,
        yPercent: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        onComplete: () => split && split.revert(),
      });
    } else if (h1) {
      gsap.to(h1, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: CLEAR });
    }
    gsap.to(rest, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.25, clearProps: CLEAR });
  };
  window.addEventListener("v2:arrive", run, { once: true });
  const safety = setTimeout(run, 3200);
  return () => {
    window.removeEventListener("v2:arrive", run);
    clearTimeout(safety);
    if (split) split.revert();
    gsap.set([...rest, ...(words.length ? [] : h1 ? [h1] : [])], { clearProps: CLEAR });
  };
}

/* Lega tutto ciò che sta dentro `root`. Restituisce la funzione che rimette il DOM com'era (smontaggio). */
export function bindScrollFx(root, libs) {
  const lite = isLite();
  const undo = [];
  const add = (fn) => fn && undo.push(fn);
  const heroCopy = root.querySelector(".v2-phero__copy");
  if (heroCopy) add(heroArrive(heroCopy, libs));
  const all = (sel) => [...(root.matches(sel) ? [root] : []), ...root.querySelectorAll(sel)];
  all('[data-fx="split"]').forEach((el) => add(splitReveal(el, libs, lite)));
  all('[data-fx="rise"]').forEach((el) => add(riseItem(el, libs, lite)));
  all('[data-fx="count"]').forEach((el) => add(countUp(el, libs)));
  all('[data-fx="stagger"]').forEach((el) => add(staggerGroup(el, libs, lite)));
  // se il contenitore stesso è una griglia a scaglioni o un blocco con effetto proprio, i suoi figli non entrano due volte
  if (!["stagger", "own", "skip"].includes(root.getAttribute("data-fx"))) collect(root).forEach((el) => add(revealItem(el, libs, lite)));
  return () => undo.forEach((fn) => fn());
}
