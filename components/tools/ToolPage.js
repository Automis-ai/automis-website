// Server component: shared SEO shell for a single tool page.
// Renders breadcrumb, H1 + intro, the interactive widget (children),
// "why it matters", FAQ, and a soft CTA, plus JSON-LD.
import AutomisEnShell from "@/components/site/AutomisEnShell";
import Link from "next/link";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import "@/components/home-v3/home-v3.css";
import "./tools-v3.css";
import CTAButton from "@/components/CTAButton";
import { getCtaHref } from "@/utility/ctaLinks";
import { PATHNAMES, hrefFor } from "@/utility/pathnames";
import { TOOLS, hubPath } from "@/utility/toolsData";
import ToolJsonLd from "@/components/tools/ToolJsonLd";
import FaqAccordion from "@/components/tools/FaqAccordion";

// Le ultime parole del titolo vanno in azzurro, come nelle altre hero v3.
const lastWords = (t, n) => t.split(" ").slice(-n).join(" ");

const LABELS = {
  en: { tools: "Tools", why: "Why it matters", faq: "Frequently asked questions" },
  it: { tools: "Strumenti", why: "Perche' conta", faq: "Domande frequenti" },
  pt: { tools: "Ferramentas", why: "Porque é importante", faq: "Perguntas frequentes" },
};

export default function ToolPage({ toolKey, locale, children }) {
  const tool = TOOLS[toolKey];
  const c = tool[locale];
  const l = LABELS[locale] || LABELS.en;

  const ctaHref =
    tool.ctaTarget === "voiceai"
      ? hrefFor(PATHNAMES.services.voiceAI, locale)
      : getCtaHref("booking", locale);
  const ctaExternal = tool.ctaTarget !== "voiceai";

  return (
    <AutomisEnShell>
      <ToolJsonLd toolKey={toolKey} locale={locale} />
      <PageHeroV3
        className="hv3-hero--short"
        eyebrow={l.tools}
        title={c.h1}
        highlight={lastWords(c.h1, 2)}
        lead={c.intro}
      />

      <section className="hv3 hv3-tone hv3-tools">
        <div className="hv3-tools__col">
          <nav aria-label="Breadcrumb" className="hv3-crumb">
            <Link href={hrefFor(PATHNAMES.home, locale)}>Home</Link>
            <span className="mx-2">/</span>
            <Link href={hubPath(locale)}>{l.tools}</Link>
            <span className="mx-2">/</span>
            <span className="is-cur">{c.name}</span>
          </nav>

          <div>{children}</div>

          <div className="hv3-tools__sec">
            <h2 className="hv3-toolh font-display">{l.why}</h2>
            <div className="space-y-4">
              {c.why.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="hv3-tools__sec">
            <h2 className="hv3-toolh font-display">{l.faq}</h2>
            <FaqAccordion faqs={c.faqs} />
          </div>

          <div className="hv3-toolcta">
            <h2 className="font-display">{c.cta.label}</h2>
            <p>{c.cta.sub}</p>
            <div className="mt-6 flex justify-center">
              <CTAButton href={ctaHref} external={ctaExternal} variant="primary" size="large">
                {c.cta.label}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </AutomisEnShell>
  );
}
