import Link from "next/link";
import "./home-v3.css";

/*
  Pagina «Sistemi IA per la Vendita» (IT, EN, PT): fascia «Provalo su di noi» (l'Opportunity Finder) e blocco
  «Per partire» (cosa serve da te, tempi, strumenti con cui ci colleghiamo). I testi stanno in
  components/v2/copy/systems.<lingua>.js, blocco sales (finder, start).
*/
export default function SalesExtrasV3({ finder, start, finderHref }) {
  return (
    <>
      <section className="hv3 hv3-sx hv3-sx--finder">
        <div className="hv3-sx__box">
          <div>
            <span className="hv3-eyebrow">{finder.eyebrow}</span>
            <h2 className="hv3-h2 font-display">{finder.title}</h2>
            <p>{finder.line}</p>
            <Link className="hv3-btn hv3-btn--p" href={finderHref}>
              {finder.cta} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
          <ol className="hv3-sx__flow">
            {finder.steps.map((t, i) => (
              <li key={t}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hv3 hv3-sx hv3-sx--start">
        <div className="hv3-sx__head">
          <span className="hv3-eyebrow">{start.eyebrow}</span>
          <h2 className="hv3-h2 font-display">{start.title}</h2>
        </div>
        <div className="hv3-sx__grid">
          <div className="hv3-sx__panel">
            <span className="hv3-chip">{start.need.label}</span>
            <ul>
              {start.need.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="hv3-sx__outro">{start.need.outro}</p>
            <p className="hv3-sx__times">
              <b>{start.times.label}.</b> {start.times.text}
            </p>
          </div>
          <div className="hv3-sx__panel">
            <span className="hv3-chip">{start.tools.label}</span>
            <h3 className="font-display">{start.tools.title}</h3>
            <p className="hv3-sx__outro">{start.tools.line}</p>
            <ul className="hv3-sx__logos">
              {start.tools.items.map((it) => (
                <li key={it.name}>
                  <img src={it.src} alt="" width="30" height="30" loading="lazy" />
                  <span>{it.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
