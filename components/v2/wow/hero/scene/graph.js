// Rete della hero: moduli, collegamenti, catene e posizioni. Niente three qui: solo dati.
// Le posizioni nascono in PIXEL del contenitore (misurati dal testo vero della hero) e il motore le porta nello spazio 3D.

// Gli otto moduli dei sistemi Automis (brief §13: calendario, chiamate, fatture, social media, chat, scheda cliente, annunci)
// più «persone» per le Risorse umane, così ognuna delle cinque categorie ha un modulo suo.
export const MODULE_IDS = ["call", "calendar", "invoice", "crm", "social", "chat", "ads", "team"];
export const M = MODULE_IDS.length;
export const IDX = Object.fromEntries(MODULE_IDS.map((id, i) => [id, i]));

// Le cinque categorie del sito, nello stesso ordine dei box della home.
// Marketing · Vendita · Assistenza · Amministrazione · Risorse umane. Le chiavi sono quelle del kit (components/v2/ui/icons.js).
export const CATEGORY_IDS = ["marketing", "sales", "support", "admin", "company-brain"];
export const D = CATEGORY_IDS.length;
export const CATEGORY_OF = { ads: 0, social: 0, crm: 1, call: 2, chat: 2, calendar: 2, invoice: 3, team: 4 };

// I collegamenti persistenti fra i moduli: il «sistema».
export const SPINE = [
  ["ads", "call"],
  ["call", "chat"],
  ["call", "calendar"],
  ["chat", "calendar"],
  ["calendar", "invoice"],
  ["invoice", "team"],
  ["invoice", "crm"],
  ["team", "crm"],
  ["crm", "social"],
];

// Le catene che scattano da sole. La principale è quella del brief: una chiamata, l'appuntamento, la fattura, la scheda cliente.
export const CHAINS = {
  main: ["call", "calendar", "invoice", "crm"],
  left: ["ads", "call", "chat"],
  right: ["social", "crm", "team"],
};

