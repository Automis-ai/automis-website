import "./v2.css";
import { cx } from "./cx";
import Button from "./Button";
import { nb } from "./nb";

/*
  Apertura di pagina: UN solo <h1>. Lascia spazio in alto per l'header fisso.
  Con `media` a 1024+ va su due colonne (testo a sinistra); sotto, il media segue il testo.
  tone: "dark" (default) | "deep" | "light"    align: "start" (default) | "center" (senza media)
*/
export default function Hero({
  tone = "dark",
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  media,
  align = "start",
  id,
  className,
  children,
}) {
  return (
    <section
      id={id}
      className={cx(
        "v2-section v2-hero",
        `v2-tone-${tone}`,
        media && "v2-hero--media",
        align === "center" && !media && "v2-hero--center",
        className
      )}
    >
      <div className="v2-wrap">
        <div className="v2-hero__grid">
          <div className="v2-hero__copy">
            {eyebrow ? <p className="v2-eyebrow">{eyebrow}</p> : null}
            <h1 className="v2-hero__h1">{nb(title)}</h1>
            {subtitle ? <p className="v2-hero__sub">{nb(subtitle)}</p> : null}
            {primaryCta || secondaryCta ? (
              <div className="v2-hero__actions">
                {primaryCta ? (
                  <Button href={primaryCta.href} external={primaryCta.external} variant="primary">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} external={secondaryCta.external} variant="secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
            {children ? <div className="v2-hero__extra">{children}</div> : null}
          </div>
          {media ? <div className="v2-hero__media">{media}</div> : null}
        </div>
      </div>
    </section>
  );
}
