import Link from "next/link";
import AutomisItShell from "@/components/site/AutomisItShell";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { ArrowUpRight } from "lucide-react";
import IdeaCard from "./IdeaCard";
import { SETTORI } from "./settoriData";

// Pagina dedicata a un settore (/it/intelligenza-artificiale-per-<settore>): H1, idee, la guida del settore come unico passo.
export function settoreBySlug(slug) {
  return SETTORI.find((s) => s.pagina?.slug === slug);
}

export function settoreMetadata(slug) {
  const s = settoreBySlug(slug);
  const p = s.pagina;
  const url = `https://automis.ai/it/${p.slug}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url, languages: { "it-IT": url } },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      siteName: "Automis",
      type: "website",
      locale: "it_IT",
      images: ["/assets/og/home-en.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function SettorePage({ slug }) {
  const s = settoreBySlug(slug);
  const p = s.pagina;
  return (
    <AutomisItShell>
      <Section id="idee" className="bg-[#020a12]" pad="pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <SectionHeading
          as="h1"
          eyebrow="Automazioni IA"
          title={p.h1}
          lead={p.intro}
          titleClassName="mx-auto max-w-[20ch] sm:max-w-[24ch]"
        />
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.idee.map(([mode, titolo, testo], i) => (
              <Reveal key={titolo} delay={i * 40}>
                <IdeaCard mode={mode} titolo={titolo} testo={testo} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href={`/it/guide?g=${s.guida}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F5CD79] px-6 py-3 text-[14.5px] font-semibold text-[#020a12] transition-opacity hover:opacity-90"
            >
              Ricevi la guida per {p.breve}, gratis
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/it/automazioni-ia#per-settore" className="text-[14px] font-medium text-[#8fe0f0] transition-colors hover:text-white">
              Tutte le automazioni, per settore
            </Link>
          </div>
        </div>
      </Section>
    </AutomisItShell>
  );
}
