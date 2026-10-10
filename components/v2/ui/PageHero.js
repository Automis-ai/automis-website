import "./v2.css";
import { cx } from "./cx";
import Button from "./Button";
import { nb } from "./nb";

/*
  Colora nel blu del brand le parole di `highlight` (stringa o elenco) dentro un titolo di testo.
  Se il titolo è già JSX (con <Accent tone="blue">) o nessuna parola corrisponde, torna com'è.
*/
function renderTitle(title, highlight) {
  if (typeof title !== "string") return title;
  const words = (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean);
  if (!words.length) return nb(title);
  const esc = words
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = title.split(new RegExp(`(${esc.join("|")})`, "g"));
  if (parts.length === 1) return nb(title);
  return parts.map((part, i) =>
    i % 2 ? (
      <span className="v2-phero__hl" key={i}>
        {part}
      </span>
    ) : (
      nb(part)
    )
  );
}

/*
  Apertura di pagina CENTRATA, come la hero del sito originale: pillola, titolo, sottotitolo, una o due CTA.
  UN solo <h1> per pagina. Lascia già lo spazio per l'header fisso.

  size      "full" (default: home e pagine di apertura) | "compact" (pagine interne: meno altezza)
  tone      "dark" (default) | "deep" | "light"
  eyebrow   testo della pillola
  title     testo o JSX; con `highlight` (stringa o elenco) le parole indicate vanno in blu
  subtitle, primaryCta {label, href, external?}, secondaryCta {label, href, external?}
  bg        slot opzionale: sfondo animato DIETRO il testo (di solito un <video muted loop playsInline>).
            Il kit ci mette sopra una velatura per il contrasto. Dentro puoi aggiungere
            <img className="v2-phero__still" …> : con prefers-reduced-motion il video sparisce e resta lo still.
  veil      "normal" (default) | "strong" (video molto vivace) | "none" (lo sfondo è già scuro)
  below     slot opzionale SOTTO il testo, centrato: un elemento visivo che ha senso (animazione, demo, prodotto)
  children  riga extra sotto i bottoni (es. una frase piccola)
*/
export default function PageHero({
  size = "full",
  tone = "dark",
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  bg,
  veil = "normal",
  below,
  id,
  className,
  children,
}) {
  return (
    <section
      id={id}
      className={cx(
        "v2-section v2-phero",
        `v2-tone-${tone}`,
        size === "compact" ? "v2-phero--compact" : "v2-phero--full",
        bg && "v2-phero--bg",
        className
      )}
    >
      {bg ? (
        <div className="v2-phero__bg" aria-hidden="true">
          {bg}
          {veil !== "none" ? <span className={cx("v2-phero__veil", veil === "strong" && "v2-phero__veil--strong")} /> : null}
        </div>
      ) : null}
      <div className="v2-wrap">
        <div className="v2-phero__copy">
          {eyebrow ? (
            <p className="v2-phero__pill">
              <span className="v2-phero__dot" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="v2-phero__h1">{renderTitle(title, highlight)}</h1>
          {subtitle ? <p className="v2-phero__sub">{nb(subtitle)}</p> : null}
          {primaryCta || secondaryCta ? (
            <div className="v2-phero__actions">
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
          {children ? <div className="v2-phero__extra">{children}</div> : null}
        </div>
        {below ? <div className="v2-phero__below">{below}</div> : null}
      </div>
    </section>
  );
}
