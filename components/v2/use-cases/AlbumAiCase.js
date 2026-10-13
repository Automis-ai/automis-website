import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import { AlbumSpread, Contact } from "@/components/v2/use-cases/AlbumVisuals";
import { InView, LiveStage } from "@/components/v2/use-cases/fx";
import Seam from "@/components/v2/use-cases/Seam";
import { ALBUM_AI_SLUG, CHAINS } from "@/components/v2/use-cases/constants";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/* La finestra del browser che racchiude l'album: dice «gira nel browser» prima ancora di leggerlo.
   Le foto si compongono all'apertura e ogni tanto si scostano e tornano; la finestra si inclina col puntatore. */
function BrowserWindow() {
  return (
    <LiveStage className="v2c-winstage" max={5}>
      <div className="v2c-win" aria-hidden="true">
        <div className="v2c-win__bar">
          <span />
          <span />
          <span />
          <i className="v2c-win__url" />
        </div>
        <div className="v2c-win__body">
          <AlbumSpread paper="#f4f7fb" frame="rgba(255,255,255,0.3)" idp="hero" motion="assemble" />
        </div>
      </div>
    </LiveStage>
  );
}

/*
  Caso Album AI. Apertura scura centrata e compatta (PageHero), corpo chiaro (palette dei casi studio, sotto .v2-caso).
  Solo cosa fa il sistema: nessun risultato, nessun nome, nessun evento. Testi da getCopy.
  Movimento: le foto si compongono, le miniature scelte si accendono; le entrate allo scroll sono del kit (data-fx).
  Nella sfumatura sotto la hero, le tessere di vetro dei tre moduli (scatti → scelta → album) collegate da un filo (Seam);
  la stessa fila torna in uscita, nella sfumatura verso l'invito (Seam exit).
  La scena 3D della hero chiede il preset «album» (components/v2/wow/fx/scene/presets.js, richiesta in coda al giro):
  finché non c'è il motore ripiega su «generic».
*/
export default function AlbumAiCase({ locale = "en" }) {
  const t = getCopy("use-case-album-ai", locale);
  const common = getCopy("common", locale);
  const contact = addLangPrefix("/contact", locale);

  return (
    <AutomisEnShell>
      <main id="main">
      {locale === "it" ? (
        <PageHeroV3
          className="v2c-hero"
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.highlight}
          lead={t.hero.lead}
          cta={{ label: "Leggi il caso", href: "#flusso" }}
          extra={
            <>
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
            </>
          }
          below={<BrowserWindow />}
        />
      ) : (
      <PageHero
        size="compact"
        scene="album"
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: contact }}
        below={<BrowserWindow />}
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
      </PageHero>
      )}

      <Seam glyphs={CHAINS[ALBUM_AI_SLUG]} />
      <div className="v2-caso">
        <Section tone="light" className="v2c-edge" id="flusso">
          <SectionHeader title={t.flow.title} />
          <InView className="v2c-flow">
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
                <AlbumSpread paper="#ffffff" idp="flow" motion="reveal" />
              </div>
              <p className="v2c-stage__then">{t.flow.then}</p>
            </div>
          </InView>
        </Section>

        <Section tone="light" pad="sm" className="v2c-info-sec">
          <div className="v2c-info-grid" data-fx="stagger">
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

        <div className="v2c-cta">
          <Seam glyphs={CHAINS[ALBUM_AI_SLUG]} exit />
          <CtaBand title={t.cta.title} line={t.cta.line} button={{ label: common.cta, href: contact }} />
        </div>
      </div>
      </main>
    </AutomisEnShell>
  );
}
