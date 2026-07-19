import UseCasesIndex from "@/components/use-cases/UseCasesIndex";

export const metadata = {
  title: "Casos de estudo | Sistemas de IA já a funcionar para clientes Automis",
  description:
    "Casos de estudo Automis: um assistente de voz IA 24/7 para uma clínica dentária de Lisboa e uma automação de contactos na Meta para uma empresa financeira italiana.",
  keywords: [
    "casos de estudo automação IA",
    "caso de estudo assistente de voz IA",
    "automação de contactos Meta",
    "IA para clínicas dentárias",
    "IA para finanças",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/use-cases",
    languages: {
      en: "https://automis.ai/use-cases",
      "it-IT": "https://automis.ai/it/use-cases",
      "pt-PT": "https://automis.ai/pt/use-cases",
      "x-default": "https://automis.ai/use-cases",
    },
  },
  openGraph: {
    title: "Casos de estudo Automis | Sistemas de IA reais para clientes reais, já a funcionar",
    description:
      "Veja os sistemas de IA que construímos para clientes reais: um assistente de voz IA disponível 24/7 e uma automação de contactos na Meta. Provas, não promessas.",
    url: "https://automis.ai/pt/use-cases",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casos de estudo Automis | Sistemas de IA reais para clientes reais, já a funcionar",
    description:
      "Veja os sistemas de IA que construímos para clientes reais: um assistente de voz IA disponível 24/7 e uma automação de contactos na Meta.",
  },
};

export default function UseCasesPagePt() {
  return <UseCasesIndex locale="pt" />;
}
