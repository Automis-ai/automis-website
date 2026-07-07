import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug, "it");
  if (!c) return {};
  const url = `https://automis.ai/it/use-cases/${c.slug}`;
  const title = `${c.shortClient} | Caso studio ${c.tag}, Automis`;
  const description = `${c.headline} ${c.summary}`.slice(0, 300);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://automis.ai/use-cases/${c.slug}`,
        "it-IT": url,
        "x-default": `https://automis.ai/use-cases/${c.slug}`,
      },
    },
    openGraph: { title, description, url, siteName: "Automis", locale: "it_IT", type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPageIt({ params }) {
  return <CaseStudyDetail slug={params.slug} locale="it" />;
}
