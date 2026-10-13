import { offsetIn } from "@/components/v2/wow/scroll/measure";

/*
  Il passaggio hero -> categorie.

  La hero resta ferma (pista sticky, components/v2/wow/hero/hero.css) mentre i moduli si fondono nelle cinque categorie; a fine pista
  (s = 1) le cinque tessere stanno ferme a centro schermo, con le loro etichette. Prima la sezione delle categorie cominciava solo dopo
  la fine della hero: le tessere uscivano dall'alto e restava un tratto vuoto (350-450 px) prima del titolo.

  Ora la sezione delle categorie si sovrappone alla fine della pista (margine superiore negativo, --hs-pull) e, a pista finita, il
  titolo è già lì. Due modi, scelti dalla misura (il HTML senza JavaScript non cambia: nessuna sovrapposizione):
  - «a» (schermo largo, tessere in fila): titolo SOPRA le tessere; le cinque card sono nello stesso punto delle tessere
    (stessa icona, stessa grandezza della piastra, stesso passo) e compaiono in dissolvenza SOPRA di loro mentre la pista finisce:
    le tessere diventano le card. Per questo, qui, le card vengono prima dell'animazione «journey» (stages/cats.js).
  - «b» (telefono, tablet, schermo basso): titolo sotto le etichette, a un respiro di distanza (mai più di ~100 px di vuoto).

  Le posizioni delle tessere NON si leggono dalla scena (è WebGL): sono copiate da components/v2/wow/hero/scene/graph.js,
  layoutModules(): se quella disposizione cambia, qui va aggiornata dockGeometry().

  Si applica da qui (attributo data-hs e variabili --hs-* sulla sezione) a ogni refresh di ScrollTrigger («refreshInit»: prima che
  le altre coreografie misurino la pagina). Se la hero perde la pista (ripiego sullo still, movimento ridotto, schermo basso) la
  sovrapposizione si toglie da sola.
*/
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Dove stanno le tessere dei dock alla fine della pista, in px del contenitore della hero (alto 100svh).
export function dockGeometry(W, H, textLeft) {
  const compact = W < 900 || textLeft < 150;
  const labelH = 30;
  if (compact) {
    const margin = 14;
    const dS = clamp(Math.min(92, (W - margin * 2 - 28) / 3), 64, 110);
    const blockH = dS * 2 + labelH * 2 + 20;
    const y0 = (H - blockH) / 2 + dS / 2 + 14;
    const y2 = y0 + dS + labelH + 20;
    return { compact: true, dS, cy: (y0 + y2) / 2, labelBottom: y2 + dS / 2 + 12 + 24 };
  }
  const dS = clamp(W * 0.125, 112, 190);
  const cy = H * 0.5 - 6;
  return { compact: false, dS, cy, pitch: dS * 1.36, labelBottom: cy + dS / 2 + 12 + 24 };
}

// Sinistra del testo della hero a riposo (stessa misura della scena: serve a sapere se la disposizione è «compatta»).
function textLeft(copy, bg) {
  if (!copy) return 9999;
  const cr = bg.getBoundingClientRect();
  let l = Infinity;
  copy.querySelectorAll(".v2-phero__pill, .v2-phero__h1, .v2-phero__sub, .v2-phero__actions").forEach((el) => {
    if (!el.offsetWidth) return;
    const r = el.getBoundingClientRect();
    let cx = r.left + r.width / 2;
    let w = r.width;
    try {
      const tr = getComputedStyle(el).transform;
      if (tr && tr !== "none") {
        const m = new DOMMatrixReadOnly(tr);
        cx -= m.e;
        if (m.a > 0.2) w /= m.a;
      }
    } catch (e) {
      /* si usa il rettangolo com'è */
    }
    l = Math.min(l, cx - w / 2 - cr.left);
  });
  return Number.isFinite(l) ? l : 9999;
}

