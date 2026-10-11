// Motore 3D delle hero interne (three.js). Caricato solo lato client, dopo il primo paint, con import() dal guscio PageScene.
// Stesso linguaggio della hero della home, in versione «lite»: 3-5 moduli di vetro scelti per la pagina (scene/presets.js),
// collegati da tubi sottili su cui corrono pacchetti di dati con la scia; una catena scatta da sola (il modulo si accende
// all'arrivo e passa il testimone) e a fine catena un solo lampo d'oro. Reagisce al mouse (parallasse e inclinazione dei
// pannelli), si compone all'apertura, si scompone con lo scroll. Dove sta il testo non c'è niente (scene/layout.js).
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
  CatmullRomCurve3,
  TubeGeometry,
  CustomBlending,
  AddEquation,
  SrcAlphaFactor,
  OneFactor,
  DoubleSide,
  Vector2,
  Vector3,
} from "three";
import { PRESETS } from "./presets";
import { computeLayout, mulberry32 } from "./layout";
import { iconSvg } from "./icons";
import * as SH from "./shaders";

const FOV = 30;
const TAN = Math.tan((FOV * Math.PI) / 360);
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, k) => a + (b - a) * k;
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const easeOutBack = (x) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

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

function drawIcon(id, px = 160) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext("2d");
    const img = new Image(px, px);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, px, px);
      resolve(canvas);
    };
    img.onerror = () => resolve(canvas);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(iconSvg(id, px));
  });
}

