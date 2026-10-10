import { cx } from "./cx";

/*
  Icone semplici, 24x24, solo tratto (stroke="currentColor"). Il colore lo decide chi le contiene.
  Sono sempre decorative (aria-hidden): il testo accanto dice cosa sono.
*/
const ICONS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  // categorie
  marketing: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  sales: <path d="M3 5h18l-7 8.5V19l-4 2v-7.5z" />,
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4.5" height="6" rx="1.8" />
      <rect x="16.5" y="14" width="4.5" height="6" rx="1.8" />
      <path d="M18.8 20c0 1.4-1.7 2-4.8 2" />
    </>
  ),
  admin: <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.2h7.5A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />,
  hr: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <circle cx="17.6" cy="9.2" r="2.5" />
      <path d="M17.2 14.3a4.8 4.8 0 0 1 4.3 4.7" />
    </>
  ),
  // prodotti e sistemi
  voice: <path d="M4 10v4M8 6.5v11M12 3.5v17M16 7.5v9M20 10v4" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6" />
    </>
  ),
  brain: (
    <>
      <path d="M12 3.5l9 4.8-9 4.8-9-4.8z" />
      <path d="M3 12.5l9 4.8 9-4.8" />
      <path d="M3 16.7l9 4.8 9-4.8" />
    </>
  ),
  training: (
    <>
      <path d="M2.5 9.5L12 4.5l9.5 5-9.5 5z" />
      <path d="M6.5 12.3v4.4c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.4" />
      <path d="M21.5 9.5v5" />
    </>
  ),
  chat: <path d="M20.5 11.8a8 8 0 0 1-11.7 7.1L3.5 20.5l1.6-4.9A8 8 0 1 1 20.5 11.8z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />,
  pen: (
    <>
      <path d="M4 20l1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8 18.5z" />
      <path d="M14.5 6l3 3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5.5" width="13" height="13" rx="2" />
      <path d="M16 10.5l5-3v9l-5-3" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.2" />
      <circle cx="9" cy="10.5" r="2.2" />
      <path d="M5.5 16.5a3.5 3.5 0 0 1 7 0M14.5 9.5h4M14.5 13h3" />
    </>
  ),
  chart: <path d="M4 20V11M10 20V5M16 20v-8M3 20.5h18" />,
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20h12V9.5M10 20v-5h4v5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M4 12h16" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 13l2.5-8h13L21 13v5.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z" />
      <path d="M3 13h5l1 2.5h6l1-2.5h5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  repeat: <path d="M4 11a8 8 0 0 1 14-4l2 2M20 5v4h-4M20 13a8 8 0 0 1-14 4l-2-2M4 19v-4h4" />,
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
      <path d="M9 12l2.2 2.2L15 10.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function Icon({ name, size = 22, strokeWidth = 1.75, className }) {
  const node = ICONS[name];
  if (!node) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cx(className)}
    >
      {node}
    </svg>
  );
}

// `icon` può essere il nome di un'icona del kit oppure un elemento React già pronto.
export function renderIcon(icon, size = 22) {
  if (!icon) return null;
  if (typeof icon === "string") return <Icon name={icon} size={size} />;
  return icon;
}
