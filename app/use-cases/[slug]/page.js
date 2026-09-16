import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";
import { CASO } from "@/components/use-cases/clinica/meta";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug);
  if (!c) return {};
  const url = `https://automis.ai/use-cases/${c.slug}`;
  // I casi con pagina propria portano title, description e immagine social del pezzo.
  const m = c.longForm ? CASO["en"] : null;
  const title = m ? m.titolo : `${c.shortClient} | ${c.tag} case study, Automis`;
  const description = m
    ? m.descrizione
    : c.metaDescription || `${c.headline} ${c.summary}`.slice(0, 155);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "it-IT": `https://automis.ai/it/use-cases/${c.slug}`,
        "pt-PT": `https://automis.ai/pt/use-cases/${c.slug}`,
        "x-default": url,
      },
    },
    openGraph: { title, description, url, siteName: "Automis", type: "article", images: [m ? m.og : "/assets/og/home-en.png"] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPage({ params }) {
  return <CaseStudyDetail slug={params.slug} locale="en" />;
}
