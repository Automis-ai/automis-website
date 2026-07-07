import UseCasesIndex from "@/components/use-cases/UseCasesIndex";

export const metadata = {
  title: "Use Cases | Real AI systems, already running for Automis clients",
  description:
    "Case studies from Automis: a 24/7 Voice AI receptionist for a Lisbon dental clinic and Meta lead automation for an Italian finance business. Real clients, real systems.",
  keywords: [
    "AI automation case studies",
    "AI voice receptionist case study",
    "Meta lead automation",
    "AI for dental clinics",
    "AI for finance",
  ],
  alternates: {
    canonical: "https://automis.ai/use-cases",
    languages: {
      en: "https://automis.ai/use-cases",
      "it-IT": "https://automis.ai/it/use-cases",
      "x-default": "https://automis.ai/use-cases",
    },
  },
  openGraph: {
    title: "Automis Use Cases | Real client AI systems, already running",
    description:
      "See the AI systems we built for real clients: a 24/7 Voice AI receptionist and Meta lead automation. Proof, not promises.",
    url: "https://automis.ai/use-cases",
    siteName: "Automis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automis Use Cases | Real client AI systems, already running",
    description:
      "See the AI systems we built for real clients: a 24/7 Voice AI receptionist and Meta lead automation.",
  },
};

export default function UseCasesPage() {
  return <UseCasesIndex locale="en" />;
}
