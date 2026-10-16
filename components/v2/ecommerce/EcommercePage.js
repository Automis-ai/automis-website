import "../ui/v2.css";
import "./ecommerce.css";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import PlatformPicker, { PLATFORM_ACCENTS } from "@/components/v2/ui/PlatformPicker";
import CardGrid from "@/components/v2/ui/CardGrid";
import SystemCard from "@/components/v2/ui/SystemCard";
import CtaBand from "@/components/v2/ui/CtaBand";
import Button from "@/components/v2/ui/Button";
import { pageClass } from "@/components/v2/ui/toneClass";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import NightReport from "@/components/v2/ecommerce/NightReport";
import PlatformModules from "@/components/v2/ecommerce/PlatformModules";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";

// Un'icona per ciascuno dei tre punti di «Decidi sempre tu», nell'ordine del copy.
const CONTROL_ICONS = ["shield", "check", "repeat"];

/* Pagina prodotto «AI E-commerce Manager» (/ecommerce). Una sola per le tre lingue:
   le tre rotte (app/ecommerce, app/it/ecommerce, app/pt-site/ecommerce) passano solo `locale`. */
export default function EcommercePage({ locale, tono }) {
  const t = getCopy("ecommerce", locale);
  const contact = addLangPrefix("/contact", locale);

  // Il nome del prodotto si legge come «AI» + nome: l'enfasi cade sul nome, non su «AI».
  const m = /^(AI )(.+)$/.exec(t.hero.title);
  const highlight = m ? m[2] : undefined;

  // Le due landing esistono solo in italiano: le pagine EN e PT lo dicono con un'etichetta e con lang="it".
  const platforms = t.platforms.items.map((p) => ({
    name: p.name,
    line: p.line,
    href: p.href,
    accent: PLATFORM_ACCENTS[p.id],
    langTag: t.platforms.langTag || undefined,
  }));

  return (
    <AutomisEnShell>
      <main id="main" className={pageClass(tono)}>
        <SmoothScroll />
        <PageStory />
        {(() => {
          const night = <NightReport title={t.hero.visual.title} caption={t.hero.visual.caption} rows={t.hero.visual.rows} />;
          return (
            <PageHeroV3
              eyebrow={t.hero.eyebrow}
              title={t.hero.title}
              highlight={highlight}
              lead={t.hero.lead}
              cta={{ label: t.hero.cta, href: "#platforms" }}
              below={night}
            />
          );
        })()}

        <Section tone="light" id="platforms">
          <SectionHeader title={t.platforms.title} lead={t.platforms.note} />
          <PlatformPicker items={platforms} className="v2e-plat" />
          <PlatformModules
            items={t.platforms.items}
            summarySuffix={t.platforms.modulesSummary}
          />
          <div className="v2e-other">
            <Button href={contact} variant="link">
              {t.platforms.other}
            </Button>
          </div>
        </Section>

        <Section tone="deep">
          <SectionHeader title={t.control.title} />
          <CardGrid cols={3}>
            {t.control.items.map((it, i) => (
              <SystemCard key={it.title} title={it.title} line={it.line} icon={CONTROL_ICONS[i]} />
            ))}
          </CardGrid>
        </Section>

        <CtaBand
          tone="dark"
          title={t.cta.title}
          line={t.cta.line}
          button={{ label: t.cta.button, href: contact }}
        />

        {t.legal ? (
          <Section tone="dark" pad="sm" width="narrow">
            <p className="v2e-legal">{t.legal}</p>
          </Section>
        ) : null}
      </main>
    </AutomisEnShell>
  );
}
