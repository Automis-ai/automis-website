// Server component: emits SoftwareApplication + FAQPage + BreadcrumbList JSON-LD
// for an individual tool page (one script, array of nodes = valid schema.org).
import { TOOLS, toolUrl, hubUrl, SITE } from "@/utility/toolsData";

export default function ToolJsonLd({ toolKey, locale }) {
  const tool = TOOLS[toolKey];
  const c = tool[locale];
  const url = toolUrl(toolKey, locale);
  const isIt = locale === "it";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: c.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    url,
    description: c.metaDescription,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    provider: { "@type": "Organization", name: "Automis", url: SITE },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: isIt ? `${SITE}/it` : SITE },
      { "@type": "ListItem", position: 2, name: isIt ? "Strumenti" : "Tools", item: hubUrl(locale) },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareApp, faqPage, breadcrumb]) }}
    />
  );
}
