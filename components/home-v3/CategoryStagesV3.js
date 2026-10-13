"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./home-v3.css";

/*
  Corpo delle pagine /systems/<categoria> in italiano: tappe con il numero fisso a sinistra, un sistema in primo piano
  e i sistemi di supporto. «Leggi di più» apre il problema e il dettaglio nella scheda stessa.
  Mockup scelto da Luca il 14/10: ~/Automations/sandbox/web-motion/systems-v3/body3.html.
  stages: [{ title, line, items: [{ id, title, short, line, more, href, cta, viz }] }]  (items[0] = in primo piano)
  viz: "bars" | "stars" | "night" | undefined (senza animazione, il problema sta nel riquadro a destra)
*/
function Viz({ kind, caption, rows }) {
  if (kind === "bars")
    return (
      <>
        <div className="hv3-viz__bars" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hv3-viz__cap">{caption}</div>
      </>
    );
  if (kind === "stars")
    return (
      <>
        <div className="hv3-viz__stars" aria-hidden="true">★★★★★</div>
        <div className="hv3-viz__chat">{rows?.[0]}</div>
        <div className="hv3-viz__cap">{caption}</div>
      </>
    );
  if (kind === "night")
    return (
      <>
        <div className="hv3-viz__cap hv3-viz__cap--top">{caption}</div>
        {(rows || []).map(([a, b, ok]) => (
          <div key={a} className="hv3-viz__row">
            <span>{a}</span>
            <span className={ok ? "is-ok" : "is-wait"}>{b}</span>
          </div>
        ))}
      </>
    );
  return null;
}

function Detail({ item, labels }) {
  return (
    <details className="hv3-more">
      <summary>{labels.more}</summary>
      <p>{item.line}</p>
      <p className="hv3-more__pain">
        <b>{labels.pain}</b> {item.more}
      </p>
    </details>
  );
}

export default function CategoryStagesV3({ stages, labels }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const reveal = root.querySelectorAll("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.2 }
    );
    reveal.forEach((el) => io.observe(el));
    const io2 = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.stage))),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    root.querySelectorAll("[data-stage]").forEach((el) => io2.observe(el));
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  const numbered = stages.length > 1 || stages[0]?.title;

  return (
    <section id="sistemi" ref={rootRef} className="hv3 hv3-tone hv3-stages">
      {stages.map((st, i) => {
        const [lead, ...rest] = st.items;
        return (
          <div key={i} data-stage={i} className={`hv3-st${active === i ? " is-on" : ""}${numbered ? "" : " hv3-st--plain"}`}>
            {numbered ? (
              <div className="hv3-st__side">
                <div className="hv3-st__num font-display" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="font-display">{st.title}</h2>
                <p>{st.line}</p>
              </div>
            ) : null}
            <div className="hv3-st__main">
              <article data-reveal className="hv3-lead2">
                <div>
                  {lead.kicker ? <span className="hv3-chip">{lead.kicker}</span> : null}
                  <h3 className="font-display">{lead.title}</h3>
                  <p>{lead.line}</p>
                  {lead.href ? (
                    <Link className="hv3-btn hv3-btn--p hv3-lead2__cta" href={lead.href}>
                      {lead.cta} <span aria-hidden="true">&nbsp;→</span>
                    </Link>
                  ) : null}
                  {lead.viz ? <Detail item={lead} labels={labels} /> : null}
                </div>
                {lead.viz ? (
                  <div className="hv3-viz">
                    <Viz kind={lead.viz} caption={lead.vizCaption} rows={lead.vizRows} />
                  </div>
                ) : (
                  <div className="hv3-scard__pain hv3-lead2__pain">
                    <b>{labels.pain}</b>
                    <span>{lead.more}</span>
                  </div>
                )}
              </article>
              {rest.map((it) => (
                <article key={it.id} data-reveal className="hv3-sm">
                  <h3 className="font-display">{it.title}</h3>
                  <p className="hv3-sm__line">{it.short}</p>
                  <Detail item={it} labels={labels} />
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
