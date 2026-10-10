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

/* Griglia di miniature. `chosen`: true = tutte azzurre (le foto scelte); false = poche azzurre in mezzo al grigio. */
export function Contact({ cols, rows, chosen = false }) {
  const total = cols * rows;
  return (
    <div className="v2c-mos" style={{ "--cols": cols }} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={chosen || PICKED_ALL.has(i) ? "on" : undefined} />
      ))}
    </div>
  );
}

/* Doppia pagina di un album, con le foto come blocchi in tono. `paper`: colore della pagina; `idp`: prefisso univoco dei gradienti. */
export function AlbumSpread({ paper = "#ffffff", frame = "rgba(16,27,39,0.12)", idp = "a" }) {
  const g = (n) => `url(#${idp}-g${n})`;
  return (
    <svg className="v2c-spread" viewBox="0 0 420 150" aria-hidden="true" focusable="false">
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
      <rect x="12" y="12" width="124" height="126" rx="2" fill={g(2)} />
      <rect x="142" y="12" width="58" height="60" rx="2" fill={g(3)} />
      <rect x="142" y="78" width="58" height="60" rx="2" fill={g(1)} />
      {/* pagina destra */}
      <rect x="220" y="12" width="188" height="62" rx="2" fill={g(4)} />
      <rect x="220" y="80" width="58" height="58" rx="2" fill={g(1)} />
      <rect x="285" y="80" width="58" height="58" rx="2" fill={g(3)} />
      <rect x="350" y="80" width="58" height="58" rx="2" fill={g(2)} />
    </svg>
  );
}
