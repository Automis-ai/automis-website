import AutomisEnShell from "@/components/site/AutomisEnShell";
import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Disclosure from "@/components/v2/ui/Disclosure";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/training/training.css";

const PATH_ICONS = { everyday: "pen", workflows: "brain" };
const AUDIENCE_ICONS = ["target", "hr", "shield"];

/* Dagli usi di ogni giorno ai processi dell'azienda: due livelli, il secondo costruito sul primo. */
function HeroMap({ map }) {
  return (
    <div className="v2t-map" role="group" aria-label={map.ariaLabel}>
      <div className="v2t-lvl">
        <div className="v2t-lvl__head">
          <span className="v2-tile">
            <Icon name="pen" size={22} />
          </span>
          <p className="v2t-lvl__lab">{map.from.label}</p>
        </div>
        <ul className="v2t-chips">
          {map.from.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="v2t-link" aria-hidden="true">
        <span className="v2t-link__i">
          <Icon name="chevron" size={22} strokeWidth={2.2} />
        </span>
      </div>
      <div className="v2t-lvl v2t-lvl--to">
        <div className="v2t-lvl__head">
          <span className="v2-tile">
            <Icon name="brain" size={22} />
          </span>
          <p className="v2t-lvl__lab">{map.to.label}</p>
        </div>
        <ul className="v2t-chips">
          {map.to.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TrainingPage({ locale = "en" }) {
  const t = getCopy("training", locale);
  const common = getCopy("common", locale);
  const contact = addLangPrefix("/contact", locale);

  return (
    <AutomisEnShell>
      <Hero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: contact }}
        media={<HeroMap map={t.hero.map} />}
      />

      <Section tone="light">
        <SectionHeader title={t.paths.title} />
        <div className="v2t-paths">
          {t.paths.items.map((p) => (
            <article key={p.id} className="v2-card v2t-path">
              <div className="v2t-path__head">
                <span className="v2-tile">
                  <Icon name={PATH_ICONS[p.id] || "training"} size={22} />
                </span>
                <h3 className="v2t-path__title">{p.title}</h3>
              </div>
              <p className="v2t-path__line">{p.line}</p>
              <Disclosure summary={t.paths.moreLabel}>
                <p>{p.more}</p>
              </Disclosure>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <SectionHeader title={t.audience.title} />
        <ul className="v2t-aud">
          {t.audience.items.map((text, i) => (
            <li key={text} className="v2-card v2t-aud__item">
              <span className="v2-tile">
                <Icon name={AUDIENCE_ICONS[i] || "check"} size={22} />
              </span>
              <p className="v2t-aud__txt">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" width="narrow">
        <SectionHeader eyebrow={t.compliance.eyebrow} title={t.compliance.title} />
        <div className="v2-card v2t-law">
          <div className="v2t-law__top">
            <span className="v2-tile v2t-law__tile">
              <Icon name="shield" size={28} />
            </span>
            <Badge>{t.compliance.badge}</Badge>
          </div>
          <p className="v2t-law__line">{t.compliance.line}</p>
          <Disclosure summary={t.compliance.moreLabel}>
            <p>{t.compliance.more}</p>
            <p className="v2t-law__src">
              <Button href={t.compliance.sourceHref} variant="link">
                {t.compliance.sourceLabel}
              </Button>
            </p>
          </Disclosure>
        </div>
      </Section>

      <CtaBand
        title={t.cta.title}
        line={t.cta.line}
        button={{ label: t.cta.button, href: contact }}
      />
    </AutomisEnShell>
  );
}
