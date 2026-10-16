import Link from "next/link";
import "@/components/home-v3/home-v3.css";
import "./caso-v3.css";
import { CountUp, InView } from "@/components/v2/use-cases/fx";

/*
  Pezzi per i casi studio in italiano nello stile di Datura e Album AI (Clínica Santa Maria, ADifesa).
  Tutto è guidato dal testo (components/v2/copy/use-case-<caso>.it.js): nessuna cifra scritta qui.
  Le scene stanno dentro .hv3.cv3 (i colori di home-v3.css); lo stile è in caso-v3.css (.cv3-*).
  Movimento: barre e segmenti crescono quando arrivano nello schermo (InView), i numeri entrano cifra per cifra (CountUp).
  Senza JavaScript e con prefers-reduced-motion si vede subito tutto, a riposo.
*/

/* Numeri con il separatore delle migliaia anche a quattro cifre (toLocaleString('it-IT') lo salta: 1065).
   `sep` viene dal testo (ui.sep): "." in italiano e portoghese, "," in inglese. */
const fmt = (n, sep = ".") => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);

export function Scene({ children, className = "" }) {
  return <div className={`hv3 cv3 ${className}`}>{children}</div>;
}

/* Tessere con un numero grande: «872 chiamate», «3 su 10». `cols` = quante per riga da computer (default: quante sono, max 4). */
export function Stats({ items, label, cols, compact = false }) {
  const n = cols || Math.min(items.length, 4);
  return (
    <ul className={`cv3-stats${compact ? " cv3-stats--compact" : ""}`} style={{ "--cols": n }} aria-label={label}>
      {items.map((it, i) => (
        <li key={it.label} className="dsv3-glass cv3-stat">
          <b className="font-display">
            <CountUp text={it.figure} delay={i * 140} />
          </b>
          <p>{it.label}</p>
          {it.basis || it.note ? <small>{it.basis || it.note}</small> : null}
        </li>
      ))}
    </ul>
  );
}

/* Istogramma: una colonna per voce, la prima dopo `markAt` ha la riga tratteggiata e la sua etichetta (la «svolta»). */
export function Bars({ chart, className = "", sep }) {
  const max = Math.max(...chart.months.map((m) => m.value));
  const mark = typeof chart.markAt === "number" ? chart.markAt : -1;
  return (
    <InView className={`dsv3-glass cv3-chart ${className}`}>
      <div className="cv3-chart__head">
        <span className="dsv3-lab">{chart.title}</span>
        {chart.total ? <span className="cv3-chart__total">{chart.total}</span> : null}
      </div>
      <div className="cv3-plot" style={{ "--n": chart.months.length }} role="img" aria-label={chart.ariaLabel}>
        {chart.months.map((m, i) => (
          <div key={m.label} className={`cv3-col${mark >= 0 && i >= mark ? " is-after" : ""}${i === mark ? " is-mark" : ""}`} style={{ "--h": (m.value / max) * 100, "--i": i }}>
            {i === mark && chart.mark ? <span className="cv3-col__tag">{chart.mark}</span> : null}
            <span className="cv3-col__v">{fmt(m.value, sep)}</span>
            <i className="cv3-col__b" />
            <span className="cv3-col__l">{m.label}</span>
          </div>
        ))}
      </div>
      {chart.year ? <span className="cv3-chart__year">{chart.year}</span> : null}
      {chart.note ? <p className="cv3-chart__note">{chart.note}</p> : null}
    </InView>
  );
}

