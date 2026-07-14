import AutomisItShell from "@/components/site/AutomisItShell";
import JumpstartHeroIT from "@/components/it/jumpstart/JumpstartHeroIT";
import Step1FreeConsultationIT from "@/components/it/jumpstart/Step1FreeConsultationIT";
import Step2JumpstartAuditIT from "@/components/it/jumpstart/Step2JumpstartAuditIT";
import SampleAuditDownloadIT from "@/components/it/jumpstart/SampleAuditDownloadIT";
import WhoItsForIT from "@/components/it/jumpstart/WhoItsForIT";
import JumpstartFaqIT from "@/components/it/jumpstart/JumpstartFaqIT";
import JumpstartBookingIT from "@/components/it/jumpstart/JumpstartBookingIT";

export const metadata = {
  title: "Jumpstart Audit Marketing e IA | Automis, scopri dove perdi tempo e denaro",
  description:
    "Si parte con una call gratuita. La Jumpstart Audit completa (1.450 euro) è un'analisi di due settimane: intervistiamo il tuo team, analizziamo funnel e spesa ads e ti consegniamo un piano basato sui dati più un'automazione live.",
  keywords: [
    "Jumpstart Audit",
    "audit marketing e IA",
    "consulenza IA gratuita",
    "audit automazione aziendale",
    "analisi opportunità IA",
    "call strategica automazione",
  ],
  alternates: { canonical: "https://automis.ai/it/jumpstart-audit" },
  openGraph: {
    title: "Jumpstart Audit Marketing e IA | Automis",
    description:
      "Una call gratuita per iniziare, poi una Jumpstart Audit di due settimane (1.450 euro): interviste, analisi reale e un piano concreto su cui agire.",
    url: "https://automis.ai/it/jumpstart-audit",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, Jumpstart Audit Marketing e IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumpstart Audit Marketing e IA | Automis",
    description:
      "Consulenza gratuita di 30 minuti, poi una Jumpstart Audit approfondita (1.450 euro) con un piano basato sui dati e un'automazione live in 14 giorni.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function JumpstartAuditPageIT() {
  return (
    <AutomisItShell>
      <JumpstartHeroIT />
      <Step1FreeConsultationIT />
      <Step2JumpstartAuditIT />
      <SampleAuditDownloadIT />
      <WhoItsForIT />
      <JumpstartFaqIT />
      <JumpstartBookingIT />
    </AutomisItShell>
  );
}
