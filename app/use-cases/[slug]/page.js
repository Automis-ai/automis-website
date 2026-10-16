import { LangTwins } from "@/components/LanguageSwitcher";
import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";
import { metaLongForm } from "@/components/use-cases/longform";
import { V2_CASE_SLUGS, getV2Case } from "@/components/v2/use-cases/registry";
import { getItCase } from "@/components/v2/use-cases/itCases";

export function generateStaticParams() {
  // I casi costruiti sul kit v2 (Album AI, Datura Clothing) non stanno in CASES: i loro slug si aggiungono qui.
  return [...CASES.map((c) => ({ slug: c.slug })), ...V2_CASE_SLUGS.map((slug) => ({ slug }))];
}

export function generateMetadata({ params }) {
  const v2 = getV2Case(params.slug);
  if (v2) return v2.metadata("en");
  const c = getCase(params.slug);
  if (!c) return {};
  const url = `https://automis.ai/use-cases/${c.slug}`;
  // I casi con pagina propria portano title, description e immagine social del pezzo.
  const m = c.longForm ? metaLongForm(c.slug, "en") : null;
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
  // Lo slug è lo stesso in tutte le lingue: lo dichiariamo al selettore e al piede già sul server.
  const v2 = getV2Case(params.slug);
  // Clínica e ADifesa: pagina nello stile nuovo (stessa dell'italiano, testi nella lingua). L'articolo lungo resta nel repo, non più montato.
  const NewCase = getItCase(params.slug);
  return (
    <LangTwins path={`/use-cases/${params.slug}`}>
      {v2 ? <v2.Case locale="en" /> : NewCase ? <NewCase locale="en" /> : <CaseStudyDetail slug={params.slug} locale="en" />}
    </LangTwins>
  );
}
