import "./v2.css";
import { cx } from "./cx";
import { nb } from "./nb";

/*
  Domande che si aprono (<details>, nessun JavaScript). `items`: [{ question, answer, answerText? }].
  `answer` può essere testo o JSX; per il JSON-LD serve testo: se `answer` è JSX passa anche `answerText`.
  `jsonLd`: aggiunge lo schema FAQPage (solo per FAQ che compaiono in pagina per intero).
  `exclusive`: se ne apre una sola alla volta.
*/
export default function Faq({ items = [], jsonLd = false, exclusive = false, name = "v2-faq", className }) {
  const ld = jsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.question,
          acceptedAnswer: { "@type": "Answer", text: typeof it.answer === "string" ? it.answer : it.answerText || "" },
        })),
      }
    : null;
  return (
    <div className={cx("v2-faq", className)}>
      {items.map((it) => (
        <details className="v2-faq__item" key={it.question} {...(exclusive ? { name } : {})}>
          <summary className="v2-faq__q">
            <span>{nb(it.question)}</span>
            <span className="v2-faq__icon" aria-hidden="true" />
          </summary>
          <div className="v2-faq__a">{typeof it.answer === "string" ? <p>{nb(it.answer)}</p> : it.answer}</div>
        </details>
      ))}
      {ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
        />
      ) : null}
    </div>
  );
}
