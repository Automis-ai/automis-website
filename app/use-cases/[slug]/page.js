import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug);
  if (!c) return {};
  const url = `https://automis.ai/use-cases/${c.slug}`;
  const title = `${c.shortClient} | ${c.tag} case study, Automis`;
  const description = `${c.headline} ${c.summary}`.slice(0, 300);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "it-IT": `https://automis.ai/it/use-cases/${c.slug}`,
        "x-default": url,
      },
    },
    openGraph: { title, description, url, siteName: "Automis", type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPage({ params }) {
  return <CaseStudyDetail slug={params.slug} locale="en" />;
}