/* Barra a segmenti (parti di un totale) con la legenda sotto. */
export function Split({ split, className = "", sep }) {
  const total = split.parts.reduce((s, p) => s + p.value, 0);
  return (
    <InView className={`dsv3-glass cv3-split ${className}`}>
      <span className="dsv3-lab">{split.title}</span>
      <div className="cv3-split__bar" role="img" aria-label={split.parts.map((p) => `${p.label}: ${p.value}`).join(", ")}>
        {split.parts.map((p, i) => (
          <i key={p.label} className={`cv3-seg cv3-seg--${i}`} style={{ "--f": p.value / total, "--i": i }} />
        ))}
      </div>
      <ul className="cv3-split__key">
        {split.parts.map((p, i) => (
          <li key={p.label}>
            <i className={`cv3-seg cv3-seg--${i}`} aria-hidden="true" />
            <b className="font-display">{fmt(p.value, sep)}</b>
            <span>{p.label}</span>
            {p.pct ? <em>{p.pct}</em> : null}
            {p.line ? <small>{p.line}</small> : null}
          </li>
        ))}
      </ul>
    </InView>
  );
}

/* Righe con etichetta, barra proporzionale e valore. */
export function BarRows({ table, className = "" }) {
  const max = Math.max(...table.rows.map((r) => r.value));
  return (
    <InView className={`dsv3-glass cv3-rows ${className}`}>
      <span className="dsv3-lab">{table.title}</span>
      <ul>
        {table.rows.map((r, i) => (
          <li key={r.label} style={{ "--i": i }}>
            <span className="cv3-rows__l">{r.label}</span>
            <span className="cv3-rows__bar" aria-hidden="true">
              <i style={{ "--f": r.value / max }} />
            </span>
            <b className="font-display">{r.value}</b>
          </li>
        ))}
      </ul>
      {table.note ? <p className="cv3-chart__note">{table.note}</p> : null}
    </InView>
  );
}

