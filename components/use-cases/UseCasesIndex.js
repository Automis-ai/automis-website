import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import CtaBand from "@/components/v2/ui/CtaBand";
import CaseCard from "@/components/v2/use-cases/CaseCard";
import Seam from "@/components/v2/use-cases/Seam";
import { CHAINS } from "@/components/v2/use-cases/constants";
import { CASES } from "@/components/use-cases/cases";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/*
  Indice dei casi studio (v2): apertura centrata e compatta, una scheda per caso (logo o nome del cliente, numero con la sua
  base, la catena dei suoi moduli veri, titolo) che si inclina in 3D, chiusura con un solo invito. Quattro casi: Clínica,
  ADifesa, Album AI, Datura Clothing. Testi da getCopy("use-cases", locale); i logo vengono da cases.js; i moduli di
  ogni caso da constants.js (CHAINS).
  Fra la hero e le schede, nella sfumatura, una fila di tessere di vetro: il primo modulo di ciascun caso, collegate da un
  filo (Seam). La scena 3D della hero chiede il preset «casi» (call, social, camera, shield: i moduli veri dei quattro casi);
  il preset va aggiunto a components/v2/wow/fx/scene/presets.js (richiesta in coda al giro): finché non c'è il motore ripiega su «generic».
*/
export default function UseCasesIndex({ locale = "en" }) {
  const t = getCopy("use-cases", locale);
  const common = getCopy("common", locale);

  return (
    <AutomisEnShell>
      <main id="main">
      {locale === "it" ? (
        <PageHeroV3
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.highlight}
          lead={t.hero.lead}
          cta={{ label: "Scopri i casi", href: "#casi" }}
        />
      ) : (
        <PageHero
          size="compact"
          scene="casi"
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.highlight}
          subtitle={t.hero.lead}
        />
      )}

      <Seam glyphs={t.items.map((item) => (CHAINS[item.slug] || [])[0]).filter(Boolean)} />
      <Section tone="light" className="v2c-edge" id="casi">
        <div className="v2c-grid" data-fx="stagger">
          {t.items.map((item, i) => (
            <CaseCard
              key={item.slug}
              index={i}
              item={item}
              logoSrc={CASES.find((c) => c.slug === item.slug)?.logo}
              href={addLangPrefix(item.href, locale)}
              linkLabel={common.ui.readCase}
            />
          ))}
        </div>
      </Section>

      <div className="v2c-cta">
        <CtaBand
          title={t.cta.title}
          line={t.cta.line}
          button={{ label: common.cta, href: addLangPrefix("/contact", locale) }}
        />
      </div>
      </main>
    </AutomisEnShell>
  );
}
