import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import FounderCards from "./FounderCards";
import PrincipleCards from "./PrincipleCards";
import Guarantee from "./Guarantee";
import { heroTitle } from "@/components/v2/systems/heroTitle";

/* Chi siamo: fondatori, come costruiamo (privacy compresa), garanzia. Il ritmo: scuro, un solo momento blu (fondatori), blu notte, scuro, chiusura.
   Cornice (AutomisEnShell) e metadati stanno nel file di rotta. `tono`: ?tono= della preview. */
export default function AboutView({ lang, tono }) {
  const t = getCopy("about", lang);
  const c = getCopy("common", lang);
  const moreLabel = getCopy("systems", lang).labels.more;
  const contact = addLangPrefix("/contact", lang);

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      {lang === "it" ? (
        <PageHeroV3
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.accent}
          lead={t.hero.lead}
          cta={{ label: "Conosci i fondatori", href: "#fondatori" }}
        />
      ) : (
        <PageHero
          size="compact"
          eyebrow={t.hero.eyebrow}
          {...heroTitle(t.hero.title, t.hero.accent)}
          subtitle={t.hero.lead}
          primaryCta={{ label: c.cta, href: contact }}
        />
      )}

      <Section tone="light" id="fondatori">
        <SectionHeader title={t.founders.title} />
        <FounderCards items={t.founders.items} moreLabel={moreLabel} profileLabel={t.founders.profileLabel} />
      </Section>

      <Section tone="deep">
        <SectionHeader title={t.principles.title} />
        <PrincipleCards items={t.principles.items} moreLabel={moreLabel} />
      </Section>

      <Section tone="dark" pad="sm">
        <Guarantee
          title={t.guarantee.title}
          number={t.guarantee.number}
          unit={t.guarantee.unit}
          line={t.guarantee.line}
        />
      </Section>

      <CtaBand tone="dark" title={t.cta.title} line={t.cta.line} button={{ label: c.cta, href: contact }} />
    </main>
  );
}
