/*
  Fili e pacchetti delle pagine interne: il linguaggio «sistema / interconnessione / velocità».
  È la stessa idea di components/v2/wow/scroll/wires.js (quello della home), con classi v2fx-* perché le pagine interne non
  caricano home.css. Un filo è un <div> sottile da A a B: lo si posiziona una volta (left, top, larghezza, rotazione) e dopo
  si anima SOLO con transform e opacità. Dentro: il tratto che si disegna (scaleX 0 -> 1) e un pacchetto di luce che corre da
  un capo all'altro. Ai due capi, le porte (puntini che si accendono quando il pacchetto arriva).
  Tutto ciò che si crea lo toglie dispose(): va chiamato nella pulizia. Gli elementi sono decorativi (il contenitore è aria-hidden).
*/
export function el(tag, className, parent) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (parent) parent.appendChild(n);
  return n;
}

export function makeWire(container, a, b, { ports = true } = {}) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const wire = el("div", "v2fx-wire", container);
  wire.style.left = `${a.x.toFixed(1)}px`;
  wire.style.top = `${a.y.toFixed(1)}px`;
  wire.style.width = `${len.toFixed(1)}px`;
  wire.style.transform = `rotate(${ang.toFixed(3)}deg)`;
  const fill = el("i", "v2fx-wire__fill", wire);
  const pktLen = Math.max(18, Math.min(46, len * 0.55));
  const pkt = el("b", "v2fx-wire__pkt", wire);
  pkt.style.width = `${pktLen.toFixed(1)}px`;
  const made = { el: wire, fill, pkt, len, ang, pktLen, a, b, ports: [] };
  if (ports) {
    [a, b].forEach((p, i) => {
      const port = el("span", "v2fx-port", container);
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

/*
  Un pacchetto lungo un filo, in un verso o nell'altro. Torna una timeline (non avviata).
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
  Una catena che va da sola: i fili `steps = [{ wire, dir, to }]`, un pacchetto dopo l'altro. A ogni arrivo `onArrive(step, i)`.
  Parte in pausa e si ripete: chi la usa decide quando suonare (play/pause) e la ferma fuori schermo.
*/
export function chainTimeline(gsap, steps, { speed = 380, gap = 0.05, repeatDelay = 1.2, onArrive } = {}) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay, paused: true });
  let t = 0;
  steps.forEach((step, i) => {
    const one = packetTween(gsap, step.wire, { dir: step.dir, speed, onArrive: () => onArrive && onArrive(step, i) });
    tl.add(one, t);
    t += one.duration() * 0.88 + gap;
  });
  return tl;
}
