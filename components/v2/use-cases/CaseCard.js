import Link from "next/link";
import Icon from "@/components/v2/ui/icons";
import Logo from "@/components/v2/ui/Logo";
import "@/components/v2/use-cases/use-cases.css";

/*
  Scheda di un caso nell'indice: logo (o icona se il cliente è anonimo), tipo di sistema (etichetta di testo,
  non una pillola: non è un link), il numero grande con la sua base, titolo del caso, link. Tutta la scheda è
  cliccabile (il link è il titolo). Un numero solo, sulla base del titolo del caso, scritto una volta sola.
  Testi dal copy, mai scritti qui.
*/
export default function CaseCard({ item, logoSrc, icon = "camera", href, linkLabel }) {
  return (
    <article className="v2-card v2-card--link v2c-card">
      <div className="v2c-card__head">
        {logoSrc ? (
          <Logo logo={{ src: logoSrc, alt: item.client }} name={item.client} />
        ) : (
          <span className="v2-tile">
            <Icon name={icon} size={22} />
          </span>
        )}
        <span className="v2c-card__tag">{item.tag}</span>
      </div>
      <p className={`v2c-card__num${item.figure.length > 10 ? " v2c-card__num--long" : ""}`}>{item.figure}</p>
      <p className="v2c-card__numlabel">{item.figureLabel}</p>
      <h2 className="v2c-card__title">
        <Link href={href} className="v2-card__link">
          {item.title}
        </Link>
      </h2>
      <span className="v2c-card__cta" aria-hidden="true">
        {linkLabel}
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </span>
    </article>
  );
}
