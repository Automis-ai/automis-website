import AutomisEnShell from "@/components/site/AutomisEnShell";
import AboutView from "@/components/v2/about/AboutView";

export const metadata = {
  title: "Chi siamo | Automis, agenzia di automazione IA",
  description:
    "Automis è un integratore IA strategico, guidato dai fondatori. Conosci i due founder che progettano e lanciano i sistemi IA che mancano al tuo business.",
  keywords: [
    "chi è Automis",
    "integratore IA",
    "IA guidata dai fondatori",
    "integratore IA strategico",
    "team automazione IA",
    "IA GDPR",
  ],
  alternates: {
    canonical: "https://automis.ai/it/about",
    languages: {
      en: "https://automis.ai/about",
      "it-IT": "https://automis.ai/it/about",
      "pt-PT": "https://automis.ai/pt/about",
      "x-default": "https://automis.ai/about",
    },
  },
  openGraph: {
    title: "Chi siamo | Automis, coinvolti in ogni progetto IA",
    description:
      "Un integratore IA strategico guidato dai fondatori. Progettiamo, costruiamo e lanciamo i sistemi IA che mancano al tuo business, e tu possiedi ciò che consegniamo.",
    url: "https://automis.ai/it/about",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, due fondatori coinvolti in ogni progetto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi siamo | Automis, coinvolti in ogni progetto IA",
    description:
      "Un integratore IA strategico guidato dai fondatori. Progettiamo, costruiamo e lanciamo i sistemi IA che mancano al tuo business.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function AboutPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <AboutView lang="it" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
