import UseCasesIndex from "@/components/use-cases/UseCasesIndex";

export const metadata = {
  title: "Casi studio | Sistemi IA già attivi per i clienti Automis",
  description:
    "Casi studio di Automis: una segretaria IA attiva 24/7 per una clinica dentistica di Lisbona e un'automazione lead su Meta per un'azienda finanziaria italiana. Clienti veri, sistemi veri.",
  keywords: [
    "casi studio automazione IA",
    "caso studio segretaria IA",
    "automazione lead Meta",
    "IA per cliniche dentistiche",
    "IA per la finanza",
  ],
  alternates: {
    canonical: "https://automis.ai/it/use-cases",
    languages: {
      en: "https://automis.ai/use-cases",
      "it-IT": "https://automis.ai/it/use-cases",
      "x-default": "https://automis.ai/use-cases",
    },
  },
  openGraph: {
    title: "Casi studio Automis | Sistemi IA reali per clienti veri, già attivi",
    description:
      "Guarda i sistemi IA che abbiamo costruito per clienti veri: una segretaria IA attiva 24/7 e un'automazione lead su Meta. Fatti concreti, non promesse.",
    url: "https://automis.ai/it/use-cases",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casi studio Automis | Sistemi IA reali per clienti veri, già attivi",
    description:
      "Guarda i sistemi IA che abbiamo costruito per clienti veri: una segretaria IA attiva 24/7 e un'automazione lead su Meta.",
  },
};

export default function UseCasesPageIt() {
  return <UseCasesIndex locale="it" />;
}
