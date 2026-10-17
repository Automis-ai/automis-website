/*
  Eco leggera della rete della hero, da mettere DIETRO una sezione (es. la call in fondo alla home).
  Non è WebGL: è un SVG fermo (nodi e linee sottili) che il server già disegna; con il movimento consentito
  qualche pacchetto di luce ci corre sopra (runEcho). Senza JavaScript, o con prefers-reduced-motion, resta
  l'immagine ferma. È decorativa: aria-hidden, nessun puntatore.

  Uso: <NetworkEcho className="..." /> dentro un contenitore `position: absolute; inset: 0`.
       const echo = runEcho(svgEl, { gsap }, { lite }); echo.play(); echo.pause(); echo.kill();
*/

const NODES = [
  [90, 430], [210, 250], [330, 480], [440, 170], [520, 370], [640, 550], [700, 230],
  [820, 410], [900, 120], [960, 550], [1040, 290], [1130, 460], [590, 80], [250, 90],
];
const EDGES = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [3, 12], [4, 6], [4, 7], [5, 7], [5, 9],
  [6, 8], [6, 7], [6, 12], [7, 9], [7, 10], [8, 10], [9, 11], [10, 11], [3, 13], [1, 13], [12, 8],
];
// Percorsi dei pacchetti: una catena di nodi, come «chiamata -> appuntamento -> fattura -> scheda cliente».
const CHAINS = [
  [0, 1, 3, 12, 8, 10, 11],
  [2, 4, 7, 9, 11],
  [13, 3, 4, 6, 10],
  [5, 7, 6, 8],
];
const HUBS = new Set([3, 4, 7, 10]);

export default function NetworkEcho({ className = "" }) {
  return (
    <svg
      className={`wow-echo ${className}`}
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="wow-echo__edges">
        {EDGES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
        ))}
      </g>
      <g className="wow-echo__nodes">
        {NODES.map(([x, y], i) => (
          <g key={i}>
            {HUBS.has(i) ? <circle className="wow-echo__halo" cx={x} cy={y} r="11" /> : null}
            <circle cx={x} cy={y} r={HUBS.has(i) ? 4.2 : 2.8} />
          </g>
        ))}
      </g>
      <g>
        {CHAINS.map((_, i) => (
          <g key={i} className="wow-echo__pkt" data-echo-pkt={i}>
            <circle r="9" className="wow-echo__pkt-halo" />
            <circle r="2.8" className="wow-echo__pkt-core" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* Fa correre i pacchetti. `lite` = telefono: due soli pacchetti. Parte in pausa: chi la usa decide quando. */
export function runEcho(svg, { gsap }, { lite = false, speed = 520 } = {}) {
  const pkts = Array.from(svg.querySelectorAll("[data-echo-pkt]"));
  const tls = [];
  pkts.forEach((el, i) => {
    if (lite && i > 1) return;
    const path = CHAINS[i].map((n) => NODES[n]);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 + i * 0.8, paused: true });
    tl.set(el, { x: path[0][0], y: path[0][1], opacity: 0 }, 0);
    tl.to(el, { opacity: 1, duration: 0.2, ease: "none" });
    for (let k = 1; k < path.length; k++) {
      const [x0, y0] = path[k - 1];
      const [x1, y1] = path[k];
      tl.to(el, { x: x1, y: y1, duration: Math.hypot(x1 - x0, y1 - y0) / speed, ease: "none" });
    }
    tl.to(el, { opacity: 0, duration: 0.25, ease: "none" });
    tl.time(i * 0.9); // sfalsa la partenza dei pacchetti
    tls.push(tl);
  });
  return {
    play: () => tls.forEach((t) => t.play()),
    pause: () => tls.forEach((t) => t.pause()),
    kill: () => tls.forEach((t) => t.kill()),
  };
}
