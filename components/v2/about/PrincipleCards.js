import "./about.css";
import CardGrid from "@/components/v2/ui/CardGrid";
import Disclosure from "@/components/v2/ui/Disclosure";
import { renderIcon } from "@/components/v2/ui/icons";
import { nb } from "@/components/v2/ui/nb";

// È tuo, la privacy, una persona nel processo: sempre in quest'ordine (come nel copy).
const ICONS = ["database", "shield", "contact"];

/* Tre schede di principio. `items`: [{ title, line, more? }]. Se c'è `more`, si apre a richiesta. */
export default function PrincipleCards({ items = [], moreLabel }) {
  return (
    <CardGrid as="ul" cols={3} className="v2a-list v2a-principles">
      {items.map((p, i) => (
        <li className="v2-card v2a-principle" key={p.title}>
          <span className="v2-tile">{renderIcon(ICONS[i] || "check", 22)}</span>
          <h3 className="v2a-principle__title">{nb(p.title)}</h3>
          <p className="v2a-principle__line">{nb(p.line)}</p>
          {p.more ? (
            <Disclosure summary={moreLabel}>
              <p>{nb(p.more)}</p>
            </Disclosure>
          ) : null}
        </li>
      ))}
    </CardGrid>
  );
}
