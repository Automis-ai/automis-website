"use client";
import { useEffect, useRef } from "react";

/*
  Sfondo della hero: «Ordine dal caos» (bozza A, scelta di Luca e Arcangelo il 13/10).
  Quattro fasci di luce dall'alto (due sul telefono) e una nuvola di punti in 3D: i punti fluttuano sparsi e ogni
  ~8 s si raccolgono in sei gruppi, poi si sciolgono. Dove passa un fascio i punti si accendono; i più vicini al
  cursore gli si collegano con fili sottili. Nessuna parola nello sfondo.
  - Canvas 2D, nessuna libreria. Fermo fuori schermo e a scheda nascosta.
  - prefers-reduced-motion: un fotogramma fermo.
  - textRef: il blocco del testo, dietro cui i punti si attenuano (il titolo resta protagonista).
  - Allo scroll la nuvola si allarga e sfuma (niente convergenze).
*/
export default function OrderBg({ textRef }) {
  const cvRef = useRef(null);

  useEffect(() => {
    const cv = cvRef.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const rnd = (a, b) => a + Math.random() * (b - a);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const S = { w: 0, h: 0, mobile: false, mx: 0, my: 0, tmx: 0, tmy: 0, cx: -999, cy: -999, tcx: -999, tcy: -999, p: 0, text: null, mouse: false };
    const K = 6;
    const tmp = [0, 0, 0];
    let C = [];
    let pts = [];

    const inText = (x, y) => S.text && x > S.text.l && x < S.text.r && y > S.text.t && y < S.text.b;

    function beamGeo(t) {
      const { w, h, mx, p } = S;
      const list = S.mobile
        ? [[-0.04, 0.7, 0.45, "60,145,230", 0.1], [1.04, -0.7, 0.45, "60,145,230", 0.1]]
        : [[-0.04, 0.62, 0.5, "60,145,230", 0.11], [0.3, 0.2, 0.32, "87,199,227", 0.07], [0.7, -0.22, 0.32, "87,199,227", 0.07], [1.04, -0.6, 0.5, "60,145,230", 0.11]];
      return list.map(([x, a, bw, rgb, al], i) => ({
        ox: x * w,
        oy: -h * 0.12,
        ang: a + Math.sin(t * 0.00012 + i * 1.7) * 0.1 + mx * 0.05,
        len: h * 1.7,
        hw: (bw * w * (1 - p * 0.7)) / 2,
        rgb,
        al: al * 0.85 * (1 - p),
      }));
    }
    function drawBeams(G) {
      ctx.globalCompositeOperation = "lighter";
      for (const b of G) {
        const ex = b.ox + Math.sin(b.ang) * b.len;
        const ey = b.oy + Math.cos(b.ang) * b.len;
        const nx = Math.cos(b.ang);
        const ny = -Math.sin(b.ang);
        const g = ctx.createLinearGradient(b.ox, b.oy, ex, ey);
        g.addColorStop(0, `rgba(${b.rgb},${b.al})`);
        g.addColorStop(0.55, `rgba(${b.rgb},${b.al * 0.42})`);
        g.addColorStop(1, `rgba(${b.rgb},0)`);
        ctx.fillStyle = g;
        for (let j = 0; j < 3; j++) {
          const hw = b.hw * (0.35 + j * 0.33);
          const h0 = 6 + j * 10;
          ctx.beginPath();
          ctx.moveTo(b.ox + nx * h0, b.oy + ny * h0);
          ctx.lineTo(ex + nx * hw, ey + ny * hw);
          ctx.lineTo(ex - nx * hw, ey - ny * hw);
          ctx.lineTo(b.ox - nx * h0, b.oy - ny * h0);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }
    function litBy(G, x, y) {
      let best = 0;
      for (const b of G) {
        const dx = x - b.ox;
        const dy = y - b.oy;
        const s = Math.sin(b.ang);
        const c = Math.cos(b.ang);
        const along = dx * s + dy * c;
        if (along <= 0) continue;
        const perp = Math.abs(dx * c - dy * s);
        const hw = b.hw * 0.8 * (along / b.len);
        if (perp < hw) best = Math.max(best, 1 - perp / hw);
      }
      return best;
    }
    function makeProj(rotY, rotX, cx, cy, sc) {
      const cY = Math.cos(rotY), sY = Math.sin(rotY), cX = Math.cos(rotX), sX = Math.sin(rotX);
      return (x, y, z, o) => {
        const X = x * cY + z * sY;
        let Z = -x * sY + z * cY;
        const Y = y * cX - Z * sX;
        Z = y * sX + Z * cX;
        const f = 3.4 / (3.4 + Z);
        o[0] = cx + X * sc * f;
        o[1] = cy + Y * sc * f;
        o[2] = f;
        return o;
      };
    }
    function init() {
      C = Array.from({ length: K }, (_, i) => {
        const a = (i / K) * 6.283 + 0.4;
        return [Math.cos(a) * 1.5, i % 2 ? 0.42 : -0.42, Math.sin(a) * 1.5];
      });
      pts = Array.from({ length: S.mobile ? 520 : 1300 }, (_, i) => ({
        fx: rnd(-2.4, 2.4), fy: rnd(-1.3, 1.3), fz: rnd(-2, 2), ph: Math.random() * 6.28,
        c: i % K, ox: gauss() * 0.22, oy: gauss() * 0.17, oz: gauss() * 0.22, d: Math.random() * 0.35,
      }));
    }
    // ciclo di 8 s: sparsi 2,6 s · si raccolgono 1,6 s · restano 2,4 s · si sciolgono 1,4 s
    const order = (t) => {
      const c = (t / 1000) % 8;
      return c < 2.6 ? 0 : c < 4.2 ? (c - 2.6) / 1.6 : c < 6.6 ? 1 : 1 - (c - 6.6) / 1.4;
    };
    function draw(t) {
      const { w, h, mobile, p } = S;
      const ex = 1 + p * 1.6;
      ctx.clearRect(0, 0, w, h);
      const G = beamGeo(t);
      drawBeams(G);
      const sc = mobile ? w * 0.4 : Math.min(w * 0.3, h * 0.5);
      const pr = makeProj(t * 0.00007 + S.mx * 0.5, 0.28 + S.my * 0.18, w / 2, h * 0.52, sc);
      const o = order(t);
      const sec = t / 1000;
      const near = [];
      for (const q of pts) {
        const k = ease(clamp((o - q.d) / 0.65, 0, 1));
        const fx = q.fx + Math.sin(sec * 0.3 + q.ph) * 0.12;
        const fy = q.fy + Math.cos(sec * 0.25 + q.ph) * 0.1;
        const fz = q.fz + Math.sin(sec * 0.2 + q.ph * 2) * 0.12;
        const cc = C[q.c];
        pr((fx + (cc[0] + q.ox - fx) * k) * ex, (fy + (cc[1] + q.oy - fy) * k) * ex, (fz + (cc[2] + q.oz - fz) * k) * ex, tmp);
        if (tmp[2] <= 0.05) continue;
        const sx = tmp[0], sy = tmp[1], f = tmp[2];
        const L = litBy(G, sx, sy);
        let al = (0.14 + (f - 0.7) * 0.55 + k * 0.22 + L * 0.4) * (1 - p);
        if (inText(sx, sy)) al *= 0.35;
        if (S.mouse && !mobile) {
          const d = Math.hypot(sx - S.cx, sy - S.cy);
          if (d < 150) near.push([d, sx, sy]);
        }
        const sz = 0.6 + f * 1.1 + k * 0.5;
        ctx.globalAlpha = clamp(al, 0, 1);
        ctx.fillStyle = k > 0.8 ? "#bfe9ff" : f > 1 ? "#8fd3f4" : "#3c91e6";
        ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);
      }
      // a gruppi formati, un alone morbido al centro di ognuno
      if (o > 0.5) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 1;
        for (const cc of C) {
          pr(cc[0] * ex, cc[1] * ex, cc[2] * ex, tmp);
          if (tmp[2] <= 0.05 || inText(tmp[0], tmp[1])) continue;
          const r = 46 * tmp[2];
          const g = ctx.createRadialGradient(tmp[0], tmp[1], 0, tmp[0], tmp[1], r);
          g.addColorStop(0, `rgba(87,199,227,${0.22 * (o - 0.5) * 2 * (1 - p)})`);
          g.addColorStop(1, "rgba(87,199,227,0)");
          ctx.fillStyle = g;
          ctx.fillRect(tmp[0] - r, tmp[1] - r, r * 2, r * 2);
        }
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "#8fd3f4";
      near.sort((a, b) => a[0] - b[0]).slice(0, 7).forEach(([d, x, y]) => {
        ctx.globalAlpha = (1 - d / 150) * 0.45;
        ctx.beginPath();
        ctx.moveTo(S.cx, S.cy);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }
    function layout() {
      const r = host.getBoundingClientRect();
      S.w = r.width;
      S.h = r.height;
      S.mobile = S.w < 900;
      const dpr = Math.min(window.devicePixelRatio || 1, S.mobile ? 1.5 : 1.75);
      cv.width = Math.round(S.w * dpr);
      cv.height = Math.round(S.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tr = textRef?.current?.getBoundingClientRect();
      S.text = tr ? { l: tr.left - r.left - 20, r: tr.right - r.left + 20, t: tr.top - r.top - 16, b: tr.bottom - r.top + 12 } : null;
      init();
      if (reduce) draw(4000);
    }

    let running = false;
    let loopOn = false;
    let visible = true;
    const frame = (now) => {
      if (!running) {
        loopOn = false;
        return;
      }
      S.mx += (S.tmx - S.mx) * 0.05;
      S.my += (S.tmy - S.my) * 0.05;
      S.cx = S.cx < -500 ? S.tcx : S.cx + (S.tcx - S.cx) * 0.14;
      S.cy = S.cy < -500 ? S.tcy : S.cy + (S.tcy - S.cy) * 0.14;
      draw(now);
      requestAnimationFrame(frame);
    };
    const kick = () => {
      running = visible && !document.hidden && !reduce;
      if (running && !loopOn) {
        loopOn = true;
        requestAnimationFrame(frame);
      }
    };
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      S.mouse = true;
      S.tmx = (e.clientX / window.innerWidth) * 2 - 1;
      S.tmy = (e.clientY / window.innerHeight) * 2 - 1;
      const r = host.getBoundingClientRect();
      S.tcx = e.clientX - r.left;
      S.tcy = e.clientY - r.top;
    };
    const onScroll = () => {
      S.p = clamp(window.scrollY / (host.offsetHeight * 0.75), 0, 1);
      cv.style.opacity = (1 - S.p * 0.9).toFixed(3);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      kick();
    });

    layout();
    onScroll();
    io.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    document.addEventListener("visibilitychange", kick);
    document.fonts?.ready?.then(layout);
    kick();
    return () => {
      running = false;
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      document.removeEventListener("visibilitychange", kick);
    };
  }, [textRef]);

  return <canvas ref={cvRef} aria-hidden="true" />;
}
