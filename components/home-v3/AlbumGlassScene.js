"use client";
import { useEffect, useRef, useState } from "react";
import "./home-v3.css";

/*
  «Come lavora il sistema» (Album AI): scena in vetro liquido, stesso linguaggio della hero della home.
  Arrivano le foto di un evento, un fascio di luce le guarda (sfocate, doppie, occhi chiusi), restano le migliori, vanno nelle
  pagine dell'album, e Simone cambia una foto: il sistema impara. Illustrazione con riquadri di vetro, nessuna foto vera.
  - Canvas 2D, nessuna libreria. Ferma fuori schermo e a scheda nascosta. prefers-reduced-motion: un fotogramma fermo.
  - La posizione di ogni riquadro è calcolata dal tempo (nessuno stato): niente scatti al ritorno nel loop.
  - `steps`: le didascalie, una per fase (5). `label`: descrizione per chi usa lo screen reader.
*/
const W = 1000;
const H = 520;
const T = 16; // secondi del ciclo
const N = 70;
const KEEP = 13;
const PHASES = [0, 2.4, 6.4, 7.8, 10.4]; // inizio delle 5 didascalie

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
  // celle dell'album: due pagine, sei e sette foto
  const cells = [
    [196, 130, 130, 90], [340, 130, 134, 90], [196, 232, 62, 86], [270, 232, 204, 86], [196, 330, 132, 60], [340, 330, 134, 60],
    [526, 130, 90, 128], [630, 130, 174, 128], [526, 272, 174, 70], [714, 272, 90, 70], [526, 354, 84, 36], [622, 354, 84, 36], [718, 354, 86, 36],
  ];
  const keepIds = tiles.map((t, i) => (t.keep ? i : -1)).filter((i) => i >= 0);
  keepIds.sort((a, b) => tiles[a].x - tiles[b].x);
  keepIds.forEach((id, k) => {
    tiles[id].cell = cells[k];
    tiles[id].order = k;
  });
  return { tiles, cells };
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

function draw(ctx, S, time) {
  const t = ((time % T) + T) % T;
  ctx.clearRect(0, 0, W, H);
  const fadeAll = 1 - seg(t, 14.6, 15.8);
  const beamX = 40 + ease(seg(t, 2.4, 6.2)) * 920;
  const pageA = seg(t, 6.6, 7.8);

  // pagine dell'album (vetro più grande)
  if (pageA > 0) {
    const a = pageA * clamp(fadeAll);
    glass(ctx, 180, 108, 312, 300, 14, a * 0.9, { light: "rgba(190,225,255,0.20)", dark: "rgba(50,100,180,0.10)", shadow: 26 });
    glass(ctx, 510, 108, 312, 300, 14, a * 0.9, { light: "rgba(190,225,255,0.20)", dark: "rgba(50,100,180,0.10)", shadow: 26 });
  }

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
        const sw = seg(t, 11.3, 12.2);
        y += -sw * 40 * (sw < 1 ? 1 : 0);
      }
      a *= clamp(fadeAll);
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
  const swIn = seg(t, 11.6, 12.4);
  if (swIn > 0) {
    const tl = S.tiles.find((q) => q.keep && q.order === 4);
    const [cx, cy, cw, ch] = tl.cell;
    const a = out(swIn) * clamp(fadeAll);
    ctx.save();
    glass(ctx, cx, cy + (1 - out(swIn)) * 36, cw, ch, 8, a, { light: "rgba(200,230,255,0.34)", dark: "rgba(70,130,210,0.16)", stroke: "rgba(87,199,227,0.9)", shadow: 12 });
    ctx.globalAlpha = a * 0.95;
    photo(ctx, S, 7, cx + 4, cy + 4 + (1 - out(swIn)) * 36, cw - 8, ch - 8, 6, "hsla(205,80%,68%,", "hsla(228,70%,40%,");
    ctx.restore();
  }

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
  const cur = seg(t, 10.4, 13.6);
  if (cur > 0 && cur < 1) {
    const tl = S.tiles.find((q) => q.keep && q.order === 4);
    const [cx, cy, cw, ch] = tl.cell;
    const tx = cx + cw / 2;
    const ty = cy + ch / 2;
    const m = ease(seg(t, 10.4, 11.4));
    const px = 900 + (tx - 900) * m + (1 - seg(t, 12.6, 13.6)) * 0 + seg(t, 12.6, 13.6) * 120;
    const py = 440 + (ty - 440) * m - seg(t, 12.6, 13.6) * 60;
    const ca = out(seg(t, 10.4, 10.8)) * (1 - seg(t, 13.0, 13.6)) * clamp(fadeAll);
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
    const ck = seg(t, 11.3, 11.9);
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
    const msg = t < 12.4 ? "Simone cambia una foto" : "Il sistema impara";
    const ma = out(seg(t, 11.5, 11.9)) * (1 - seg(t, 13.1, 13.6)) * clamp(fadeAll);
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
  const learn = seg(t, 12.4, 13.8);
  if (learn > 0 && learn < 1) {
    ctx.save();
    ctx.globalAlpha = (1 - learn) * 0.5 * clamp(fadeAll);
    ctx.strokeStyle = "rgba(87,199,227,0.9)";
    ctx.lineWidth = 2;
    rrect(ctx, 180 - learn * 40, 108 - learn * 28, 642 + learn * 80, 300 + learn * 56, 20 + learn * 12);
    ctx.stroke();
    ctx.restore();
  }
}

export default function AlbumGlassScene({ steps, label, photos = [] }) {
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
      draw(ctx, S, 10.2); // l'album impaginato, fermo
      setPhase(3);
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
