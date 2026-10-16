// Server component: the /tools hub. Lists the tools as cards and emits
// ItemList + BreadcrumbList JSON-LD.
import AutomisEnShell from "@/components/site/AutomisEnShell";
import Link from "next/link";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import "@/components/home-v3/home-v3.css";
import "./tools-v3.css";
import { PATHNAMES, hrefFor } from "@/utility/pathnames";
import { TOOLS, TOOLS_ORDER, toolPath, toolUrl, HUB, hubUrl, SITE } from "@/utility/toolsData";

const HERO_CTA = { en: "See the tools", it: "Vedi gli strumenti", pt: "Ver as ferramentas" };
// Le ultime parole del titolo vanno in azzurro, come nelle altre hero v3.
const lastWords = (t, n) => t.split(" ").slice(-n).join(" ");
const TOOLS_LABEL = { en: "Tools", it: "Strumenti", pt: "Ferramentas" };
const homeItem = (locale) =>
  locale === "it" ? `${SITE}/it` : locale === "pt" ? `${SITE}/pt` : SITE;

export default function ToolsHub({ locale }) {
  const h = HUB[locale];
  const toolsLabel = TOOLS_LABEL[locale] || TOOLS_LABEL.en;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TOOLS_ORDER.map((key, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: TOOLS[key][locale].name,
      url: toolUrl(key, locale),
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeItem(locale) },
      { "@type": "ListItem", position: 2, name: toolsLabel, item: hubUrl(locale) },
    ],
  };

  return (
    <AutomisEnShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemList, breadcrumb]) }}
      />
      <PageHeroV3
        eyebrow={toolsLabel}
        title={h.h1}
        highlight={lastWords(h.h1, 2)}
        lead={h.intro}
        cta={{ label: HERO_CTA[locale] || HERO_CTA.en, href: "#strumenti" }}
      />

      <section id="strumenti" className="hv3 hv3-tone hv3-tools hv3-tools--hub">
        <div className="hv3-tools__in">
          <nav aria-label="Breadcrumb" className="hv3-crumb">
            <Link href={hrefFor(PATHNAMES.home, locale)}>Home</Link>
            <span className="mx-2">/</span>
            <span className="is-cur">{toolsLabel}</span>
          </nav>

          <div className="hv3-tgrid">
            {TOOLS_ORDER.map((key) => {
              const t = TOOLS[key];
              const c = t[locale];
              return (
                <Link key={key} href={toolPath(key, locale)} className="hv3-tcard">
                  <span className="hv3-tcard__ico" aria-hidden="true">{t.icon}</span>
                  <h2 className="font-display">{c.name}</h2>
                  <p>{c.metaDescription}</p>
                  <span className="hv3-tcard__go">
                    {h.cardCta} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </AutomisEnShell>
  );
}
