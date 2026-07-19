import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug, "pt");
  if (!c) return {};
  const url = `https://automis.ai/pt/use-cases/${c.slug}`;
  const title = `${c.shortClient} | Caso de estudo ${c.tag}, Automis`;
  const description =
    c.metaDescription || `${c.headline} ${c.summary}`.slice(0, 155);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://automis.ai/use-cases/${c.slug}`,
        "it-IT": `https://automis.ai/it/use-cases/${c.slug}`,
        "pt-PT": url,
        "x-default": `https://automis.ai/use-cases/${c.slug}`,
      },
    },
    openGraph: { title, description, url, siteName: "Automis", locale: "pt_PT", type: "article", images: ["/assets/og/home-en.png"] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPagePt({ params }) {
  return <CaseStudyDetail slug={params.slug} locale="pt" />;
}
