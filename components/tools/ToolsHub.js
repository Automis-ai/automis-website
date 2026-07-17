// Server component: the /tools hub. Lists the tools as cards and emits
// ItemList + BreadcrumbList JSON-LD.
import AutomisEnShell from "@/components/site/AutomisEnShell";
import Link from "next/link";
import { PATHNAMES, hrefFor } from "@/utility/pathnames";
import { TOOLS, TOOLS_ORDER, toolPath, toolUrl, HUB, hubUrl, SITE } from "@/utility/toolsData";

export default function ToolsHub({ locale }) {
  const h = HUB[locale];
  const isIt = locale === "it";

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
      { "@type": "ListItem", position: 1, name: "Home", item: isIt ? `${SITE}/it` : SITE },
      { "@type": "ListItem", position: 2, name: isIt ? "Strumenti" : "Tools", item: hubUrl(locale) },
    ],
  };

  return (
    <AutomisEnShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemList, breadcrumb]) }}
      />
      <section className="bg-blue-darkest px-5 pb-20 pt-32 text-white md:px-8 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href={hrefFor(PATHNAMES.home, locale)} className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{isIt ? "Strumenti" : "Tools"}</span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{h.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{h.intro}</p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {TOOLS_ORDER.map((key) => {
              const t = TOOLS[key];
              const c = t[locale];
              return (
                <Link
                  key={key}
                  href={toolPath(key, locale)}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-blue-middle/60 hover:bg-white/[0.07]"
                >
                  <div className="mb-3 text-3xl">{t.icon}</div>
                  <h2 className="text-xl font-semibold text-white">{c.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{c.metaDescription}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-lightest">
                    {h.cardCta}
                    <span className="ml-1 transition-transform group-hover:translate-x-1">{"→"}</span>
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
