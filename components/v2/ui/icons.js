import {
  ArrowRight,
  AudioLines,
  Building2,
  CalendarDays,
  Camera,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  Clock3,
  Contact,
  Database,
  FileText,
  FolderCog,
  GraduationCap,
  Handshake,
  Headset,
  House,
  Inbox,
  Megaphone,
  MessageSquareText,
  Mic,
  Monitor,
  PenLine,
  Phone,
  Play,
  Plus,
  Receipt,
  Repeat,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { cx } from "./cx";

/*
  Un solo set di icone a linea (lucide-react, 24x24, tratto arrotondato): le cinque categorie e i sistemi
  parlano la stessa lingua visiva. Il nome qui sotto è quello che si passa a <Icon name> e a `icon="…"`
  delle schede; il colore lo decide chi le contiene (currentColor).
  Sono sempre decorative (aria-hidden): il testo accanto dice cosa sono.
*/
/* Pittogramma astratto: un nucleo al centro e cinque nodi attorno (le cinque categorie), uniti da raggi e da un contorno.
   Stesso tratto di lucide (24x24, 1,75, estremi tondi): si usa come le altre icone. */
function HubGlyph({ size = 24, strokeWidth = 1.75, className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="3.6" r="1.6" />
      <circle cx="19.9" cy="9.3" r="1.6" />
      <circle cx="16.9" cy="18.6" r="1.6" />
      <circle cx="7.1" cy="18.6" r="1.6" />
      <circle cx="4.1" cy="9.3" r="1.6" />
      {/* il contorno fra i nodi, più leggero dei raggi: si legge come una rete, non come un asterisco */}
      <path d="M13.3 4.5 18.6 8.4M19.4 10.8 17.4 17.1M15.3 18.6H8.7M6.6 17.1 4.6 10.8M5.4 8.4 10.7 4.5" strokeOpacity="0.45" />
      <path d="M12 9.4V5.2" />
      <path d="M14.5 11.2 18.4 9.8" />
      <path d="M13.5 14.1 16 17.3" />
      <path d="M10.5 14.1 8 17.3" />
      <path d="M9.5 11.2 5.6 9.8" />
    </svg>
  );
}

const ICONS = {
  arrow: ArrowRight,
  check: Check,
  plus: Plus,
  chevron: ChevronDown,
  // categorie
  marketing: Megaphone,
  sales: Handshake,
  support: Headset,
  admin: FolderCog,
  hr: Users,
  // prodotti e sistemi
  voice: AudioLines,
  cart: ShoppingCart,
  // «Company Brain» si dice a parole; il pittogramma è astratto: un nucleo e cinque nodi collegati (mai un cervello disegnato)
  brain: HubGlyph,
  hub: HubGlyph,
  workflow: Workflow,
  training: GraduationCap,
  chat: MessageSquareText,
  search: Search,
  doc: FileText,
  web: Monitor,
  target: Target,
  star: Star,
  pen: PenLine,
  database: Database,
  camera: Camera,
  video: Video,
  contact: Contact,
  chart: ChartNoAxesColumn,
  receipt: Receipt,
  phone: Phone,
  clock: Clock3,
  home: House,
  mic: Mic,
  scan: ScanLine,
  inbox: Inbox,
  sliders: SlidersHorizontal,
  repeat: Repeat,
  building: Building2,
  shield: ShieldCheck,
  calendar: CalendarDays,
  spark: Sparkles,
  play: Play,
  wrench: Wrench,
  bolt: Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function Icon({ name, size = 22, strokeWidth = 1.75, className }) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      className={cx(className) || undefined}
    />
  );
}

// `icon` può essere il nome di un'icona del kit oppure un elemento React già pronto.
export function renderIcon(icon, size = 22) {
  if (!icon) return null;
  if (typeof icon === "string") return <Icon name={icon} size={size} />;
  return icon;
}
