import Link from "next/link";
import "@/components/v2/ui/v2.css";
import "./systems.css";
import Badge from "@/components/v2/ui/Badge";
import Disclosure from "@/components/v2/ui/Disclosure";
import Icon, { renderIcon } from "@/components/v2/ui/icons";
import { nb } from "@/components/v2/ui/nb";

/*
  Scheda di un sistema dentro /systems/<categoria>: come SystemCard (icona, titolo, una riga corta) ma con il
  dettaglio (`detail`: cosa fa, `more`: il problema che risolve) che si apre a richiesta, sempre con la stessa
  etichetta (`moreLabel`). Se ha `href` (solo i prodotti) è tutta cliccabile e, con `cta`, mostra il link
  visibile «Scopri di più» come SystemCard. Il badge «Caso reale →» compare solo se c'è `caseHref`.
  Il prezzo solo dove lo dice il copy (Voice).
*/
export default function SystemTile({ title, kicker, line, detail, more, moreLabel, icon, href, cta, caseHref, caseLabel, price }) {
  const hasMeta = Boolean(price) || Boolean(caseHref && caseLabel);
  const withCta = Boolean(href && cta);
  return (
    <article className={`v2-card v2-sys v2-sys--icon v2sx-tile${href ? " v2-card--link v2-sys--link" : ""}${withCta ? " v2-sys--cta" : ""}`} data-fx={href ? "tilt" : undefined}>
      <span className="v2-tile v2-tile--anim">{renderIcon(icon, 22)}</span>
      <div className="v2-sys__body">
        {kicker ? <p className="v2sx-kicker">{kicker}</p> : null}
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
        {hasMeta ? (
          <div className="v2sx-meta">
            {price ? <Badge tone="gold">{price}</Badge> : null}
            {caseHref && caseLabel ? (
              <Link href={caseHref} className="v2-case__badge">
                <span className="v2-badge">{caseLabel}</span>
              </Link>
            ) : null}
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
      {detail || more ? (
        <div className="v2sx-more">
          <Disclosure summary={moreLabel}>
            {detail ? <p>{nb(detail)}</p> : null}
            {more ? <p>{nb(more)}</p> : null}
          </Disclosure>
        </div>
      ) : null}
    </article>
  );
}
