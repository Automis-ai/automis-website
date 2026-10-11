import Link from "next/link";
import "./v2.css";
import { cx } from "./cx";
import Icon from "./icons";

const VARIANTS = {
  primary: "v2-btn--primary",
  secondary: "v2-btn--secondary",
  gold: "v2-btn--gold",
  link: "v2-btn--link",
};

/*
  Bottone o link-bottone. Con `href` è un link (interno: next/link; http(s): nuova scheda).
  Senza `href` è un <button type="button"> (passa onClick da un componente client).
  variant: "primary" | "secondary" | "gold" | "link"    arrow: freccia finale (default sì, tranne secondary)
  magnetic: il bottone segue appena il cursore (effetto di components/v2/wow/fx; solo mouse, spento con prefers-reduced-motion).
            Funziona dentro una Section o una PageHero (le fasce che montano gli effetti). PageHero e CtaBand lo accendono da sole.
*/
export default function Button({ href, variant = "primary", arrow, external, magnetic, children, className, ...rest }) {
  const showArrow = arrow ?? variant !== "secondary";
  const cls = cx("v2-btn", VARIANTS[variant], className);
  const fx = magnetic ? { "data-fx": "magnetic" } : null;
  const inner = (
    <>
      {children}
      {showArrow ? <Icon name="arrow" size={18} strokeWidth={2.2} /> : null}
    </>
  );
  if (!href) {
    return (
      <button type="button" className={cls} {...fx} {...rest}>
        {inner}
      </button>
    );
  }
  const isHttp = /^https?:/.test(href);
  const isExternal = external ?? (isHttp || /^(mailto:|tel:)/.test(href));
  if (isExternal) {
    const newTab = external === true || isHttp;
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...fx}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...fx} {...rest}>
      {inner}
    </Link>
  );
}