// Etichette brevi (nomi dei moduli e delle categorie: mai stati, mai numeri).
export const LABELS = {
  it: {
    chain: ["Chiamata", "Appuntamento", "Fattura", "Scheda cliente"],
    dock: ["Marketing", "Vendita", "Assistenza", "Amministrazione", "Risorse umane"],
  },
  en: {
    chain: ["Call", "Booking", "Invoice", "Customer record"],
    dock: ["Marketing", "Sales", "Customer Service", "Admin", "HR"],
  },
  pt: {
    chain: ["Chamada", "Marcação", "Fatura", "Ficha de cliente"],
    dock: ["Marketing", "Vendas", "Apoio ao Cliente", "Administração", "Recursos Humanos"],
  },
};

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

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/*
  Dove stanno i moduli e i cinque «dock» in cui si fondono quando si scorre.
  - rect: il testo vero della hero (titolo, sottotitolo, bottoni) in pixel del contenitore: i moduli non ci entrano mai.
  - desktop: tre piani. In primo piano un modulo grande e sfocato che esce dal bordo, sul piano di mezzo la catena
    (chiamata, appuntamento, fattura, scheda cliente) a fuoco, sul fondo moduli piccoli e velati, uno al centro in basso.
  - desktop basso (poco spazio sotto i bottoni): quattro moduli per lato, nessuna fila sotto il testo (appuntamento e fattura in fondo alle colonne,
    il filo che li unisce passa sotto i bottoni); la catena si legge nella riga di sotto.
  - compatto (telefono e tablet stretti): due file da quattro nella fascia sotto i bottoni, la catena è la fila di sopra.
    Se la fascia è troppo bassa le tessere non si disegnano: resta solo la riga della catena.
  Ogni modulo: { x, y (px), z, size (px apparenti), label: "above" | "below" | "left" | "right", hidden, blur (0..1), dim (0..1) }
*/
export function layoutModules({ W, H, rect, parts, vh }) {
  const r = rect || { l: W * 0.2, r: W * 0.8, t: H * 0.18, b: H * 0.68 };
  const compact = W < 900 || r.l < 120;
  // il corridoio fra il sottotitolo e i bottoni: ci passa il filo che porta il pacchetto sul bottone
  let corridorY = 0;
  if (parts && parts.actions) {
    const top = parts.actions.t;
    const sb = parts.sub ? parts.sub.b : top - 40;
    corridorY = top - sb >= 22 ? (sb + top) / 2 : top - 11;
  }
  const mods = {};
  const docks = [];
  const put = (id, x, y, z, size, label = "below", hidden = false, blur = 0, dim = 1) => {
    mods[id] = { x, y, z, size, label, hidden, blur, dim };
  };

  if (compact) {
    const margin = 14;
    const avail = W - margin * 2;
    const gap = clamp(Math.round(W * 0.04), 14, 26);
    const rowGap = 30;
    const S1 = clamp(Math.floor((avail - gap * 3) / 4), 40, 112);
    // la riga della catena sta sotto i bottoni: una riga sola da ~420 px in su, due righe sui telefoni stretti
    const capH = W >= 420 ? 30 : 52;
    const top = r.b + 12 + capH + 16;
    const bot = H - 14;
    // due file se ci stanno da 56 px in su; una sola se la fascia è bassa; sotto i 52 px niente tessere (resta la riga della catena)
    let rows = 2;
    let S = Math.min(S1, (bot - top - rowGap) / 2);
    if (S < 56) {
      rows = 1;
      S = Math.min(S1, 96, bot - top);
    }
    const noTiles = rows === 1 && S < 52;
    const colX = (i) => margin + S / 2 + i * ((avail - S) / 3);
    const y1 = top + S / 2 + (rows === 2 ? 0 : Math.max(0, (bot - top - S) / 2));
    const y2 = y1 + S + rowGap;
    const dy1 = [0, -4, 3, -2];
    const dy2 = [2, -2, 4, -1];
    const hid1 = noTiles;
    const hid2 = noTiles || rows === 1;
    if (noTiles) {
      putCluster({ W, H, r, parts, vh, put });
    } else {
      put("call", colX(0), y1 + dy1[0], 0.8, S, "above", hid1);
      put("calendar", colX(1), y1 + dy1[1], 1.1, S, "above", hid1);
      put("invoice", colX(2), y1 + dy1[2], 0.9, S, "above", hid1);
      put("crm", colX(3), y1 + dy1[3], 0.6, S, "above", hid1);
      put("ads", colX(0), y2 + dy2[0], -0.8, S * 0.94, "below", hid2);
      put("chat", colX(1), y2 + dy2[1], -0.4, S * 0.94, "below", hid2);
      put("team", colX(2), y2 + dy2[2], -1.0, S * 0.94, "below", hid2);
      put("social", colX(3), y2 + dy2[3], -0.2, S * 0.94, "below", hid2);
    }
    // dock: tre in alto e due sotto, al centro dello schermo
    const dS = clamp(Math.min(92, (W - margin * 2 - 28) / 3), 64, 110);
    const labelH = 30;
    const blockH = dS * 2 + labelH * 2 + 20;
    const y0 = (H - blockH) / 2 + dS / 2 + 14;
    const sp = dS + 26;
    const rowsXY = [
      [W / 2 - sp, y0],
      [W / 2, y0],
      [W / 2 + sp, y0],
      [W / 2 - sp * 0.58, y0 + dS + labelH + 20],
      [W / 2 + sp * 0.58, y0 + dS + labelH + 20],
    ];
    rowsXY.forEach(([x, y]) => docks.push({ x, y, size: dS }));
    return { mods, docks, compact: true, caption: true, noTiles: false, cluster: noTiles, short: false, size: S, dockSize: dS, captionY: r.b + 12, corridorY };
  }

  const margin = 28;
  const freeL = r.l - margin;
  const base = clamp(W * 0.13, 104, 216);
  let S = Math.min(base, freeL - 26);
  // sotto i bottoni servono: l'etichetta della tessera (sopra), il respiro del parallasse (sotto)
  const roomB = H - r.b - 44 - 44;
  const short = roomB < 84;

  const dS = clamp(W * 0.125, 112, 190);
  const sp = dS * 1.36;
  const cx = W / 2;
  const pushDocks = () => {
    for (let i = 0; i < D; i++) docks.push({ x: cx + (i - 2) * sp, y: H * 0.5 - 6, size: dS });
  };

  if (short) {
    // quattro per lato: sinistra annunci, chiamata, chat, appuntamento · destra social, scheda cliente, persone, fattura
    S = clamp(Math.floor((H - 112 - 44 - 3 * 18) / 4), 52, Math.min(150, freeL - 26));
    const colL = Math.max(margin + S / 2, (r.l + margin) / 2);
    const colR = W - colL;
    const y0 = 112 + S / 2;
    const stepY = (H - 44 - S / 2 - y0) / 3;
    const yy = (k) => y0 + k * stepY;
    put("ads", colL, yy(0), -1.2, S * 0.94, "right");
    put("call", colL - 8, yy(1), 0.8, S, "right");
    put("chat", colL + 4, yy(2), -0.7, S * 0.94, "right");
    put("calendar", colL - 4, yy(3), 1.1, S, "right");
    put("social", colR, yy(0), -1.0, S * 0.94, "left");
    put("crm", colR + 8, yy(1), 0.6, S, "left");
    put("team", colR - 4, yy(2), -0.5, S * 0.94, "left");
    put("invoice", colR + 6, yy(3), 0.9, S, "left");
    pushDocks();
    return { mods, docks, compact: false, caption: true, noTiles: false, short: true, size: S, dockSize: dS, captionY: r.b + 14, corridorY };
  }

  S = Math.max(S, 96);
  const Sb = clamp(Math.min(S, roomB), 84, S);
  const colL = Math.max(margin + S / 2, (r.l + margin) / 2);
  const colR = W - colL;
  const yTop = Math.max(104 + S / 2, r.t + S * 0.36);
  const yBotRef = H - 44 - S / 2;
  const yMid = (yTop + yBotRef) / 2;
  const yB = H - 44 - Sb / 2;
  const dxB = clamp(W * 0.2, Sb * 0.9, 380);
  // fondo: moduli più piccoli, velati e un filo sfocati
  const sFar = S * 0.74;
  const sChat = S * 0.76;
  const sTeam = Sb * 0.62;
  // primo piano: grande, sfocato e velato (metà opacità), sta nell'angolo in alto a destra: esce dal bordo destro per il 42 %,
  // sta sopra l'anello della scheda cliente (mai a contatto) e non porta anelli suoi (li toglie il motore)
  const ringTop = yMid - 1.05 * S - 10;
  const Sn = Math.max(96, Math.min(S * 1.4, ringTop / 0.8));
  const cyN = Math.max(0.3 * Sn, ringTop - Sn / 2);
  put("ads", colL, yTop, -4.5, sFar, "right", false, 0.22, 0.8);
  put("call", colL - 10, yMid, 0.8, S, "right");
  put("chat", colL + 14, H - 44 - sChat / 2, -6.0, sChat, "right", false, 0.25, 0.74);
  put("calendar", cx - dxB, yB, 1.3, Sb, "above");
  put("team", cx + 6, H - 40 - sTeam / 2, -9.0, sTeam, "above", false, 0.34, 0.64);
  put("invoice", cx + dxB, yB, 1.1, Sb, "above");
  put("crm", colR + 10, yMid, 0.6, S, "left");
  put("social", W - 0.08 * Sn, cyN, 6.5, Sn, "left", false, 0.6, 0.5);
  pushDocks();
  return { mods, docks, compact: false, caption: false, noTiles: false, short: false, size: S, dockSize: dS, captionY: 0, corridorY };
}

