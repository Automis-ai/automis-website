"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./fx.css";
import { presetForPath } from "./scene/presets";

// Gli still pronti (public/media/page-scenes/<preset>-<sm|md|lg>.webp): un'immagine per preset e per fascia di larghezza.
// I preset senza immagine (cases) usano quella generica.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const STILL_IDS = new Set(["hub", "marketing", "sales", "support", "admin", "hr", "how", "training", "about", "contact", "ecommerce", "datura", "voice", "generic"]);

/*
  Sfondo 3D delle hero interne (PageHero compact): la stessa rete dei moduli della home in versione «lite», con i moduli
  scelti per la pagina (scene/presets.js; senza `preset` lo ricava dal percorso). Il motore (scene/pageEngine.js, con three)
  arriva con import() dentro l'effetto: solo lato client, solo dopo il primo paint e dopo «load», nel tempo morto.
  - il testo della hero arriva dal server e non aspetta niente di tutto questo;
  - nessuna scena sul testo: il motore legge dal DOM le scatole del testo (.v2-phero__copy) e della fascia riservata
    (.v2-phero__stage) e lascia libero il testo, anche a 390 px;
  - prefers-reduced-motion: niente three, niente WebGL, niente canvas. Un'immagine ferma già pronta (un webp da ~20-25 KB per preset e per
    fascia di larghezza: sm sotto 640 px, md fino a 1099, lg da 1100). Sta nel HTML del server come <picture> con la preferenza dentro
    la `media` di ogni <source>: il browser la trova e la scarica mentre legge la pagina (senza aspettare l'idratazione, quindi il titolo
    resta l'LCP); per gli altri resta un pixel trasparente `data:` (zero rete);
  - risparmio dati o rete lenta, niente WebGL, contesto perso, scena che non regge: niente scena (resta il fondo della hero);
  - si ferma quando esce dallo schermo e quando la scheda è nascosta (dentro il motore);
  - telefono: profilo leggero (DPR al massimo 1,5, niente antialias, meno polvere, ondeggiamento al posto del mouse).
*/
// Ritorna null (niente WebGL) oppure { soft }: soft = rendering su software (SwiftShader, llvmpipe, GPU emulata), dove la
// scena parte direttamente nel profilo leggero.
function probeWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return null;
    let soft = false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (info) soft = /swiftshader|llvmpipe|software|microsoft basic render/i.test(String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)));
    const lose = gl.getExtension("WEBGL_lose_context");
    if (lose) lose.loseContext();
    return { soft };
  } catch (e) {
    return null;
  }
}

const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

function measure(container) {
  if (!container || !container.isConnected) return { W: 0, H: 0, copy: { l: 0, t: 0, r: 0, b: 0 }, stage: { l: 0, t: 0, r: 0, b: 0 } };
  const hero = container.closest(".v2-phero");
  const cb = container.getBoundingClientRect();
  const rel = (b) => ({ l: b.left - cb.left, t: b.top - cb.top, r: b.right - cb.left, b: b.bottom - cb.top });
  let copy = { l: cb.width * 0.2, t: cb.height * 0.2, r: cb.width * 0.8, b: cb.height * 0.7 };
  let stage = { l: 0, t: cb.height - 100, r: cb.width, b: cb.height - 20 };
  if (hero) {
    const parts = hero.querySelectorAll(
      ".v2-phero__pill, .v2-phero__h1, .v2-phero__sub, .v2-phero__actions, .v2-phero__extra"
    );
    let u = null;
    parts.forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) return;
      const r = rel(b);
      u = u ? { l: Math.min(u.l, r.l), t: Math.min(u.t, r.t), r: Math.max(u.r, r.r), b: Math.max(u.b, r.b) } : r;
    });
    if (u) copy = u;
    const st = hero.querySelector(".v2-phero__stage");
    if (st) {
      const sb = st.getBoundingClientRect();
      if (sb.height > 1) stage = rel(sb);
    }
  }
  return { W: cb.width, H: cb.height, copy, stage };
}

