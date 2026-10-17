// Disposizione dei moduli di una hero interna, in pixel CSS rispetto al contenitore della scena. Niente three qui.
// Regola: nessun modulo, nodo o collegamento tocca il testo. Il testo è la scatola `copy` (unione dei blocchi veri: pillola,
// titolo, sottotitolo, bottoni) più un margine; sotto il testo c'è `stage`, la fascia riservata alla scena.
//
//   mode "flank": schermo largo, i moduli stanno nelle due fasce laterali e la catena passa sotto il testo, nella stage
//   mode "band":  telefono e schermi stretti, i moduli stanno tutti nella stage, in fila sotto il testo

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
export const TEXT_PAD = 28; // distanza minima fra il testo e qualsiasi elemento della scena (>= 24 px)

export function computeLayout({ style = "u", n, flip = false, W, H, copy, stage, mobile, z = [], seed = 1 }) {
  const rnd = mulberry32(seed);
  const pad = TEXT_PAD;
  // i moduli stanno più lontani dei nodi: la prospettiva li ingrandisce e il bordo di vetro ha spessore
  const mpad = pad + 12;
  const wl = copy.l - mpad - 12;
  const wr = W - copy.r - mpad - 12;
  const flank = !mobile && wl >= 128 && wr >= 128;
  const stageH = Math.max(0, stage.b - stage.t);
  const stageY = stageH > 20 ? (stage.t + stage.b) / 2 : copy.b + 56;
  // nella fila del telefono la profondità è più contenuta: la prospettiva non deve spingere i moduli fuori dallo schermo
  const zs = (i) => (z[i % Math.max(1, z.length)] || 0) * (flank ? 1.6 : 0.6);
  const mods = [];
  let size;

  if (flank) {
    size = clamp(Math.min(wl, wr) * 0.36, 58, 84);
    // margine al bordo: la prospettiva e la parallasse ingrandiscono e spostano di qualche decina di pixel
    const edge = 26 + size * 0.2;
    const xl0 = edge + size / 2;
    const xl1 = copy.l - mpad - size / 2;
    const xr0 = copy.r + mpad + size / 2;
    const xr1 = W - edge - size / 2;
    const top = Math.max(120, copy.t + 6) + size / 2;
    const bot = Math.max(top + size, copy.b - size / 2);
    const onL = (fx) => lerp(xl0, xl1, fx);
    const onR = (fx) => lerp(xr1, xr0, fx); // fx = 0 al bordo, 1 verso il testo
    if (style === "v" && n >= 3) {
      // primo e ultimo ai lati, quelli in mezzo in basso, nella stage
      mods.push({ x: onL(0.55), y: lerp(top, bot, 0.35) });
      const mid = n - 2;
      for (let k = 0; k < mid; k++) {
        const t = mid === 1 ? 0.5 : k / (mid - 1);
        mods.push({ x: lerp(W * 0.38, W * 0.62, t), y: stageY + (k % 2 ? -1 : 1) * 4 });
      }
      mods.push({ x: onR(0.55), y: lerp(top, bot, 0.35) });
    } else if (style === "arc") {
      // un sorriso: gli estremi in alto ai lati, il centro in basso nella stage
      for (let k = 0; k < n; k++) {
        const t = n === 1 ? 0.5 : k / (n - 1);
        const bowl = 1 - Math.pow(2 * t - 1, 2);
        const x = t < 0.5 ? onL(lerp(0.15, 0.8, t * 2)) : onR(lerp(0.8, 0.15, (t - 0.5) * 2));
        const edge = k === 0 || k === n - 1;
        const xx = edge ? x : lerp(x, W / 2, 0.55);
        mods.push({ x: xx, y: edge ? lerp(top, bot, 0.22) : lerp(lerp(top, bot, 0.5), stageY, bowl * 0.95) });
      }
    } else {
      // "u": colonna a sinistra che scende, attraversamento sotto il testo, colonna a destra che risale
      const nL = Math.ceil(n / 2);
      const nR = n - nL;
      const fxs = [0.34, 0.72, 0.4, 0.68, 0.45];
      for (let i = 0; i < nL; i++) {
        const fy = nL === 1 ? 0.5 : i / (nL - 1);
        mods.push({ x: onL(fxs[i % 5]), y: lerp(top, bot, fy) });
      }
      for (let j = 0; j < nR; j++) {
        const fy = nR === 1 ? 0.5 : 1 - j / (nR - 1);
        mods.push({ x: onR(fxs[(j + 2) % 5]), y: lerp(top, bot, fy) });
      }
    }
  } else {
    // band: tutti nella stage, in fila
    const hStage = stageH > 20 ? stageH : 120;
    size = clamp(Math.min(hStage * 0.5, (W - 40) / (n * 1.5)), 38, 62);
    const x0 = 24 + size * 0.7;
    const x1 = W - 24 - size * 0.7;
    const amp = size * 0.3;
    for (let k = 0; k < n; k++) {
      const t = n === 1 ? 0.5 : k / (n - 1);
      let dy = 0;
      if (style === "arc") dy = (1 - Math.pow(2 * t - 1, 2)) * amp - amp * 0.4;
      else if (style === "v") dy = -(1 - Math.pow(2 * t - 1, 2)) * amp + amp * 0.2;
      else dy = (k % 2 ? 1 : -1) * amp * 0.55;
      mods.push({ x: lerp(x0, x1, t), y: stageY + dy });
    }
  }

  if (flip) mods.forEach((m) => (m.x = W - m.x));
  mods.forEach((m, i) => (m.z = zs(i)));

  // sicurezza: nessun modulo dentro la scatola del testo (più margine e mezzo modulo)
  const box = { l: copy.l - mpad - size / 2, r: copy.r + mpad + size / 2, t: copy.t - mpad - size / 2, b: copy.b + mpad + size / 2 };
  mods.forEach((m) => {
    if (m.x > box.l && m.x < box.r && m.y > box.t && m.y < box.b) {
      if (m.y < (box.t + box.b) / 2) m.y = box.t;
      else m.y = Math.min(H - size / 2 - 6, box.b);
    }
  });

  // collegamenti della catena: curve che passano da punti di controllo, anche in profondità
  const edges = [];
  for (let i = 0; i < n - 1; i++) {
    const a = mods[i];
    const b = mods[i + 1];
    const pts = [{ ...a }];
    const sameCol = flank && Math.abs(a.x - b.x) < W * 0.34 && a.y !== b.y;
    if (flank && !sameCol && style !== "arc") {
      // attraversamento: scende sotto il testo, passa nella stage, risale
      pts.push({ x: a.x + (b.x - a.x) * 0.05, y: stageY, z: a.z * 0.5 - 20 });
      pts.push({ x: lerp(a.x, b.x, 0.5), y: stageY + 8, z: -50 });
      pts.push({ x: lerp(a.x, b.x, 0.95), y: stageY, z: b.z * 0.5 - 20 });
    } else {
      const sx = a.x === b.x ? 1 : Math.sign(b.x - a.x);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      // piega a S: spinge il punto di mezzo di lato, lontano dal testo (verso il bordo vicino)
      const side = flank ? (mx < W / 2 ? -1 : 1) : i % 2 ? -1 : 1;
      const push = flank ? size * 0.55 : size * 0.4;
      pts.push({ x: mx + (flank ? side * push : 0), y: my + (flank ? 0 : side * push * 0.8), z: (a.z + b.z) / 2 + 36 * sx });
    }
    pts.push({ ...b });
    edges.push(pts);
  }

  // un collegamento che attraversa il testo si fa deviare: scende nella stage e passa sotto
  const tb = { l: copy.l - pad, r: copy.r + pad, t: copy.t - pad, b: copy.b + pad };
  const hits = (pts) => {
    for (let i = 0; i < pts.length - 1; i++) {
      for (let k = 0; k <= 24; k++) {
        const x = lerp(pts[i].x, pts[i + 1].x, k / 24);
        const y = lerp(pts[i].y, pts[i + 1].y, k / 24);
        if (x > tb.l && x < tb.r && y > tb.t && y < tb.b) return true;
      }
    }
    return false;
  };
  edges.forEach((pts, i) => {
    if (!hits(pts)) return;
    const a = pts[0];
    const b = pts[pts.length - 1];
    edges[i] = [
      a,
      { x: lerp(a.x, b.x, 0.1), y: stageY - 2, z: a.z * 0.5 },
      { x: lerp(a.x, b.x, 0.5), y: stageY + 6, z: -40 },
      { x: lerp(a.x, b.x, 0.9), y: stageY - 2, z: b.z * 0.5 },
      b,
    ];
  });

  // nodi di contorno: punti piccoli che «fanno rete», sempre fuori dal testo e lontani dai moduli
  const decor = [];
  const decorEdges = [];
  const want = flank ? 9 : 5;
  let guard = 0;
  while (decor.length < want && guard++ < 400) {
    const x = lerp(14, W - 14, rnd());
    const y = flank ? lerp(96, Math.max(160, stage.b - 8), rnd()) : lerp(stage.t - 8, Math.min(H - 10, stage.b + 4), rnd());
    if (x > copy.l - pad && x < copy.r + pad && y > copy.t - pad && y < copy.b + pad) continue;
    if (mods.some((m) => Math.hypot(m.x - x, m.y - y) < size * 0.95)) continue;
    if (decor.some((d) => Math.hypot(d.x - x, d.y - y) < 46)) continue;
    decor.push({ x, y, z: lerp(-170, 90, rnd()), r: lerp(2.6, 5.2, rnd()) });
  }
  decor.forEach((d, k) => {
    // al modulo più vicino
    let best = null;
    let bd = 1e9;
    mods.forEach((m) => {
      const dd = Math.hypot(m.x - d.x, m.y - d.y);
      if (dd < bd) {
        bd = dd;
        best = m;
      }
    });
    if (best && bd < Math.max(W * 0.34, 190)) {
      const pts = [
        { x: d.x, y: d.y, z: d.z },
        { x: (d.x + best.x) / 2, y: (d.y + best.y) / 2 + (k % 2 ? 14 : -14), z: (d.z + best.z) / 2 },
        { x: best.x, y: best.y, z: best.z },
      ];
      if (!hits(pts)) decorEdges.push(pts);
    }
  });

  return { mode: flank ? "flank" : "band", size, modules: mods, edges, decor, decorEdges };
}
