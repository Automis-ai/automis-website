import Link from "next/link";
import "@/components/v2/ui/v2.css";
import "./systems.css";
import Badge from "@/components/v2/ui/Badge";
import Disclosure from "@/components/v2/ui/Disclosure";
import Icon, { renderIcon } from "@/components/v2/ui/icons";
import { nb } from "@/components/v2/ui/nb";

/*
  Scheda di un sistema dentro /systems/<categoria>: come SystemCard (icona, titolo, una riga corta) ma con il
  dettaglio (`detail`: cosa fa, `more`: il problema che risolve) che si apre a richiesta. Se ha `href` (solo i prodotti) è tutta cliccabile.
  Il badge «Caso reale →» compare solo se c'è `caseHref`. Il prezzo solo dove lo dice il copy (Voice).
*/
export default function SystemTile({ title, kicker, line, detail, more, moreLabel, icon, href, caseHref, caseLabel, price }) {
  const hasMeta = Boolean(price) || Boolean(caseHref && caseLabel);
  return (
    <article className={`v2-card v2-sys v2-sys--icon v2sx-tile${href ? " v2-card--link" : ""}`}>
      <span className="v2-tile">{renderIcon(icon, 22)}</span>
      <div className="v2-sys__body">
        {kicker ? <p className="v2sx-kicker">{kicker}</p> : null}
        <h3 className="v2-sys__title">
          {href ? (
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
      </div>
      {href ? (
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
