import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { withAccent } from "./withAccent";
import FounderCards from "./FounderCards";
import PrincipleCards from "./PrincipleCards";
import Guarantee from "./Guarantee";
import CategoryArt from "@/components/v2/systems/CategoryArt";

/* Chi siamo: fondatori, come costruiamo (privacy compresa), garanzia. Il ritmo: scuro, chiaro, blu, chiaro, chiusura.
   Cornice (AutomisEnShell) e metadati stanno nel file di rotta. */
export default function AboutView({ lang }) {
  const t = getCopy("about", lang);
  const c = getCopy("common", lang);
  const contact = addLangPrefix("/contact", lang);

  return (
    <>
      <Hero
        eyebrow={t.hero.eyebrow}
        title={withAccent(t.hero.title, t.hero.accent)}
        subtitle={t.hero.lead}
        primaryCta={{ label: c.cta, href: contact }}
        media={<CategoryArt icon="hr" items={["brain", "shield", "star", "chat"]} />}
      />

      <Section tone="light">
        <SectionHeader title={t.founders.title} />
        <FounderCards items={t.founders.items} moreLabel={c.ui.more} profileLabel={t.founders.profileLabel} />
      </Section>

      <Section tone="deep">
        <SectionHeader title={t.principles.title} />
        <PrincipleCards items={t.principles.items} moreLabel={c.ui.more} />
      </Section>

      <Section tone="light" width="narrow" pad="sm">
        <Guarantee
          title={t.guarantee.title}
          number={t.guarantee.number}
          unit={t.guarantee.unit}
          line={t.guarantee.line}
        />
      </Section>

      <CtaBand tone="light" title={t.cta.title} line={t.cta.line} button={{ label: c.cta, href: contact }} />
    </>
  );
}
