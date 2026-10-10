import Link from "next/link";
import "./v2.css";
import Icon from "./icons";
import Logo from "./Logo";
import { nb } from "./nb";

/*
  Anteprima di un caso studio: cliente, il numero (grande), problema → sistema, link.
  `problemLabel` e `systemLabel` sono le piccole didascalie sopra le due righe (consigliate).
  Tutta la scheda è cliccabile (il link è `linkLabel`). Il numero deve stare sulla base del titolo del caso.
*/
export default function CaseTeaser({
  client,
  logo,
  problem,
  problemLabel,
  system,
  systemLabel,
  number,
  numberLabel,
  href,
  linkLabel,
}) {
  return (
    <article className="v2-card v2-card--link v2-teaser">
      <div className="v2-teaser__head">
        <Logo logo={logo} name={client} />
        <p className="v2-teaser__client">{client}</p>
      </div>
      <p className="v2-teaser__num">{number}</p>
      {numberLabel ? <p className="v2-teaser__numlabel">{nb(numberLabel)}</p> : null}
      {problem || system ? (
        <div className="v2-teaser__rows">
          {problem ? (
            <div className="v2-teaser__row">
              {problemLabel ? <span className="v2-teaser__lab">{problemLabel}</span> : null}
              <p className="v2-teaser__txt">{nb(problem)}</p>
            </div>
          ) : null}
          {system ? (
            <div className="v2-teaser__row">
              {systemLabel ? <span className="v2-teaser__lab">{systemLabel}</span> : null}
              <p className="v2-teaser__txt">{nb(system)}</p>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="v2-teaser__foot">
        <Link href={href} className="v2-teaser__cta v2-card__link">
          {linkLabel}
          <Icon name="arrow" size={18} strokeWidth={2.2} />
        </Link>
      </div>
    </article>
  );
}
