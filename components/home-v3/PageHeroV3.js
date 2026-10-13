"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import "./home-v3.css";

// Stesso sfondo della hero della home («Ordine dal caos»), che arriva dopo il testo.
const OrderBg = dynamic(() => import("./OrderBg"), { ssr: false });

/*
  Hero delle pagine interne (Sistemi IA e hub): la luce della home, ma alta circa due terzi dello schermo, centrata,
  un solo bottone. Mockup approvato il 13/10: ~/Automations/sandbox/web-motion/systems-v3/.
  - title + highlight: le parole di `highlight` vanno in blu (le parole corte restano attaccate alla successiva).
  - pain: riga «Il problema» opzionale, la stessa frase della scheda sulla home.
  - cta: { label, href } (di solito un'ancora alla prima sezione).
*/
function splitTitle(title, highlight) {
  const i = highlight ? title.indexOf(highlight) : -1;
  if (i < 0) return [title, "", ""];
  const glued = highlight.replace(/(^|\s)(\p{L}{1,2}) (?=\S)/gu, "$1$2 ");
  return [title.slice(0, i), glued, title.slice(i + highlight.length)];
}

export default function PageHeroV3({ eyebrow, title, highlight, lead, pain, painLabel, cta, below, id }) {
  const textRef = useRef(null);
  const [pre, acc, post] = splitTitle(title, highlight);
  return (
    <section id={id} className="hv3 hv3-hero hv3-hero--compact">
      <div className="hv3-hero__bg">
        <OrderBg textRef={textRef} />
      </div>
      <div className="hv3-hero__veil" />
      <div className="hv3-hero__in">
        <div ref={textRef} className="flex flex-col items-center">
          {eyebrow ? <span className="hv3-pill">{eyebrow}</span> : null}
          <h1 className="hv3-h1 hv3-h1--page font-display">
            {pre}
            {acc ? <em>{acc}</em> : null}
            {post}
          </h1>
          {lead ? <p className="hv3-hero__lead">{lead}</p> : null}
          {pain ? (
            <div className="hv3-pain">
              <b>{painLabel}</b>
              <span>{pain}</span>
            </div>
          ) : null}
          {cta ? (
            <div className="hv3-ctas">
              <a className="hv3-btn hv3-btn--p" href={cta.href}>
                {cta.label} <span aria-hidden="true">&nbsp;↓</span>
              </a>
            </div>
          ) : null}
          {below ? <div className="hv3-hero__below">{below}</div> : null}
        </div>
      </div>
    </section>
  );
}
