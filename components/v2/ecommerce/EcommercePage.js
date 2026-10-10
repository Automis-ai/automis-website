import "../ui/v2.css";
import "./ecommerce.css";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import Hero from "@/components/v2/ui/Hero";
import Accent from "@/components/v2/ui/Accent";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import PlatformPicker, { PLATFORM_ACCENTS } from "@/components/v2/ui/PlatformPicker";
import CardGrid from "@/components/v2/ui/CardGrid";
import SystemCard from "@/components/v2/ui/SystemCard";
import CtaBand from "@/components/v2/ui/CtaBand";
import Button from "@/components/v2/ui/Button";
import NightReport from "@/components/v2/ecommerce/NightReport";
import PlatformModules from "@/components/v2/ecommerce/PlatformModules";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";

// Un'icona per ciascuno dei tre punti di «Decidi sempre tu», nell'ordine del copy.
const CONTROL_ICONS = ["shield", "check", "repeat"];

/* Pagina prodotto «AI E-commerce Manager» (/ecommerce). Una sola per le tre lingue:
   le tre rotte (app/ecommerce, app/it/ecommerce, app/pt-site/ecommerce) passano solo `locale`. */
export default function EcommercePage({ locale }) {
  const t = getCopy("ecommerce", locale);
  const contact = addLangPrefix("/contact", locale);

  // Il nome del prodotto si legge come «AI» + nome: l'enfasi cade sul nome, non su «AI».
  const m = /^(AI )(.+)$/.exec(t.hero.title);
  const title = m ? (
    <>
      {m[1]}
      <Accent>{m[2]}</Accent>
    </>
  ) : (
    t.hero.title
  );

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
      <Hero
        eyebrow={t.hero.eyebrow}
        title={title}
        subtitle={t.hero.lead}
        primaryCta={{ label: t.hero.cta, href: "#platforms" }}
        media={
          <NightReport
            title={t.hero.visual.title}
            caption={t.hero.visual.caption}
            rows={t.hero.visual.rows}
          />
        }
      />

      <Section tone="light" id="platforms">
        <SectionHeader title={t.platforms.title} lead={t.platforms.note} />
        <PlatformPicker items={platforms} className="v2e-plat" />
        <PlatformModules
          items={t.platforms.items}
          summarySuffix={t.platforms.modulesSummary}
          hrefLang={locale === "it" ? undefined : "it"}
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
        tone="light"
        title={t.cta.title}
        line={t.cta.line}
        button={{ label: t.cta.button, href: contact }}
      />

      <Section tone="light" pad="sm" width="narrow">
        <p className="v2e-legal">{t.legal}</p>
      </Section>
    </AutomisEnShell>
  );
}
