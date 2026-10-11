import Link from "next/link";
import "./v2.css";
import { cx } from "./cx";
import Icon, { renderIcon } from "./icons";
import { nb } from "./nb";

/*
  Scheda di categoria: tutta cliccabile, viva al passaggio del mouse, al focus da tastiera e al tocco.
  `icon` = nome del kit (es. "marketing") o elemento React.
  `cta` = testo del link visibile («Scopri di più» / «Learn more» / «Saiba mais»): arriva dalla pagina, il kit non ha testo.
  Senza `cta` resta la versione compatta di prima (titolo = link, freccia in cerchio).
*/
export default function CategoryCard({ title, line, href, icon, cta, className }) {
  return (
    <article className={cx("v2-card v2-card--link v2-cat", cta && "v2-cat--cta", className)} data-fx="tilt">
      <span className="v2-tile v2-tile--anim">{renderIcon(icon, 24)}</span>
      <div className="v2-cat__body">
        <h3 className="v2-cat__title">
          {cta ? (
            nb(title)
          ) : (
            <Link href={href} className="v2-card__link">
              {nb(title)}
            </Link>
          )}
        </h3>
        {line ? <p className="v2-cat__line">{nb(line)}</p> : null}
        {cta ? (
          <Link href={href} className="v2-card__link v2-more">
            <span className="v2-more__t">{cta}</span>
            <Icon name="arrow" size={18} strokeWidth={2.2} />
            <span className="v2-sr">: {title}</span>
          </Link>
        ) : null}
      </div>
      {cta ? null : (
        <span className="v2-go" aria-hidden="true">
          <Icon name="arrow" size={18} strokeWidth={2} />
        </span>
      )}
    </article>
  );
}
