import "./v2.css";
import "./pg.css";
import { cx } from "./cx";
import FxScope from "../wow/fx/FxScope";

const WIDTHS = { narrow: "v2-wrap--narrow", default: "", wide: "v2-wrap--wide" };
const PADS = { md: "", sm: "v2-section--sm", lg: "v2-section--lg", none: "v2-section--flush" };

/*
  Fascia di pagina. Decide il tono (colori di tutto ciò che contiene) e il contenitore.
  tone: "dark" | "light" | "deep"   width: "narrow" | "default" | "wide"   pad: "sm" | "md" | "lg" | "none"
  Effetti (components/v2/wow/fx): il contenitore è un FxScope. I blocchi sotto la piega entrano in profondità quando arrivi,
  le schede si inclinano al puntatore, sulle fasce scure un alone segue il mouse. Il DOM è quello di sempre;
  senza JavaScript, sul tocco o con prefers-reduced-motion la fascia resta ferma. `fx={false}` li spegne.
*/
export default function Section({
  tone = "dark",
  id,
  as: Tag = "section",
  width = "default",
  pad = "md",
  className,
  fx = true,
  children,
  ...rest
}) {
  return (
    <Tag id={id} className={cx("v2-section", `v2-tone-${tone}`, PADS[pad], className)} {...rest}>
      {fx ? (
        <FxScope className={cx("v2-wrap", WIDTHS[width])} glow={tone !== "light"}>
          {children}
        </FxScope>
      ) : (
        <div className={cx("v2-wrap", WIDTHS[width])}>{children}</div>
      )}
    </Tag>
  );
}
