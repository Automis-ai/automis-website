import Link from "next/link";
import "@/components/v2/ui/v2.css";
import "./systems.css";
import Badge from "@/components/v2/ui/Badge";
import Icon, { renderIcon } from "@/components/v2/ui/icons";
import { nb } from "@/components/v2/ui/nb";

/*
  Scheda grande di un prodotto (hub /systems) o di un rimando (Company Brain in /systems/admin).
  Tutta cliccabile: il link è la riga d'invito (`cta`). `price` è opzionale e compare solo dove il copy lo dà.
*/
export default function ProductCard({ icon, title, line, price, cta, href, as: Tag = "h3" }) {
  return (
    <article className="v2-card v2-card--link v2sx-prod">
      <div className="v2sx-prod__top">
        <span className="v2-tile">{renderIcon(icon, 24)}</span>
        {price ? <Badge tone="gold">{price}</Badge> : null}
      </div>
      <Tag className="v2sx-prod__name">{nb(title)}</Tag>
      <p className="v2sx-prod__line">{nb(line)}</p>
      <Link href={href} className="v2sx-prod__cta v2-card__link">
        {cta}
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </Link>
    </article>
  );
}
