// Motore della rete 3D della hero (three.js). Caricato solo lato client, dopo il primo paint.
// Il «sistema»: otto moduli dei sistemi Automis come pannelli di vetro, collegati da una dorsale sempre accesa, con pacchetti di luce
// che corrono veloci e catene che scattano da sole (chiamata → appuntamento → fattura → scheda cliente, oro solo sull'ultimo nodo).
// Si compone all'apertura; scorrendo, la hero resta ferma (pista sticky, hero.css) e i moduli si fondono nelle cinque categorie del sito.
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  DynamicDrawUsage,
  Points,
  Mesh,
  Group,
  ShaderMaterial,
  PlaneGeometry,
  ExtrudeGeometry,
  Shape,
  CanvasTexture,
  CustomBlending,
  AddEquation,
  SrcAlphaFactor,
  OneFactor,
  DoubleSide,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import {
  MODULE_IDS,
  M,
  IDX,
  CATEGORY_IDS,
  D,
  CATEGORY_OF,
  SPINE,
  CHAINS,
  LABELS,
  layoutModules,
  WP_OUT,
  WP_IN,
  routeOut,
  routeIn,
  buildDots,
  buildMeshEdges,
  mulberry32,
} from "./graph";
import { drawIcon } from "./icons";
import * as SH from "./shaders";

const FOV = 38;
const CAM_Z = 16;
const TAN = Math.tan((FOV * Math.PI) / 360);
const TWO_PI = Math.PI * 2;
const CTA_I = M + D; // il bottone principale come nodo
const OUT0 = M + D + 1; // punti del filo di andata (scheda cliente → bottone)
const IN0 = OUT0 + WP_OUT; // punti del filo di ritorno (bottone → chiamata)
const NS = IN0 + WP_IN; // nodi «speciali»: moduli, dock delle categorie, bottone e punti dei fili; dopo, i punti della rete di fondo
const QN = 4; // quadrilateri per ogni scia (più sono, più la scia segue le curve)
const PATH_MAX = 16;

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const smooth = (a, b, v) => {
  const x = clamp((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutBack = (x) => {
  const c1 = 2.0;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// cede il thread principale: l'avvio della scena si spezza in pezzi brevi, mai un blocco lungo
const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));

// miscela additiva «a coperchio»: i bagliori si sommano sul fondo senza rendere opaco il canvas
function glowMaterial(params) {
  return new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: DoubleSide,
    blending: CustomBlending,
    blendEquation: AddEquation,
    blendSrc: SrcAlphaFactor,
    blendDst: OneFactor,
    blendSrcAlpha: OneFactor,
    blendDstAlpha: OneFactor,
    ...params,
  });
}

