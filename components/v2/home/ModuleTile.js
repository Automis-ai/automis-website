import {
  CalendarCheck,
  PhoneCall,
  ReceiptEuro,
  MessageSquareText,
  Contact,
  Megaphone,
  Heart,
  Handshake,
  Headset,
  FolderCog,
  Users,
  Search,
  Wrench,
  LineChart,
  Zap,
} from "lucide-react";

/*
  Il «modulo»: una piastrella di vetro con spessore, la stessa famiglia di quelle che si accendono nella hero 3D
  (calendario, chiamate, fatture, social, chat, scheda cliente, annunci). Qui è fatta di CSS (home.css, .v2hp-mod):
  bordo smussato, riflesso, bordo di spessore a gradini. Si può inclinare e portare in profondità con transform.

  Parti, tutte decorative (aria-hidden): glow (alone che si accende), body (la faccia con l'icona), ring (anello d'oro
  dell'attivazione: parte da fermo a opacità 0). Lo stato «acceso» è la classe is-lit sul contenitore o sulla piastrella.
  size: sm 40 · md 56 · lg 72 · xl 92 (px, --s).
*/
export const GLYPHS = {
  // i moduli della hero
  calendar: CalendarCheck,
  phone: PhoneCall,
  invoice: ReceiptEuro,
  chat: MessageSquareText,
  client: Contact,
  ads: Megaphone,
  social: Heart,
  // le cinque categorie
  marketing: Megaphone,
  sales: Handshake,
  support: Headset,
  admin: FolderCog,
  hr: Users,
  // i tre passi di «Come lavoriamo»
  search: Search,
  build: Wrench,
  grow: LineChart,
  spark: Zap,
};

export default function ModuleTile({ glyph = "spark", size = "md", className = "", ...rest }) {
  const Glyph = GLYPHS[glyph] || Zap;
  return (
    <span className={`v2hp-mod v2hp-mod--${size} ${className}`.trim()} data-mod {...rest}>
      <i className="v2hp-mod__glow" aria-hidden="true" />
      <span className="v2hp-mod__body" aria-hidden="true">
        <Glyph strokeWidth={1.7} focusable="false" />
      </span>
      <i className="v2hp-mod__ring" aria-hidden="true" />
    </span>
  );
}
