import Link from "next/link";
import "./v2.css";
import { cx } from "./cx";
import Icon, { renderIcon } from "./icons";
import { nb } from "./nb";

/*
  Scheda di un sistema (compatta: icona a sinistra, testo a destra). Se ha `href` è tutta cliccabile e viva
  al passaggio del mouse, al focus da tastiera e al tocco.
  `cta` = testo del link visibile («Scopri di più» / «Learn more» / «Saiba mais»), dalla pagina. Senza `cta`,
  il titolo è il link e c'è la freccia di prima.
  Se ha un caso studio passa `caseHref` e `caseLabel` (es. «Caso reale →»): il badge è un link a sé che porta al caso.
*/
export default function SystemCard({ title, line, href, icon, cta, caseHref, caseLabel, className }) {
  const withCta = Boolean(href && cta);
  return (
    <article
      className={cx(
        "v2-card v2-sys",
        href && "v2-card--link v2-sys--link",
        icon && "v2-sys--icon",
        withCta && "v2-sys--cta",
        className
      )}
    >
      {icon ? <span className="v2-tile v2-tile--anim">{renderIcon(icon, 22)}</span> : null}
      <div className="v2-sys__body">
        <h3 className="v2-sys__title">
          {href && !withCta ? (
            <Link href={href} className="v2-card__link">
              {nb(title)}
            </Link>
          ) : (
            nb(title)
          )}
        </h3>
        {line ? <p className="v2-sys__line">{nb(line)}</p> : null}
        {caseHref && caseLabel ? (
          <div className="v2-sys__case">
            <Link href={caseHref} className="v2-case__badge">
              <span className="v2-badge">{caseLabel}</span>
            </Link>
          </div>
        ) : null}
        {withCta ? (
          <Link href={href} className="v2-card__link v2-more">
            <span className="v2-more__t">{cta}</span>
            <Icon name="arrow" size={16} strokeWidth={2.2} />
            <span className="v2-sr">: {title}</span>
          </Link>
        ) : null}
      </div>
      {href && !withCta ? (
        <span className="v2-go" aria-hidden="true">
          <Icon name="arrow" size={16} strokeWidth={2} />
        </span>
      ) : null}
    </article>
  );
}
