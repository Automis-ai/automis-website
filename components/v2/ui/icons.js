import {
  ArrowRight,
  AudioLines,
  BrainCircuit,
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
} from "lucide-react";
import { cx } from "./cx";

/*
  Un solo set di icone a linea (lucide-react, 24x24, tratto arrotondato): le cinque categorie e i sistemi
  parlano la stessa lingua visiva. Il nome qui sotto è quello che si passa a <Icon name> e a `icon="…"`
  delle schede; il colore lo decide chi le contiene (currentColor).
  Sono sempre decorative (aria-hidden): il testo accanto dice cosa sono.
*/
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
  brain: BrainCircuit,
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
