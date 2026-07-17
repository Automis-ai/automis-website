// Server component: shared SEO shell for a single tool page.
// Renders breadcrumb, H1 + intro, the interactive widget (children),
// "why it matters", FAQ, and a soft CTA, plus JSON-LD.
import AutomisEnShell from "@/components/site/AutomisEnShell";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { getCtaHref } from "@/utility/ctaLinks";
import { PATHNAMES, hrefFor } from "@/utility/pathnames";
import { TOOLS, hubPath } from "@/utility/toolsData";
import ToolJsonLd from "@/components/tools/ToolJsonLd";
import FaqAccordion from "@/components/tools/FaqAccordion";

export default function ToolPage({ toolKey, locale, children }) {
  const tool = TOOLS[toolKey];
  const c = tool[locale];
  const isIt = locale === "it";

  const ctaHref =
    tool.ctaTarget === "voiceai"
      ? hrefFor(PATHNAMES.services.voiceAI, locale)
      : getCtaHref("booking", locale);
  const ctaExternal = tool.ctaTarget !== "voiceai";

  return (
    <AutomisEnShell>
      <ToolJsonLd toolKey={toolKey} locale={locale} />
      <section className="bg-blue-darkest px-5 pb-20 pt-32 text-white md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href={hrefFor(PATHNAMES.home, locale)} className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={hubPath(locale)} className="hover:text-white">{isIt ? "Strumenti" : "Tools"}</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{c.name}</span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{c.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{c.intro}</p>

          <div className="mt-10">{children}</div>

          <div className="mt-16">
            <h2 className="mb-4 text-2xl font-semibold">{isIt ? "Perche' conta" : "Why it matters"}</h2>
            <div className="space-y-4 leading-relaxed text-white/70">
              {c.why.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-4 text-2xl font-semibold">{isIt ? "Domande frequenti" : "Frequently asked questions"}</h2>
            <FaqAccordion faqs={c.faqs} />
          </div>

          <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-2xl font-semibold">{c.cta.label}</h2>
            <p className="mt-2 text-white/60">{c.cta.sub}</p>
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