/*
  Quando la fascia sotto i bottoni è troppo bassa per le tessere (360×640, 320×568, telefono in orizzontale) si disegna comunque un piccolo
  cluster: i quattro moduli della catena (chiamata → appuntamento → fattura → scheda cliente) ai lati del testo, uniti dai fili della dorsale.
  - ai lati del titolo, se c'è posto (telefono in orizzontale): tessere nitide fra il bordo e il titolo;
  - altrimenti ai bordi dello schermo (telefono in verticale): tessere grandi, sfocate e velate che escono dal quadro, dietro il testo.
  Disposizione a «cappello»: chiamata e scheda cliente in basso, appuntamento e fattura in alto, il filo che li unisce passa sopra il titolo.
*/
function putCluster({ W, H, r, parts, vh, put }) {
  const visH = Math.min(H, vh || H);
  const h1 = parts && parts.h1;
  const pill = parts && parts.pill;
  const fit = h1 ? h1.l - 14 : 0;
  const flank = fit >= 72;
  const yT = pill ? (pill.t + pill.b) / 2 : r.t + 16;
  let S2;
  let yB;
  let xL;
  let xR;
  if (flank) {
    S2 = Math.min(clamp(Math.min(W * 0.34, (visH - 150) * 0.5), 64, 132), h1.l - 34);
    yB = Math.min(yT + S2 * 1.1, visH - S2 / 2 - 14);
    if (yB - yT < S2 * 0.8) S2 = Math.max(56, (yB - yT) / 0.8);
    xL = h1.l / 2;
    xR = W - h1.l / 2;
  } else {
    // telefono in verticale: due tessere per lato, nella fascia delle prime righe del titolo (le righe sono centrate: ai lati restano ~55 px)
    S2 = clamp(W * 0.23, 66, 90);
    yB = yT + S2 * 1.3;
    xL = S2 * 0.5 - 20;
    xR = W - xL;
  }
  const z0 = flank ? 0 : -1.2;
  const blur = flank ? 0 : 0.12;
  const dim = flank ? 1 : 0.8;
  put("call", xL, yB, z0 + 0.8, S2, "right", false, blur, dim);
  put("calendar", xL, yT, z0 + 1.1, S2, "right", false, blur, dim);
  put("invoice", xR, yT, z0 + 0.9, S2, "left", false, blur, dim);
  put("crm", xR, yB, z0 + 0.6, S2, "left", false, blur, dim);
  put("ads", xL, yT, -1, S2 * 0.9, "below", true);
  put("chat", xL, yB, -1, S2 * 0.9, "below", true);
  put("team", xR, yT, -1, S2 * 0.9, "below", true);
  put("social", xR, yB, -1, S2 * 0.9, "below", true);
}

