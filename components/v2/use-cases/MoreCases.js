import Link from "next/link";
import Icon from "@/components/v2/ui/icons";

/*
  In fondo a un caso studio (IT): invito leggero a vedere gli altri, diverso dalla chiusura con la call (che è la scheda
  grande col bottone pieno). Riga centrata, testo piccolo e bottone solo contorno con freccia: si legge come un link.
*/
export default function MoreCases({ href }) {
  return (
    <div className="v2c-more">
      <p className="v2c-more__text">Vuoi vedere altri casi? Sistemi già al lavoro per altre attività, con i loro numeri.</p>
      <Link href={href} className="v2c-more__go">
        Tutti i casi studio
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </Link>
    </div>
  );
}
