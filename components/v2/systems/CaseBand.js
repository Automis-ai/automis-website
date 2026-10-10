import Link from "next/link";
import "@/components/v2/ui/v2.css";
import "./systems.css";
import Icon from "@/components/v2/ui/icons";
import Logo from "@/components/v2/ui/Logo";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import { nb } from "@/components/v2/ui/nb";

/*
  Il caso studio di una categoria: «Caso reale» + nome del cliente + la sintesi del caso (con i suoi numeri,
  scritti nel copy) + link al caso. Il logo viene da components/use-cases/cases.js.
*/
export default function CaseBand({ eyebrow, client, line, cta, href, logo }) {
  return (
    <div className="v2sx-split v2sx-split--case">
      <SectionHeader eyebrow={eyebrow} title={client} className="v2sx-split__head" />
      <article className="v2-card v2-card--link v2sx-case">
        <Logo logo={logo} name={client} />
        <p className="v2sx-case__line">{nb(line)}</p>
        <Link href={href} className="v2sx-case__cta v2-card__link">
          {cta}
          <Icon name="arrow" size={18} strokeWidth={2.2} />
        </Link>
      </article>
    </div>
  );
}