function roundedRect(hx, hy, r) {
  const s = new Shape();
  s.moveTo(-hx + r, -hy);
  s.lineTo(hx - r, -hy);
  s.absarc(hx - r, -hy + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hx, hy - r);
  s.absarc(hx - r, hy - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hx + r, hy);
  s.absarc(-hx + r, hy - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hx, -hy + r);
  s.absarc(-hx + r, -hy + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

// rettangolo «a riposo» di un elemento (senza la trasformazione dell'entrata CSS), in pixel del contenitore
function restRect(el, cr) {
  const r = el.getBoundingClientRect();
  let cx = r.left + r.width / 2;
  let cy = r.top + r.height / 2;
  let w = r.width;
  let h = r.height;
  try {
    const tr = getComputedStyle(el).transform;
    if (tr && tr !== "none") {
      const m = new DOMMatrixReadOnly(tr);
      cx -= m.e;
      cy -= m.f;
      if (m.a > 0.2) w /= m.a;
      if (m.d > 0.2) h /= m.d;
    }
  } catch (e) {
    /* senza DOMMatrix si usa il rettangolo com'è */
  }
  return { l: cx - w / 2 - cr.left, r: cx + w / 2 - cr.left, t: cy - h / 2 - cr.top, b: cy + h / 2 - cr.top };
}

// il titolo: la scatola è più larga delle righe, qui si prende l'estensione del testo vero (per sapere quanto posto resta ai lati)
function inkRect(el, box) {
  try {
    const rg = document.createRange();
    rg.selectNodeContents(el);
    const rr = rg.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (!rr.width) return box;
    return { l: box.l + Math.max(0, rr.left - er.left), r: box.r - Math.max(0, er.right - rr.right), t: box.t, b: box.b };
  } catch (e) {
    return box;
  }
}

export async function createHeroScene(container, { mobile = false, lang = "it", runway = null, onLost, onSlow } = {}) {
  const maxPR = mobile ? 1.5 : 2;
  // le icone si decodificano subito, mentre il resto della scena si prepara
  const iconIds = [...MODULE_IDS, ...CATEGORY_IDS];
  const iconsP = Promise.all(iconIds.map((id) => drawIcon(id, 256)));
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: !mobile,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  let pr = Math.min(window.devicePixelRatio || 1, maxPR);
  renderer.setPixelRatio(pr);
  let disposed = false;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);
  const bgEl = container.parentElement; // lo sfondo della hero: a React che smonta il contenitore è già staccato, quindi lo si tiene da subito
  const onContextLost = (e) => {
    e.preventDefault();
    onLost && onLost();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  await yieldToMain();

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 80);
  camera.position.set(0, 0, CAM_Z);

  let W = Math.max(1, container.clientWidth);
  let H = Math.max(1, container.clientHeight);

  // ---------- zona del testo: moduli e rete ne stanno fuori, la rete di fondo resta tenue lì ----------
  const sec = container.closest(".v2-phero");
  const copyEl = sec ? sec.querySelector(".v2-phero__copy") : null;
  let lastRect = null;
  let lastParts = null; // rettangoli di pillola, titolo, sottotitolo e bottoni (pixel del contenitore)
  // il bottone principale («Raccontaci il tuo caso»): il fulcro del gesto, centro e misure in pixel del contenitore
  const ctaEl = copyEl ? copyEl.querySelector(".v2-phero__actions > :first-child") : null;
  let ctaPx = null;
  function measureText() {
    const fallback = { l: W * 0.2, r: W * 0.8, t: H * 0.18, b: H * 0.66 };
    if (!copyEl) return fallback;
    // a pagina scorsa il testo è già trasformato dallo scorrimento: si tiene l'ultima misura buona
    if (lastRect && runway && runway.s > 0.01) return lastRect;
    const cr = container.getBoundingClientRect();
    if (!cr.width || !cr.height) return lastRect || fallback;
    const els = copyEl.querySelectorAll(".v2-phero__pill, .v2-phero__h1, .v2-phero__sub, .v2-phero__actions");
    let u = null;
    const parts = {};
    els.forEach((el) => {
      if (!el.offsetWidth) return;
      const q = restRect(el, cr);
      const nm = el.classList.contains("v2-phero__pill") ? "pill" : el.classList.contains("v2-phero__h1") ? "h1" : el.classList.contains("v2-phero__sub") ? "sub" : "actions";
      parts[nm] = nm === "h1" ? inkRect(el, q) : q;
      u = u ? { l: Math.min(u.l, q.l), r: Math.max(u.r, q.r), t: Math.min(u.t, q.t), b: Math.max(u.b, q.b) } : q;
    });
    if (!u) return lastRect || fallback;
    lastRect = u;
    lastParts = parts;
    if (ctaEl && ctaEl.offsetWidth) {
      const q = restRect(ctaEl, cr);
      ctaPx = { x: (q.l + q.r) / 2, y: (q.t + q.b) / 2, w: q.r - q.l, h: q.b - q.t };
    }
    return u;
  }
  let textRect = measureText();
  const textEllipse = (rc) => ({
    cx: ((rc.l + rc.r) / 2 / W) * 2 - 1,
    cy: 1 - ((rc.t + rc.b) / 2 / H) * 2,
    rx: ((rc.r - rc.l) / W) * (mobile ? 1.0 : 1.16),
    ry: ((rc.b - rc.t) / H) * 1.18,
  });
  let text = textEllipse(textRect);

  const textDim0 = mobile ? 0.5 : 0.16;
  // ---------- uniformi comuni ----------
  const U = {
    uTime: { value: 0 },
    uPR: { value: pr },
    uScale: { value: H / (2 * TAN) },
    uAspect: { value: W / H },
    uRes: { value: new Vector2(W * pr, H * pr) },
    uWidth: { value: 1.25 * pr },
    uSpineW: { value: 6.5 * pr },
    uMouse: { value: new Vector2(5, 5) },
    uMouseOn: { value: 0 },
    uText: { value: new Vector4(text.cx, text.cy, text.rx, text.ry) },
    uTextDim: { value: textDim0 },
    uWave: { value: new Vector4(0, 0, 0, 0) },
    uWaveP: { value: new Vector2(1.5, 0) },
  };

  // ---------- nodi ----------
  // i fili che fanno del bottone principale un nodo: andata (scheda cliente → bottone) e ritorno (bottone → chiamata).
  // Solo desktop: sul telefono il bottone sta sopra le tessere.
  function withRoute(l) {
    l.route = null;
    if (!l.compact && ctaPx && !l.mods.call.hidden && !l.mods.crm.hidden) {
      const c = l.mods.call;
      const m = l.mods.crm;
      l.route = {
        cta: ctaPx,
        out: routeOut({ x: m.x, y: m.y, size: m.size }, ctaPx, l.corridorY, WP_OUT),
        inn: routeIn({ x: c.x, y: c.y, size: c.size }, ctaPx, WP_IN),
      };
    }
    return l;
  }
  const layoutNow = () => layoutModules({ W, H, rect: textRect, parts: lastParts, vh: window.innerHeight || H });
  let lay = withRoute(layoutNow());
  const dotsData = buildDots({
    aspect: W / H,
    mobile,
    text,
    avoid: MODULE_IDS.map((id) => {
      const q = lay.mods[id];
      return { x: (q.x / W) * 2 - 1, y: 1 - (q.y / H) * 2, r: (q.size / H) * 1.7 };
    }),
  });
  const dotNodes = dotsData.nodes;
  const P = dotNodes.length; // punti disegnati (punti-nodo e bokeh)
  const linked = dotsData.linked;
  const N = NS + P;
  const base = new Float32Array(N * 3);
  const far = new Float32Array(N * 3);
  const cur = new Float32Array(N * 3);
  const phase = new Float32Array(N);
  const amp = new Float32Array(N);
  const delay = new Float32Array(N);
  const dur = new Float32Array(N);
  const dirs = new Float32Array(N * 3);
  const dist = new Float32Array(N);
  const prog = new Float32Array(N); // avanzamento grezzo dell'apertura 0..1
  const glow = new Float32Array(N);
  const msize = new Float32Array(NS); // lato del pannello in unità di mondo
  const baseT = new Float32Array(NS * 3); // posizioni di riposo cercate: base le raggiunge con dolcezza se il layout cambia a scena viva
  const msizeT = new Float32Array(NS);
  let snapLayout = true;
  const mHidden = new Uint8Array(NS);
  const rnd = mulberry32(99173);

  // ordine d'arrivo all'apertura: prima la catena, poi gli altri
  const ARRIVE = { call: 0.0, calendar: 0.1, invoice: 0.2, crm: 0.3, chat: 0.18, ads: 0.26, social: 0.34, team: 0.4 };
  for (let i = 0; i < M; i++) {
    phase[i] = rnd();
    amp[i] = 0.1;
    delay[i] = 0.08 + ARRIVE[MODULE_IDS[i]];
    dur[i] = 0.9;
  }
  for (let k = 0; k < D; k++) {
    phase[M + k] = rnd();
    amp[M + k] = 0.05;
    delay[M + k] = 0;
    dur[M + k] = 0.01;
  }
  for (let q = 0; q < P; q++) {
    const i = NS + q;
    const n = dotNodes[q];
    phase[i] = n.phase;
    amp[i] = n.amp;
    if (n.kind === "dot") {
      delay[i] = rnd() * 0.45;
      dur[i] = 0.8 + rnd() * 0.4;
    } else {
      delay[i] = 0.1 + rnd() * 0.5;
      dur[i] = 1.5;
    }
  }

  const px2world = (x, y, z) => {
    const d = CAM_Z - z;
    return [(x / W * 2 - 1) * d * TAN * (W / H), (1 - (y / H) * 2) * d * TAN];
  };
  const worldSize = (px, z) => (px / H) * 2 * TAN * (CAM_Z - z);

  const dockZ = 0.8;
    const modulePx = []; // posizione a schermo (px) di moduli e dock, per le etichette
  function placeNodes() {
    const aspect = W / H;
    for (let i = 0; i < M; i++) {
      const q = lay.mods[MODULE_IDS[i]];
      const [wx, wy] = px2world(q.x, q.y, q.z);
      baseT[i * 3] = wx;
      baseT[i * 3 + 1] = wy;
      baseT[i * 3 + 2] = q.z;
      msizeT[i] = worldSize(q.size, q.z);
      mHidden[i] = q.hidden ? 1 : 0;
      far[i * 3] = wx * 1.25;
      far[i * 3 + 1] = wy * 1.25 - 1.2;
      far[i * 3 + 2] = q.z - 18;
      const k = CATEGORY_OF[MODULE_IDS[i]];
      const ang = [100, 28, -42, -118, 168][k] * (Math.PI / 180);
      dirs[i * 3] = Math.cos(ang);
      dirs[i * 3 + 1] = Math.sin(ang) * 0.85;
      dirs[i * 3 + 2] = 0.55;
      dist[i] = 15;
    }
    for (let k = 0; k < D; k++) {
      const q = lay.docks[k];
      const [wx, wy] = px2world(q.x, q.y, dockZ);
      const i = M + k;
      baseT[i * 3] = wx;
      baseT[i * 3 + 1] = wy;
      baseT[i * 3 + 2] = dockZ;
      msizeT[i] = worldSize(q.size, dockZ);
    }
    // il bottone principale e i punti dei due fili (fermi; senza fili restano sulla tessera «chiamata», mai disegnati)
    const route = lay.route;
    const setNode = (i, x, y, z) => {
      const [wx, wy] = px2world(x, y, z);
      baseT[i * 3] = wx;
      baseT[i * 3 + 1] = wy;
      baseT[i * 3 + 2] = z;
      msizeT[i] = 0;
    };
    setNode(CTA_I, route ? route.cta.x : lay.mods.call.x, route ? route.cta.y : lay.mods.call.y, 0.5);
    for (let k = 0; k < WP_OUT; k++) {
      const q = route ? route.out[k] : { x: lay.mods.call.x, y: lay.mods.call.y, z: 0.5 };
      setNode(OUT0 + k, q.x, q.y, q.z);
    }
    for (let k = 0; k < WP_IN; k++) {
      const q = route ? route.inn[k] : { x: lay.mods.call.x, y: lay.mods.call.y, z: 0.5 };
      setNode(IN0 + k, q.x, q.y, q.z);
    }
    for (let q = 0; q < P; q++) {
      const i = NS + q;
      const n = dotNodes[q];
      const d = CAM_Z - n.z;
      const bx = n.x * d * TAN * aspect;
      const by = n.y * d * TAN;
      const bz = n.z;
      base[i * 3] = bx;
      base[i * 3 + 1] = by;
      base[i * 3 + 2] = bz;
      if (n.kind === "dot") {
        const sc = 1.45 + ((q * 37) % 13) / 13 * 1.3;
        far[i * 3] = bx * sc;
        far[i * 3 + 1] = by * sc;
        far[i * 3 + 2] = bz + (((q * 53) % 11) / 11 - 0.5) * 12;
        const l = Math.hypot(bx, by) || 1;
        dirs[i * 3] = bx / l + (((q * 29) % 7) / 7 - 0.5) * 0.7;
        dirs[i * 3 + 1] = (by / l) * 0.8 + (((q * 41) % 9) / 9 - 0.5) * 0.7;
        dirs[i * 3 + 2] = 0.35 + (((q * 17) % 5) / 5) * 0.5;
        dist[i] = 8 + (((q * 23) % 10) / 10) * 10;
      } else {
        far[i * 3] = bx * 2;
        far[i * 3 + 1] = by * 2;
        far[i * 3 + 2] = bz - 6;
        dirs[i * 3] = (((q * 31) % 7) / 7 - 0.5) * 1.4;
        dirs[i * 3 + 1] = (((q * 19) % 9) / 9 - 0.5) * 1.4;
        dirs[i * 3 + 2] = 0.8;
        dist[i] = 6 + (((q * 13) % 8) / 8) * 4;
      }
    }
    if (snapLayout) {
      for (let i = 0; i < NS; i++) {
        base[i * 3] = baseT[i * 3];
        base[i * 3 + 1] = baseT[i * 3 + 1];
        base[i * 3 + 2] = baseT[i * 3 + 2];
        msize[i] = msizeT[i];
        if (i >= M) {
          cur[i * 3] = base[i * 3];
          cur[i * 3 + 1] = base[i * 3 + 1];
          cur[i * 3 + 2] = base[i * 3 + 2];
        }
      }
      snapLayout = false;
    }
  }
  placeNodes();
  for (let i = 0; i < N; i++) {
    cur[i * 3] = far[i * 3];
    cur[i * 3 + 1] = far[i * 3 + 1];
    cur[i * 3 + 2] = far[i * 3 + 2];
  }
  for (let i = M; i < NS; i++) {
    cur[i * 3] = base[i * 3];
    cur[i * 3 + 1] = base[i * 3 + 1];
    cur[i * 3 + 2] = base[i * 3 + 2];
  }

  // ---------- dorsale: i collegamenti persistenti fra i moduli, più il «bus» fra i cinque dock ----------
  const SE = SPINE.map(([a, b]) => [IDX[a], IDX[b]]);
  const BUS_START = SE.length;
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 3],
    [2, 4],
  ].forEach(([a, b]) => SE.push([M + a, M + b]));
  // i fili del bottone: andata (scheda cliente → bottone) e ritorno (bottone → chiamata). Sempre accennati, si accendono dietro il pacchetto
  const ROUTE_START = SE.length;
  const IDS_OUT = [IDX.crm, ...Array.from({ length: WP_OUT }, (_, k) => OUT0 + k), CTA_I];
  const IDS_IN = [CTA_I, ...Array.from({ length: WP_IN }, (_, k) => IN0 + k), IDX.call];
  for (let k = 0; k + 1 < IDS_OUT.length; k++) SE.push([IDS_OUT[k], IDS_OUT[k + 1]]);
  const IN_START = SE.length;
  for (let k = 0; k + 1 < IDS_IN.length; k++) SE.push([IDS_IN[k], IDS_IN[k + 1]]);
  const SN = SE.length;
  const spineOf = new Int16Array(NS * NS).fill(-1);
  SE.forEach(([a, b], e) => {
    spineOf[a * NS + b] = e;
    spineOf[b * NS + a] = e;
  });
  const spDraw = new Float32Array(SN);
  const spEnergy = new Float32Array(SN);
  const spHead = new Float32Array(SN).fill(-1);
  const spDir = new Float32Array(SN).fill(1);
  const spAlpha = new Float32Array(SN);
  const spOrient = new Float32Array(SN).fill(1);
  const spSeed = new Float32Array(SN);
  const spOn = new Uint8Array(SN); // il collegamento esiste in questo layout (i moduli nascosti e i bus non usati sono spenti)
  for (let e = 0; e < SN; e++) spSeed[e] = rnd();

  const spPos = new Float32Array(SN * 4 * 3);
  const spOther = new Float32Array(SN * 4 * 3);
  const spSide = new Float32Array(SN * 4);
  const spDirA = new Float32Array(SN * 4);
  const spState = new Float32Array(SN * 4 * 4);
  const spMisc = new Float32Array(SN * 4 * 3);
  const spRoute = new Float32Array(SN * 4); // 1 sui fili del bottone: la zona del testo non li attenua
  const spIdx = new Uint16Array(SN * 6);
  for (let e = 0; e < SN; e++) {
    const v = e * 4;
    spSide[v] = -1;
    spSide[v + 1] = 1;
    spSide[v + 2] = -1;
    spSide[v + 3] = 1;
    spDirA[v] = spDirA[v + 1] = 1;
    spDirA[v + 2] = spDirA[v + 3] = -1;
    spIdx.set([v, v + 1, v + 2, v + 2, v + 1, v + 3], e * 6);
    if (e >= ROUTE_START) spRoute.fill(1, v, v + 4);
  }
  const spineGeo = new BufferGeometry();
  spineGeo.setAttribute("position", new BufferAttribute(spPos, 3).setUsage(DynamicDrawUsage));
  spineGeo.setAttribute("aOther", new BufferAttribute(spOther, 3).setUsage(DynamicDrawUsage));
  spineGeo.setAttribute("aSide", new BufferAttribute(spSide, 1));
  spineGeo.setAttribute("aDir", new BufferAttribute(spDirA, 1));
  spineGeo.setAttribute("aState", new BufferAttribute(spState, 4).setUsage(DynamicDrawUsage));
  spineGeo.setAttribute("aMisc", new BufferAttribute(spMisc, 3).setUsage(DynamicDrawUsage));
  spineGeo.setAttribute("aRoute", new BufferAttribute(spRoute, 1));
  spineGeo.setIndex(new BufferAttribute(spIdx, 1));
  const spineMat = glowMaterial({
    vertexShader: SH.spineVert,
    fragmentShader: SH.spineFrag,
    uniforms: {
      uText: U.uText,
      uTextDim: U.uTextDim,
      uRes: U.uRes,
      uWidth: U.uSpineW,
      uPR: U.uPR,
      uTime: U.uTime,
      uWave: U.uWave,
      uWaveP: U.uWaveP,
    },
  });
  const spine = new Mesh(spineGeo, spineMat);
  spine.frustumCulled = false;
  spine.renderOrder = 3;
  scene.add(spine);

  // ---------- rete di fondo: collegamenti tra i punti (tenui) ----------
  const meshWorld = base.subarray(NS * 3, (NS + linked) * 3);
  const meshEdges = buildMeshEdges(meshWorld, linked).map(([a, b]) => [a + NS, b + NS]);
  const E = meshEdges.length;
  const meshOf = new Map();
  const adj = new Map();
  meshEdges.forEach(([a, b], e) => {
    meshOf.set(a * 4096 + b, e);
    meshOf.set(b * 4096 + a, e);
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a).push(b);
    adj.get(b).push(a);
  });
  const energy = new Float32Array(E);
  const edecay = new Float32Array(E).fill(2.4);
  const linePos = new Float32Array(E * 4 * 3);
  const lineOther = new Float32Array(E * 4 * 3);
  const lineSide = new Float32Array(E * 4);
  const lineDir = new Float32Array(E * 4);
  const lineState = new Float32Array(E * 4 * 2);
  const lineIdx = new Uint16Array(E * 6);
  for (let e = 0; e < E; e++) {
    const v = e * 4;
    lineSide[v] = -1;
    lineSide[v + 1] = 1;
    lineSide[v + 2] = -1;
    lineSide[v + 3] = 1;
    lineDir[v] = lineDir[v + 1] = 1;
    lineDir[v + 2] = lineDir[v + 3] = -1;
    lineIdx.set([v, v + 1, v + 2, v + 2, v + 1, v + 3], e * 6);
  }
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute("position", new BufferAttribute(linePos, 3).setUsage(DynamicDrawUsage));
  lineGeo.setAttribute("aOther", new BufferAttribute(lineOther, 3).setUsage(DynamicDrawUsage));
  lineGeo.setAttribute("aSide", new BufferAttribute(lineSide, 1));
  lineGeo.setAttribute("aDir", new BufferAttribute(lineDir, 1));
  lineGeo.setAttribute("aState", new BufferAttribute(lineState, 2).setUsage(DynamicDrawUsage));
  lineGeo.setIndex(new BufferAttribute(lineIdx, 1));
  const lineMat = glowMaterial({
    vertexShader: SH.linesVert,
    fragmentShader: SH.linesFrag,
    uniforms: {
      uText: U.uText,
      uTextDim: U.uTextDim,
      uRes: U.uRes,
      uWidth: U.uWidth,
      uWave: U.uWave,
      uWaveP: U.uWaveP,
      uRest: { value: mobile ? 0.1 : 0.06 }, // a riposo i fili di fondo quasi non si vedono: si accende solo il percorso attivo
    },
  });
  const lines = new Mesh(lineGeo, lineMat);
  lines.frustumCulled = false;
  lines.renderOrder = 1;
  scene.add(lines);

  // ---------- punti-nodo e bokeh ----------
  const dotState = new Float32Array(P * 2);
  const dotSize = new Float32Array(P);
  const dotTone = new Float32Array(P);
  for (let k = 0; k < P; k++) {
    dotSize[k] = dotNodes[k].size;
    dotTone[k] = dotNodes[k].tone;
  }
  const dotGeo = new BufferGeometry();
  dotGeo.setAttribute("position", new BufferAttribute(cur.subarray(NS * 3), 3).setUsage(DynamicDrawUsage));
  dotGeo.setAttribute("aSize", new BufferAttribute(dotSize, 1));
  dotGeo.setAttribute("aTone", new BufferAttribute(dotTone, 1));
  dotGeo.setAttribute("aState", new BufferAttribute(dotState, 2).setUsage(DynamicDrawUsage));
  const dotMat = glowMaterial({
    vertexShader: SH.dotsVert,
    fragmentShader: SH.dotsFrag,
    uniforms: {
      uText: U.uText,
      uTextDim: U.uTextDim,
      uScale: U.uScale,
      uPR: U.uPR,
      uMouse: U.uMouse,
      uMouseOn: U.uMouseOn,
      uAspect: U.uAspect,
      uWave: U.uWave,
      uWaveP: U.uWaveP,
    },
  });
  const dots = new Points(dotGeo, dotMat);
  dots.frustumCulled = false;
  dots.renderOrder = 2;
  scene.add(dots);

  // ---------- pacchetti di luce: testa luminosa + scia a nastro. In coda ci sono gli «strascichi» dei moduli in movimento ----------
  const PMAX = mobile ? 22 : 40;
  const TS = PMAX + M;
  const headPos = new Float32Array(PMAX * 3);
  const headSize = new Float32Array(PMAX);
  const headAlpha = new Float32Array(PMAX);
  const headFree = new Float32Array(PMAX);
  const headGeo = new BufferGeometry();
  headGeo.setAttribute("position", new BufferAttribute(headPos, 3).setUsage(DynamicDrawUsage));
  headGeo.setAttribute("aSize", new BufferAttribute(headSize, 1).setUsage(DynamicDrawUsage));
  headGeo.setAttribute("aAlpha", new BufferAttribute(headAlpha, 1).setUsage(DynamicDrawUsage));
  headGeo.setAttribute("aFree", new BufferAttribute(headFree, 1).setUsage(DynamicDrawUsage));
  const headMat = glowMaterial({
    vertexShader: SH.headsVert,
    fragmentShader: SH.headsFrag,
    uniforms: { uText: U.uText, uTextDim: U.uTextDim, uScale: U.uScale, uPR: U.uPR },
  });
  const heads = new Points(headGeo, headMat);
  heads.frustumCulled = false;
  heads.renderOrder = 1000;
  scene.add(heads);

  const TV = TS * QN * 4;
  const tlPos = new Float32Array(TV * 3);
  const tlOther = new Float32Array(TV * 3);
  const tlSide = new Float32Array(TV);
  const tlDir = new Float32Array(TV);
  const tlT = new Float32Array(TV * 4);
  const tlIdx = new Uint16Array(TS * QN * 6);
  for (let i = 0; i < TS * QN; i++) {
    const v = i * 4;
    tlSide[v] = -1;
    tlSide[v + 1] = 1;
    tlSide[v + 2] = -1;
    tlSide[v + 3] = 1;
    tlDir[v] = tlDir[v + 1] = tlDir[v + 2] = tlDir[v + 3] = 1;
    tlIdx.set([v, v + 1, v + 2, v + 2, v + 1, v + 3], i * 6);
  }
  const tailGeo = new BufferGeometry();
  tailGeo.setAttribute("position", new BufferAttribute(tlPos, 3).setUsage(DynamicDrawUsage));
  tailGeo.setAttribute("aOther", new BufferAttribute(tlOther, 3).setUsage(DynamicDrawUsage));
  tailGeo.setAttribute("aSide", new BufferAttribute(tlSide, 1));
  tailGeo.setAttribute("aDir", new BufferAttribute(tlDir, 1));
  tailGeo.setAttribute("aT", new BufferAttribute(tlT, 4).setUsage(DynamicDrawUsage));
  tailGeo.setIndex(new BufferAttribute(tlIdx, 1));
  const tailMat = glowMaterial({
    vertexShader: SH.tailsVert,
    fragmentShader: SH.tailsFrag,
    uniforms: { uText: U.uText, uTextDim: U.uTextDim, uRes: U.uRes, uPR: U.uPR },
  });
  const tails = new Mesh(tailGeo, tailMat);
  tails.frustumCulled = false;
  tails.renderOrder = 999;
  scene.add(tails);

  const pk = {
    on: new Uint8Array(PMAX),
    s: new Float32Array(PMAX),
    speed: new Float32Array(PMAX),
    total: new Float32Array(PMAX),
    strong: new Uint8Array(PMAX),
    free: new Uint8Array(PMAX), // 1: pacchetto del filo del bottone, mai attenuato dietro il testo
    trail: new Float32Array(PMAX), // lunghezza della scia (unità di mondo)
    wid: new Float32Array(PMAX), // larghezza della scia alla testa (px)
    hs: new Float32Array(PMAX), // dimensione della testa
    seg: new Int16Array(PMAX),
    len: new Uint8Array(PMAX),
    arrived: new Uint8Array(PMAX),
    path: new Int16Array(PMAX * PATH_MAX),
    cum: new Float32Array(PMAX * PATH_MAX),
    cb: new Array(PMAX).fill(null),
  };
  const dBase = (a, b) =>
    Math.hypot(base[a * 3] - base[b * 3], base[a * 3 + 1] - base[b * 3 + 1], base[a * 3 + 2] - base[b * 3 + 2]);

  const p2 = new Vector3();
  // punto a distanza sd lungo il percorso del pacchetto i, sui nodi come sono ora
  function samplePath(i, sd, out) {
    const len = pk.len[i];
    let sg = 0;
    while (sg < len - 2 && sd > pk.cum[i * PATH_MAX + sg + 1]) sg++;
    const c0 = pk.cum[i * PATH_MAX + sg];
    const c1 = pk.cum[i * PATH_MAX + sg + 1];
    const u = c1 > c0 ? clamp((sd - c0) / (c1 - c0)) : 1;
    const na = pk.path[i * PATH_MAX + sg];
    const nb = pk.path[i * PATH_MAX + sg + 1];
    out.set(
      cur[na * 3] + (cur[nb * 3] - cur[na * 3]) * u,
      cur[na * 3 + 1] + (cur[nb * 3 + 1] - cur[na * 3 + 1]) * u,
      cur[na * 3 + 2] + (cur[nb * 3 + 2] - cur[na * 3 + 2]) * u
    );
  }

  // look: { trail, wid, head } aspetto · { dur } durata in secondi (la velocità si ricava dalla lunghezza) · { free } mai attenuato dal testo
  function spawn(path, strong, cb, speedMul = 1, look = null) {
    let i = -1;
    for (let k = 0; k < PMAX; k++) {
      if (!pk.on[k]) {
        i = k;
        break;
      }
    }
    if (i < 0) {
      // nessuno slot libero: il pacchetto di una catena non deve perdersi
      if (!strong) return false;
      // se ne riprende uno d'ambiente (mai uno con una richiamata in attesa)
      for (let k = PMAX - 1; k >= 0; k--) {
        if (!pk.strong[k] && !pk.cb[k]) {
          i = k;
          break;
        }
      }
      if (i < 0) return false;
    }
    const len = Math.min(path.length, PATH_MAX);
    pk.on[i] = 1;
    pk.s[i] = 0;
    pk.len[i] = len;
    pk.seg[i] = 0;
    pk.arrived[i] = 0;
    pk.strong[i] = strong ? 1 : 0;
    pk.trail[i] = look && look.trail ? look.trail : strong ? 3.4 : 1.7;
    pk.wid[i] = look && look.wid ? look.wid : strong ? 18 : 6;
    pk.hs[i] = look && look.head ? look.head : strong ? 2.1 : 0.7;
    pk.free[i] = look && look.free ? 1 : 0;
    pk.speed[i] = (strong ? 13 : 8 + rnd() * 6) * speedMul;
    let c = 0;
    for (let k = 0; k < len; k++) {
      pk.path[i * PATH_MAX + k] = path[k];
      if (k > 0) c += dBase(path[k - 1], path[k]);
      pk.cum[i * PATH_MAX + k] = c;
    }
    pk.total[i] = c;
    if (look && look.dur && c > 0) pk.speed[i] = c / look.dur;
    pk.cb[i] = cb || null;
    glow[path[0]] = Math.max(glow[path[0]], strong ? 1 : 0.6);
    return true;
  }

  // scia: QN quadrilateri lungo QN + 1 punti (0 coda, ultimo testa). Ogni punto ha la sua tangente (differenza fra i vicini):
  // i quadrilateri contigui condividono i vertici e le normali, quindi niente tacche nelle curve.
  const tgv = new Vector3();
  function writeStreak(slot, pts, wpx, fade, free) {
    for (let q = 0; q < QN; q++) {
      const vb = (slot * QN + q) * 4;
      for (let k = 0; k < 4; k++) {
        const j = k < 2 ? q : q + 1;
        const P = pts[j];
        const A = pts[j > 0 ? j - 1 : 0];
        const B = pts[j < QN ? j + 1 : QN];
        tgv.set(B.x - A.x, B.y - A.y, B.z - A.z);
        const l = tgv.length();
        if (l > 1e-5) tgv.multiplyScalar(0.6 / l);
        const v = vb + k;
        tlPos[v * 3] = P.x;
        tlPos[v * 3 + 1] = P.y;
        tlPos[v * 3 + 2] = P.z;
        tlOther[v * 3] = P.x + tgv.x;
        tlOther[v * 3 + 1] = P.y + tgv.y;
        tlOther[v * 3 + 2] = P.z + tgv.z;
        tlT[v * 4] = j / QN;
        tlT[v * 4 + 1] = wpx;
        tlT[v * 4 + 2] = fade;
        tlT[v * 4 + 3] = free;
      }
    }
  }
  function clearStreak(slot) {
    const v0 = slot * QN * 4;
    for (let v = 0; v < QN * 4; v++) tlT[(v0 + v) * 4 + 2] = 0;
  }
  const strk = Array.from({ length: QN + 1 }, () => new Vector3());

  await yieldToMain();

  // ---------- pannelli di vetro: i moduli e i dock delle categorie ----------
  const PLATE_DEPTH = 0.1;
  const plateGeo = new ExtrudeGeometry(roundedRect(0.5, 0.5, 0.2), {
    depth: PLATE_DEPTH,
    bevelEnabled: false,
    curveSegments: 8,
  });
  plateGeo.translate(0, 0, -PLATE_DEPTH / 2);
  const iconGeo = new PlaneGeometry(0.56, 0.56);
  const haloGeo = new PlaneGeometry(4.2, 4.2);
  const textures = [];
  const icons = await iconsP;

  const order = MODULE_IDS.map((id, i) => ({ i, z: lay.mods[id].z })).sort((a, b) => a.z - b.z);
  const rankOf = new Array(M);
  order.forEach((o, r) => (rankOf[o.i] = r));

  function makePlate(iconCanvas, renderBase) {
    const group = new Group();
    const plateU = {
      uHalf: { value: new Vector2(0.5, 0.5) },
      uRad: { value: 0.2 },
      uAct: { value: 0 },
      uOpacity: { value: 0 },
      uGold: { value: 0 },
      uBlur: { value: 0 },
      uDim: { value: 1 },
      uTime: U.uTime,
    };
    const plate = new Mesh(
      plateGeo,
      new ShaderMaterial({
        vertexShader: SH.plateVert,
        fragmentShader: SH.plateFrag,
        uniforms: plateU,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: DoubleSide,
      })
    );
    plate.renderOrder = renderBase + 1;
    const tex = new CanvasTexture(iconCanvas);
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.push(tex);
    const icon = new Mesh(
      iconGeo,
      new ShaderMaterial({
        vertexShader: SH.planeVert,
        fragmentShader: SH.iconFrag,
        uniforms: { uMap: { value: tex }, uAct: plateU.uAct, uOpacity: plateU.uOpacity, uGold: plateU.uGold, uBlur: plateU.uBlur, uDim: plateU.uDim },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })
    );
    icon.position.z = PLATE_DEPTH / 2 + 0.03;
    icon.renderOrder = renderBase + 2;
    const haloU = {
      uAct: plateU.uAct,
      uRing: { value: 0 },
      uRingA: { value: 0 },
      uGold: { value: 0 },
      uOpacity: plateU.uOpacity,
      uBreath: { value: 0 },
      uBlur: plateU.uBlur,
      uDim: plateU.uDim,
    };
    const halo = new Mesh(haloGeo, glowMaterial({ vertexShader: SH.planeVert, fragmentShader: SH.haloFrag, uniforms: haloU }));
    halo.position.z = -0.2;
    halo.renderOrder = renderBase;
    group.add(halo, plate, icon);
    group.scale.setScalar(0.0001);
    scene.add(group);
    return { group, plate, icon, halo, plateU, haloU, lit: 0, act: 0, popT: 9, popAmp: 0, ring: 1, ringStrong: 0, hover: 0, blur: 0, dim: 1 };
  }

  const modules = MODULE_IDS.map((id, i) => makePlate(icons[i], 10 + rankOf[i] * 3));
  const docks = CATEGORY_IDS.map((id, k) => makePlate(icons[M + k], 50 + k * 3));
  const dockRung = new Uint8Array(D); // l'anello d'urto del dock è già partito (si riarma tornando indietro con lo scroll)

  // ---------- il bottone principale come nodo: un alone dietro il bottone vero e un anello quando il pacchetto arriva ----------
  const ctaHaloU = {
    uAct: { value: 0 },
    uRing: { value: 0 },
    uRingA: { value: 0 },
    uGold: { value: 0 },
    uOpacity: { value: 0 },
    uBreath: { value: 0 },
    uBlur: { value: 0.25 },
    uDim: { value: 1 },
  };
  const ctaHalo = new Mesh(haloGeo, glowMaterial({ vertexShader: SH.planeVert, fragmentShader: SH.haloFrag, uniforms: ctaHaloU }));
  ctaHalo.renderOrder = 8;
  ctaHalo.visible = false;
  scene.add(ctaHalo);
  const cta = { act: 0, lit: 0, ring: 1, ringK: 1, flip: false };
  // il cursore sul bottone (o l'impulso di ritorno che parte da lì): il bottone si accende e un anello più piccolo si apre
  function pressCta(k = 0.6) {
    cta.lit = Math.max(cta.lit, 0.4);
    cta.ring = 0;
    cta.ringK = k;
    glow[CTA_I] = 1;
  }
  function hitCta() {
    cta.lit = 0.7;
    cta.ring = 0;
    cta.ringK = 1;
    glow[CTA_I] = 1;
    // il bottone vero fa un pop di 120 ms (additivo: non litiga con il magnete né con l'alzata al passaggio del mouse)
    if (ctaEl) {
      try {
        ctaEl.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.06)", offset: 0.23 }, { transform: "scale(1)" }],
          { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)", composite: "add" }
        );
      } catch (err) {
        /* senza Web Animations il bottone resta fermo: l'alone e l'anello bastano */
      }
      cta.flip = !cta.flip;
      ctaEl.setAttribute("data-wow-hit", cta.flip ? "a" : "b");
    }
    // i punti attorno al bottone si accendono, più forte quelli vicini
    const bx = cur[CTA_I * 3];
    const by = cur[CTA_I * 3 + 1];
    for (let q = 0; q < linked; q++) {
      const i = NS + q;
      const d = Math.hypot(cur[i * 3] - bx, cur[i * 3 + 1] - by);
      if (d < 6) glow[i] = Math.max(glow[i], 1 - d / 6);
    }
    kickT = 0;
  }
  let kickT = 9; // un colpetto della camera quando il pacchetto arriva sul bottone

  function light(i, strong) {
    const m = modules[i];
    m.lit = Math.max(m.lit, strong ? 2.6 : 0.55);
    m.popT = 0;
    m.popAmp = strong ? 0.2 : 0.07;
    m.ring = 0;
    // il modulo in primo piano (sfocato, fuori dal quadro) non ha anelli: due cerchi che si intersecano sembrano un errore
    m.ringStrong = (lay.mods[MODULE_IDS[i]].blur || 0) > 0.4 ? 0 : strong ? 1 : 0.5;
    glow[i] = 1;
  }

  function lightDock(k) {
    const d = docks[k];
    d.lit = 0.9;
    d.ring = 0;
    d.ringStrong = 0.6;
  }

  // ---------- etichette (testo vero sopra il 3D) ----------
  const L = LABELS[lang] || LABELS.en;
  const labelsEl = document.createElement("div");
  labelsEl.className = "wow-hero-labels";
  labelsEl.setAttribute("aria-hidden", "true");
  container.appendChild(labelsEl);
  const mkLab = (txt, cls) => {
    const el = document.createElement("span");
    el.className = "wow-hero-lab";
    const pill = document.createElement("span");
    pill.className = "wow-hero-pill" + (cls ? " " + cls : "");
    pill.textContent = txt;
    el.appendChild(pill);
    labelsEl.appendChild(el);
    return { el, pill, on: false, w: 0, h: 0 };
  };
  const chainLabels = L.chain.map((t) => mkLab(t, ""));
  const dockLabels = L.dock.map((t) => mkLab(t, "is-dock"));
  // telefono: una sola riga sopra le due file, con le quattro parole che si accendono in sequenza
  const caption = document.createElement("span");
  caption.className = "wow-hero-lab is-caption";
  const capPill = document.createElement("span");
  capPill.className = "wow-hero-pill";
  const capWords = L.chain.map((t, i) => {
    const w = document.createElement("span");
    w.className = "wow-hero-w";
    w.textContent = t;
    if (i) {
      // la freccia resta attaccata alla parola prima (spazio non divisibile), e dopo c'è un punto dove la riga può andare a capo
      const a = document.createElement("span");
      a.className = "wow-hero-arrow";
      a.textContent = "→";
      a.setAttribute("data-i", String(i));
      capPill.appendChild(document.createTextNode("\u00a0"));
      capPill.appendChild(a);
      capPill.appendChild(document.createTextNode(" "));
    }
    capPill.appendChild(w);
    return w;
  });
  caption.appendChild(capPill);
  labelsEl.appendChild(caption);
  const capArrows = capPill.querySelectorAll(".wow-hero-arrow");

  const setOn = (lab, on) => {
    if (lab.on === on) return;
    lab.on = on;
    lab.pill.classList.toggle("is-on", on);
  };
  let chainShown = -1; // quante tappe della catena sono accese (-1: nessuna)
  let capAway = false; // si è cominciato a scorrere: la frase della catena (telefono) lascia il posto alle etichette delle categorie
  function showChain(n) {
    chainShown = n;
    for (let i = 0; i < 4; i++) {
      setOn(chainLabels[i], !lay.caption && i <= n);
      capWords[i].classList.toggle("is-on", i <= n);
      capWords[i].classList.toggle("is-now", i === n);
      if (i > 0) capArrows[i - 1].classList.toggle("is-on", i <= n);
    }
    // la frase che spiega il sistema resta sempre leggibile: le tappe non ancora raggiunte sono più tenui, non spente
    capPill.classList.toggle("is-on", lay.caption && !capAway);
    chainLabels[3].pill.classList.toggle("is-gold", n >= 3);
    capWords[3].classList.toggle("is-gold", n >= 3);
  }

  // ---------- regia ----------
  // Con il bottone-nodo (desktop) il sistema gira da solo in un anello:
  //   grilletto (bottone → chiamata) → catena chiamata → appuntamento → fattura → scheda cliente (i passaggi accelerano: 700, 450, 300 ms)
  //   → il pacchetto parte dalla scheda cliente, attraversa il centro in primo piano e atterra sul bottone → pop e anello → di nuovo il grilletto.
  // Le catene minori (annunci → chiamata → chat, social → scheda cliente → persone) corrono in parallelo, più sottili: il sistema parla sempre.
  // Senza bottone-nodo (telefono, tablet, cluster) la catena principale riparte a tempo, con gli stessi passaggi.
  const gold = { on: false, t: 0 };
  const GOLD_NODE = IDX[CHAINS.main[CHAINS.main.length - 1]];
  const CYCLE = 6.0;
  const HOPS = [0.7, 0.45, 0.3]; // durata dei tre passaggi della catena principale (s): la velocità si legge dal ritmo
  const REST = 1.3; // pausa fra l'atterraggio sul bottone e il grilletto
  const SOFT = { trail: 2.3, wid: 9, head: 1.1 };
  const runners = {
    main: { ids: CHAINS.main.map((id) => IDX[id]), gold: true, labels: true, gap: 0.38, hops: HOPS, state: "wait", step: 0, timer: 0, then: "out" },
    right: { ids: CHAINS.right.map((id) => IDX[id]), soft: true, gap: 0.2, state: "wait", step: 0, timer: 0 },
    left: { ids: CHAINS.left.map((id) => IDX[id]), soft: true, gap: 0.2, state: "wait", step: 0, timer: 0 },
    // il volo lungo: dalla scheda cliente al bottone, in primo piano, con la scia additiva
    out: { ids: IDS_OUT, route: true, silent: true, gap: REST, state: "wait", step: 0, timer: 0, then: "in", flight: { dur: 0.95, trail: 8.0, wid: 40, head: 4.0, free: true } },
    // il grilletto: dal bottone alla chiamata, corto e veloce
    in: { ids: IDS_IN, route: true, silent: true, gap: 0, state: "wait", step: 0, timer: 0, then: "main", flight: { dur: 0.4, trail: 3.6, wid: 15, head: 2.1, free: true } },
  };
  const EVENTS = [
    { at: 0.0, key: "main" },
    { at: 2.3, key: "right" },
    { at: 5.1, key: "left" },
  ];
  const dir = { t: -1.5, i: 0, started: false, leftT: -1, rightT: -1, idle: 0 };
  let sCur = 0; // avanzamento dello scroll, ammorbidito
  const canRun = (r) => (r.route ? !!lay.route : true) && r.ids.every((i) => i >= M || !mHidden[i]);
  // telefono troppo basso per le tessere e per il cluster: la catena resta come riga di parole che si accendono una dopo l'altra
  const cap = { on: false, t: 0 };

  function startRunner(key) {
    const r = runners[key];
    if (!r || r.state !== "wait") return false;
    if (key === "main" && lay.noTiles) {
      cap.on = true;
      cap.t = 0;
      return true;
    }
    if (!canRun(r)) return false;
    r.state = "start";
    r.timer = 0;
    return true;
  }
  function updateDirector(dt) {
    if (sCur > 0.03 || dir.hold) return; // scorrendo non partono nuove catene (dir.hold: solo per le misure)
    dir.t += dt;
    if (lay.route) {
      // anello: parte il grilletto, poi ogni runner chiama il successivo
      if (!dir.started && dir.t >= 0.5 && startRunner("in")) dir.started = true;
      if (dir.leftT >= 0 && (dir.leftT -= dt) < 0) startRunner("left");
      if (dir.rightT >= 0 && (dir.rightT -= dt) < 0) startRunner("right");
      // se per qualunque ragione l'anello si ferma (layout cambiato a metà volo), lo si riavvia
      const busy = runners.main.state !== "wait" || runners.out.state !== "wait" || runners.in.state !== "wait";
      dir.idle = busy ? 0 : dir.idle + dt;
      if (dir.idle > 2.4 && startRunner("in")) dir.idle = 0;
      return;
    }
    dir.started = false;
    if (dir.t < 0) return;
    while (dir.i < EVENTS.length && dir.t >= EVENTS[dir.i].at) {
      startRunner(EVENTS[dir.i].key);
      dir.i++;
    }
    if (dir.i >= EVENTS.length && dir.t >= CYCLE) {
      dir.t -= CYCLE;
      dir.i = 0;
    }
  }
  // il cursore sul bottone fa partire subito il grilletto, se il sistema sta riposando
  function onCtaEnter() {
    if (!lay.route || sCur > 0.03 || disposed) return;
    const o = runners.out;
    if (o.state === "gap") {
      pressCta(0.6);
      o.timer = Math.min(o.timer, 0.0001);
    } else if (!dir.started && runners.in.state === "wait" && runners.main.state === "wait") {
      pressCta(0.6);
      dir.t = Math.max(dir.t, 0.5);
    }
  }
  function updateCaption(dt) {
    if (!cap.on) return;
    if (sCur > 0.03) {
      cap.on = false;
      return;
    }
    cap.t += dt;
    const n = Math.min(3, Math.floor(cap.t / 0.55));
    if (n !== chainShown) showChain(n);
    if (n >= 3 && cap.t > 3 * 0.55 + 1.4) {
      cap.on = false;
      showChain(-1);
    }
  }

  function updateRunner(r, dt) {
    if (r.state === "wait") return;
    r.timer -= dt;
    if (r.timer > 0) return;
    if (r.state === "start") {
      r.step = 0;
      if (!r.silent) {
        light(r.ids[0], !r.soft);
        if (r.labels) showChain(0);
      } else if (r === runners.in) pressCta(0.5);
      if (r === runners.main && lay.route) dir.leftT = 1.25;
      r.state = "hold";
      r.timer = r.silent ? 0.02 : r.soft ? 0.18 : 0.3;
    } else if (r.state === "hold") {
      r.state = "fly";
      r.timer = 1e9;
      if (r.flight) {
        // un volo solo, per tutto il filo
        const landed = () => {
          if (r === runners.out) dir.rightT = 0.4;
          r.state = "gap";
          r.timer = r.gap;
        };
        if (r === runners.in) showChain(-1); // il grilletto spegne le etichette del giro appena chiuso
        if (!spawn(r.ids, true, landed, 1, r.flight)) landed();
        return;
      }
      const a = r.ids[r.step];
      const b = r.ids[r.step + 1];
      const look = r.soft ? { ...SOFT, dur: 0.5 } : r.hops ? { dur: r.hops[Math.min(r.step, r.hops.length - 1)] } : null;
      const arrived = () => {
        r.step++;
        light(b, !r.soft);
        if (r.labels) showChain(r.step);
        if (r.step >= r.ids.length - 1) {
          if (r.gold) {
            gold.on = true;
            gold.t = 0;
          }
          r.state = "gap";
          // senza bottone-nodo le etichette restano accese un po' di più
          r.timer = r === runners.main && !lay.route ? 1.4 : r.gap;
        } else {
          r.state = "hold";
          r.timer = r.soft ? 0.08 : 0.12;
        }
      };
      if (!spawn([a, b], true, arrived, 1, look)) arrived();
    } else if (r.state === "gap") {
      r.state = "wait";
      // con il bottone-nodo le etichette della catena restano fino al grilletto successivo
      if (r.labels && !lay.route) showChain(-1);
      // anello: ogni passo chiama il successivo (solo con il bottone-nodo)
      if (r.then && lay.route) startRunner(r.then);
    }
  }

  // impulsi sulla dorsale e sulla rete di fondo: il sistema parla sempre, anche fra una catena e l'altra
  let spineTimer = 0.9;
  let meshTimer = 0.6;
  let busTimer = 0.5;
  function updateAmbient(dt) {
    spineTimer -= dt;
    if (spineTimer <= 0) {
      spineTimer = (mobile ? 0.7 : 0.38) + rnd() * 0.3;
      const cands = [];
      for (let e = 0; e < BUS_START; e++) if (spOn[e]) cands.push(e);
      if (cands.length) {
        const e = cands[(rnd() * cands.length) | 0];
        const flip = rnd() < 0.5;
        spawn(flip ? [SE[e][1], SE[e][0]] : [SE[e][0], SE[e][1]], false, null);
      }
    }
    busTimer -= dt;
    if (busTimer <= 0) {
      busTimer = 0.32 + rnd() * 0.25;
      if (sCur > 0.93) {
        const cands = [];
        for (let e = BUS_START; e < ROUTE_START; e++) if (spOn[e]) cands.push(e);
        if (cands.length) {
          const e = cands[(rnd() * cands.length) | 0];
          const flip = rnd() < 0.5;
          spawn(flip ? [SE[e][1], SE[e][0]] : [SE[e][0], SE[e][1]], false, null, 0.9);
        }
      }
    }
    meshTimer -= dt;
    if (meshTimer <= 0) {
      meshTimer = (mobile ? 0.8 : 0.5) + rnd() * 0.35;
      if (E === 0) return;
      const e0 = meshEdges[(rnd() * E) | 0];
      let a = rnd() < 0.5 ? e0[0] : e0[1];
      let b = a === e0[0] ? e0[1] : e0[0];
      const path = [a, b];
      const hops = 1 + ((rnd() * 3) | 0);
      for (let h = 0; h < hops; h++) {
        const opts = (adj.get(b) || []).filter((x) => x !== a);
        if (!opts.length) break;
        const next = opts[(rnd() * opts.length) | 0];
        path.push(next);
        a = b;
        b = next;
      }
      spawn(path, false, null, 0.9);
    }
  }

  // ---------- mouse ----------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 };
  const hoverCapable = !mobile && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onPointerMove = (e) => {
    const r = container.getBoundingClientRect();
    if (!r.width) return;
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = 1 - ((e.clientY - r.top) / r.height) * 2;
    const inside = x >= -1.05 && x <= 1.05 && y >= -1.2 && y <= 1.2;
    mouse.tx = clamp(x, -1, 1);
    mouse.ty = clamp(y, -1, 1);
    mouse.ton = inside ? 1 : 0;
  };
  const onPointerLeave = () => (mouse.ton = 0);
  if (hoverCapable) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
  }
  // il bottone principale è il grilletto: il cursore (o la tastiera) lo fa partire subito
  if (ctaEl) {
    if (hoverCapable) ctaEl.addEventListener("pointerenter", onCtaEnter);
    ctaEl.addEventListener("focus", onCtaEnter);
  }

  // ---------- layout: moduli e collegamenti seguono il testo vero ----------
  function relayout() {
    textRect = measureText();
    text = textEllipse(textRect);
    U.uText.value.set(text.cx, text.cy, text.rx, text.ry);
    const wasCompact = lay.compact;
    lay = withRoute(layoutNow());
    if (lay.compact !== wasCompact) snapLayout = true; // rotazione: cambia disposizione, niente scivolamento
    placeNodes();
    // collegamenti: orientamento «dal centro verso fuori» e quali esistono in questo layout
    const cxp = W / 2;
    const cyp = H / 2;
    const px = (i) => {
      if (i < M) {
        const q = lay.mods[MODULE_IDS[i]];
        return [q.x, q.y];
      }
      if (i < M + D) {
        const q = lay.docks[i - M];
        return [q.x, q.y];
      }
      const rt = lay.route;
      if (!rt) return [cxp, cyp];
      if (i === CTA_I) return [rt.cta.x, rt.cta.y];
      const q = i < IN0 ? rt.out[i - OUT0] : rt.inn[i - IN0];
      return [q.x, q.y];
    };
    for (let e = 0; e < SN; e++) {
      const [a, b] = SE[e];
      const [ax, ay] = px(a);
      const [bx, by] = px(b);
      spOrient[e] = Math.hypot(ax - cxp, ay - cyp) <= Math.hypot(bx - cxp, by - cyp) ? 1 : -1;
      if (e >= ROUTE_START) spOn[e] = lay.route ? 1 : 0;
      else if (e < BUS_START) spOn[e] = mHidden[a] || mHidden[b] ? 0 : 1;
      else {
        const ka = a - M;
        const kb = b - M;
        const compactBus = (ka === 0 && kb === 3) || (ka === 2 && kb === 4);
        const wideBus = (ka === 2 && kb === 3) || (ka === 3 && kb === 4) || (ka === 0 && kb === 1) || (ka === 1 && kb === 2);
        const compactOk = (ka === 0 && kb === 1) || (ka === 1 && kb === 2) || (ka === 3 && kb === 4) || compactBus;
        spOn[e] = lay.compact ? (compactOk ? 1 : 0) : wideBus ? 1 : 0;
      }
    }
    labelSizes();
    showChain(chainShown);
    // solo per le misure (window.__WOW_HERO_DEBUG): niente nell'uso normale
    if (window.__WOW_HERO_DEBUG) container.__heroDebug = { lay, textRect, W, H, compact: lay.compact, ctaPx, scene, fire: startRunner, dir, runners, freeze: (on) => (frozen = on), advance: (sec) => { for (let k = 0; k < Math.round(sec * 60); k++) update(1 / 60); draw(); } };
  }
  function labelSizes() {
    const all = [...chainLabels, ...dockLabels];
    all.forEach((l) => {
      l.w = l.pill.offsetWidth || l.w;
      l.h = l.pill.offsetHeight || l.h;
    });
    caption._w = capPill.offsetWidth || caption._w || 0;
    caption._h = capPill.offsetHeight || caption._h || 0;
  }

  // ---------- scroll: lo stato è l'avanzamento nella pista (runway) ----------
  function readScroll() {
    if (runway) return runway.read();
    return clamp(window.scrollY / Math.max(1, (sec || container).offsetHeight * 0.7));
  }

  // ---------- dimensioni ----------
  function applySize() {
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    U.uPR.value = pr;
    U.uScale.value = H / (2 * TAN);
    U.uAspect.value = W / H;
    U.uRes.value.set(W * pr, H * pr);
    U.uWidth.value = 1.25 * pr;
    U.uSpineW.value = 6.5 * pr;
  }
  applySize();
  relayout();
  sCur = readScroll(); // se la pagina si apre già scorsa, la rete parte dallo stato giusto
  let resizeQueued = false;
  const onResize = () => {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      if (disposed) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      if (w !== W || h !== H) {
        W = w;
        H = h;
        applySize();
      }
      relayout();
      // ridimensionare svuota il canvas: si ridisegna subito, senza lasciare un fotogramma vuoto
      if (ready) {
        update(0.0001);
        draw();
      }
    });
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);
  if (copyEl) ro.observe(copyEl);
  // a fine entrata del testo (CSS) il rettangolo «a riposo» è quello definitivo
  const settle = setTimeout(() => !disposed && relayout(), 1700);

  // ---------- pausa: fuori schermo e scheda nascosta ----------
  let visible = true;
  let tabVisible = !document.hidden;
  let raf = 0;
  let last = 0;
  let t = 0;
  let ready = false;
  let frozen = false; // solo per le misure (window.__WOW_HERO_DEBUG): ferma il tempo, lo si fa avanzare a passi
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    },
    { threshold: 0 }
  );
  io.observe(container);
  const onVis = () => {
    tabVisible = !document.hidden;
    sync();
  };
  document.addEventListener("visibilitychange", onVis);
  function sync() {
    const run = visible && tabVisible && !disposed;
    if (run && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  // ---------- qualità adattiva: si misura sul TEMPO, non sul numero di fotogrammi ----------
  const perf = { t: 0, n: 0, slow: 0 };
  function judge(rawDt) {
    if (t < 0.7) return false; // i primi istanti (compilazione, entrata) non contano
    perf.t += rawDt;
    perf.n++;
    if (rawDt > 0.04) perf.slow++;
    if (perf.t < 1.4) return false;
    const avg = perf.t / perf.n;
    // molto lento (sotto ~11 fps): niente da aspettare
    if (avg > 0.09 && onSlow) return degrade();
    if (perf.t >= 2.4) {
      const bad = avg > 0.04;
      perf.t = perf.n = perf.slow = 0;
      if (bad) return degrade();
    }
    return false;
  }
  function degrade() {
    perf.t = perf.n = perf.slow = 0;
    if (pr > 1.01) {
      // primo passo: densità di pixel a 1x
      pr = 1;
      applySize();
      return false;
    }
    if (onSlow) {
      const cb = onSlow;
      onSlow = null;
      cb();
      return true;
    }
    return false;
  }

  // ---------- un fotogramma ----------
  const tmp = new Vector3();
  const mv0 = new Vector3();
  const mv1 = new Vector3();
  const mv2 = new Vector3();
  const histA = new Float32Array(M * 3);
  const histB = new Float32Array(M * 3);
  let histT = 0;
  const modOut = new Float32Array(M); // visibilità del modulo (si spegne quando si fonde nel dock)
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const rawDt = (now - last) / 1000;
    let dt = rawDt;
    last = now;
    if (frozen) return;
    if (dt <= 0) return;
    if (dt > 0.05) dt = 0.05;
    if (judge(rawDt)) return;
    if (window.__WOW_HERO_DEBUG) {
      const a = performance.now();
      update(dt);
      const b = performance.now();
      draw();
      const c = performance.now();
      const tm = (container.__heroTime = container.__heroTime || { n: 0, u: 0, d: 0 });
      tm.n++;
      tm.u += b - a;
      tm.d += c - b;
      return;
    }
    update(dt);
    draw();
  }

  const dockT = new Float32Array(D);

  function update(dt) {
    t += dt;
    U.uTime.value = t;

    // se il layout cambia a scena viva (font che si cambia, rotazione) i moduli scivolano al nuovo posto
    const kb = 1 - Math.exp(-dt * 7);
    for (let i = 0; i < NS; i++) {
      base[i * 3] += (baseT[i * 3] - base[i * 3]) * kb;
      base[i * 3 + 1] += (baseT[i * 3 + 1] - base[i * 3 + 1]) * kb;
      base[i * 3 + 2] += (baseT[i * 3 + 2] - base[i * 3 + 2]) * kb;
      msize[i] += (msizeT[i] - msize[i]) * kb;
      if (i >= M) {
        cur[i * 3] = base[i * 3];
        cur[i * 3 + 1] = base[i * 3 + 1];
        cur[i * 3 + 2] = base[i * 3 + 2];
      }
    }

    // avanzamento della pista (0 = hero intera, 1 = rete fusa nelle cinque categorie)
    const sT = readScroll();
    sCur += (sT - sCur) * (1 - Math.exp(-dt * 7.5));
    if (Math.abs(sT - sCur) < 0.0006) sCur = sT;
    const s = sCur;
    // il testo se ne va: la rete può tornare piena anche dove prima lo copriva
    U.uTextDim.value = textDim0 + (1 - textDim0) * smooth(0.1, 0.42, s);
    const ex = Math.pow(s, 1.35);
    const fadeEx = 1 - smooth(0.22, 0.78, s);

    // mouse (parallasse e luce vicino al cursore)
    const k = 1 - Math.exp(-dt * 3.2);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;
    mouse.on += (mouse.ton - mouse.on) * (1 - Math.exp(-dt * 4));
    U.uMouse.value.set(mouse.tx, mouse.ty);
    U.uMouseOn.value = mouse.on;

    // camera: respiro lento + parallasse del mouse + un colpetto quando scatta l'oro
    kickT += dt;
    const kick = (gold.on ? Math.sin(Math.min(1, gold.t / 0.9) * Math.PI) * 0.35 : 0) + (kickT < 0.5 ? Math.sin((kickT / 0.5) * Math.PI) * 0.22 : 0);
    const swayX = Math.sin(t * 0.21) * 0.7;
    const swayY = Math.cos(t * 0.17) * 0.45;
    camera.position.x = swayX + mouse.x * 1.2 * (hoverCapable ? 1 : 0);
    camera.position.y = swayY + mouse.y * 0.7 * (hoverCapable ? 1 : 0);
    camera.position.z = CAM_Z - kick;
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    // ---- nodi
    for (let i = 0; i < N; i++) {
      if (i >= M && i < NS) continue; // i dock stanno fermi
      const p = clamp((t - delay[i]) / dur[i]);
      prog[i] = p;
      const e = easeOutCubic(p);
      const isMod = i < M;
      const tw = (1 - e) * (isMod ? 0.5 : 1.15);
      const cs = Math.cos(tw);
      const sn = Math.sin(tw);
      let x = far[i * 3] + (base[i * 3] - far[i * 3]) * e;
      let y = far[i * 3 + 1] + (base[i * 3 + 1] - far[i * 3 + 1]) * e;
      let z = far[i * 3 + 2] + (base[i * 3 + 2] - far[i * 3 + 2]) * e;
      if (isMod) {
        // i moduli arrivano dalla profondità; la rotazione di apertura è nello scatto del gruppo (sotto)
        const ph = phase[i] * TWO_PI;
        x += Math.sin(t * 0.55 + ph) * amp[i];
        y += Math.cos(t * 0.47 + ph * 1.3) * amp[i];
        z += Math.sin(t * 0.39 + ph * 0.7) * amp[i] * 0.6;
        cur[i * 3] = x;
        cur[i * 3 + 1] = y;
        cur[i * 3 + 2] = z;
        continue;
      }
      const xr = x * cs - y * sn;
      const yr = x * sn + y * cs;
      const ph = phase[i] * TWO_PI;
      const a = amp[i];
      x = xr + Math.sin(t * 0.55 + ph) * a;
      y = yr + Math.cos(t * 0.47 + ph * 1.3) * a;
      z += Math.sin(t * 0.39 + ph * 0.7) * a * 0.6;
      const d = dist[i] * ex;
      cur[i * 3] = x + dirs[i * 3] * d;
      cur[i * 3 + 1] = y + dirs[i * 3 + 1] * d;
      cur[i * 3 + 2] = z + dirs[i * 3 + 2] * d;
    }
    for (let i = 0; i < N; i++) if (glow[i] > 0) glow[i] = Math.max(0, glow[i] - dt * 3.2);

    // ---- scorrimento: ogni modulo viaggia su una curva verso il dock della sua categoria
    // i dock vengono su quando arriva l'ultimo modulo della categoria
    dockT.fill(0.74);
    for (let i = 0; i < M; i++) {
      const rank = (i * 3) % M;
      const a0 = 0.04 + rank * 0.02;
      const b0 = 0.66 + rank * 0.025;
      const kc = CATEGORY_OF[MODULE_IDS[i]];
      if (!mHidden[i] && b0 > dockT[kc]) dockT[kc] = b0;
      const loc = clamp((s - a0) / (b0 - a0));
      modOut[i] = 1 - smooth(b0 - 0.14, b0, s);
      if (loc <= 0) continue;
      const e = easeInOutCubic(loc);
      const di = M + kc;
      // piccolo cerchio attorno al dock per i moduli della stessa categoria: si fondono, non si sovrappongono
      const ang = (i / M) * TWO_PI * 2.1 + 0.7;
      const rad = 0.55 * smooth(0.5, 1, loc) * (1 - smooth(0.9, 1, loc));
      const tx = cur[di * 3] + Math.cos(ang) * rad;
      const ty = cur[di * 3 + 1] + Math.sin(ang) * rad;
      const tz = cur[di * 3 + 2];
      const sx = cur[i * 3];
      const sy = cur[i * 3 + 1];
      const sz = cur[i * 3 + 2];
      const mx = (sx + tx) / 2;
      const my = (sy + ty) / 2;
      const dx = tx - sx;
      const dy = ty - sy;
      const l = Math.hypot(dx, dy) || 1;
      const side = i % 2 === 0 ? 1 : -1;
      const bow = l * 0.26 * side;
      const cx = mx - (dy / l) * bow;
      const cy = my + (dx / l) * bow;
      const cz = Math.max(sz, tz) + 2.2;
      const om = 1 - e;
      cur[i * 3] = om * om * sx + 2 * om * e * cx + e * e * tx;
      cur[i * 3 + 1] = om * om * sy + 2 * om * e * cy + e * e * ty;
      cur[i * 3 + 2] = om * om * sz + 2 * om * e * cz + e * e * tz;
    }

    // ---- pacchetti
    updateDirector(dt);
    updateCaption(dt);
    for (const key in runners) updateRunner(runners[key], dt);
    updateAmbient(dt);
    spHead.fill(-1);
    const packFade = 1 - smooth(0.08, 0.34, s);
    for (let i = 0; i < PMAX; i++) {
      if (!pk.on[i]) {
        headAlpha[i] = 0;
        clearStreak(i);
        continue;
      }
      const len = pk.len[i];
      const total = pk.total[i];
      const strong = pk.strong[i] === 1;
      const Ltrail = pk.trail[i];
      pk.s[i] += pk.speed[i] * dt;
      const sHead = pk.s[i];
      // nodi attraversati: lampo
      let seg = pk.seg[i];
      while (seg < len - 1 && sHead >= pk.cum[i * PATH_MAX + seg + 1]) {
        seg++;
        const nd = pk.path[i * PATH_MAX + seg];
        glow[nd] = Math.max(glow[nd], strong ? 1 : 0.7);
      }
      pk.seg[i] = seg;
      // energia del collegamento che si sta percorrendo (e di quello appena lasciato)
      for (let sg = Math.max(0, seg - 1); sg <= Math.min(seg, len - 2); sg++) {
        const na = pk.path[i * PATH_MAX + sg];
        const nb = pk.path[i * PATH_MAX + sg + 1];
        if (na < NS && nb < NS) {
          const es = spineOf[na * NS + nb];
          if (es >= 0) {
            spEnergy[es] = Math.max(spEnergy[es], strong ? 1 : 0.5);
            if (sg === seg) {
              const c0 = pk.cum[i * PATH_MAX + sg];
              const c1 = pk.cum[i * PATH_MAX + sg + 1];
              const fr = c1 > c0 ? clamp((sHead - c0) / (c1 - c0)) : 1;
              const fwd = SE[es][0] === na;
              spHead[es] = fwd ? fr : 1 - fr;
              spDir[es] = fwd ? 1 : -1;
            }
          }
        } else {
          const em = meshOf.get(na * 4096 + nb);
          if (em !== undefined) {
            energy[em] = strong ? 1 : 0.8;
            edecay[em] = strong ? 1.0 : 2.4;
          }
        }
      }
      if (sHead >= total && !pk.arrived[i]) {
        pk.arrived[i] = 1;
        const endNode = pk.path[i * PATH_MAX + len - 1];
        if (endNode < M) light(endNode, false);
        else if (endNode < M + D) lightDock(endNode - M);
        else if (endNode === CTA_I) hitCta();
        const cb = pk.cb[i];
        pk.cb[i] = null;
        if (cb) cb();
      }
      if (sHead - Ltrail >= total) {
        pk.on[i] = 0;
        pk.cb[i] = null;
        headAlpha[i] = 0;
        clearStreak(i);
        continue;
      }
      for (let q = 0; q <= QN; q++) samplePath(i, Math.max(0, Math.min(total, sHead - Ltrail * (1 - q / QN))), strk[q]);
      const fade = (strong ? 1 : 1 - smooth(total - 0.35, total + 0.05, sHead)) * packFade;
      writeStreak(i, strk, pk.wid[i], fade, pk.free[i]);
      p2.copy(strk[QN]);
      headPos[i * 3] = p2.x;
      headPos[i * 3 + 1] = p2.y;
      headPos[i * 3 + 2] = p2.z;
      headSize[i] = pk.hs[i];
      headAlpha[i] = fade;
      headFree[i] = pk.free[i];
    }
    // strascichi dei moduli in volo (apertura e scorrimento): lasciano una scia luminosa dietro di sé
    histT += dt;
    const hist = histT >= 0.07;
    for (let i = 0; i < M; i++) {
      const slot = PMAX + i;
      const x = cur[i * 3];
      const y = cur[i * 3 + 1];
      const z = cur[i * 3 + 2];
      const spd = Math.hypot(x - histA[i * 3], y - histA[i * 3 + 1], z - histA[i * 3 + 2]) / 0.14;
      const live = !mHidden[i] && histA[i * 3 + 2] !== 0 && spd > 3;
      if (live) {
        mv0.set(histA[i * 3], histA[i * 3 + 1], histA[i * 3 + 2]);
        mv1.set(histB[i * 3], histB[i * 3 + 1], histB[i * 3 + 2]);
        mv2.set(x, y, z);
        strk[0].copy(mv0);
        strk[1].copy(mv0).lerp(mv1, 0.5);
        strk[2].copy(mv1);
        strk[3].copy(mv1).lerp(mv2, 0.5);
        strk[4].copy(mv2);
        writeStreak(slot, strk, 14, clamp((spd - 3) / 14) * 0.85 * modOut[i], 0);
      } else clearStreak(slot);
      if (hist) {
        histA[i * 3] = histB[i * 3];
        histA[i * 3 + 1] = histB[i * 3 + 1];
        histA[i * 3 + 2] = histB[i * 3 + 2];
        histB[i * 3] = x;
        histB[i * 3 + 1] = y;
        histB[i * 3 + 2] = z;
      }
    }
    if (hist) histT = 0;
    headGeo.attributes.position.needsUpdate = true;
    headGeo.attributes.aSize.needsUpdate = true;
    headGeo.attributes.aAlpha.needsUpdate = true;
    headGeo.attributes.aFree.needsUpdate = true;
    tailGeo.attributes.position.needsUpdate = true;
    tailGeo.attributes.aOther.needsUpdate = true;
    tailGeo.attributes.aT.needsUpdate = true;

    // impulso d'oro: un anello sul modulo della scheda cliente e un'onda che attraversa la rete
    let goldFlash = 0;
    if (gold.on) {
      gold.t += dt;
      const g = gold.t / 1.9;
      if (g >= 1) {
        gold.on = false;
        U.uWaveP.value.y = 0;
      } else {
        const ci = GOLD_NODE;
        U.uWave.value.set(cur[ci * 3], cur[ci * 3 + 1], cur[ci * 3 + 2], g * 15);
        U.uWaveP.value.set(2.6, Math.pow(1 - g, 1.2) * 1.25);
        goldFlash = Math.pow(1 - smooth(0, 0.7, gold.t / 1.5), 1);
      }
    }

    // ---- dorsale
    const busIn = smooth(0.8, 0.97, s);
    const spineOut = 1 - smooth(0.5, 0.82, s);
    for (let e = 0; e < SN; e++) {
      const a = SE[e][0];
      const b = SE[e][1];
      const v = e * 4;
      const o3 = v * 3;
      const ax = cur[a * 3];
      const ay = cur[a * 3 + 1];
      const az = cur[a * 3 + 2];
      const bx = cur[b * 3];
      const by = cur[b * 3 + 1];
      const bz = cur[b * 3 + 2];
      spPos[o3] = spPos[o3 + 3] = ax;
      spPos[o3 + 1] = spPos[o3 + 4] = ay;
      spPos[o3 + 2] = spPos[o3 + 5] = az;
      spPos[o3 + 6] = spPos[o3 + 9] = bx;
      spPos[o3 + 7] = spPos[o3 + 10] = by;
      spPos[o3 + 8] = spPos[o3 + 11] = bz;
      spOther[o3] = spOther[o3 + 3] = bx;
      spOther[o3 + 1] = spOther[o3 + 4] = by;
      spOther[o3 + 2] = spOther[o3 + 5] = bz;
      spOther[o3 + 6] = spOther[o3 + 9] = ax;
      spOther[o3 + 7] = spOther[o3 + 10] = ay;
      spOther[o3 + 8] = spOther[o3 + 11] = az;
      let draw;
      let alpha;
      if (e >= ROUTE_START) {
        // i fili del bottone: compaiono dopo i moduli e restano accennati (si accendono dietro il pacchetto)
        draw = clamp((t - 1.3 - (e < IN_START ? e - ROUTE_START : e - IN_START) * 0.05) / 0.6);
        alpha = spOn[e] ? spineOut * (e < IN_START ? 0.4 : 0.3) : 0;
      } else if (e < BUS_START) {
        // si disegna dal centro verso fuori, quando i due moduli sono arrivati
        const t0 = Math.max(delay[a], delay[b]) + 0.45;
        draw = clamp((t - t0) / 0.85);
        draw = 1 - Math.pow(1 - draw, 2.2);
        // i moduli della stessa categoria che si fondono: il filo fra loro sparisce prima
        const same = CATEGORY_OF[MODULE_IDS[a]] === CATEGORY_OF[MODULE_IDS[b]];
        alpha = spOn[e] ? (same ? 1 - smooth(0.25, 0.55, s) : spineOut) : 0;
      } else {
        draw = busIn;
        alpha = spOn[e] ? busIn : 0;
      }
      if (spEnergy[e] > 0) spEnergy[e] = Math.max(0, spEnergy[e] - dt * 0.85);
      const en = spEnergy[e];
      for (let q = 0; q < 4; q++) {
        const o4 = (v + q) * 4;
        spState[o4] = draw;
        spState[o4 + 1] = en * en * (3 - 2 * en);
        spState[o4 + 2] = spHead[e];
        spState[o4 + 3] = spDir[e];
        const o3m = (v + q) * 3;
        spMisc[o3m] = spSeed[e];
        spMisc[o3m + 1] = alpha;
        spMisc[o3m + 2] = spOrient[e];
      }
    }
    spineGeo.attributes.position.needsUpdate = true;
    spineGeo.attributes.aOther.needsUpdate = true;
    spineGeo.attributes.aState.needsUpdate = true;
    spineGeo.attributes.aMisc.needsUpdate = true;

    // ---- rete di fondo: collegamenti
    for (let e = 0; e < E; e++) {
      const a = meshEdges[e][0];
      const b = meshEdges[e][1];
      const ax = cur[a * 3];
      const ay = cur[a * 3 + 1];
      const az = cur[a * 3 + 2];
      const bx = cur[b * 3];
      const by = cur[b * 3 + 1];
      const bz = cur[b * 3 + 2];
      const v = e * 4;
      const o3 = v * 3;
      linePos[o3] = linePos[o3 + 3] = ax;
      linePos[o3 + 1] = linePos[o3 + 4] = ay;
      linePos[o3 + 2] = linePos[o3 + 5] = az;
      linePos[o3 + 6] = linePos[o3 + 9] = bx;
      linePos[o3 + 7] = linePos[o3 + 10] = by;
      linePos[o3 + 8] = linePos[o3 + 11] = bz;
      lineOther[o3] = lineOther[o3 + 3] = bx;
      lineOther[o3 + 1] = lineOther[o3 + 4] = by;
      lineOther[o3 + 2] = lineOther[o3 + 5] = bz;
      lineOther[o3 + 6] = lineOther[o3 + 9] = ax;
      lineOther[o3 + 7] = lineOther[o3 + 10] = ay;
      lineOther[o3 + 8] = lineOther[o3 + 11] = az;
      const rev = smooth(0.55, 1.0, Math.min(prog[a], prog[b])) * fadeEx;
      const en = energy[e];
      if (en > 0) energy[e] = Math.max(0, en - dt * edecay[e]);
      const o2 = v * 2;
      lineState[o2] = lineState[o2 + 2] = lineState[o2 + 4] = lineState[o2 + 6] = rev;
      lineState[o2 + 1] = lineState[o2 + 3] = lineState[o2 + 5] = lineState[o2 + 7] = en * en * (3 - 2 * en);
    }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.aOther.needsUpdate = true;
    lineGeo.attributes.aState.needsUpdate = true;

    // ---- punti
    for (let k2 = 0; k2 < P; k2++) {
      const i = NS + k2;
      const life = smooth(0, 0.15, prog[i]) * fadeEx;
      const bok = dotNodes[k2].kind === "bokeh";
      dotState[k2 * 2] = bok ? life * 0.09 : life;
      dotState[k2 * 2 + 1] = glow[i];
    }
    dotGeo.attributes.position.needsUpdate = true;
    dotGeo.attributes.aState.needsUpdate = true;

    // ---- moduli
    const aspect = W / H;
    for (let i = 0; i < M; i++) {
      const m = modules[i];
      const p = prog[i];
      const hid = mHidden[i];
      const spawnS = easeOutBack(clamp(p * 1.04));
      tmp.set(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]).project(camera);
      const hv = hoverCapable && s < 0.05 ? smooth(0.32, 0.0, Math.hypot((tmp.x - mouse.tx) * aspect, tmp.y - mouse.ty)) * mouse.on : 0;
      m.hover += (hv - m.hover) * (1 - Math.exp(-dt * 6));

      if (m.lit > 0) m.lit -= dt;
      m.act += ((m.lit > 0 ? 1 : 0) - m.act) * (1 - Math.exp(-dt * (m.lit > 0 ? 10 : 2.0)));
      m.popT += dt;
      if (m.ring < 1) m.ring = Math.min(1, m.ring + dt / 0.85);
      // «pop» in 120 ms e rientro: il modulo che riceve il pacchetto si gonfia e si assesta
      const popK = m.popT < 0.12 ? easeOutCubic(m.popT / 0.12) : 1 - smooth(0.12, 0.5, m.popT);

      const isGoldNode = i === GOLD_NODE;
      const gl = isGoldNode ? goldFlash : 0;
      const rank = (i * 3) % M;
      const loc = clamp((s - (0.04 + rank * 0.02)) / (0.66 + rank * 0.025 - (0.04 + rank * 0.02)));
      const out = modOut[i];

      m.group.position.set(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]);
      const sc =
        msize[i] *
        Math.max(0.0001, spawnS) *
        (1 + m.popAmp * popK + 0.07 * m.hover + 0.1 * gl) *
        (1 - 0.42 * smooth(0.55, 1, loc)) *
        (hid ? 0 : 1);
      m.group.scale.setScalar(Math.max(0.0001, sc));
      const sign = i % 2 === 0 ? 1 : -1;
      const ph = phase[i] * TWO_PI;
      const open = 1 - easeOutCubic(p);
      const face = 1 - smooth(0, 0.8, loc);
      m.group.rotation.y = open * 1.7 * sign + (mouse.x * 0.32 * (hoverCapable ? 1 : 0) + Math.sin(t * 0.5 + ph) * 0.1) * face + loc * 0.6 * sign * (1 - loc);
      m.group.rotation.x = (-mouse.y * 0.2 * (hoverCapable ? 1 : 0) + Math.cos(t * 0.43 + ph) * 0.07) * face;
      m.group.rotation.z = open * 0.35 * sign + loc * 0.5 * sign * (1 - loc);

      const op = clamp(p * 4) * out * (hid ? 0 : 1);
      m.plateU.uOpacity.value = op;
      m.group.visible = op > 0.002;
      // profondità di campo: il primo piano è sfocato, il fondo è velato; scorrendo ogni modulo va a fuoco
      const lm = lay.mods[MODULE_IDS[i]];
      const focus = smooth(0, 0.5, loc);
      if (!m.seen) {
        m.seen = true;
        m.blur = lm.blur || 0;
        m.dim = lm.dim === undefined ? 1 : lm.dim;
      }
      m.blur += ((lm.blur || 0) - m.blur) * kb;
      m.dim += ((lm.dim === undefined ? 1 : lm.dim) - m.dim) * kb;
      m.plateU.uBlur.value = m.blur * (1 - focus);
      m.plateU.uDim.value = m.dim + (1 - m.dim) * focus;
      m.plateU.uAct.value = clamp(m.act + m.hover * 0.45 + gl * 0.5);
      m.plateU.uGold.value = gl;
      m.haloU.uBreath.value = Math.sin(t * 1.3 + ph);
      m.haloU.uGold.value = isGoldNode && gold.on ? 1 - smooth(1.1, 1.9, gold.t) : 0;
      // anelli: al massimo ~1,05 lati di tessera di raggio (l'alone è largo 4,2 lati: 0,5 del suo raggio)
      if (isGoldNode && gold.on) {
        m.haloU.uRing.value = 0.1 + easeOutCubic(clamp(gold.t / 1.5)) * 0.4;
        m.haloU.uRingA.value = Math.pow(1 - clamp(gold.t / 1.7), 1.1);
      } else {
        m.haloU.uRing.value = 0.1 + m.ring * 0.4;
        m.haloU.uRingA.value = (1 - m.ring) * (m.ringStrong || 0) * 0.95;
      }
    }

    // ---- il bottone principale come nodo (solo dove c'è il filo dalla chiamata)
    const ctaFade = lay.route && ctaPx ? (1 - smooth(0.02, 0.12, s)) * smooth(0.3, 0.9, t) : 0;
    if (ctaFade > 0.01) {
      ctaHalo.visible = true;
      if (cta.lit > 0) cta.lit -= dt;
      cta.act += ((cta.lit > 0 ? 1 : 0.2) - cta.act) * (1 - Math.exp(-dt * (cta.lit > 0 ? 14 : 2.2)));
      if (cta.ring < 1) cta.ring = Math.min(1, cta.ring + dt / 0.8);
      const z = base[CTA_I * 3 + 2];
      ctaHalo.position.set(cur[CTA_I * 3], cur[CTA_I * 3 + 1], -0.3);
      // il bagliore visibile arriva a ~0,55 del raggio del piano: lo si porta a poco più del bottone
      ctaHalo.scale.set(worldSize(ctaPx.w / 2 + 90, z) / 1.155, worldSize(ctaPx.h / 2 + 64, z) / 1.155, 1);
      ctaHaloU.uOpacity.value = ctaFade;
      ctaHaloU.uAct.value = cta.act;
      ctaHaloU.uBreath.value = Math.sin(t * 1.3 + 1.7);
      ctaHaloU.uRing.value = cta.ring * 0.96;
      ctaHaloU.uRingA.value = Math.pow(1 - cta.ring, 1.2) * 0.9 * cta.ringK;
    } else ctaHalo.visible = false;

    // ---- dock delle categorie
    let dockLive = false;
    for (let k = 0; k < D; k++) {
      const d = docks[k];
      const T = dockT[k];
      const inK = smooth(T - 0.12, T, s);
      const pop = easeOutBack(clamp((s - (T - 0.1)) / 0.16));
      if (inK > 0.5 && !dockRung[k]) {
        dockRung[k] = 1;
        d.ring = 0;
        d.ringStrong = 1;
        d.lit = 1.2;
      } else if (inK < 0.2) dockRung[k] = 0;
      if (d.lit > 0) d.lit -= dt;
      d.act += ((d.lit > 0 ? 1 : 0.4) - d.act) * (1 - Math.exp(-dt * 6));
      if (d.ring < 1) d.ring = Math.min(1, d.ring + dt / 0.9);
      const i = M + k;
      const ph = phase[i] * TWO_PI;
      d.group.position.set(cur[i * 3], cur[i * 3 + 1] + Math.sin(t * 0.8 + ph) * 0.06, cur[i * 3 + 2]);
      d.group.scale.setScalar(Math.max(0.0001, msize[M + k] * pop * (inK > 0.001 ? 1 : 0)));
      d.group.rotation.y = (1 - clamp(pop)) * 1.2 + mouse.x * 0.12 * (hoverCapable ? 1 : 0);
      d.group.rotation.x = -mouse.y * 0.08 * (hoverCapable ? 1 : 0);
      d.plateU.uOpacity.value = inK;
      d.group.visible = inK > 0.002;
      d.plateU.uAct.value = clamp(d.act);
      d.haloU.uBreath.value = Math.sin(t * 1.1 + ph);
      d.haloU.uRing.value = 0.12 + d.ring * 0.6;
      d.haloU.uRingA.value = (1 - d.ring) * (d.ringStrong || 0.9) * inK;
      if (inK > 0.001) dockLive = true;
    }

    // ---- etichette
    placeLabels(s, dockLive);

    return true;
  }

  function projectPx(i, out) {
    tmp.set(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]).project(camera);
    out.x = (tmp.x * 0.5 + 0.5) * W;
    out.y = (0.5 - tmp.y * 0.5) * H;
  }
  const pp = { x: 0, y: 0 };
  function placeLabels(s, dockLive) {
    // catena: si spegne quando si comincia a scorrere
    if (s > 0.05 && chainShown >= 0) showChain(-1);
    if ((s > 0.05) !== capAway) {
      capAway = s > 0.05;
      capPill.classList.toggle("is-on", lay.caption && !capAway);
    }
    if (!lay.caption) {
      for (let i = 0; i < 4; i++) {
        const lab = chainLabels[i];
        if (!lab.on && !lab.el._shown) continue;
        const mi = IDX[CHAINS.main[i]];
        projectPx(mi, pp);
        const q = lay.mods[MODULE_IDS[mi]];
        const r = (q.size / 2) * 1.02;
        const w = lab.w || 96;
        const h = lab.h || 22;
        let x = pp.x - w / 2;
        let y = pp.y + r + 10;
        if (q.label === "above") y = pp.y - r - 10 - h;
        else if (q.label === "right") {
          x = pp.x + r + 12;
          y = pp.y - h / 2;
        } else if (q.label === "left") {
          x = pp.x - r - 12 - w;
          y = pp.y - h / 2;
        }
        // call e crm stanno nelle colonne ai lati del testo: la scritta va sotto il pannello, mai verso il testo
        if (i === 0 || i === 3) {
          x = pp.x - w / 2;
          y = pp.y + r + 10;
        }
        lab.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        lab.el._shown = lab.on;
      }
    } else {
      // la riga della catena: larga quanto lo schermo, centrata dal CSS; qui si muove solo in verticale
      caption.style.transform = `translate3d(0, ${lay.captionY.toFixed(1)}px, 0)`;
    }
    // dock
    for (let k = 0; k < D; k++) {
      const lab = dockLabels[k];
      const on = dockLive && s > 0.86;
      setOn(lab, on);
      if (!on && !lab.el._shown) continue;
      const q = lay.docks[k];
      const i = M + k;
      projectPx(i, pp);
      const w = lab.w || 90;
      lab.el.style.transform = `translate3d(${(pp.x - w / 2).toFixed(1)}px, ${(pp.y + q.size / 2 + 12).toFixed(1)}px, 0)`;
      lab.el._shown = on;
    }
  }

  function draw() {
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      container.classList.add("is-ready");
      if (bgEl) bgEl.setAttribute("data-wow-live", "1");
      labelSizes();
    }
  }

  // compila gli shader in parallelo prima del primo fotogramma, per non fare un blocco lungo
  try {
    if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
  } catch (err) {
    /* se non è disponibile, compila al primo render */
  }
  // Le icone dei dock salgono in GPU solo quando il dock compare (circa s 0,8), cioè al primo scrub: un fotogramma lungo mentre si scorre.
  // Le carico ora, con un render di prova a gruppi accesi (il canvas è ancora a opacità 0). Non tocca draw(), che imposta is-ready.
  try {
    const sets = [...modules, ...docks];
    textures.forEach((t) => renderer.initTexture(t));
    const was = sets.map((p) => p.group.visible);
    sets.forEach((p) => (p.group.visible = true));
    renderer.render(scene, camera);
    sets.forEach((p, i) => (p.group.visible = was[i]));
  } catch (err) {
    /* il primo fotogramma farà da sé */
  }
  await yieldToMain();
  labelSizes();
  sync();

  function dispose() {
    if (disposed) return;
    disposed = true;
    clearTimeout(settle);
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    if (ctaEl) {
      ctaEl.removeEventListener("pointerenter", onCtaEnter);
      ctaEl.removeEventListener("focus", onCtaEnter);
    }
    canvas.removeEventListener("webglcontextlost", onContextLost);
    scene.traverse((o) => {
      if (o.material) o.material.dispose();
    });
    lineGeo.dispose();
    spineGeo.dispose();
    dotGeo.dispose();
    headGeo.dispose();
    tailGeo.dispose();
    plateGeo.dispose();
    iconGeo.dispose();
    haloGeo.dispose();
    textures.forEach((x) => x.dispose());
    renderer.dispose();
    try {
      renderer.forceContextLoss();
    } catch (err) {
      /* già perso */
    }
    if (ctaEl) ctaEl.removeAttribute("data-wow-hit");
    canvas.remove();
    labelsEl.remove();
    container.classList.remove("is-ready");
    if (bgEl) bgEl.removeAttribute("data-wow-live");
  }

  return { dispose };
}