export default function PageScene({ preset }) {
  const path = usePathname();
  const id = preset || presetForPath(path);
  const ref = useRef(null);
  const stillBase = `/media/page-scenes/${STILL_IDS.has(id) ? id : "generic"}`;
  const [reduced, setReduced] = useState(false); // prefers-reduced-motion: solo l'immagine ferma
  const [on, setOn] = useState(false);
  const [profile, setProfile] = useState(0); // cambia quando si passa da telefono a desktop

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onRm = () => setReduced(rm.matches);
    onRm();
    if (rm.addEventListener) rm.addEventListener("change", onRm);
    return () => {
      if (rm.removeEventListener) rm.removeEventListener("change", onRm);
    };
  }, []);

  useEffect(() => {
    const bp = window.matchMedia("(max-width: 767px)");
    let last = bp.matches;
    const onBp = () => {
      if (bp.matches !== last) {
        last = bp.matches;
        setProfile((n) => n + 1);
      }
    };
    if (bp.addEventListener) bp.addEventListener("change", onBp);
    return () => {
      if (bp.removeEventListener) bp.removeEventListener("change", onBp);
    };
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return undefined;
    let cancelled = false;
    let engine = null;
    let idleHandle = null;
    let timer = null;
    let onLoad = null;
    let arriveTimer = null;
    let onArrive = null;
    let started = false; // «load» e il timer di sicurezza portano entrambi a go(): la scena parte una volta sola
    let scheduled = false;
    setOn(false);
    if (reduced) return undefined; // l'immagine ferma c'è già nel DOM: il motore (three) non si scarica nemmeno

    const conn = typeof navigator !== "undefined" ? navigator.connection : null;
    const slow = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""));
    if (slow) return undefined;

    const start = async () => {
      if (cancelled || started) return;
      started = true;
      const gl = probeWebGL();
      if (!gl) return;
      if (document.fonts && document.fonts.ready) {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
        if (cancelled) return;
      }
      const mobile = mq("(max-width: 767px)") || mq("(pointer: coarse)");
      try {
        const { createPageScene } = await import("./scene/pageEngine");
        if (cancelled || !ref.current) return;
        const e = await createPageScene(ref.current, {
          preset: id,
          mobile,
          soft: gl.soft,
          canHover: mq("(hover: hover) and (pointer: fine)"),
          getRects: () => measure(ref.current),
          onLost: () => !cancelled && setOn(false),
          onSlow: () => {
            if (cancelled) return;
            if (engine) engine.dispose();
            engine = null;
            setOn(false);
          },
        });
        if (cancelled) {
          e.dispose();
          return;
        }
        engine = e;
        setOn(true);
      } catch (err) {
        /* la hero resta com'è: sfondo del kit, testo dal server */
      }
    };

    const begin = () => {
      if (cancelled) return;
      if (window.requestIdleCallback) idleHandle = window.requestIdleCallback(start, { timeout: 1500 });
      else timer = setTimeout(start, 300);
    };
    const go = () => {
      if (cancelled || started || scheduled) return;
      scheduled = true;
      // arrivo da una transizione di pagina: la scena si compone DOPO che le lastre si sono ritirate e il titolo è entrato
      if (window.__v2Arrive) {
        const run = () => {
          if (onArrive) window.removeEventListener("v2:arrive", onArrive);
          onArrive = null;
          clearTimeout(arriveTimer);
          timer = setTimeout(begin, 700);
        };
        onArrive = run;
        window.addEventListener("v2:arrive", run, { once: true });
        arriveTimer = setTimeout(run, 3200);
      } else begin();
    };
    if (document.readyState === "complete") go();
    else {
      onLoad = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        go();
      };
      window.addEventListener("load", onLoad, { once: true });
      timer = setTimeout(go, 4500); // se «load» tarda (rete lenta), parte comunque
    }

    return () => {
      cancelled = true;
      if (idleHandle && window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
      if (timer) clearTimeout(timer);
      if (arriveTimer) clearTimeout(arriveTimer);
      if (onArrive) window.removeEventListener("v2:arrive", onArrive);
      if (onLoad) window.removeEventListener("load", onLoad);
      if (engine) engine.dispose();
    };
  }, [id, profile, reduced]);

  return (
    <div ref={ref} className={`v2-pscene${on ? " is-on" : ""}`} aria-hidden="true">
      {/* L'immagine ferma sta nel HTML del server, scelta dal CSS dei media: con prefers-reduced-motion il browser la trova
          mentre legge la pagina (come un'immagine qualsiasi, senza aspettare l'idratazione) e la scarica; negli altri casi
          nessun <source> corrisponde e resta il pixel trasparente (data:, zero rete). Così il titolo resta l'LCP anche
          a CPU lenta e il fermo-immagine non «compare di colpo» dopo il primo paint. */}
      {/* Il browser non legge la `media` dei <source> con prefers-reduced-motion mentre scansiona il HTML in anticipo: l'immagine
          partiva solo a parser arrivato (~1,2 s a CPU 4x). Tre preload con la stessa `media` la anticipano: a chi non chiede meno
          movimento non scaricano niente (la media non corrisponde). */}
      <link rel="preload" as="image" href={`${stillBase}-lg.webp`} media="(prefers-reduced-motion: reduce) and (min-width: 1100px)" fetchPriority="high" />
      <link rel="preload" as="image" href={`${stillBase}-md.webp`} media="(prefers-reduced-motion: reduce) and (min-width: 640px) and (max-width: 1099px)" fetchPriority="high" />
      <link rel="preload" as="image" href={`${stillBase}-sm.webp`} media="(prefers-reduced-motion: reduce) and (max-width: 639px)" fetchPriority="high" />
      <picture>
        <source media="(prefers-reduced-motion: reduce) and (min-width: 1100px)" srcSet={`${stillBase}-lg.webp`} />
        <source media="(prefers-reduced-motion: reduce) and (min-width: 640px)" srcSet={`${stillBase}-md.webp`} />
        <source media="(prefers-reduced-motion: reduce)" srcSet={`${stillBase}-sm.webp`} />
        <img className="v2-pscene__still" src={BLANK} alt="" decoding="sync" fetchPriority="high" />
      </picture>
    </div>
  );
}
