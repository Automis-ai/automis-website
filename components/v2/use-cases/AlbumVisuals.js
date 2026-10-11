/*
  Disegni del caso Album AI. Tutti decorativi (aria-hidden): il significato sta nel testo accanto.
  Niente foto del cliente, niente interfaccia vera: solo forme in tono, per far vedere «tanti scatti,
  poche foto scelte, un album». Deterministici (nessun Math.random): stesso HTML su server e client.
*/

/* Indici delle celle «scelte»: generatore congruenziale con seme fisso, sempre gli stessi. */
function pickCells(total, count, seed) {
  const picked = new Set();
  let x = seed;
  while (picked.size < count) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    picked.add((x >> 8) % total);
  }
  return picked;
}

const PICKED_ALL = pickCells(72, 16, 20261010);

/* Griglia di miniature. `chosen`: true = tutte azzurre (le foto scelte); false = poche azzurre in mezzo al grigio.
   `--k` è l'ordine con cui le azzurre si accendono quando la sezione entra (vedi .v2c-mos in use-cases.css). */
export function Contact({ cols, rows, chosen = false }) {
  const total = cols * rows;
  let k = 0;
  return (
    <div className="v2c-mos" style={{ "--cols": cols }} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const on = chosen || PICKED_ALL.has(i);
        return <i key={i} className={on ? "on" : undefined} style={on ? { "--k": k++ } : undefined} />;
      })}
    </div>
  );
}

/* Dove si trova ogni foto dell'album prima di comporsi: spostamento (px del disegno), rotazione, ordine di arrivo. */
const SCATTER = [
  { tx: -64, ty: -34, r: -9 },
  { tx: 48, ty: -44, r: 7 },
  { tx: 62, ty: 38, r: -6 },
  { tx: -44, ty: -52, r: 5 },
  { tx: -34, ty: 52, r: -8 },
  { tx: 12, ty: 64, r: 6 },
  { tx: 64, ty: 34, r: -5 },
];
const ph = (n) => ({ className: "v2c-ph", style: { "--k": n, "--tx": `${SCATTER[n].tx}px`, "--ty": `${SCATTER[n].ty}px`, "--r": `${SCATTER[n].r}deg` } });

/* Doppia pagina di un album, con le foto come blocchi in tono. `paper`: colore della pagina; `idp`: prefisso univoco dei gradienti.
   `motion`: "assemble" (nell'apertura: le foto si compongono subito, poi ogni tanto si scostano) · "reveal" (sotto la piega:
   si compongono quando la sezione arriva nello schermo, vedi InView in fx.js) · assente = ferma. */
export function AlbumSpread({ paper = "#ffffff", frame = "rgba(16,27,39,0.12)", idp = "a", motion }) {
  const g = (n) => `url(#${idp}-g${n})`;
  const cls = motion === "assemble" ? "v2c-spread v2c-spread--assemble" : motion === "reveal" ? "v2c-spread v2c-spread--rv" : "v2c-spread";
  return (
    <svg className={cls} viewBox="0 0 420 150" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idp}-g1`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f6fc0" />
          <stop offset="1" stopColor="#57c7e3" />
        </linearGradient>
        <linearGradient id={`${idp}-g2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a2647" />
          <stop offset="1" stopColor="#3c91e6" />
        </linearGradient>
        <linearGradient id={`${idp}-g3`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fd3f4" />
          <stop offset="1" stopColor="#dfeaf7" />
        </linearGradient>
        <linearGradient id={`${idp}-g4`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c91e6" />
          <stop offset="1" stopColor="#b4c2ff" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="204" height="142" rx="4" fill={paper} stroke={frame} />
      <rect x="212" y="4" width="204" height="142" rx="4" fill={paper} stroke={frame} />
      {/* pagina sinistra */}
      <rect x="12" y="12" width="124" height="126" rx="2" fill={g(2)} {...ph(0)} />
      <rect x="142" y="12" width="58" height="60" rx="2" fill={g(3)} {...ph(1)} />
      <rect x="142" y="78" width="58" height="60" rx="2" fill={g(1)} {...ph(2)} />
      {/* pagina destra */}
      <rect x="220" y="12" width="188" height="62" rx="2" fill={g(4)} {...ph(3)} />
      <rect x="220" y="80" width="58" height="58" rx="2" fill={g(1)} {...ph(4)} />
      <rect x="285" y="80" width="58" height="58" rx="2" fill={g(3)} {...ph(5)} />
      <rect x="350" y="80" width="58" height="58" rx="2" fill={g(2)} {...ph(6)} />
    </svg>
  );
}
