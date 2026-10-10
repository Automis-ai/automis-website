import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Faq from "@/components/v2/ui/Faq";
import CtaBand from "@/components/v2/ui/CtaBand";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { withAccent } from "@/components/v2/about/withAccent";
import PrincipleCards from "@/components/v2/about/PrincipleCards";
import HowSteps from "./HowSteps";
import CategoryArt from "@/components/v2/systems/CategoryArt";

/* Come lavoriamo: i tre passi di business.md, ciò che resta vero in ogni progetto, le domande prima della prima call.
   Il ritmo: scuro, chiaro, blu, chiaro, chiusura. Cornice e metadati stanno nel file di rotta. */
export default function HowWeWorkView({ lang }) {
  const t = getCopy("how-we-work", lang);
  const c = getCopy("common", lang);
  const contact = addLangPrefix("/contact", lang);

  return (
    <>
      <Hero
        eyebrow={t.hero.eyebrow}
        title={withAccent(t.hero.title, t.hero.accent)}
        subtitle={t.hero.lead}
        primaryCta={{ label: c.cta, href: contact }}
        media={<CategoryArt icon="spark" items={["contact", "sliders", "repeat"]} />}
      />

      <Section tone="light">
        <SectionHeader title={t.steps.title} />
        <HowSteps items={t.steps.items} moreLabel={c.ui.more} />
      </Section>

      <Section tone="deep">
        <SectionHeader title={t.principles.title} />
        <PrincipleCards items={t.principles.items} />
      </Section>

      <Section tone="light" width="narrow">
        <SectionHeader title={t.faq.title} />
        <Faq jsonLd items={t.faq.items.map((f) => ({ question: f.q, answer: f.a }))} />
      </Section>

      <CtaBand tone="light" title={t.cta.title} line={t.cta.line} button={{ label: c.cta, href: contact }} />
    </>
  );
}
