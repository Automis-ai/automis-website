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
*/
export default function Button({ href, variant = "primary", arrow, external, children, className, ...rest }) {
  const showArrow = arrow ?? variant !== "secondary";
  const cls = cx("v2-btn", VARIANTS[variant], className);
  const inner = (
    <>
      {children}
      {showArrow ? <Icon name="arrow" size={18} strokeWidth={2.2} /> : null}
    </>
  );
  if (!href) {
    return (
      <button type="button" className={cls} {...rest}>
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
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