export default function handoff(section, env) {
  const { ScrollTrigger, cleanups } = env;
  const hero = document.querySelector(".v2-phero");
  const bg = hero && hero.querySelector(":scope > .v2-phero__bg");
  const copy = hero && hero.querySelector(".v2-phero__copy");
  const head = section.querySelector(".v2-head");
  const net = section.querySelector("[data-wow-net]");
  const tile0 = section.querySelector(".v2hp-cat__mod");
  const hs = {
    mode: null,
    trigger: hero,
    // lunghezza della pista (px di scorrimento da hero intera a rete fusa nelle cinque categorie)
    run: () => (hero && bg ? Math.max(1, hero.offsetHeight - bg.offsetHeight) : 1),
    // stringa `start` di ScrollTrigger (trigger = hero) a una frazione della pista
    at: (f) => () => `top+=${Math.round(f * hs.run())} top`,
  };
  env.hs = hs;
  if (!hero || !bg || !head || !net || !tile0) return;

  const VARS = ["--hs-pull", "--hs-fade", "--hs-d", "--hs-card", "--hs-gap", "--hs-row"];
  function disarm() {
    section.removeAttribute("data-hs");
    VARS.forEach((v) => section.style.removeProperty(v));
    hs.mode = null;
  }

  function layout() {
    const run = hs.run();
    const pinned = run > 40 && !hero.hasAttribute("data-wow-fallback");
    if (!pinned) {
      if (hs.mode !== null || section.hasAttribute("data-hs")) disarm();
      return null;
    }
    const W = bg.clientWidth;
    const H = bg.clientHeight;
    const geo = dockGeometry(W, H, textLeft(copy, bg));
    let mode = !geo.compact && W >= 1100 ? "a" : "b";
    let pull = 0;

    if (mode === "a") {
      const d = Math.round(geo.dS);
      const card = Math.round(d * 1.22);
      section.setAttribute("data-hs", "a");
      section.style.setProperty("--hs-d", `${d}px`);
      section.style.setProperty("--hs-card", `${card}px`);
      section.style.setProperty("--hs-gap", `${Math.round(geo.pitch - card)}px`);
      section.style.setProperty("--hs-row", `${Math.round(geo.pitch * 4 + card)}px`);
      const plateCenter = offsetIn(tile0, section, "y") + tile0.offsetHeight / 2;
      // la piastra della card deve stare dove sta la tessera a fine pista (centro schermo - 6 px)
      pull = H + plateCenter - geo.cy;
      const headTop = geo.cy - plateCenter + offsetIn(head, section, "y");
      if (headTop < 90) mode = "b"; // il titolo non ci sta sopra le tessere (schermo basso): si ripiega
    }
    if (mode === "b") {
      ["--hs-d", "--hs-card", "--hs-gap", "--hs-row"].forEach((v) => section.style.removeProperty(v));
      section.setAttribute("data-hs", "b");
      const gap = geo.compact ? 72 : 88;
      pull = H + offsetIn(head, section, "y") - (geo.labelBottom + gap);
    }
    pull = clamp(pull, 0, hero.offsetHeight - 40);
    section.style.setProperty("--hs-pull", `${pull.toFixed(1)}px`);
    // la sfumatura che nasconde il bordo della hero: sul telefono è corta, per non scurire la pillola della catena sotto le etichette
    section.style.setProperty("--hs-fade", geo.compact ? "110px" : "220px");
    hs.mode = mode;
    return mode;
  }

  layout();

  const onInit = () => {
    const was = hs.mode;
    layout();
    // cambia il modo (ruota il telefono, si ridimensiona la finestra): le coreografie vanno rifatte
    if (hs.mode !== was && env.rebuild) env.rebuild();
  };
  ScrollTrigger.addEventListener("refreshInit", onInit);
  // la hero può perdere la pista a pagina aperta (ripiego sullo still): se ne accorge l'attributo
  const mo = new MutationObserver(() => ScrollTrigger.refresh());
  mo.observe(hero, { attributes: true, attributeFilter: ["data-wow-fallback"] });

  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refreshInit", onInit);
    mo.disconnect();
    disarm();
  });
}
