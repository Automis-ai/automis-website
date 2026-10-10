import Link from "next/link";
import "./v2.css";
import { cx } from "./cx";
import Icon, { renderIcon } from "./icons";
import { nb } from "./nb";

/*
  Scheda di un sistema (compatta: icona a sinistra, testo a destra). Se ha `href` è tutta cliccabile.
  Se ha un caso studio passa `caseHref` e `caseLabel` (es. «Caso reale →»): il badge è un link a sé che porta al caso.
*/
export default function SystemCard({ title, line, href, icon, caseHref, caseLabel }) {
  return (
    <article className={cx("v2-card v2-sys", href && "v2-card--link", icon && "v2-sys--icon")}>
      {icon ? <span className="v2-tile">{renderIcon(icon, 22)}</span> : null}
      <div className="v2-sys__body">
        <h3 className="v2-sys__title">
          {href ? (
            <Link href={href} className="v2-card__link">
              {nb(title)}
            </Link>
          ) : (
            title
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
      </div>
      {href ? (
        <span className="v2-go" aria-hidden="true">
          <Icon name="arrow" size={16} strokeWidth={2} />
        </span>
      ) : null}
    </article>
  );
}
