import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Disclosure from "@/components/v2/ui/Disclosure";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import { toneClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { heroTitle } from "@/components/v2/systems/heroTitle";
import "@/components/v2/training/training.css";
import "@/components/v2/systems/systems.css";

const PATH_ICONS = { everyday: "pen", workflows: "brain" };
const AUDIENCE_ICONS = ["target", "hr", "shield"];

/* Formazione: apertura centrata, due modi per partire (ognuno con le cose che si imparano), a chi serve,
   la conformità (AI Act, art. 4). `tono`: ?tono= della preview. */
export default function TrainingPage({ locale = "en", tono }) {
  const t = getCopy("training", locale);
  const common = getCopy("common", locale);
  const moreLabel = getCopy("systems", locale).labels.more;
  const contact = addLangPrefix("/contact", locale);

  return (
    <AutomisEnShell>
      <div className={toneClass(tono)}>
        <PageHero
          size="compact"
          eyebrow={t.hero.eyebrow}
          {...heroTitle(t.hero.title, t.hero.highlight)}
          subtitle={t.hero.lead}
          primaryCta={{ label: common.cta, href: contact }}
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
                <ul className="v2t-chips">
                  {p.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <Disclosure summary={moreLabel}>
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

        <Section tone="light">
          <div className="v2sx-aside">
            <SectionHeader eyebrow={t.compliance.eyebrow} title={t.compliance.title} className="v2sx-aside__head" />
            <div className="v2-card v2t-law">
              <div className="v2t-law__top">
                <span className="v2-tile v2t-law__tile">
                  <Icon name="shield" size={28} />
                </span>
                <Badge>{t.compliance.badge}</Badge>
              </div>
              <p className="v2t-law__line">{t.compliance.line}</p>
              <Disclosure summary={moreLabel}>
                <p>{t.compliance.more}</p>
                <p className="v2t-law__src">
                  <Button href={t.compliance.sourceHref} variant="link">
                    {t.compliance.sourceLabel}
                  </Button>
                </p>
              </Disclosure>
            </div>
          </div>
        </Section>

        <CtaBand title={t.cta.title} line={t.cta.line} button={{ label: t.cta.button, href: contact }} />
      </div>
    </AutomisEnShell>
  );
}
