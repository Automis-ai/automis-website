import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import PrincipleCards from "@/components/v2/about/PrincipleCards";
import FaqSection from "@/components/v2/systems/FaqSection";
import HowSteps from "./HowSteps";

/* Come lavoriamo: i tre passi di business.md (una catena di moduli con la linea e il pacchetto che li attraversano, fissata
   con lo scroll su desktop), ciò che resta vero in ogni progetto, le domande generali (tempi, prezzi, dati, come si parte).
   Il ritmo: scuro, un solo momento blu (i passi), blu notte, scuro, chiusura.
   Cornice e metadati stanno nel file di rotta. `tono`: ?tono= della preview. */
export default function HowWeWorkView({ lang, tono }) {
  const t = getCopy("how-we-work", lang);
  const c = getCopy("common", lang);
  const moreLabel = getCopy("systems", lang).labels.more;
  const contact = addLangPrefix("/contact", lang);

  return (
    <main id="main" className={`${pageClass(tono)} v2-calm`}>
      <PageHeroV3
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.accent}
        lead={t.hero.lead}
        cta={{ label: c.cta, href: contact }}
      />

      <div className="hv3 hv3-tone hv3-v2band">
        <Section tone="light" pad="lg">
          <SectionHeader align="center" title={t.steps.title} />
          <HowSteps items={t.steps.items} moreLabel={moreLabel} />
        </Section>

        <Section tone="deep">
          <SectionHeader title={t.principles.title} />
          <PrincipleCards items={t.principles.items} moreLabel={moreLabel} />
        </Section>
      </div>

      <FaqSection tone="dark" title={t.faq.title} items={t.faq.items} />

      <CtaBand tone="dark" title={t.cta.title} line={t.cta.line} button={{ label: c.cta, href: contact }} />
    </main>
  );
}
