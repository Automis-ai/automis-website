import AutomisEnShell from "@/components/site/AutomisEnShell";
import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import { AlbumSpread, Contact } from "@/components/v2/use-cases/AlbumVisuals";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/* La finestra del browser che racchiude l'album: dice «gira nel browser» prima ancora di leggerlo. */
function BrowserWindow() {
  return (
    <div className="v2c-win" aria-hidden="true">
      <div className="v2c-win__bar">
        <span />
        <span />
        <span />
        <i className="v2c-win__url" />
      </div>
      <div className="v2c-win__body">
        <AlbumSpread paper="#f4f7fb" frame="rgba(255,255,255,0.3)" idp="hero" />
      </div>
    </div>
  );
}

/*
  Caso Album AI. Apertura scura, corpo bianco (palette dei casi studio, sotto .v2-caso).
  Solo cosa fa il sistema: nessun risultato, nessun nome, nessun evento. Testi da getCopy.
*/
export default function AlbumAiCase({ locale = "en" }) {
  const t = getCopy("use-case-album-ai", locale);
  const common = getCopy("common", locale);
  const contact = addLangPrefix("/contact", locale);

  return (
    <AutomisEnShell>
      <Hero
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: contact }}
        media={<BrowserWindow />}
      >
        <div className="v2c-client">
          <span className="v2-tile">
            <Icon name="camera" size={22} />
          </span>
          <p className="v2c-client__name">{t.hero.client}</p>
          <span className="v2c-card__tag">{t.hero.tag}</span>
        </div>
        <div className="v2c-back">
          <Button href={addLangPrefix("/use-cases", locale)} variant="link" arrow={false}>
            {common.ui.allCases}
          </Button>
        </div>
      </Hero>

      <div className="v2-caso">
        <Section tone="light">
          <SectionHeader title={t.flow.title} />
          <div className="v2c-flow">
            <div className="v2-card v2c-stage">
              <div className="v2c-stage__vis">
                <Contact cols={12} rows={6} />
              </div>
              <p className="v2c-stage__num">{t.flow.from.figure}</p>
              <p className="v2c-stage__lab">{t.flow.from.label}</p>
            </div>
            <div className="v2c-flow__arrow" aria-hidden="true">
              <Icon name="arrow" size={26} strokeWidth={2.2} />
            </div>
            <div className="v2-card v2c-stage">
              <div className="v2c-stage__vis">
                <Contact cols={6} rows={3} chosen />
              </div>
              <p className="v2c-stage__num">{t.flow.to.figure}</p>
              <p className="v2c-stage__lab">{t.flow.to.label}</p>
            </div>
            <div className="v2c-flow__arrow" aria-hidden="true">
              <Icon name="arrow" size={26} strokeWidth={2.2} />
            </div>
            <div className="v2-card v2c-stage">
              <div className="v2c-stage__vis">
                <AlbumSpread paper="#ffffff" idp="flow" />
              </div>
              <p className="v2c-stage__then">{t.flow.then}</p>
            </div>
          </div>
        </Section>

        <Section tone="light" pad="sm" className="v2c-info-sec">
          <div className="v2c-info-grid">
            <div className="v2-card v2c-info">
              <span className="v2-tile">
                <Icon name="web" size={22} />
              </span>
              <h2 className="v2c-info__title">{t.where.title}</h2>
              <p className="v2c-info__line">{t.where.line}</p>
            </div>
            <div className="v2-card v2c-info">
              <span className="v2-tile">
                <Icon name="sliders" size={22} />
              </span>
              <h2 className="v2c-info__title">{t.custom.title}</h2>
              <p className="v2c-info__line">{t.custom.line}</p>
            </div>
          </div>
        </Section>

        <CtaBand
          tone="light"
          title={t.cta.title}
          line={t.cta.line}
          button={{ label: common.cta, href: contact }}
        />
      </div>
    </AutomisEnShell>
  );
}
