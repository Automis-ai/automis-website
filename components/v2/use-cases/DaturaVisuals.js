import Tile from "@/components/v2/use-cases/Tile";
import { LiveStage } from "@/components/v2/use-cases/fx";
import { CHAINS, DATURA_SLUG } from "@/components/v2/use-cases/constants";

/*
  Disegni del caso Datura Clothing. Tutti decorativi: il significato sta nel testo accanto.
  Niente dati del cliente, niente interfaccia vera: solo forme in tono. Deterministici (nessun Math.random):
  stesso HTML su server e client. Il movimento è tutto CSS (transform e opacity) e parte quando il contenitore
  passa a data-iv="in" (InView) o, per il palco, quando è nello schermo (LiveStage). Regole in use-cases.css.
*/

/* Indici delle celle accese: generatore congruenziale con seme fisso, sempre gli stessi. */
function pickCells(total, count, seed) {
  const picked = new Set();
  let x = seed;
  while (picked.size < count) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    picked.add((x >> 8) % total);
  }
  return picked;
}

/* 100 pallini, `lit` accesi (le inserzioni andate in onda). Solo il conteggio è vero: la posizione no. */
export function DotsGrid({ lit, label }) {
  const on = pickCells(100, lit, 20261008);
  let k = 0;
  return (
    <div className="v2c-dots" role="img" aria-label={label}>
      {Array.from({ length: 100 }, (_, i) => {
        const isOn = on.has(i);
        return <i key={i} className={isOn ? "on" : undefined} style={{ "--i": i, "--k": isOn ? k++ : 0 }} />;
      })}
    </div>
  );
}

/* Fila di `n` segni che si accendono uno dopo l'altro: pallini (guasti) o spunte (aggiornamenti verificati). */
export function Pips({ n, kind = "dot" }) {
  return (
    <div className={`v2c-pips v2c-pips--${kind}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ "--k": i }}>
          {kind === "check" ? (
            <svg viewBox="0 0 12 12" focusable="false">
              <path d="M2.5 6.4 5 8.8l4.6-5" />
            </svg>
          ) : null}
        </i>
      ))}
    </div>
  );
}

/* Un quadratino per ogni giorno di guasto: si accendono uno dopo l'altro, come i giorni che passano. */
export function DayCells({ days }) {
  return (
    <div className="v2c-days" aria-hidden="true">
      {Array.from({ length: days }, (_, i) => (
        <i key={i} style={{ "--k": i }} />
      ))}
    </div>
  );
}

/* Tre colonne: il giorno del picco, un secondo giorno, il giorno a zero. Solo valori misurati. */
export function Spikes({ points }) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div className="v2c-spikes" aria-hidden="true">
      {points.map((p, i) => (
        <div key={i} className="v2c-spikes__col">
          <span className="v2c-spikes__v">{p.value}</span>
          <span className="v2c-spikes__bar" style={{ "--h": Math.max(p.value / max, 0.025), "--k": i }} />
          <span className="v2c-spikes__l">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Il palco del sistema: il negozio al centro, i quattro moduli attorno ---------- */

/* posizioni in % del palco: negozio al centro, moduli ai quattro angoli (in senso orario) */
const HUB = { x: 50, y: 50 };
const POS = [
  { x: 20, y: 24 },
  { x: 80, y: 24 },
  { x: 80, y: 76 },
  { x: 20, y: 76 },
];
const NODES = POS.map((p, i) => ({ ...p, glyph: CHAINS[DATURA_SLUG][i] }));
const CYCLE = 8; // secondi: quattro catene da 2 secondi

/*
  Ogni 2 secondi parte una catena: un modulo manda un pacchetto (tre scatti ravvicinati) al negozio,
  il negozio lo gira al modulo successivo, e il modulo che riceve si accende. È la stessa idea della home:
  moduli diversi che si passano le informazioni senza aspettare qualcuno. Il disegno non dice cosa
  viaggia: dice solo che i moduli sono collegati.
  I moduli sono le tessere di vetro della hero 3D (Tile: stesso materiale e stesse icone: presidio, feed, campagne, report).
  L'oro è uno solo: l'anello sull'ultimo modulo (il report) quando riceve.
*/
export function SystemStage({ copy }) {
  const packets = [];
  NODES.forEach((from, i) => {
    const to = NODES[(i + 1) % NODES.length];
    for (let b = 0; b < 3; b++) {
      const burst = b * 0.14;
      packets.push({ key: `a${i}-${b}`, x: b > 0, sx: from.x, sy: from.y, dx: HUB.x - from.x, dy: HUB.y - from.y, d: 2 * i + burst });
      packets.push({ key: `b${i}-${b}`, x: b > 0, sx: HUB.x, sy: HUB.y, dx: to.x - HUB.x, dy: to.y - HUB.y, d: 2 * i + 0.8 + burst });
    }
  });
  const last = NODES.length - 1;

  return (
    <LiveStage className="v2c-sys" role="img" aria-label={copy.ariaLabel} data-mod={NODES.map((_, i) => i).join(" ")}>
      <div className="v2c-sys__plane" aria-hidden="true">
        <svg className="v2c-sys__lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {NODES.map((n, i) => (
            <line key={i} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        <span className="v2c-ring v2c-ring--a" />
        <span className="v2c-ring v2c-ring--b" />

        <div className="v2c-hub" style={{ "--x": HUB.x, "--y": HUB.y }}>
          <span className="v2c-hub__ping" />
          <Tile glyph="store" size="xl" className="v2c-hub__tile" />
          <span className="v2c-hub__t">{copy.hub}</span>
        </div>

        {NODES.map((n, i) => (
          <div key={i} className="v2c-node" style={{ "--x": n.x, "--y": n.y }}>
            <Tile glyph={n.glyph} size="lg" className={`v2c-node__tile${i === last ? " v2c-tile--last" : ""}`} style={{ "--send": `${2 * i}s`, "--recv": `${2 * ((i + 3) % 4) + 1.6}s` }} />
            <span className="v2c-node__t">{copy.nodes[i]}</span>
          </div>
        ))}

        {packets.map((p) => (
          <i
            key={p.key}
            className={p.x ? "v2c-pkt v2c-pkt--x" : "v2c-pkt"}
            style={{ "--sx": p.sx, "--sy": p.sy, "--dx": p.dx, "--dy": p.dy, "--d": `${p.d}s`, "--cy": `${CYCLE}s` }}
          />
        ))}
      </div>
    </LiveStage>
  );
}
