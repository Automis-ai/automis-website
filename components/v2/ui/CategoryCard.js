import Link from "next/link";
import "./v2.css";
import Icon, { renderIcon } from "./icons";
import { nb } from "./nb";

/* Scheda di categoria: tutta cliccabile. `icon` = nome del kit (es. "marketing") o elemento React. */
export default function CategoryCard({ title, line, href, icon }) {
  return (
    <article className="v2-card v2-card--link v2-cat">
      <span className="v2-tile">{renderIcon(icon, 24)}</span>
      <div>
        <h3 className="v2-cat__title">
          <Link href={href} className="v2-card__link">
            {nb(title)}
          </Link>
        </h3>
        {line ? <p className="v2-cat__line">{nb(line)}</p> : null}
      </div>
      <span className="v2-go" aria-hidden="true">
        <Icon name="arrow" size={18} strokeWidth={2} />
      </span>
    </article>
  );
}
