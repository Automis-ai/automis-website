/*
  Fili e pacchetti: il linguaggio «sistema / interconnessione / velocità» della home sotto la hero.

  Un filo (wire) è un <div> sottile che va dal punto A al punto B: lo si posiziona una volta (left, top, larghezza,
  rotazione) e dopo si anima SOLO con transform e opacità. Dentro ha il tratto che si disegna (scaleX 0 -> 1) e un
  pacchetto di luce che corre da un capo all'altro (translateX). Ai due capi ci sono le porte (puntini che si accendono
  quando il pacchetto arriva): è il nodo del modulo che riceve.

  Tutto quello che si crea qui lo toglie `dispose()`: va chiamato nella pulizia (env.cleanups) della coreografia.
  Gli elementi sono decorativi (aria-hidden): chi li usa deve metterli dentro un contenitore con aria-hidden.
*/

export function el(tag, className, parent) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (parent) parent.appendChild(n);
  return n;
}

/* Crea un filo da a={x,y} a b={x,y} (coordinate relative al contenitore, che deve essere position: relative/absolute). */
export function makeWire(container, a, b, { ports = true, className = "" } = {}) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const wire = el("div", `v2hp-wire ${className}`.trim(), container);
  wire.style.left = `${a.x.toFixed(1)}px`;
  wire.style.top = `${a.y.toFixed(1)}px`;
  wire.style.width = `${len.toFixed(1)}px`;
  wire.style.transform = `rotate(${ang.toFixed(3)}deg)`;
  const fill = el("i", "v2hp-wire__fill", wire);
  const pktLen = Math.max(18, Math.min(46, len * 0.55));
  const pkt = el("b", "v2hp-wire__pkt", wire);
  pkt.style.width = `${pktLen.toFixed(1)}px`;
  const made = { el: wire, fill, pkt, len, ang, pktLen, a, b, ports: [] };
  if (ports) {
    [a, b].forEach((p, i) => {
      const port = el("span", "v2hp-port", container);
      port.style.left = `${p.x.toFixed(1)}px`;
      port.style.top = `${p.y.toFixed(1)}px`;
      made.ports[i] = port;
    });
  }
  made.dispose = () => {
    wire.remove();
    made.ports.forEach((p) => p && p.remove());
  };
  return made;
}

/* Cammino più corto fra due schede, su un grafo {i: [vicini]} (ricerca in ampiezza). Torna l'elenco dei nodi, da `from` a `to`. */
export function pathBetween(adj, from, to) {
  if (from === to) return [from];
  const prev = new Map([[from, null]]);
  const queue = [from];
  while (queue.length) {
    const cur = queue.shift();
    for (const nx of adj.get(cur) || []) {
      if (prev.has(nx)) continue;
      prev.set(nx, cur);
      if (nx === to) {
        const path = [to];
        let p = cur;
        while (p !== null) {
          path.unshift(p);
          p = prev.get(p);
        }
        return path;
      }
      queue.push(nx);
    }
  }
  return null;
}

/*
  Fa correre un pacchetto lungo un filo, in un verso o nell'altro. Restituisce una timeline (non avviata).
  dir = 1: da a verso b; dir = -1: da b verso a. `onArrive` parte quando il pacchetto tocca l'altro capo.
*/
export function packetTween(gsap, wire, { dir = 1, speed = 380, minTime = 0.34, onArrive } = {}) {
  const { pkt, len, pktLen } = wire;
  const dur = Math.max(minTime, len / speed);
  const tl = gsap.timeline();
  const from = dir > 0 ? -pktLen * 0.2 : len - pktLen * 0.8;
  const to = dir > 0 ? len - pktLen * 0.8 : -pktLen * 0.2;
  tl.set(pkt, { x: from, scaleX: dir > 0 ? 1 : -1, opacity: 0 }, 0);
  tl.to(pkt, { opacity: 1, duration: dur * 0.18, ease: "none" }, 0);
  tl.to(pkt, { x: to, duration: dur, ease: "power2.in" }, 0);
  tl.to(pkt, { opacity: 0, duration: dur * 0.16, ease: "none" }, dur * 0.86);
  if (onArrive) tl.call(onArrive, null, dur * 0.9);
  return tl;
}

/*
  Una catena che va da sola: la sequenza di fili `steps = [{ wire, dir, to }]`, un pacchetto dopo l'altro; a ogni arrivo
  `onArrive(step, i)` (e, se c'è, `onStart(step, i)` alla partenza). Parte in pausa e si ripete: chi la usa decide quando suonare (play/pause) e la ferma fuori schermo.
*/
export function chainTimeline(gsap, steps, { speed = 380, gap = 0.05, repeatDelay = 1.2, onArrive, onStart } = {}) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay, paused: true });
  let t = 0;
  steps.forEach((step, i) => {
    const one = packetTween(gsap, step.wire, {
      dir: step.dir,
      speed,
      onArrive: () => onArrive && onArrive(step, i),
    });
    tl.add(one, t);
    if (onStart) tl.call(() => onStart(step, i), null, t);
    t += one.duration() * 0.88 + gap;
  });
  return tl;
}
