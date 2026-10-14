import Link from "next/link";
import Icon from "@/components/v2/ui/icons";

/*
  In fondo a un caso studio (IT): invito chiaro a vedere gli altri. Tutta la scheda è un link: bordo, freccia e movimento
  all'avvicinarsi del puntatore dicono che porta altrove.
*/
export default function MoreCases({ href }) {
  return (
    <Link href={href} className="v2c-more">
      <span className="v2c-more__text">
        <b>Vuoi vedere altri casi?</b>
        <span>Sistemi già al lavoro per altre attività, con i loro numeri.</span>
      </span>
      <span className="v2c-more__go">
        Tutti i casi studio
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </span>
    </Link>
  );
}
