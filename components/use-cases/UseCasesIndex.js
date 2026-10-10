import AutomisEnShell from "@/components/site/AutomisEnShell";
import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import CtaBand from "@/components/v2/ui/CtaBand";
import CaseCard from "@/components/v2/use-cases/CaseCard";
import CategoryArt from "@/components/v2/systems/CategoryArt";
import { CASES } from "@/components/use-cases/cases";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/*
  Indice dei casi studio (v2): apertura scura, una scheda per caso (logo, numero con la sua base,
  titolo), chiusura con un solo invito. Testi da getCopy("use-cases", locale); i logo vengono da
  cases.js (Album AI è anonimo e ha un'icona al posto del logo).
*/
export default function UseCasesIndex({ locale = "en" }) {
  const t = getCopy("use-cases", locale);
  const common = getCopy("common", locale);

  return (
    <AutomisEnShell>
      <Hero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: addLangPrefix("/contact", locale) }}
        media={<CategoryArt icon="chart" items={["voice", "chat", "camera"]} />}
      />

      <Section tone="light">
        <div className="v2c-grid">
          {t.items.map((item) => (
            <CaseCard
              key={item.slug}
              item={item}
              logoSrc={CASES.find((c) => c.slug === item.slug)?.logo}
              href={addLangPrefix(item.href, locale)}
              linkLabel={common.ui.readCase}
            />
          ))}
        </div>
      </Section>

      <CtaBand
        title={t.cta.title}
        line={t.cta.line}
        button={{ label: common.cta, href: addLangPrefix("/contact", locale) }}
      />
    </AutomisEnShell>
  );
}
