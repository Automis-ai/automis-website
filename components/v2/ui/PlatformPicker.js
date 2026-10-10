import Link from "next/link";
import "./v2.css";
import Icon from "./icons";
import Badge from "./Badge";

// Accenti delle piattaforme che abbiamo già (da passare come `accent`).
export const PLATFORM_ACCENTS = { shopify: "#95BF47", woocommerce: "#7f54b3" };

function luminance(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return 0;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/*
  Schede piattaforma (Shopify, WooCommerce…). `items`: [{ name, line, href, accent, langTag? }].
  `accent` è un colore esadecimale: colora il bordo alto e il quadratino con l'iniziale.
  `langTag` è una piccola etichetta (es. «Solo in italiano»). Ogni scheda è un link intero.
  Gli href interni passano da addLangPrefix(); fanno eccezione le due landing solo italiane.
*/
export default function PlatformPicker({ items = [], className }) {
  return (
    <ul className={["v2-plat", className].filter(Boolean).join(" ")}>
      {items.map((p) => {
        const fg = luminance(p.accent) > 0.4 ? "#00121f" : "#ffffff";
        const style = p.accent ? { "--v2-plat": p.accent, "--v2-plat-fg": fg } : undefined;
        const body = (
          <>
            <span className="v2-plat__mark" aria-hidden="true">
              {p.name.charAt(0)}
            </span>
            <span>
              <span className="v2-plat__name">{p.name}</span>
              {p.line ? <span className="v2-plat__line">{p.line}</span> : null}
              {p.langTag ? (
                <span className="v2-plat__tag">
                  <Badge tone="neutral">{p.langTag}</Badge>
                </span>
              ) : null}
            </span>
            <span className="v2-go" aria-hidden="true">
              <Icon name="arrow" size={18} strokeWidth={2} />
            </span>
          </>
        );
        return (
          <li key={p.name}>
            <Link href={p.href} className="v2-card v2-card--link v2-plat__item" style={style}>
              {body}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
