// Mouse/touch-trailing flowing-lines canvas effect.
// Adapted to plain JS with brand-blue hue and a proper cleanup (returns a
// teardown fn so React can stop the loop and detach listeners on unmount).

let ctx;
let f;
let pos = {};
let lines = [];
let hueValue = 0;

const E = {
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

function Osc(e = {}) {
  this.phase = e.phase || 0;
  this.offset = e.offset || 0;
  this.frequency = e.frequency || 0.001;
  this.amplitude = e.amplitude || 1;
}
Osc.prototype.update = function () {
  this.phase += this.frequency;
  hueValue = this.offset + Math.sin(this.phase) * this.amplitude;
  return hueValue;
};
Osc.prototype.value = function () {
  return hueValue;
};

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

function render() {
  if (!ctx || !ctx.running) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";
  // Brand-blue hue band (bright-blue -> soft-blue range), soft glowing strokes.
  ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",85%,62%,0.025)";
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

  // Hue oscillator kept inside the brand blue band (~192deg to ~228deg).
  f = new Osc({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 18,
    frequency: 0.0015,
    offset: 210,
  });

  // Size the drawing buffer to the canvas element (which is stretched to the
  // hero via CSS), so the effect stays contained and coordinate-correct.
  const resizeCanvas = () => {
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
  };

  const setPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    pos.x = src.clientX - rect.left;
    pos.y = src.clientY - rect.top;
  };
  const onMove = (e) => {
    setPos(e);
  };
  const onTouchStart = (e) => {
    if (e.touches.length === 1) setPos(e);
  };

  resizeCanvas();
  // Seed at center so the effect is present before the first pointer move.
  pos.x = canvas.clientWidth / 2;
  pos.y = canvas.clientHeight * 0.42;
  seedLines();

  document.addEventListener("mousemove", onMove);
  document.addEventListener("touchmove", onMove, { passive: true });
  document.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", resizeCanvas);

  render();

  // Teardown for React unmount.
  return () => {
    if (ctx) ctx.running = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("orientationchange", resizeCanvas);
  };
}