// Fili che fanno del bottone principale un nodo del sistema (solo desktop):
//  · andata: la scheda cliente → il bottone, per il corridoio sotto il sottotitolo, con un arco in primo piano;
//  · ritorno: il bottone → la chiamata, corto e veloce: è il «grilletto» che fa ripartire la catena.
export const WP_OUT = 11; // punti intermedi del filo di andata
export const WP_IN = 5; // punti intermedi del filo di ritorno

function cubicInto(out, p0, p1, p2, p3, k) {
  for (let i = 0; i <= k; i++) {
    const t = i / k;
    const u = 1 - t;
    out.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]);
  }
}

// from: {x, y, size} della scheda cliente; cta: {x, y, w, h} del bottone (centro); corridorY: y del corridoio sotto il sottotitolo.
// Restituisce n punti {x, y, z} in pixel (z: in primo piano a metà corsa, sul piano del bottone agli estremi).
export function routeOut(from, cta, corridorY, n = WP_OUT) {
  const yc = corridorY > 0 ? corridorY : cta.y - cta.h / 2 - 16;
  const xh = cta.x + cta.w * 0.2 + 30;
  // se la scheda cliente sta molto più in alto del corridoio, la discesa è più lunga e meno ripida
  const xr = Math.max(xh + 60, Math.min(from.x - Math.max(from.size * 0.62, Math.abs(yc - from.y) * 1.5), cta.x + cta.w / 2 + 300));
  const A = [from.x, from.y];
  const B = [xr, yc];
  const H = [xh, yc];
  const T = [cta.x + cta.w * 0.12, cta.y];
  const dx = A[0] - B[0];
  const poly = [];
  cubicInto(poly, A, [A[0] - dx * 0.35, A[1] + (yc - A[1]) * 0.25], [B[0] + dx * 0.3, yc], B, 28);
  for (let i = 1; i <= 12; i++) poly.push([B[0] + (H[0] - B[0]) * (i / 12), yc]);
  cubicInto(poly, H, [H[0] - 70, yc], [T[0], Math.max(yc, T[1] - 45)], T, 18);
  const cum = [0];
  for (let i = 1; i < poly.length; i++) cum.push(cum[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  const total = cum[cum.length - 1] || 1;
  const pts = [];
  let seg = 0;
  for (let k = 1; k <= n; k++) {
    const u = k / (n + 1);
    const d = u * total;
    while (seg < cum.length - 2 && cum[seg + 1] < d) seg++;
    const f = cum[seg + 1] > cum[seg] ? (d - cum[seg]) / (cum[seg + 1] - cum[seg]) : 0;
    pts.push({
      x: poly[seg][0] + (poly[seg + 1][0] - poly[seg][0]) * f,
      y: poly[seg][1] + (poly[seg + 1][1] - poly[seg][1]) * f,
      z: 0.5 + 0.2 * (1 - u) + 3.0 * Math.pow(Math.sin(Math.PI * u), 0.9),
    });
  }
  return pts;
}

// from: {x, y, size} della tessera «chiamata»; cta: {x, y, w, h}. Restituisce n punti {x, y, z} dal bottone verso la chiamata.
export function routeIn(from, cta, n = WP_IN) {
  const raw = ctaRoute(from, cta, n); // dalla chiamata al bottone
  return raw
    .map(([x, y], k) => ({ x, y, z: 0.5 + 0.3 * ((k + 1) / (n + 1)) }))
    .reverse();
}

// Il filo che porta il pacchetto dalla tessera «chiamata» al bottone principale: una curva morbida sotto il testo, in n punti (px).
// from: {x, y, size} della tessera; cta: {x, y, w, h} del bottone (centro in x, y).
export function ctaRoute(from, cta, n = 5) {
  const ax = from.x;
  const ay = from.y;
  const bx = cta.x;
  const by = cta.y;
  const dx = Math.max(80, bx - ax);
  const p1x = ax + dx * 0.3;
  const p1y = ay + (by - ay) * 0.15 - 24 - dx * 0.04;
  const p2x = bx - dx * 0.42;
  const p2y = by + 54 + dx * 0.035;
  const pts = [];
  for (let k = 1; k <= n; k++) {
    const t = k / (n + 1);
    const u = 1 - t;
    pts.push([
      u * u * u * ax + 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t * bx,
      u * u * u * ay + 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t * by,
    ]);
  }
  return pts;
}

/*
  Punti-nodo e bokeh della rete di fondo (tenue). Coordinate di schermo [-1,1] più profondità z.
  avoid: cerchi in coordinate di schermo (x, y, raggio in unità di altezza) dove non cadono punti (i moduli).
*/
export function buildDots({ aspect, mobile, text, avoid }) {
  const rnd = mulberry32(mobile ? 77123 : 20261011);
  const nodes = [];
  // pochi punti, sparsi: la rete di fondo è un'atmosfera, i collegamenti veri sono quelli dei moduli
  const cols = mobile ? 4 : 6;
  const rows = mobile ? 6 : 5;
  const x0 = mobile ? -1.18 : -1.14;
  const x1 = -x0;
  const y0 = -1.08;
  const y1 = 1.04;
  const cw = (x1 - x0) / (cols - 1);
  const ch = (y1 - y0) / (rows - 1);
  const td = (x, y) => Math.hypot((x - text.cx) / text.rx, (y - text.cy) / text.ry);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = x0 + c * cw + (rnd() - 0.5) * cw * 0.8;
      const y = y0 + r * ch + (rnd() - 0.5) * ch * 0.8;
      const z = -7 + rnd() * 10.2;
      const d = td(x, y);
      if (d < 0.7 && rnd() < 0.9) continue;
      if (d < 1.0 && rnd() < 0.45) continue;
      let tooClose = false;
      for (let m = 0; m < avoid.length; m++) {
        const a = avoid[m];
        if (Math.hypot((x - a.x) * aspect, y - a.y) < a.r) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;
      const near = (z + 7) / 10.2;
      const hub = rnd() < 0.14;
      nodes.push({
        kind: "dot",
        x,
        y,
        z,
        size: (0.24 + near * 0.2 + rnd() * 0.1) * (hub ? 1.6 : 1),
        tone: hub || rnd() < 0.35 ? 1 : 0,
        amp: 0.08 + rnd() * 0.16,
        phase: rnd(),
      });
    }
  }
  const linked = nodes.length;
  const bokehN = mobile ? 3 : 5;
  for (let i = 0; i < bokehN; i++) {
    nodes.push({
      kind: "bokeh",
      x: -1.1 + rnd() * 2.2,
      y: -0.9 + rnd() * 1.8,
      z: 6 + rnd() * 3.5,
      size: 1.5 + rnd() * 1.6,
      tone: rnd() < 0.5 ? 1 : 0,
      amp: 0.5 + rnd() * 0.5,
      phase: rnd(),
    });
  }
  return { nodes, linked };
}

// Collegamenti della rete di fondo: ogni punto ne ha al massimo 2, i più brevi prima. Pochi fili corti: la rete è un'atmosfera, si vede solo dove passa un pacchetto.
// world: posizioni (x,y,z) dei punti, a partire dall'indice 0 (solo i punti, senza moduli).
export function buildMeshEdges(world, count) {
  const cap = 2;
  const deg = new Uint8Array(count);
  const pairs = [];
  const dist = (i, j) => {
    const dx = world[i * 3] - world[j * 3];
    const dy = world[i * 3 + 1] - world[j * 3 + 1];
    const dz = (world[i * 3 + 2] - world[j * 3 + 2]) * 0.45;
    return Math.hypot(dx, dy, dz);
  };
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) pairs.push([dist(i, j), i, j]);
  }
  pairs.sort((a, b) => a[0] - b[0]);
  const edges = [];
  const add = (i, j) => {
    edges.push([i, j]);
    deg[i]++;
    deg[j]++;
  };
  const maxLen = 4.6;
  for (const [d, i, j] of pairs) {
    if (d > maxLen) break;
    if (deg[i] >= cap || deg[j] >= cap) continue;
    add(i, j);
  }
  return edges;
}
