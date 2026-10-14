import "./home-v3.css";
import { CountUp } from "@/components/v2/use-cases/fx";

/*
  Caso Datura (IT): le scene delle tre storie (presidio, catalogo, annunci), i numeri e il sito.
  Testi: components/v2/copy/use-case-datura.it.js. Nessun JavaScript qui: il movimento è tutto CSS (home-v3.css, .dsv3-*);
  con prefers-reduced-motion e da telefono si vedono subito tutti gli elementi, uno sotto l'altro.
  Presidio: ciclo di 30 secondi, cinque errori da 6 secondi l'uno. Ogni errore ha una riga a sinistra (--i) che passa da
  rosso (trovato) ad ambra (intervento) a verde (risolto) mentre a destra compare la sua scheda; il battito segue lo stesso ritmo.
*/
const N_TILES = 24;

export function DaturaOpsScene({ p }) {
  const o = p.ops;
  const nInc = o.incidents.length;
  return (
    <div className="hv3 dsv3">
      <div className="dsv3-glass dsv3-ops" style={{ "--n": nInc }}>
        <div className="dsv3-ops__top">
          <b className="font-display">{o.title}</b>
          <span className="dsv3-live">{o.live}</span>
        </div>

        <div className="dsv3-ops__grid" role="group" aria-label={o.ariaLabel}>
          <div className="dsv3-checks">
            <svg className="dsv3-ecg" viewBox="0 0 400 64" aria-hidden="true">
              <path className="dsv3-ecg__base" d="M0 34 H92 L102 34 L110 10 L121 58 L131 34 H214 L222 34 L231 14 L241 52 L250 34 H400" />
              <path className="dsv3-ecg__line" pathLength="400" d="M0 34 H92 L102 34 L110 10 L121 58 L131 34 H214 L222 34 L231 14 L241 52 L250 34 H400" />
            </svg>
            <span className="dsv3-lab">{o.checksLabel}</span>
            <ul>
              {o.checks.map((c, i) => (
                <li key={c} className={i < nInc ? "dsv3-row" : "dsv3-row dsv3-row--ok"} style={{ "--i": i }}>
                  <i aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dsv3-incs">
            {o.incidents.map((it, i) => (
              <article key={it.title} className="dsv3-inc" style={{ "--i": i }}>
                <div className="dsv3-inc__head">
                  <p className="dsv3-inc__fig font-display">
                    <CountUp text={it.figure} />
                    <span className="dsv3-inc__unit">{it.unit}</span>
                  </p>
                  <h3 className="font-display">{it.title}</h3>
                </div>
                <ol className="dsv3-steps">
                  <li className="dsv3-st dsv3-st--found" style={{ "--k": 0 }}>
                    <em>{o.tags.found}</em>
                    <span>{it.found}</span>
                  </li>
                  <li className="dsv3-st dsv3-st--fix" style={{ "--k": 1 }}>
                    <em>{o.tags.fix}</em>
                    <span>{it.fix}</span>
                  </li>
                  <li className="dsv3-st dsv3-st--done" style={{ "--k": 2 }}>
                    <em>{o.tags.done}</em>
                    <span>{it.done}</span>
                  </li>
                </ol>
              </article>
            ))}
          </div>
        </div>

        <ol className="dsv3-rail" aria-hidden="true">
          {o.incidents.map((it, i) => (
            <li key={it.name} style={{ "--i": i }}>
              <i />
              <span>{it.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function DaturaCatalogScene({ c }) {
  const st = c.steps;
  return (
    <div className="hv3 dsv3">
      <div className="dsv3-cat">
        <div className="dsv3-glass dsv3-step">
          <span className="dsv3-n">{st.photo.n}</span>
          <h3 className="font-display">{st.photo.title}</h3>
          <div className="dsv3-ph">
            <img src="/media/use-cases/datura/camionneur-foto.jpg" alt={st.photo.alt} loading="lazy" />
            <div className="dsv3-scan" aria-hidden="true" />
            <span className="dsv3-ok">{st.photo.ready}</span>
          </div>
        </div>

        <div className="dsv3-glass dsv3-step">
          <span className="dsv3-n">{st.desc.n}</span>
          <h3 className="font-display">{st.desc.title}</h3>
          <div className="dsv3-desc">
            <span className="dsv3-desc__t">{st.desc.label}</span>
            <p>
              {st.desc.lines.map((l, i) => (
                <span key={i} className={`dsv3-line dsv3-line--${i + 1}`}>
                  {l}
                </span>
              ))}
            </p>
            <div className="dsv3-chips">
              {st.desc.chips.map((ch) => (
                <span key={ch}>{ch}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="dsv3-glass dsv3-step">
          <span className="dsv3-n">{st.card.n}</span>
          <h3 className="font-display">{st.card.title}</h3>
          <div className="dsv3-card">
            <div className="dsv3-ph">
              <img src="/media/use-cases/datura/camionneur-foto.jpg" alt="" loading="lazy" />
            </div>
            <div className="dsv3-card__c">
              <b>{st.card.name}</b>
              <span>{st.card.site}</span>
              <em>{st.card.status}</em>
            </div>
          </div>
        </div>
      </div>

      <div className="dsv3-time">
        <h3 className="font-display">{c.time.title}</h3>
        <div className="dsv3-time__row">
          <div className="dsv3-glass dsv3-time__old">
            <span className="dsv3-lab">{c.time.before.label}</span>
            <b className="font-display">{c.time.before.figure}</b>
            <p>
              {c.time.before.pre} <strong>{c.time.before.strong}</strong>
            </p>
            <div className="dsv3-one" aria-hidden="true">
              <span />
              <div className="dsv3-bar">
                <i style={{ "--w": "100%" }} />
              </div>
            </div>
          </div>
          <div className="dsv3-time__arrow" aria-hidden="true">→</div>
          <div className="dsv3-glass dsv3-time__new">
            <span className="dsv3-lab">{c.time.after.label}</span>
            <b className="font-display">{c.time.after.figure}</b>
            <p>
              {c.time.after.pre} <strong>{c.time.after.strong}</strong>
            </p>
            <div className="dsv3-all" aria-hidden="true">
              {Array.from({ length: N_TILES }, (_, i) => (
                <span key={i} style={{ "--t": i }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixRow({ r }) {
  return (
    <>
      <span className="dsv3-mx__n">{r.name}</span>
      {r.v.map((ok, i) => (
        <span key={i} className={`dsv3-mx__c ${ok ? "is-yes" : "is-no"}`} aria-label={ok ? "sì" : "no"}>
          {ok ? "✓" : "✕"}
        </span>
      ))}
    </>
  );
}

/* Gruppo dinamico di esempio: i capi con le taglie vive stanno «Negli annunci», gli altri sono «Fuori».
   La riga con cycle perde le taglie, esce, poi rientra da sola (ciclo di 12 secondi, solo CSS). */
function GroupDemo({ g }) {
  return (
    <div className="dsv3-grp" role="img" aria-label={`${g.chip}: ${g.name}`}>
      <div className="dsv3-grp__head">
        <span>{g.chip}</span>
        <b className="font-display">{g.name}</b>
        <em>{g.tag}</em>
      </div>
      <ul>
        {g.rows.map((r) => (
          <li key={r.name} className={`${r.out ? "is-out" : ""}${r.cycle ? " is-cycle" : ""}`}>
            <span className="dsv3-grp__n">{r.name}</span>
            <span className="dsv3-grp__sz">
              <span className="dsv3-grp__bar">
                <i style={{ "--w": `${r.cycle ? 100 : r.pct}%` }} />
              </span>
              <small>
                {r.cycle ? (
                  <span className="dsv3-grp__tt">
                    <span className="dsv3-grp__t1">{r.text}</span>
                    <span className="dsv3-grp__t2">{r.textLow}</span>
                  </span>
                ) : (
                  r.text
                )}{" "}
                {g.unit}
              </small>
            </span>
            <span className="dsv3-grp__st">
              {r.out ? <em className="out">{g.outLabel}</em> : r.cycle ? (
                <>
                  <em className="in dsv3-grp__s1">{g.inLabel}</em>
                  <em className="out dsv3-grp__s2">{g.outLabel}</em>
                </>
              ) : (
                <em className="in">{g.inLabel}</em>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DaturaAdsScene({ a }) {
  const reel = [...a.concepts.images, ...a.concepts.images];
  return (
    <div className="hv3 dsv3">
      <div className="dsv3-block">
        <h3 className="font-display">
          <span className="dsv3-n">{a.analysis.n}</span> {a.analysis.title}
        </h3>
        <p className="dsv3-lead">{a.analysis.lead}</p>
        <div className="dsv3-ana">
          <article className="dsv3-glass">
            <span className="dsv3-lab">{a.analysis.past.tag}</span>
            <h4 className="font-display">{a.analysis.past.title}</h4>
            {a.analysis.past.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <div className="dsv3-mx" role="table" aria-label={a.analysis.past.title}>
              <span />
              {a.analysis.past.matrix.cols.map((c) => (
                <span key={c} className="dsv3-mx__h">
                  {c}
                </span>
              ))}
              {a.analysis.past.matrix.rows.map((r) => (
                <MatrixRow key={r.name} r={r} />
              ))}
            </div>
            <div className="dsv3-cost">
              <span className="dsv3-mx__h">{a.analysis.past.costTitle}</span>
              {a.analysis.past.cost.map((c) => (
                <div key={c.label}>
                  <span>{c.label}</span>
                  <i style={{ "--w": c.w }} />
                  <b>{c.text}</b>
                </div>
              ))}
            </div>
          </article>

          <article className="dsv3-glass">
            <span className="dsv3-lab">{a.analysis.dynamic.tag}</span>
            <h4 className="font-display">{a.analysis.dynamic.title}</h4>
            {a.analysis.dynamic.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <GroupDemo g={a.analysis.dynamic.group} />
          </article>
        </div>
      </div>

      <div className="dsv3-block">
        <h3 className="font-display">
          <span className="dsv3-n">{a.concepts.n}</span> {a.concepts.title}
        </h3>
      </div>
      <div className="dsv3-reel" role="group" aria-label={a.concepts.ariaLabel}>
        <div className="dsv3-reel__track">
          {reel.map((im, i) => (
            <img key={i} src={im.src} alt={i < a.concepts.images.length ? im.alt : ""} aria-hidden={i < a.concepts.images.length ? undefined : "true"} width={im.w} height={im.h} loading="lazy" />
          ))}
        </div>
      </div>

      <div className="dsv3-block">
        <h3 className="font-display">
          <span className="dsv3-n">{a.campaigns.n}</span> {a.campaigns.title}
        </h3>
        <div className="dsv3-funnel">
          {a.campaigns.items.map((it) => (
            <div key={it.label} className="dsv3-glass dsv3-fun">
              <b className="font-display">
                <CountUp text={it.figure} />
              </b>
              <p>{it.label}</p>
              {it.bar ? (
                <div className="dsv3-bar" aria-hidden="true">
                  <i style={{ "--w": `${it.bar}%` }} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="dsv3-note">{a.campaigns.note}</p>
      </div>
    </div>
  );
}

export function DaturaNumbers({ n }) {
  return (
    <div className="hv3 dsv3">
      <ul className="dsv3-stats" aria-label={n.label}>
        {n.items.map((it, i) => (
          <li key={it.figure} className="dsv3-glass dsv3-stat">
            <b className="font-display">
              <CountUp text={it.figure} delay={i * 160} />
            </b>
            <p>{it.label}</p>
            <small>{it.basis}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DaturaSite({ s }) {
  return (
    <div className="hv3 dsv3">
      <div className="dsv3-site">
        <div className="dsv3-site__list">
          {s.items.map((it, i) => (
            <div key={it.title} className="dsv3-glass">
              <span className="dsv3-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display">{it.title}</h3>
              <p>{it.line}</p>
            </div>
          ))}
        </div>
        <div className="dsv3-shots">
          <div className="dsv3-browser">
            <div className="dsv3-browser__bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <img src={s.shots.menu.src} alt={s.shots.menu.alt} loading="lazy" />
          </div>
          <div className="dsv3-phone">
            <img src={s.shots.phone.src} alt={s.shots.phone.alt} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
