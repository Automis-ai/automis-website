import Link from "next/link";
import Icon from "@/components/v2/ui/icons";

/*
  In fondo a un caso studio (tutte le lingue): invito leggero a vedere gli altri, diverso dalla chiusura con la call (che è la scheda
  grande col bottone pieno). Riga centrata, testo piccolo e bottone solo contorno con freccia: si legge come un link.
*/
const TEXT = {
  it: { text: "Vuoi vedere altri casi? Sistemi già al lavoro per altre attività, con i loro numeri.", go: "Tutti i casi studio" },
  en: { text: "Want to see more cases? Systems already at work in other businesses, with their numbers.", go: "All case studies" },
  pt: { text: "Quer ver mais casos? Sistemas já a trabalhar noutros negócios, com os seus números.", go: "Todos os casos de estudo" },
};

export default function MoreCases({ href, locale = "it" }) {
  const c = TEXT[locale] || TEXT.en;
  return (
    <div className="v2c-more">
      <p className="v2c-more__text">{c.text}</p>
      <Link href={href} className="v2c-more__go">
        {c.go}
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </Link>
    </div>
  );
}
