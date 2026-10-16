import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import { DaturaOpsScene, DaturaCatalogScene, DaturaAdsScene, DaturaNumbers, DaturaSite } from "@/components/home-v3/DaturaScenesV3";
import MoreCases from "@/components/v2/use-cases/MoreCases";
import CtaBand from "@/components/v2/ui/CtaBand";
import { getCopy } from "@/components/v2/copy/getCopy";
import { getDaturaCopy } from "@/components/v2/use-cases/daturaCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/*
  Caso Datura Clothing (v3, tutte le lingue). Apertura PageHeroV3, corpo chiaro (palette dei casi studio, sotto .v2-caso).
  Tre storie con scena (presidio, catalogo, annunci), i numeri, il sito, poi l'invito e il link agli altri casi.
  Nessun numero fuori dal copy: ogni cifra viene da components/v2/copy/use-case-datura.<lingua>.js.
*/
export default function DaturaCase({ locale = "en" }) {
  const t = getDaturaCopy(locale);
  const common = getCopy("common", locale);

  return (
    <AutomisEnShell>
      <main id="main">
      <PageHeroV3
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        lead={t.hero.lead}
        cta={{ label: common.ui.readCase, href: "#problem" }}
        eyebrowLogo={{ src: t.hero.logo, alt: t.hero.client }}
        titleLogo={t.hero.titleLogo}
        stackedTitle
      />
      <div className="v2-caso">
        {/* Tre storie con scena (presidio, catalogo, annunci), i numeri, il sito */}
        <Section fx={false} tone="light" className="v2c-edge" id="problem">
          <SectionHeader align="center" eyebrow={t.presidio.eyebrow} title={t.presidio.title} lead={t.presidio.lead} className="v2c-scenehead" />
          <DaturaOpsScene p={t.presidio} />
        </Section>
        <Section fx={false} tone="light" className="v2c-sec" id="catalogo">
          <SectionHeader align="center" eyebrow={t.catalog.eyebrow} title={t.catalog.title} lead={t.catalog.lead} className="v2c-scenehead" />
          <DaturaCatalogScene c={t.catalog} />
        </Section>
        <Section fx={false} tone="light" className="v2c-sec" id="annunci">
          <SectionHeader align="center" eyebrow={t.ads.eyebrow} title={t.ads.title} lead={t.ads.lead} className="v2c-scenehead" />
          <DaturaAdsScene a={t.ads} />
        </Section>
        <Section fx={false} tone="light" className="v2c-sec" id="numeri">
          <SectionHeader align="center" eyebrow={t.numbers.eyebrow} title={t.numbers.title} className="v2c-scenehead" />
          <DaturaNumbers n={t.numbers} />
          <div className="dsv3-prodlink">
            <Button href={addLangPrefix(t.numbers.product.href, locale)} variant="link">
              {t.numbers.product.label}
            </Button>
          </div>
        </Section>
        <Section fx={false} tone="light" className="v2c-sec" id="sito">
          <SectionHeader align="center" eyebrow={t.site.eyebrow} title={t.site.title} lead={t.site.lead} className="v2c-scenehead" />
          <DaturaSite s={t.site} />
        </Section>
        <div className="v2c-cta">
          <CtaBand blue title={t.cta.title} line={t.cta.line} button={{ label: common.booking.cta, href: `${addLangPrefix("/", locale)}#book` }} />
        </div>
        <div className="v2c-more-wrap">
          <MoreCases href={addLangPrefix("/use-cases", locale)} locale={locale} />
        </div>
      </div>
      </main>
    </AutomisEnShell>
  );
}
