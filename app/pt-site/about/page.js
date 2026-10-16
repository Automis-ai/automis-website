import AutomisEnShell from "@/components/site/AutomisEnShell";
import AboutView from "@/components/v2/about/AboutView";

export const metadata = {
  title: "Sobre nós | Automis, agência de automação de IA",
  description:
    "A Automis é um integrador estratégico de IA. Conheça os dois fundadores que desenham e lançam os sistemas de IA que faltam ao seu negócio.",
  keywords: [
    "quem é a Automis",
    "integrador de IA",
    "IA liderada pelos fundadores",
    "integrador estratégico de IA",
    "equipa de automação de IA",
    "IA e RGPD",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/about",
    languages: {
      en: "https://automis.ai/about",
      "it-IT": "https://automis.ai/it/about",
      "pt-PT": "https://automis.ai/pt/about",
      "x-default": "https://automis.ai/about",
    },
  },
  openGraph: {
    title: "Sobre nós | Automis, envolvidos em cada projeto de IA",
    description:
      "Um integrador estratégico de IA liderado pelos fundadores. Desenhamos, construímos e lançamos os sistemas de IA que faltam ao seu negócio, e fica sua a propriedade do que entregamos.",
    url: "https://automis.ai/pt/about",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, dois fundadores envolvidos em cada projeto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre nós | Automis, envolvidos em cada projeto de IA",
    description:
      "Um integrador estratégico de IA liderado pelos fundadores. Desenhamos, construímos e lançamos os sistemas de IA que faltam ao seu negócio.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function AboutPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <AboutView lang="pt" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
