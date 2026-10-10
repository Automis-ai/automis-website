import { LangTwins } from "@/components/LanguageSwitcher";
import { CASES, getCase } from "@/components/use-cases/cases";
import CaseStudyDetail from "@/components/use-cases/CaseStudyDetail";
import { metaLongForm } from "@/components/use-cases/longform";
import AlbumAiCase from "@/components/v2/use-cases/AlbumAiCase";
import { ALBUM_AI_SLUG } from "@/components/v2/use-cases/constants";
import { albumMetadata } from "@/components/v2/use-cases/meta";

export function generateStaticParams() {
  // Album AI non sta in CASES (non ha il template sfida/soluzione/risultati): lo slug si aggiunge qui.
  return [...CASES.map((c) => ({ slug: c.slug })), { slug: ALBUM_AI_SLUG }];
}

export function generateMetadata({ params }) {
  if (params.slug === ALBUM_AI_SLUG) return albumMetadata("pt");
  const c = getCase(params.slug, "pt");
  if (!c) return {};
  const url = `https://automis.ai/pt/use-cases/${c.slug}`;
  // I casi con pagina propria portano title, description e immagine social del pezzo.
  const m = c.longForm ? metaLongForm(c.slug, "pt") : null;
  const title = m ? m.titolo : `${c.shortClient} | Caso de estudo ${c.tag}, Automis`;
  const description = m
    ? m.descrizione
    : c.metaDescription || `${c.headline} ${c.summary}`.slice(0, 155);
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
    openGraph: { title, description, url, siteName: "Automis", locale: "pt_PT", type: "article", images: [m ? m.og : "/assets/og/home-en.png"] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPagePt({ params }) {
  // Lo slug è lo stesso in tutte le lingue: lo dichiariamo al selettore e al piede già sul server.
  return (
    <LangTwins path={`/use-cases/${params.slug}`}>
      {params.slug === ALBUM_AI_SLUG ? <AlbumAiCase locale="pt" /> : <CaseStudyDetail slug={params.slug} locale="pt" />}
    </LangTwins>
  );
}