/*
  container: l'elemento in cui mettere il canvas (la sua dimensione è quella della scena)
  opts.preset     id in scene/presets.js
  opts.mobile     profilo leggero: meno polvere, DPR 1,5, niente antialias, niente mouse
  opts.soft       il rendering è su software (SwiftShader, llvmpipe: GPU emulata): stesso profilo leggero
                  (niente antialias, DPR al massimo 1,5, meno polvere). Sugli schermi a 2x l'antialias non serve comunque.
  opts.canHover   mouse vero: parallasse e inclinazione al puntatore
  opts.getRects   () => { W, H, copy:{l,t,r,b}, stage:{l,t,r,b} } in pixel rispetto al contenitore
  opts.still      true: disegna un solo fotogramma e restituisce l'immagine (reduced motion). Poi libera tutto.
  opts.onLost / onSlow  la scena non regge: chi chiama toglie il canvas
  Ritorna { dispose(), still?: dataURL }
*/
export async function createPageScene(container, opts = {}) {
  const { preset: presetId = "generic", mobile = false, soft = false, canHover = false, getRects, still = false, onLost, onSlow } = opts;
  const preset = PRESETS[presetId] || PRESETS.generic;
  const lite = mobile || soft;
  const maxPR = lite ? 1.5 : 2;

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: !lite && (window.devicePixelRatio || 1) < 2,
    powerPreference: "default",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  });
  renderer.setClearColor(0x000000, 0);
  let pr = Math.min(window.devicePixelRatio || 1, maxPR);
  renderer.setPixelRatio(pr);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "v2-pscene__canvas";
  container.appendChild(canvas);

  let disposed = false;
  const onContextLost = (e) => {
    e.preventDefault();
    if (!disposed && onLost) onLost();
  };
  canvas.addEventListener("webglcontextlost", onContextLost, false);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 1, 8000);
  const U = { uTime: { value: 0 }, uPR: { value: pr }, uD: { value: 1 } };

  // texture delle icone (una per id, riusate a ogni ricostruzione)
  const ids = Array.from(new Set(preset.modules));
  const iconCanvases = await Promise.all(ids.map((id) => drawIcon(id)));
  // la pagina può essere cambiata mentre le icone si disegnavano: il contenitore non c'è più, si libera tutto
  if (disposed || !container.isConnected) {
    disposed = true;
    canvas.removeEventListener("webglcontextlost", onContextLost);
    renderer.dispose();
    try {
      renderer.forceContextLoss();
    } catch (e) {
      /* niente */
    }
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    return { dispose() {} };
  }
  const textures = {};
  ids.forEach((id, i) => {
    const tex = new CanvasTexture(iconCanvases[i]);
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures[id] = tex;
  });
  const plateGeo = new ExtrudeGeometry(roundedRect(0.5, 0.5, 0.2), { depth: 0.1, bevelEnabled: false, curveSegments: 8 });
  plateGeo.translate(0, 0, -0.05);
  const iconGeo = new PlaneGeometry(0.56, 0.56);
  const haloGeo = new PlaneGeometry(3.2, 3.2);

  // ---------- stato ----------
  let content = null;
  let t = 0;
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;
  let sp = 0; // scomposizione con lo scroll (0..1)
  let introBase = 0;
  let rebuilt = false;

  function disposeContent() {
    if (!content) return;
    scene.remove(content.root);
    content.geos.forEach((g) => g.dispose());
    content.mats.forEach((m) => m.dispose());
    content = null;
  }

  function build() {
    disposeContent();
    if (!container.isConnected) return;
    const r = getRects();
    const W = Math.max(200, r.W);
    const H = Math.max(160, r.H);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const D = H / 2 / TAN;
    camera.position.set(0, 0, D);
    camera.near = D * 0.25;
    camera.far = D * 6;
    camera.updateProjectionMatrix();
    U.uD.value = D;

    const n = preset.modules.length;
    const L = computeLayout({
      style: preset.style,
      n,
      flip: Boolean(preset.flip),
      W,
      H,
      copy: r.copy,
      stage: r.stage,
      mobile,
      z: preset.z,
      seed: preset.seed,
    });
    const rnd = mulberry32(preset.seed * 7 + 3);
    // La posizione scelta dal layout è quella che si vede sullo schermo: con la prospettiva un oggetto vicino alla camera si
    // allontana dal centro (e uno lontano si avvicina), quindi si compensa in x e y in proporzione alla profondità.
    const toW = (p) => {
      const z = p.z || 0;
      const k = (D - z) / D;
      return new Vector3((p.x - W / 2) * k, (H / 2 - p.y) * k, z);
    };
    const root = new Group();
    const geos = [];
    const mats = [];
    scene.add(root);

    // ---- collegamenti ----
    const mkEdge = (pts, { base, chain, radius }) => {
      const curve = new CatmullRomCurve3(pts.map(toW), false, "centripetal");
      const len = curve.getLength();
      const segs = clamp(Math.round(len / 7), 24, 110);
      const geo = new TubeGeometry(curve, segs, radius, 5, false);
      const u = {
        uDraw: { value: 0 },
        uH0: { value: -1 },
        uH1: { value: -1 },
        uEn: { value: 0 },
        uGold: { value: 0 },
        uLen: { value: len },
        uA: { value: 1 },
        uBase: { value: base },
      };
      const mat = glowMaterial({ vertexShader: SH.edgeVert, fragmentShader: SH.edgeFrag, uniforms: u });
      const mesh = new Mesh(geo, mat);
      mesh.renderOrder = 5;
      mesh.frustumCulled = false;
      root.add(mesh);
      geos.push(geo);
      mats.push(mat);
      return { curve, u, chain, en: 0, amb: { u: -1, wait: 0.6 + rnd() * 2.4, v: 0.42 + rnd() * 0.36 }, endModule: -1, delay: 0 };
    };
    const edgeRadius = lite ? 1.05 : 1.25;
    const edges = L.edges.map((pts, i) => {
      const e = mkEdge(pts, { base: 0.36, chain: true, radius: edgeRadius });
      e.delay = 0.45 + i * 0.14;
      return e;
    });
    const decorEdges = L.decorEdges.map((pts, k) => {
      const e = mkEdge(pts, { base: 0.2, chain: false, radius: edgeRadius * 0.8 });
      e.delay = 1.0 + k * 0.06;
      // il modulo in fondo (l'ultimo punto coincide con un modulo): si «sveglia» quando arriva un pacchetto
      const last = pts[pts.length - 1];
      e.endModule = L.modules.findIndex((m) => Math.hypot(m.x - last.x, m.y - last.y) < 1);
      return e;
    });

    // ---- polvere in profondità e nodi di contorno ----
    const dustN = lite ? 16 : 40;
    const total = dustN + L.decor.length;
    const dPos = new Float32Array(total * 3);
    const dSize = new Float32Array(total);
    const dAlpha = new Float32Array(total);
    const dTone = new Float32Array(total);
    const dBase = new Float32Array(total);
    const tb = { l: r.copy.l - 16, r: r.copy.r + 16, t: r.copy.t - 16, b: r.copy.b + 16 };
    for (let i = 0; i < dustN; i++) {
      let x = 0;
      let y = 0;
      for (let tries = 0; tries < 30; tries++) {
        x = rnd() * W;
        y = rnd() * H;
        if (!(x > tb.l && x < tb.r && y > tb.t && y < tb.b)) break;
      }
      const z = lerp(-420, 140, rnd());
      const kd = (D - z) / D;
      dPos.set([(x - W / 2) * kd, (H / 2 - y) * kd, z], i * 3);
      dSize[i] = lerp(1.8, 4.2, rnd());
      dBase[i] = lerp(0.16, 0.5, rnd()) * (z < -100 ? 0.7 : 1);
      dTone[i] = rnd() < 0.4 ? 0.8 : 0.1;
    }
    L.decor.forEach((d, k) => {
      const i = dustN + k;
      const w = toW(d);
      dPos.set([w.x, w.y, w.z], i * 3);
      dSize[i] = d.r * 3.4;
      dBase[i] = 0.7;
      dTone[i] = 0.5;
    });
    const dGeo = new BufferGeometry();
    dGeo.setAttribute("position", new BufferAttribute(dPos, 3));
    dGeo.setAttribute("aSize", new BufferAttribute(dSize, 1));
    const aAlphaAttr = new BufferAttribute(dAlpha, 1);
    aAlphaAttr.setUsage(DynamicDrawUsage);
    dGeo.setAttribute("aAlpha", aAlphaAttr);
    dGeo.setAttribute("aTone", new BufferAttribute(dTone, 1));
    const dMat = glowMaterial({ vertexShader: SH.pointsVert, fragmentShader: SH.pointsFrag, uniforms: { uPR: U.uPR, uD: U.uD, uTime: U.uTime } });
    const dust = new Points(dGeo, dMat);
    dust.renderOrder = 3;
    dust.frustumCulled = false;
    root.add(dust);
    geos.push(dGeo);
    mats.push(dMat);

    // ---- teste dei pacchetti ----
    const allEdges = edges.concat(decorEdges);
    const hN = allEdges.length * 2;
    const hPos = new Float32Array(hN * 3);
    const hSize = new Float32Array(hN).fill(mobile ? 13 : 15);
    const hAlpha = new Float32Array(hN);
    const hTone = new Float32Array(hN).fill(0.6);
    const hGeo = new BufferGeometry();
    const hp = new BufferAttribute(hPos, 3);
    hp.setUsage(DynamicDrawUsage);
    hGeo.setAttribute("position", hp);
    hGeo.setAttribute("aSize", new BufferAttribute(hSize, 1));
    const hAlphaAttr = new BufferAttribute(hAlpha, 1);
    hAlphaAttr.setUsage(DynamicDrawUsage);
    hGeo.setAttribute("aAlpha", hAlphaAttr);
    const hToneAttr = new BufferAttribute(hTone, 1);
    hToneAttr.setUsage(DynamicDrawUsage);
    hGeo.setAttribute("aTone", hToneAttr);
    const hMat = glowMaterial({ vertexShader: SH.pointsVert, fragmentShader: SH.pointsFrag, uniforms: { uPR: U.uPR, uD: U.uD, uTime: U.uTime } });
    const heads = new Points(hGeo, hMat);
    heads.renderOrder = 40;
    heads.frustumCulled = false;
    root.add(heads);
    geos.push(hGeo);
    mats.push(hMat);

    // ---- moduli: pannello di vetro + icona + alone con anello ----
    const order = L.modules.map((m, i) => ({ i, z: m.z })).sort((a, b) => a.z - b.z);
    const rankOf = [];
    order.forEach((o, rk) => (rankOf[o.i] = rk));
    const modules = L.modules.map((m, i) => {
      const group = new Group();
      const plateU = {
        uHalf: { value: new Vector2(0.5, 0.5) },
        uRad: { value: 0.2 },
        uAct: { value: 0 },
        uOpacity: { value: 0 },
        uGold: { value: 0 },
        uTime: U.uTime,
      };
      const plateMat = new ShaderMaterial({ vertexShader: SH.plateVert, fragmentShader: SH.plateFrag, uniforms: plateU, transparent: true, depthTest: false, depthWrite: false, side: DoubleSide });
      const plate = new Mesh(plateGeo, plateMat);
      plate.renderOrder = 10 + rankOf[i] * 3 + 1;
      const iconMat = new ShaderMaterial({
        vertexShader: SH.planeVert,
        fragmentShader: SH.iconFrag,
        uniforms: { uMap: { value: textures[preset.modules[i]] }, uAct: plateU.uAct, uOpacity: plateU.uOpacity, uGold: plateU.uGold },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const icon = new Mesh(iconGeo, iconMat);
      icon.position.z = 0.08;
      icon.renderOrder = 10 + rankOf[i] * 3 + 2;
      const haloU = { uAct: plateU.uAct, uRing: { value: 0 }, uRingA: { value: 0 }, uGold: plateU.uGold, uOpacity: plateU.uOpacity, uBreath: { value: 0 } };
      const haloMat = glowMaterial({ vertexShader: SH.planeVert, fragmentShader: SH.haloFrag, uniforms: haloU });
      const halo = new Mesh(haloGeo, haloMat);
      halo.position.z = -0.2;
      halo.renderOrder = 10 + rankOf[i] * 3;
      group.add(halo, plate, icon);
      group.scale.setScalar(0.0001);
      root.add(group);
      mats.push(plateMat, iconMat, haloMat);
      const w = toW(m);
      const ang = rnd() * Math.PI * 2;
      const mag = lerp(90, 170, rnd());
      return {
        group,
        plateU,
        haloU,
        base: w,
        scat: new Vector3(Math.cos(ang) * mag, Math.sin(ang) * mag * 0.7, 0),
        phase: rnd() * Math.PI * 2,
        delay: 0.05 + i * 0.1 + rnd() * 0.06,
        lit: 0,
        gold: 0,
        ringT: 1,
        ringStrength: 0,
      };
    });

    content = { root, geos, mats, modules, edges, decorEdges, allEdges, dust: { aAlphaAttr, dAlpha, dBase, dustN, total }, heads: { hp, hPos, hAlphaAttr, hAlpha, hToneAttr, hTone }, size: L.size, n };
    chain.fired = new Array(n).fill(false);
    chain.h0 = new Float32Array(Math.max(1, n - 1));
    chain.cycle = -1;
    if (rebuilt) introBase = -99;
    rebuilt = true;
  }

  // ---------- catena: una chiamata, l'appuntamento, la fattura, la scheda cliente ----------
  const chain = { seg: 0.72, gap: 0.1, t0: 1.45, fired: [], cycle: -1, h0: new Float32Array(1) };

  function fire(k, strong) {
    const m = content.modules[k];
    m.lit = Math.max(m.lit, strong ? 1.4 : 1);
    m.ringT = 0;
    m.ringStrength = strong ? 1.1 : 0.85;
    if (strong) m.gold = 1;
  }

  const tmpV = new Vector3();
  function update(dt) {
    const C = content;
    if (!C) return;
    U.uTime.value = t;
    const n = C.n;
    const ti = t - introBase;

    // mouse (con il mouse vero) o ondeggiamento lento (tocco)
    if (!canHover) {
      tmx = Math.sin(t * 0.33) * 0.5;
      tmy = Math.cos(t * 0.27) * 0.32;
    }
    mx += (tmx - mx) * Math.min(1, dt * 4);
    my += (tmy - my) * Math.min(1, dt * 4);
    camera.position.x = mx * 34;
    camera.position.y = -my * 20;
    camera.lookAt(0, 0, 0);

    // ---- catena ----
    const tc = t - chain.t0;
    const period = (n - 1) * (chain.seg + chain.gap) + 2.9;
    const heads0 = chain.h0;
    heads0.fill(-1);
    if (tc >= 0) {
      const cyc = Math.floor(tc / period);
      const tau = tc - cyc * period;
      if (cyc !== chain.cycle) {
        chain.cycle = cyc;
        chain.fired.fill(false);
      }
      if (!chain.fired[0]) {
        chain.fired[0] = true;
        fire(0, false);
      }
      for (let i = 0; i < n - 1; i++) {
        const u = (tau - i * (chain.seg + chain.gap)) / chain.seg;
        if (u >= 0 && u <= 1) {
          heads0[i] = easeInOut(u);
          C.edges[i].en = Math.max(C.edges[i].en, 0.9);
        } else if (u > 1 && !chain.fired[i + 1]) {
          chain.fired[i + 1] = true;
          fire(i + 1, i + 1 === n - 1);
        }
      }
    }

    // ---- moduli ----
    C.modules.forEach((m, i) => {
      const p = easeOutCubic(clamp((ti - m.delay) / 0.95));
      const g = m.group;
      const wob = Math.sin(t * 0.8 + m.phase);
      const k = 1 - p;
      g.position.set(
        m.base.x + k * m.scat.x + sp * m.scat.x * 0.85,
        m.base.y + k * m.scat.y + sp * m.scat.y * 0.85 + wob * 3,
        m.base.z - k * 280 + sp * 150
      );
      const sc = C.size * lerp(0.35, 1, easeOutBack(p)) * (1 - sp * 0.2);
      g.scale.setScalar(Math.max(0.0001, sc));
      g.rotation.y = mx * 0.4 + Math.sin(t * 0.7 + m.phase) * 0.08 + k * 1.1 * Math.sign(m.scat.x) + sp * 0.5 * Math.sign(m.scat.x);
      g.rotation.x = -my * 0.3 + Math.cos(t * 0.6 + m.phase) * 0.06 - k * 0.5 + sp * 0.3;
      m.lit = Math.max(0, m.lit - dt * 1.4);
      m.gold = Math.max(0, m.gold - dt * 0.9);
      if (m.ringT < 1) m.ringT = Math.min(1, m.ringT + dt / 0.95);
      const depth = m.base.z < 0 ? clamp(1 + m.base.z / 560, 0.55, 1) : 1;
      const op = clamp(p * (1 - sp * 0.92) * depth);
      m.plateU.uOpacity.value = op;
      m.plateU.uAct.value = clamp(m.lit);
      m.plateU.uGold.value = clamp(m.gold);
      m.haloU.uRing.value = easeOutCubic(m.ringT) * 0.95 + 0.05;
      m.haloU.uRingA.value = m.ringT < 1 ? (1 - m.ringT) * m.ringStrength : 0;
      m.haloU.uBreath.value = wob;
    });
    // ---- collegamenti e teste ----
    const H = C.heads;
    let hi = 0;
    const edgeFade = clamp(1 - sp * 2.4);
    C.allEdges.forEach((e, idx) => {
      const isChain = e.chain;
      e.u.uDraw.value = clamp((ti - e.delay) / 0.9);
      e.u.uA.value = edgeFade;
      e.en = Math.max(0, e.en - dt * 1.5);
      e.u.uEn.value = e.en;
      const lastGold = isChain && idx === n - 2 && heads0[idx] >= 0 ? 1 : 0;
      e.u.uGold.value = lastGold;
      const h0 = isChain ? heads0[idx] : -1;
      e.u.uH0.value = h0;
      // pacchetto di sottofondo: parte, corre, aspetta
      const a = e.amb;
      if (ti > e.delay + 0.9 && sp < 0.5) {
        if (a.u < 0) {
          a.wait -= dt;
          if (a.wait <= 0) a.u = 0;
        } else {
          a.u += a.v * dt;
          if (a.u > 1) {
            a.u = -1;
            a.wait = 0.8 + ((idx * 0.37 + t) % 2.2);
            if (e.endModule >= 0) C.modules[e.endModule].lit = Math.max(C.modules[e.endModule].lit, 0.5);
          }
        }
      }
      const h1 = a.u >= 0 && a.u <= 1 ? a.u : -1;
      e.u.uH1.value = h1;
      // teste: indice 2*idx (catena) e 2*idx+1 (sottofondo)
      const put = (slot, h, alpha, tone) => {
        const j = slot * 3;
        if (h < 0) {
          H.hAlpha[slot] = 0;
          return;
        }
        e.curve.getPointAt(clamp(h), tmpV);
        H.hPos[j] = tmpV.x;
        H.hPos[j + 1] = tmpV.y;
        H.hPos[j + 2] = tmpV.z;
        H.hAlpha[slot] = alpha * edgeFade;
        H.hTone[slot] = tone;
      };
      put(hi++, h0, 1, lastGold ? 1.9 : 0.75);
      put(hi++, h1, 0.62, 0.45);
    });
    H.hp.needsUpdate = true;
    H.hAlphaAttr.needsUpdate = true;
    H.hToneAttr.needsUpdate = true;

    // ---- polvere e nodi: respirano ----
    const Dd = C.dust;
    const ramp = clamp((ti - 0.4) / 1.2);
    for (let i = 0; i < Dd.total; i++) {
      const breathe = 0.82 + 0.18 * Math.sin(t * 1.1 + i * 1.7);
      Dd.dAlpha[i] = Dd.dBase[i] * breathe * ramp * (1 - sp * 0.9);
    }
    Dd.aAlphaAttr.needsUpdate = true;
  }

  // ---------- ciclo di disegno ----------
  let raf = 0;
  let running = false;
  let inView = true;
  let pageVisible = typeof document === "undefined" ? true : !document.hidden;
  let last = 0;
  // Giudizio sulla fluidità (tempo vero fra i fotogrammi, non quello limitato): primo passo la densità di pixel scende a 1x,
  // se ancora non regge (sotto circa 16 fps) la scena si toglie. I primi istanti (compilazione, entrata) non contano.
  let slowCb = onSlow;
  const perf = { t: 0, n: 0, lowered: pr <= 1.01, bad: 0 };
  function judge(rawDt) {
    // i primi 2,5 s non contano: compilazione degli shader, texture, entrata (su software costano parecchio)
    if (t < 2.5 || window.__V2_SCENE_FORCE) return; // __V2_SCENE_FORCE: solo per le prove su macchine cariche
    perf.t += rawDt;
    perf.n++;
    if (perf.t < 1.6) return;
    const avg = perf.t / perf.n;
    perf.t = 0;
    perf.n = 0;
    if (avg > 0.045 && !perf.lowered) {
      perf.lowered = true;
      renderer.setPixelRatio(1);
      U.uPR.value = 1;
      build();
      return;
    }
    // si toglie solo dopo due finestre di fila sotto circa 15 fps
    perf.bad = avg > 0.065 ? perf.bad + 1 : 0;
    if (perf.bad >= 2 && perf.lowered && slowCb) {
      const cb = slowCb;
      slowCb = null;
      cb();
    }
  }

  const tick = (now) => {
    raf = 0;
    if (!running || disposed) return;
    const rawDt = Math.max(0.001, (now - last) / 1000);
    const dt = Math.min(0.05, rawDt);
    last = now;
    t += dt;
    update(dt);
    renderer.render(scene, camera);
    if (rawDt < 0.5) judge(rawDt); // un fotogramma di mezzo secondo è una pausa (scheda in secondo piano), non lentezza
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    const should = inView && pageVisible && !disposed;
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!should && running) {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  build();

  // un solo fotogramma (reduced motion): si simula fino a un istante significativo, si disegna, si salva, si libera tutto
  if (still) {
    introBase = -99;
    let dataUrl = "";
    try {
      // fino a metà del secondo tratto: due moduli accesi, un pacchetto in corsa
      while (t < chain.t0 + (chain.seg + chain.gap) + 0.45) {
        t += 1 / 30;
        update(1 / 30);
      }
      renderer.render(scene, camera);
      dataUrl = canvas.toDataURL("image/png");
    } catch (e) {
      dataUrl = "";
    }
    const dispose0 = () => {
      disposed = true;
      disposeContent();
      plateGeo.dispose();
      iconGeo.dispose();
      haloGeo.dispose();
      Object.values(textures).forEach((tx) => tx.dispose());
      canvas.removeEventListener("webglcontextlost", onContextLost);
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch (e) {
        /* niente */
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
    dispose0();
    return { dispose() {}, still: dataUrl };
  }

  // ---------- ascolto: puntatore, scroll, dimensioni, visibilità ----------
  const onMove = (e) => {
    const b = container.getBoundingClientRect();
    if (e.clientY < b.top - 160 || e.clientY > b.bottom + 160) {
      tmx = 0;
      tmy = 0;
      return;
    }
    tmx = clamp(((e.clientX - b.left) / b.width) * 2 - 1, -1, 1);
    tmy = clamp(((e.clientY - b.top) / b.height) * 2 - 1, -1, 1);
  };
  if (canHover) window.addEventListener("pointermove", onMove, { passive: true });
  const onScroll = () => {
    const h = container.offsetHeight || 1;
    sp = clamp(window.scrollY / (h * 0.95));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const onVis = () => {
    pageVisible = !document.hidden;
    sync();
  };
  document.addEventListener("visibilitychange", onVis);
  let io = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0 }
    );
    io.observe(container);
  }
  let rzTimer = 0;
  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      clearTimeout(rzTimer);
      rzTimer = setTimeout(() => {
        if (!disposed) {
          build();
          onScroll();
        }
      }, 120);
    });
    ro.observe(container);
  }
  sync();

  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(rzTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      disposeContent();
      plateGeo.dispose();
      iconGeo.dispose();
      haloGeo.dispose();
      Object.values(textures).forEach((tx) => tx.dispose());
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch (e) {
        /* niente */
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    },
  };
}
