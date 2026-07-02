// Flowing-lines canvas effect.
// - Ribbons trail the cursor/touch, and drift autonomously when idle so the
//   effect is alive before (and between) pointer movement.
// - Stroke color eases through a classy brand palette (light blue -> gold ->
//   deeper blue) roughly every ~2.6s.

let ctx;
let pos = { x: 0, y: 0 };
let lines = [];
let startTime = 0;
let lastMove = -1e9; // far in the past => start in autonomous mode

const E = {
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

const IDLE_MS = 800; // resume autonomous drift this long after the last pointer move
const STOP_MS = 2600; // time spent easing between two palette colors

// Brand palette: light blue -> gold (#FEC458) -> deeper blue (#3C91E6).
const PALETTE = [
  [96, 165, 250],
  [254, 196, 88],
  [60, 129, 214],
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function currentColor(now) {
  const seg = (now - startTime) / STOP_MS;
  const i = Math.floor(seg) % PALETTE.length;
  const j = (i + 1) % PALETTE.length;
  let t = seg - Math.floor(seg);
  t = t * t * (3 - 2 * t); // smoothstep ease
  const a = PALETTE[i];
  const b = PALETTE[j];
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

function Line(e = {}) {
  this.spring = e.spring + 0.1 * Math.random() - 0.05;
  this.friction = E.friction + 0.01 * Math.random() - 0.005;
  this.nodes = [];
  for (let n = 0; n < E.size; n++) {
    const t = new Node();
    t.x = pos.x;
    t.y = pos.y;
    this.nodes.push(t);
  }
}
Line.prototype.update = function () {
  let e = this.spring;
  let t = this.nodes[0];
  t.vx += (pos.x - t.x) * e;
  t.vy += (pos.y - t.y) * e;
  for (let n, i = 0, a = this.nodes.length; i < a; i++) {
    t = this.nodes[i];
    if (i > 0) {
      n = this.nodes[i - 1];
      t.vx += (n.x - t.x) * e;
      t.vy += (n.y - t.y) * e;
      t.vx += n.vx * E.dampening;
      t.vy += n.vy * E.dampening;
    }
    t.vx *= this.friction;
    t.vy *= this.friction;
    t.x += t.vx;
    t.y += t.vy;
    e *= E.tension;
  }
};
Line.prototype.draw = function () {
  let e;
  let t;
  let n = this.nodes[0].x;
  let i = this.nodes[0].y;
  ctx.beginPath();
  ctx.moveTo(n, i);
  let a = 1;
  const o = this.nodes.length - 2;
  for (; a < o; a++) {
    e = this.nodes[a];
    t = this.nodes[a + 1];
    n = 0.5 * (e.x + t.x);
    i = 0.5 * (e.y + t.y);
    ctx.quadraticCurveTo(e.x, e.y, n, i);
  }
  e = this.nodes[a];
  t = this.nodes[a + 1];
  ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
  ctx.stroke();
  ctx.closePath();
};

function seedLines() {
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
}

// Smooth wandering target (layered sines) used when no pointer is active.
function autoTarget(now) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const s = (now - startTime) / 1000;
  const cx = w / 2;
  const cy = h * 0.46;
  return {
    x: cx + Math.sin(s * 0.5) * w * 0.3 + Math.sin(s * 0.23) * w * 0.12,
    y: cy + Math.cos(s * 0.4) * h * 0.22 + Math.cos(s * 0.29) * h * 0.1,
  };
}

function render() {
  if (!ctx || !ctx.running) return;
  const now = performance.now();

  // Autonomous drift when the pointer has been idle.
  if (now - lastMove > IDLE_MS) {
    const target = autoTarget(now);
    pos.x = target.x;
    pos.y = target.y;
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";

  const c = currentColor(now);
  ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},0.03)`;
  ctx.lineWidth = 10;

  for (let t = 0; t < E.trails; t++) {
    const e = lines[t];
    e.update();
    e.draw();
  }
  ctx.frame++;
  window.requestAnimationFrame(render);
}

export function renderCanvas() {
  const canvas = document.getElementById("automis-canvas");
  if (!canvas) return () => {};
  ctx = canvas.getContext("2d");
  ctx.running = true;
  ctx.frame = 1;
  startTime = performance.now();
  lastMove = -1e9;

  const resizeCanvas = () => {
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
  };

  const setPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    pos.x = src.clientX - rect.left;
    pos.y = src.clientY - rect.top;
    lastMove = performance.now(); // hand control to the pointer
  };
  const onMove = (e) => setPos(e);
  const onTouchStart = (e) => {
    if (e.touches.length === 1) setPos(e);
  };

  resizeCanvas();
  pos.x = canvas.clientWidth / 2;
  pos.y = canvas.clientHeight * 0.42;
  seedLines();

  document.addEventListener("mousemove", onMove);
  document.addEventListener("touchmove", onMove, { passive: true });
  document.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", resizeCanvas);

  render();

  return () => {
    if (ctx) ctx.running = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("orientationchange", resizeCanvas);
  };
}
