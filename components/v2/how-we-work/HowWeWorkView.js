import PageHero from "@/components/v2/ui/PageHero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import PrincipleCards from "@/components/v2/about/PrincipleCards";
import FaqSection from "@/components/v2/systems/FaqSection";
import { heroTitle } from "@/components/v2/systems/heroTitle";
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
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      <PageHero
        size="compact"
        eyebrow={t.hero.eyebrow}
        {...heroTitle(t.hero.title, t.hero.accent)}
        subtitle={t.hero.lead}
        primaryCta={{ label: c.cta, href: contact }}
      />

      <Section tone="light" pad="lg">
        <SectionHeader align="center" title={t.steps.title} />
        <HowSteps items={t.steps.items} moreLabel={moreLabel} />
      </Section>

      <Section tone="deep">
        <SectionHeader title={t.principles.title} />
        <PrincipleCards items={t.principles.items} moreLabel={moreLabel} />
      </Section>

      <FaqSection tone="dark" title={t.faq.title} items={t.faq.items} />

      <CtaBand tone="dark" title={t.cta.title} line={t.cta.line} button={{ label: c.cta, href: contact }} />
    </main>
  );
}