/* Elenco semplice etichetta · valore. */
export function KeyValue({ rows, title, lead, className = "" }) {
  return (
    <div className={`dsv3-glass cv3-kv ${className}`}>
      {title ? <h3 className="font-display">{title}</h3> : null}
      {lead ? <p className="cv3-kv__lead">{lead}</p> : null}
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* Scheda di vetro generica: sopratitolo, titolo, una o più righe. */
export function Card({ tag, title, line, lines, figure, figureLabel, className = "", children }) {
  const all = lines || (line ? [line] : []);
  return (
    <article className={`dsv3-glass cv3-card ${className}`}>
      {tag ? <span className="dsv3-lab">{tag}</span> : null}
      {figure ? (
        <p className={`cv3-card__fig font-display${figure.length > 6 ? " cv3-card__fig--long" : ""}`}>
          <CountUp text={figure} />
          {figureLabel ? <span className="cv3-card__lab">{figureLabel}</span> : null}
        </p>
      ) : null}
      {title ? <h3 className="font-display">{title}</h3> : null}
      {all.map((l) => (
        <p key={l}>{l}</p>
      ))}
      {children}
    </article>
  );
}

export function CardGrid({ children, cols = 3, className = "" }) {
  return (
    <div className={`cv3-grid ${className}`} style={{ "--cols": cols }}>
      {children}
    </div>
  );
}

/* Passi numerati, in fila da computer. */
export function Steps({ items, className = "" }) {
  return (
    <ol className={`cv3-steps ${className}`} style={{ "--cols": items.length }}>
      {items.map((s, i) => (
        <li key={s.title} className="dsv3-glass" style={{ "--i": i }}>
          <span className="dsv3-n">{s.n}</span>
          <h3 className="font-display">{s.title}</h3>
          <p>{s.line}</p>
        </li>
      ))}
    </ol>
  );
}

/* Schermata vera dentro la cornice di un browser. `zoom` { ratio, z, x, y } ritaglia la parte che conta (rapporto del riquadro,
   ingrandimento, punto di mira in %): su telefono il testo della schermata intera non si legge. Un tocco la apre intera. */
export function Shot({ shot, className = "", openLabel }) {
  const z = shot.zoom;
  return (
    <figure className={`cv3-shot ${className}`}>
      <a className="dsv3-browser" href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={openLabel || "Apri la schermata intera"}>
        <div className="dsv3-browser__bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        {z ? (
          <div className="cv3-shot__crop" style={{ aspectRatio: z.ratio, "--z": z.z, "--ox": `${z.x}%`, "--oy": `${z.y}%` }}>
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </div>
        ) : (
          <img src={shot.src} alt={shot.alt} loading="lazy" />
        )}
      </a>
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

/* Una scheda sola con tre cifre in fila: sostituisce tre schede uguali una accanto all'altra. */
export function Strip({ items }) {
  return (
    <div className="dsv3-glass cv3-strip">
      <ul>
        {items.map((it, i) => (
          <li key={it.label}>
            <b className="font-display">
              <CountUp text={it.figure} delay={i * 140} />
            </b>
            <span>{it.label}</span>
            {it.line ? <small>{it.line}</small> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Frase grande, senza scheda: il passaggio su cui poggia il caso. */
export function Quote({ tag, title, line }) {
  return (
    <blockquote className="cv3-quote">
      {tag ? <span className="dsv3-lab">{tag}</span> : null}
      <p className="cv3-quote__t font-display">{title}</p>
      {line ? <p className="cv3-quote__l">{line}</p> : null}
    </blockquote>
  );
}

/* Colonne di testo senza scheda (sopratitolo, titolo, riga): per ciò che accompagna una scena invece di essere una scena. */
export function Plain({ items }) {
  return (
    <div className="cv3-plain" style={{ "--cols": items.length }}>
      {items.map((it, i) => (
        <div key={i}>
          {it.tag ? <span className="dsv3-lab">{it.tag}</span> : null}
          {it.title ? <h3 className="font-display">{it.title}</h3> : null}
          <p>{it.line}</p>
        </div>
      ))}
    </div>
  );
}

/* «Nel dettaglio»: il retroscena in righe che si aprono (<details>, nessun JavaScript). Il testo resta nella pagina anche da chiuso. */
export function Detail({ items }) {
  return (
    <div className="cv3-detail">
      {items.map((it) => (
        <details key={it.summary} className="dsv3-glass" id={it.id}>
          <summary>
            <span className="dsv3-lab">{it.tag}</span>
            <b className="font-display">{it.summary}</b>
            <i aria-hidden="true" />
          </summary>
          <div className="cv3-detail__body">{it.children}</div>
        </details>
      ))}
    </div>
  );
}

/* Problema → intervento: scheda con un titolo e due righe etichettate (il problema, com'è finita). */
export function Fixes({ items, tags }) {
  return (
    <div className="cv3-fixes" data-n={items.length}>
      {items.map((it, i) => (
        <article key={it.title} className="dsv3-glass cv3-fix" style={{ "--i": i }}>
          <h3 className="font-display">{it.title}</h3>
          <p className="cv3-fix__row cv3-fix__row--found">
            <em>{tags.found}</em>
            <span>{it.found}</span>
          </p>
          <p className="cv3-fix__row cv3-fix__row--fix">
            <em>{tags.fix}</em>
            <span>{it.fix}</span>
          </p>
        </article>
      ))}
    </div>
  );
}

/* Chip (lingue, voci). */
export function Chips({ items, note }) {
  return (
    <div className="cv3-chips">
      <ul>
        {items.map((c, i) => (
          <li key={c} style={{ "--i": i }}>
            {c}
          </li>
        ))}
      </ul>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

/* Elenco di domande: <details>, nessun JavaScript. */
export function Faq({ items }) {
  return (
    <div className="cv3-faq">
      {items.map((it, i) => (
        <details key={it.q} className="dsv3-glass" {...(i === 0 ? { open: true } : {})}>
          <summary>
            <span>{it.q}</span>
            <i aria-hidden="true" />
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/* Riga con un link sotto le domande: «Se vuoi capire come lavora, qui trovi …». */
export function LinkRow({ more }) {
  return (
    <p className="cv3-linkrow">
      {more.text}{" "}
      <Link href={more.href}>{more.label}</Link>.
    </p>
  );
}
