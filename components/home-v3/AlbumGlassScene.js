"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./home-v3.css";

/*
  «Come lavora il sistema» (Album AI): scena in vetro liquido, stesso linguaggio della hero della home.
  Arrivano le foto di un evento, un fascio di luce le guarda (sfocate, doppie, occhi chiusi), restano le migliori, vanno nelle
  pagine dell'album, e il fotografo cambia una foto: il sistema impara. Illustrazione con riquadri di vetro, nessuna foto vera.
  - Canvas 2D, nessuna libreria. Ferma fuori schermo e a scheda nascosta. prefers-reduced-motion: un fotogramma fermo.
  - La posizione di ogni riquadro è calcolata dal tempo (nessuno stato): niente scatti al ritorno nel loop.
  - `steps`: le didascalie, una per fase (5). `label`: descrizione per chi usa lo screen reader.
*/
const W = 1000;
const H = 520;
const T = 21; // secondi del ciclo
const N = 70;
const KEEP = 13;
const PL = { x: 188, y: 108, w: 312, h: 300 }; // pagina sinistra
const PR = { x: 500, y: 108, w: 312, h: 300 }; // pagina destra (il dorso sta a x = 500)
const HINGE = 500;
const SPREAD_KINDS = [0, 1, 3, 4, 2, 5]; // impaginazioni delle pagine 2..7
const PHASES = [0, 2.4, 6.4, 7.8, 11.4, 14.6]; // inizio delle 6 didascalie

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out = (x) => 1 - Math.pow(1 - x, 3);
const seg = (t, a, b) => clamp((t - a) / (b - a));

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function build() {
  const r = rng(11);
  const tiles = [];
  for (let i = 0; i < N; i++) {
    const portrait = r() < 0.32;
    tiles.push({
      x: 70 + r() * 860,
      y: 60 + r() * 400,
      w: portrait ? 40 : 58,
      h: portrait ? 56 : 40,
      rot: (r() - 0.5) * 0.3,
      hue: 196 + r() * 26,
      ph: r() * 6.28,
      delay: r() * 1.6,
      keep: false,
      tag: null,
    });
  }
  // le tenute: spaziate lungo il fascio, così il fascio ne accende una ogni tanto
  const order = tiles.map((_, i) => i).sort((a, b) => tiles[a].x - tiles[b].x);
  for (let k = 0; k < KEEP; k++) tiles[order[Math.floor(((k + 0.5) / KEEP) * N)]].keep = true;
  const tags = ["sfocata", "doppia", "occhi chiusi"];
  let tg = 0;
  tiles.forEach((t, i) => {
    if (!t.keep && i % 5 === 0) t.tag = tags[tg++ % 3];
  });
  // celle dell'album: due pagine adiacenti (sei e sette foto), coordinate relative alla pagina (margine 16)
  const cl = [[0, 0, 134, 90], [144, 0, 136, 90], [0, 100, 62, 86], [72, 100, 208, 86], [0, 196, 134, 72], [144, 196, 136, 72]];
  const cr = [[0, 0, 92, 130], [102, 0, 178, 130], [0, 140, 178, 72], [188, 140, 92, 72], [0, 222, 86, 46], [96, 222, 86, 46], [192, 222, 88, 46]];
  const cells = [...cl.map((c) => [PL.x + 16 + c[0], PL.y + 16 + c[1], c[2], c[3]]), ...cr.map((c) => [PR.x + 16 + c[0], PR.y + 16 + c[1], c[2], c[3]])];
  const keepIds = tiles.map((t, i) => (t.keep ? i : -1)).filter((i) => i >= 0);
  keepIds.sort((a, b) => tiles[a].x - tiles[b].x);
  keepIds.forEach((id, k) => {
    tiles[id].cell = cells[k];
    tiles[id].order = k;
  });
  // le altre pagine dell'album (2..7): celle locali di sei impaginazioni diverse
  const kinds = [
    [[0, 0, 280, 170], [0, 180, 136, 88], [144, 180, 136, 88]],
    [[0, 0, 136, 130], [144, 0, 136, 130], [0, 138, 136, 130], [144, 138, 136, 130]],
    [[0, 0, 88, 268], [96, 0, 88, 268], [192, 0, 88, 268]],
    [[0, 0, 176, 268], [184, 0, 96, 130], [184, 138, 96, 130]],
    [[0, 0, 280, 128], [0, 136, 88, 132], [96, 136, 88, 132], [192, 136, 88, 132]],
    [[0, 0, 280, 268]],
  ];
  return { tiles, cells, kinds };
}

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function glass(ctx, x, y, w, h, rad, a, o = {}) {
  if (a <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = a;
  if (o.shadow) {
    ctx.shadowColor = "rgba(0,12,32,0.55)";
    ctx.shadowBlur = o.shadow;
    ctx.shadowOffsetY = o.shadow * 0.4;
  }
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, o.light || "rgba(196,226,255,0.30)");
  g.addColorStop(1, o.dark || "rgba(70,130,210,0.12)");
  rrect(ctx, x, y, w, h, rad);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = o.line || 1;
  ctx.strokeStyle = o.stroke || "rgba(220,240,255,0.42)";
  ctx.stroke();
  // riflesso sul bordo alto
  ctx.beginPath();
  ctx.moveTo(x + rad, y + 1.5);
  ctx.lineTo(x + w - rad, y + 1.5);
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

// Foto di esempio dentro il vetro (ritaglio «cover»); finché non è caricata, un gradiente.
function photo(ctx, S, i, x, y, w, h, rad, hh, dk) {
  const im = S.imgs && S.imgs[i % S.imgs.length];
  ctx.save();
  rrect(ctx, x, y, w, h, rad);
  if (im && im.complete && im.naturalWidth) {
    ctx.clip();
    const k = Math.max(w / im.naturalWidth, h / im.naturalHeight);
    const sw = w / k;
    const sh = h / k;
    ctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, "rgba(255,255,255,0.14)");
    g.addColorStop(0.5, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  } else {
    const pg = ctx.createLinearGradient(x, y, x + w, y + h);
    pg.addColorStop(0, hh + "0.6)");
    pg.addColorStop(1, dk + "0.6)");
    ctx.fillStyle = pg;
    ctx.fill();
  }
  ctx.restore();
}

function paper(ctx, x, y, w, h, side) {
  rrect(ctx, x, y, w, h, 4);
  const g = ctx.createLinearGradient(x, 0, x + w, 0);
  g.addColorStop(0, side === "L" ? "#e4e0d6" : "#ece8de");
  g.addColorStop(1, side === "L" ? "#ece8de" : "#e4e0d6");
  ctx.fillStyle = g;
  ctx.fill();
  // ombra del dorso
  const sg = ctx.createLinearGradient(side === "L" ? x + w : x, 0, side === "L" ? x + w - 46 : x + 46, 0);
  sg.addColorStop(0, "rgba(40,36,28,0.32)");
  sg.addColorStop(1, "rgba(40,36,28,0)");
  ctx.save();
  rrect(ctx, x, y, w, h, 4);
  ctx.clip();
  ctx.fillStyle = sg;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// Una pagina intera dell'album: carta + stampe. page 0/1 = la doppia appena impaginata (stesse foto dei riquadri).
function pageContent(ctx, S, page, swapped) {
  const left = page % 2 === 0;
  const P = left ? PL : PR;
  paper(ctx, P.x, P.y, P.w, P.h, left ? "L" : "R");
  let cells;
  let idx;
  if (page < 2) {
    cells = S.cells.slice(left ? 0 : 6, left ? 6 : 13);
    idx = cells.map((_, k) => {
      const kk = (left ? 0 : 6) + k;
      if (kk === 4 && swapped) return 7;
      const tl = S.tiles.find((q) => q.keep && q.order === kk);
      return tl ? S.tiles.indexOf(tl) : kk;
    });
  } else {
    const kind = S.kinds[SPREAD_KINDS[page - 2]];
    cells = kind.map((c) => [P.x + 16 + c[0], P.y + 16 + c[1], c[2], c[3]]);
    idx = cells.map((_, k) => (page * 3 + k * 2 + 1) % 10);
  }
  cells.forEach((c, k) => {
    ctx.save();
    ctx.shadowColor = "rgba(30,26,20,0.35)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    ctx.globalAlpha = 1;
    photo(ctx, S, idx[k], c[0], c[1], c[2], c[3], 2, "hsla(205,70%,60%,", "hsla(228,60%,35%,");
    ctx.restore();
  });
}

function squash(ctx, f, fn) {
  ctx.save();
  ctx.translate(HINGE, 0);
  ctx.scale(Math.max(0.001, f), 1);
  ctx.translate(-HINGE, 0);
  fn();
  ctx.restore();
}

// L'album sfogliato: tre voltate di pagina (spread 0 -> 1 -> 2 -> 3). `flips`: [inizio, fine] di ciascuna.
const FLIPS = [[15.0, 15.9], [16.3, 17.2], [17.6, 18.5]];
function album(ctx, S, t, alpha) {
  if (alpha <= 0.01) return;
  let spread = 0;
  let turning = -1;
  let p = 0;
  FLIPS.forEach(([a, b], i) => {
    if (t >= b) spread = i + 1;
    else if (t >= a) {
      turning = i;
      p = (t - a) / (b - a);
    }
  });
  ctx.save();
  ctx.globalAlpha = alpha;
  const swapped = true;
  if (turning < 0) {
    pageContent(ctx, S, spread * 2, swapped);
    pageContent(ctx, S, spread * 2 + 1, swapped);
  } else {
    const q = ease(p);
    const th = q * Math.PI;
    pageContent(ctx, S, turning * 2, swapped); // pagina sinistra vecchia
    pageContent(ctx, S, turning * 2 + 3, swapped); // la destra che si scopre
    const f = Math.abs(Math.cos(th));
    if (th < Math.PI / 2) {
      squash(ctx, f, () => pageContent(ctx, S, turning * 2 + 1, swapped));
    } else {
      squash(ctx, f, () => pageContent(ctx, S, turning * 2 + 2, swapped));
    }
    // ombra della pagina che si alza, sul dorso
    const sh = Math.sin(th);
    const gx = th < Math.PI / 2 ? HINGE + PR.w * f : HINGE - PL.w * f;
    const g = ctx.createLinearGradient(gx - 40, 0, gx + 40, 0);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, `rgba(0,0,0,${0.28 * sh})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(gx - 40, PL.y, 80, PL.h);
  }
  ctx.restore();
}

function cover(ctx, a) {
  if (a <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = a;
  ctx.shadowColor = "rgba(0,8,24,0.7)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 14;
  rrect(ctx, PL.x - 14, PL.y - 12, PL.w * 2 + 28, PL.h + 24, 12);
  const g = ctx.createLinearGradient(0, PL.y, 0, PL.y + PL.h);
  g.addColorStop(0, "#0e3466");
  g.addColorStop(1, "#071f40");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(143,211,244,0.45)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

function draw(ctx, S, time) {
  const t = ((time % T) + T) % T;
  ctx.clearRect(0, 0, W, H);
  const fadeAll = 1 - seg(t, 19.4, 20.6);
  const beamX = 40 + ease(seg(t, 2.4, 6.2)) * 920;
  const pageA = seg(t, 6.6, 7.8);
  const real = seg(t, 10.2, 11.2); // le pagine di vetro diventano un album vero
  const sfoglia = seg(t, 14.4, 14.8); // dagli scatti alle pagine stampate

  // copertina e pagine dell'album: prima di vetro, poi carta
  if (pageA > 0) {
    const a = pageA * clamp(fadeAll);
    cover(ctx, real * clamp(fadeAll));
    glass(ctx, PL.x, PL.y, PL.w, PL.h, 14, a * 0.9 * (1 - real), { light: "rgba(190,225,255,0.20)", dark: "rgba(50,100,180,0.10)", shadow: 26 });
    glass(ctx, PR.x, PR.y, PR.w, PR.h, 14, a * 0.9 * (1 - real), { light: "rgba(190,225,255,0.20)", dark: "rgba(50,100,180,0.10)", shadow: 26 });
    if (real > 0) {
      ctx.save();
      ctx.globalAlpha = real * clamp(fadeAll);
      paper(ctx, PL.x, PL.y, PL.w, PL.h, "L");
      paper(ctx, PR.x, PR.y, PR.w, PR.h, "R");
      ctx.restore();
    }
  }
  const tilesA = 1 - sfoglia;

  // riquadri
  S.tiles.forEach((tl, i) => {
    const appear = out(seg(t, tl.delay * 0.9, tl.delay * 0.9 + 0.9));
    const drift = Math.sin(time * 0.7 + tl.ph) * 5;
    const judged = beamX > tl.x ? 1 : 0;
    const judgedAt = 2.4 + ((tl.x - 40) / 920) * 3.8; // quando il fascio lo raggiunge
    const sinceJ = t - judgedAt;
    let x = tl.x;
    let y = tl.y + drift * (1 - seg(t, 7.8, 8.4));
    let w = tl.w;
    let h = tl.h;
    let rot = tl.rot;
    let a = appear;
    let glow = 0;
    if (!tl.keep) {
      if (judged) a *= 1 - 0.62 * out(seg(sinceJ, 0, 0.5));
      const gone = seg(t, 6.4, 7.4);
      a *= 1 - gone;
      y += gone * 34;
    } else {
      glow = judged ? out(seg(sinceJ, 0, 0.5)) * (1 - seg(t, 7.8, 9.2)) : 0;
      const k = tl.order;
      const mv = ease(seg(t, 7.8 + k * 0.07, 9.6 + k * 0.07));
      const [cx, cy, cw, ch] = tl.cell;
      x = tl.x + (cx + cw / 2 - tl.x) * mv;
      y = tl.y + drift * (1 - mv) + (cy + ch / 2 - tl.y - drift * (1 - mv)) * mv;
      w = tl.w + (cw - tl.w) * mv;
      h = tl.h + (ch - tl.h) * mv;
      rot = tl.rot * (1 - mv);
      // la cella 5 viene cambiata da Simone (10.8-12.2): esce in alto, ne entra un'altra
      if (k === 4) {
        const sw = seg(t, 12.6, 13.4);
        y += -sw * 40 * (sw < 1 ? 1 : 0);
        a *= 1 - sw;
      }
      a *= clamp(fadeAll) * tilesA;
    }
    if (a < 0.02) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    const hh = `hsla(${tl.hue},78%,66%,`;
    const dk = `hsla(${tl.hue + 22},70%,38%,`;
    glass(ctx, -w / 2, -h / 2, w, h, Math.min(8, h * 0.2), a, {
      light: "rgba(200,230,255," + (0.26 + glow * 0.2) + ")",
      dark: "rgba(70,130,210," + (0.1 + glow * 0.12) + ")",
      stroke: glow > 0.05 ? `rgba(87,199,227,${0.45 + glow * 0.5})` : undefined,
      shadow: tl.keep ? 12 : 0,
    });
    // «foto» dentro il vetro
    ctx.globalAlpha = a * 0.95;
    photo(ctx, S, i, -w / 2 + 4, -h / 2 + 4, w - 8, h - 8, Math.min(5, h * 0.14), hh, dk);
    if (glow > 0.05) {
      ctx.globalAlpha = glow * 0.9;
      ctx.shadowColor = "rgba(87,199,227,0.9)";
      ctx.shadowBlur = 16;
      rrect(ctx, -w / 2, -h / 2, w, h, Math.min(8, h * 0.2));
      ctx.strokeStyle = "rgba(87,199,227,0.9)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();

    // etichetta sulle scartate
    if (!tl.keep && tl.tag && judged && sinceJ < 1.7) {
      const ta = out(seg(sinceJ, 0.1, 0.4)) * (1 - seg(sinceJ, 1.3, 1.7)) * clamp(fadeAll);
      ctx.save();
      ctx.globalAlpha = ta;
      ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
      const tw = ctx.measureText(tl.tag).width + 16;
      glass(ctx, x - tw / 2, y - tl.h / 2 - 26, tw, 20, 10, 1, { light: "rgba(245,205,121,0.30)", dark: "rgba(245,205,121,0.12)", stroke: "rgba(245,205,121,0.7)" });
      ctx.fillStyle = "#f5cd79";
      ctx.textAlign = "center";
      ctx.fillText(tl.tag, x, y - tl.h / 2 - 12);
      ctx.restore();
    }
  });

  // la foto che entra al posto di quella cambiata da Simone (cella 5)
  const swIn = seg(t, 13.0, 13.8);
  if (swIn > 0) {
    const tl = S.tiles.find((q) => q.keep && q.order === 4);
    const [cx, cy, cw, ch] = tl.cell;
    const a = out(swIn) * clamp(fadeAll) * tilesA;
    ctx.save();
    glass(ctx, cx, cy + (1 - out(swIn)) * 36, cw, ch, 8, a, { light: "rgba(200,230,255,0.34)", dark: "rgba(70,130,210,0.16)", stroke: "rgba(87,199,227,0.9)", shadow: 12 });
    ctx.globalAlpha = a * 0.95;
    photo(ctx, S, 7, cx + 4, cy + 4 + (1 - out(swIn)) * 36, cw - 8, ch - 8, 6, "hsla(205,80%,68%,", "hsla(228,70%,40%,");
    ctx.restore();
  }

  // l'album stampato, che si sfoglia
  album(ctx, S, t, sfoglia * clamp(fadeAll));

  // il fascio di luce che guarda le foto
  if (t > 2.3 && t < 6.5) {
    const ba = (1 - seg(t, 6.0, 6.5)) * out(seg(t, 2.3, 2.7)) * clamp(fadeAll);
    const g = ctx.createLinearGradient(beamX - 70, 0, beamX + 8, 0);
    g.addColorStop(0, "rgba(87,199,227,0)");
    g.addColorStop(1, "rgba(87,199,227,0.34)");
    ctx.save();
    ctx.globalAlpha = ba;
    ctx.fillStyle = g;
    ctx.fillRect(beamX - 70, 20, 78, H - 40);
    ctx.fillStyle = "rgba(190,240,255,0.9)";
    ctx.fillRect(beamX + 6, 20, 2, H - 40);
    ctx.restore();
  }

  // Simone: il cursore cambia una foto
  const cur = seg(t, 11.4, 14.6);
  if (cur > 0 && cur < 1) {
    const tl = S.tiles.find((q) => q.keep && q.order === 4);
    const [cx, cy, cw, ch] = tl.cell;
    const tx = cx + cw / 2;
    const ty = cy + ch / 2;
    const m = ease(seg(t, 11.4, 12.4));
    const px = 900 + (tx - 900) * m + (1 - seg(t, 12.6, 13.6)) * 0 + seg(t, 13.6, 14.6) * 120;
    const py = 440 + (ty - 440) * m - seg(t, 13.6, 14.6) * 60;
    const ca = out(seg(t, 11.4, 11.8)) * (1 - seg(t, 14.0, 14.6)) * clamp(fadeAll);
    ctx.save();
    ctx.globalAlpha = ca;
    ctx.translate(px, py);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 20);
    ctx.lineTo(5.5, 15.5);
    ctx.lineTo(9, 22);
    ctx.lineTo(12, 20.5);
    ctx.lineTo(8.5, 14);
    ctx.lineTo(15, 14);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,18,31,0.85)";
    ctx.lineWidth = 1.4;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // click
    const ck = seg(t, 12.3, 12.9);
    if (ck > 0 && ck < 1) {
      ctx.save();
      ctx.globalAlpha = (1 - ck) * 0.8 * clamp(fadeAll);
      ctx.beginPath();
      ctx.arc(tx, ty, 8 + ck * 36, 0, 6.28);
      ctx.strokeStyle = "rgba(143,211,244,0.95)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
    // «Simone cambia una foto» / «il sistema impara»
    const msg = t < 13.4 ? curMsgs[0] : curMsgs[1];
    const ma = out(seg(t, 12.5, 12.9)) * (1 - seg(t, 14.1, 14.6)) * clamp(fadeAll);
    ctx.save();
    ctx.globalAlpha = ma;
    ctx.font = "600 13px ui-sans-serif, system-ui, sans-serif";
    const mw = ctx.measureText(msg).width + 28;
    const mx = 500 - mw / 2;
    glass(ctx, mx, 428, mw, 30, 15, 1, { light: "rgba(87,199,227,0.30)", dark: "rgba(60,145,230,0.14)", stroke: "rgba(143,211,244,0.7)", shadow: 14 });
    ctx.fillStyle = "#e8f6ff";
    ctx.textAlign = "center";
    ctx.fillText(msg, 500, 448);
    ctx.restore();
  }
  // onda dell'apprendimento sulle pagine
  const learn = seg(t, 13.4, 14.6);
  if (learn > 0 && learn < 1) {
    ctx.save();
    ctx.globalAlpha = (1 - learn) * 0.5 * clamp(fadeAll);
    ctx.strokeStyle = "rgba(87,199,227,0.9)";
    ctx.lineWidth = 2;
    rrect(ctx, 174 - learn * 40, 96 - learn * 28, 652 + learn * 80, 324 + learn * 56, 20 + learn * 12);
    ctx.stroke();
    ctx.restore();
  }
}

// Le due didascalie dentro il canvas, per lingua (il canvas disegna fuori da React: la lingua si imposta all'avvio).
const MSGS = {
  it: ["Il fotografo cambia una foto", "Il sistema impara"],
  en: ["The photographer swaps a photo", "The system learns"],
  pt: ["O fotógrafo troca uma foto", "O sistema aprende"],
};
let curMsgs = MSGS.it;

export default function AlbumGlassScene({ steps, label, photos = [] }) {
  const pathname = usePathname();
  curMsgs = pathname?.startsWith("/pt") ? MSGS.pt : pathname?.startsWith("/it") ? MSGS.it : MSGS.en;
  const cvRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const S = build();
    S.imgs = photos.map((src) => {
      const im = new Image();
      im.src = src;
      return im;
    });
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let dpr = 1;

    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round((r.width * H * dpr) / W);
    };
    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const time = (now - start) / 1000;
      ctx.setTransform((cv.width / W), 0, 0, (cv.width / W), 0, 0);
      draw(ctx, S, time);
      const t = time % T;
      let p = 0;
      PHASES.forEach((s, i) => {
        if (t >= s) p = i;
      });
      if (p !== phaseRef.current) {
        phaseRef.current = p;
        setPhase(p);
      }
      raf = requestAnimationFrame(frame);
    };
    size();
    if (reduce) {
      ctx.setTransform(cv.width / W, 0, 0, cv.width / W, 0, 0);
      draw(ctx, S, 19.0); // l'album sfogliato, fermo
      setPhase(5);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(cv);
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const vis = () => {
      if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", vis);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div className="hv3 hv3-scene">
      <div className="hv3-scene__glass">
        <canvas ref={cvRef} className="hv3-scene__cv" role="img" aria-label={label} />
        <ol className="hv3-scene__steps" aria-hidden="true">
          {steps.map((s, i) => (
            <li key={i} className={i === phase ? "is-on" : ""}>
              <i>{i + 1}</i>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
