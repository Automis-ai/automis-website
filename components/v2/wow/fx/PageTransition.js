"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./fx.css";

/*
  Transizione fra pagine: un gesto di continuità, non un taglio. Cinque persiane scure scendono e coprono lo schermo, la pagina
  cambia sotto, le persiane continuano a scendere e scoprono la nuova pagina DALL'ALTO (prima la hero scura, poi il corpo: mai
  una striscia chiara in basso per due fotogrammi, come succedeva quando si ritiravano verso l'alto). Ogni persiana ha un bordo di
  luce sul lato che guida; in mezzo, sul filo che attraversa le lastre, corre un modulo di vetro (lo stesso motivo della hero):
  entra da sinistra mentre si copre ed esce a destra quando si scopre. Il titolo della nuova hero entra parola per parola
  (FxScope -> scrollFx.heroArrive) e DOPO si compone la scena 3D.

  Telefono (schermo stretto o puntatore grossolano): NESSUNA copertura. Lì il messaggio è la velocità, e le persiane aggiungevano
  mezzo secondo a ogni cambio di pagina (misurato). Il clic passa a Next senza ritardo; un filo di luce in alto (2 px, solo transform)
  dà subito riscontro al tocco e si chiude quando la pagina nuova è montata, e il titolo della nuova hero entra a parole
  (scrollFx.heroArrive): il gesto resta, il costo è zero. Desktop: copertura ~320 ms e scoperta ~340 ms (gesto intero, da o verso la home); ~230 + 250 ms fra due pagine interne.

  Come funziona. Header.js monta questo componente su ogni pagina (renderizza null). Una sola volta per sessione installa un
  ascoltatore di clic in cattura sul documento. Un clic su un link interno (stessa origine, stessa scheda, nessun tasto
  modificatore) viene fermato, parte la copertura e, a copertura finita, router.push(href). La nuova pagina, quando si
  monta, chiama reveal(). L'overlay vive fuori da React (nel body), quindi sopravvive al cambio di pagina.

  Non parte (la navigazione resta quella normale):
  - prefers-reduced-motion, risparmio dati, rete lenta (2g / 3g);
  - link con target, download, hreflang (il selettore di lingua salva la scelta nel suo onClick), data-no-transition;
  - ancore sulla stessa pagina, file, /api, /_next; tasti modificatori; scheda nascosta; transizione già in corso.
  Se la nuova pagina non arriva entro 6 s, le persiane si ritirano comunque.
  Si anima solo transform e opacity.
*/
// Durata delle persiane (solo desktop): copertura e scoperta, in ms (CSS + sfalsamento delle cinque lastre).
// full  = da o verso la home: il gesto intero, ~0,65 s più il tempo della rotta.
// quick = fra due pagine interne (stessa hero, stesso fondo): la stessa coreografia, ma ~0,45 s: a navigazione ripetuta il gesto
//         non deve pesare. Il modulo attraversa comunque tutto lo schermo, in sincro con la copertura e con la scoperta.
const TIMING = {
  full: { cover: 320, reveal: 340, css: { "--cover": "240ms", "--reveal": "300ms", "--in-stag": "18ms", "--out-stag": "6ms" } },
  quick: { cover: 230, reveal: 250, css: { "--cover": "168ms", "--reveal": "210ms", "--in-stag": "12ms", "--out-stag": "4ms" } },
};
const SLABS = 5;

const win = typeof window !== "undefined" ? window : null;
function state() {
  if (!win) return null;
  if (!win.__v2pt) win.__v2pt = { router: null, busy: false, installed: false, overlay: null, timer: 0, covered: false, arriving: false, line: null, lineTimer: 0 };
  return win.__v2pt;
}

function allowed() {
  if (!win || document.visibilityState !== "visible") return false;
  if (win.matchMedia && win.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const c = navigator.connection;
  if (c && (c.saveData || /^(slow-2g|2g|3g)$/.test(c.effectiveType || ""))) return false;
  return true;
}

// telefono (schermo stretto o puntatore grossolano): niente persiane, solo il filo di luce in alto
function isLite() {
  return Boolean(win.matchMedia && win.matchMedia("(max-width: 767px), (pointer: coarse)").matches);
}

function startLine(S) {
  if (S.line) S.line.remove();
  const el = document.createElement("div");
  el.className = "v2-ptl";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  S.line = el;
  win.requestAnimationFrame(() => win.requestAnimationFrame(() => el.classList.add("is-run")));
  // rete di sicurezza: se la pagina non arriva il filo sparisce comunque
  S.lineTimer = setTimeout(() => finishLine(S), 6000);
}

function finishLine(S) {
  clearTimeout(S.lineTimer);
  const el = S.line;
  if (!el) return;
  S.line = null;
  el.classList.add("is-done");
  setTimeout(() => el.remove(), 520);
}

const MOD_SVG =
  '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>';

function makeOverlay(T) {
  const el = document.createElement("div");
  el.className = "v2-pt";
  el.setAttribute("aria-hidden", "true");
  Object.keys(T.css).forEach((k) => el.style.setProperty(k, T.css[k]));
  let html = "";
  for (let i = 0; i < SLABS; i++) html += `<i class="v2-pt__slab" style="--i:${i}"><b></b></i>`;
  // il filo che attraversa le lastre e il modulo di vetro che lo percorre
  html += `<span class="v2-pt__wire"></span><span class="v2-pt__mod"><span class="v2-pt__modbody">${MOD_SVG}</span></span>`;
  el.innerHTML = html;
  document.body.appendChild(el);
  return el;
}

// la home (con o senza prefisso di lingua) ha la sua apertura: da e verso di lei il gesto è intero
const isHomePath = (p) => /^\/(?:it|pt|pt-site|en)?\/?$/.test(p);

function cover(S, done, quick) {
  const T = quick ? TIMING.quick : TIMING.full;
  S.T = T;
  if (!S.overlay) S.overlay = makeOverlay(T);
  S.covered = false;
  const el = S.overlay;
  el.classList.remove("is-out");
  // un fotogramma per far registrare lo stato iniziale, poi parte
  win.requestAnimationFrame(() => {
    el.classList.add("is-in");
    setTimeout(() => {
      S.covered = true;
      done();
    }, T.cover);
  });
}

function reveal(S) {
  const el = S.overlay;
  if (!el || !S.busy) return;
  const go = () => {
    if (!S.overlay) return;
    clearTimeout(S.timer);
    el.classList.remove("is-in");
    el.classList.add("is-out");
    // il titolo della nuova pagina comincia mentre lo schermo si libera
    setTimeout(() => win.dispatchEvent(new CustomEvent("v2:arrive")), 90);
    const T = S.T || TIMING.full;
    setTimeout(() => {
      el.remove();
      S.overlay = null;
      S.busy = false;
      S.covered = false;
    }, T.reveal + 60);
    setTimeout(() => {
      win.__v2Arrive = false;
    }, 2600);
  };
  // se la copertura non è ancora finita si aspetta; due fotogrammi lasciano agli effetti della nuova pagina il tempo di prepararsi
  const wait = () => {
    if (!S.covered) return setTimeout(wait, 30);
    win.requestAnimationFrame(() => win.requestAnimationFrame(go));
  };
  wait();
}

function onClick(e) {
  const S = state();
  if (!S || S.busy || !S.router) return;
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  if (a.target && a.target !== "_self") return;
  if (a.hasAttribute("download") || a.hasAttribute("hreflang") || a.hasAttribute("data-no-transition")) return;
  let url;
  try {
    url = new URL(a.href, win.location.href);
  } catch (_) {
    return;
  }
  if (url.origin !== win.location.origin) return;
  if (url.pathname === win.location.pathname) return; // ancore e ricaricamenti: normali
  if (/^\/(api|_next)\//.test(url.pathname) || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
  if (!allowed()) return;
  if (isLite()) {
    // telefono: il clic prosegue (Next naviga subito, senza copertura); il filo dà riscontro, l'arrivo lo chiude
    S.arriving = true;
    win.__v2Arrive = true;
    startLine(S);
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  const href = url.pathname + url.search + url.hash;
  S.busy = true;
  win.__v2Arrive = true;
  try {
    S.router.prefetch(href);
  } catch (_) {
    /* il prefetch è solo un acceleratore */
  }
  // rete di sicurezza: se la nuova pagina non arriva, le lastre si ritirano lo stesso
  S.timer = setTimeout(() => reveal(S), 6000);
  cover(S, () => S.router.push(href), !isHomePath(win.location.pathname) && !isHomePath(url.pathname));
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const S = state();
    if (!S) return;
    S.router = router;
  }, [router]);

  useEffect(() => {
    const S = state();
    if (!S || S.installed) return;
    S.installed = true;
    win.document.addEventListener("click", onClick, true);
  }, []);

  // la pagina nuova si è montata: se c'è una copertura in corso, si scopre; sul telefono si chiude il filo e entra il titolo
  useEffect(() => {
    const S = state();
    if (!S) return;
    if (S.busy) reveal(S);
    else if (S.arriving) {
      S.arriving = false;
      finishLine(S);
      setTimeout(() => win.dispatchEvent(new CustomEvent("v2:arrive")), 40);
      setTimeout(() => {
        win.__v2Arrive = false;
      }, 2600);
    }
  }, [pathname]);

  return null;
}
