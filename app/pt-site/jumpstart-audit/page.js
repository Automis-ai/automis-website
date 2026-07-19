import AutomisEnShell from "@/components/site/AutomisEnShell";
import JumpstartHeroPT from "@/components/pt/jumpstart/JumpstartHeroPT";
import Step1FreeConsultationPT from "@/components/pt/jumpstart/Step1FreeConsultationPT";
import Step2JumpstartAuditPT from "@/components/pt/jumpstart/Step2JumpstartAuditPT";
import SampleAuditDownloadPT from "@/components/pt/jumpstart/SampleAuditDownloadPT";
import WhoItsForPT from "@/components/pt/jumpstart/WhoItsForPT";
import JumpstartFaqPT from "@/components/pt/jumpstart/JumpstartFaqPT";
import JumpstartBookingPT from "@/components/pt/jumpstart/JumpstartBookingPT";

export const metadata = {
  title: "Jumpstart Audit de Marketing e IA | Automis, descubra onde perde tempo e dinheiro",
  description:
    "Comece com uma chamada gratuita, depois a Jumpstart Audit (1.450 euros): duas semanas de entrevistas, análise de funnel e ads e um plano baseado nos dados.",
  keywords: [
    "Jumpstart Audit",
    "auditoria de marketing e IA",
    "consultoria IA gratuita",
    "auditoria de automação empresarial",
    "análise de oportunidades IA",
    "chamada estratégica de automação",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/jumpstart-audit",
    languages: {
      en: "https://automis.ai/jumpstart-audit",
      "it-IT": "https://automis.ai/it/jumpstart-audit",
      "pt-PT": "https://automis.ai/pt/jumpstart-audit",
      "x-default": "https://automis.ai/jumpstart-audit",
    },
  },
  openGraph: {
    title: "Jumpstart Audit de Marketing e IA | Automis",
    description:
      "Uma chamada gratuita para começar, depois uma Jumpstart Audit de duas semanas (1.450 euros): entrevistas, análise real e um plano concreto para agir.",
    url: "https://automis.ai/pt/jumpstart-audit",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, Jumpstart Audit de Marketing e IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumpstart Audit de Marketing e IA | Automis",
    description:
      "Consultoria gratuita de 30 minutos, depois uma Jumpstart Audit aprofundada (1.450 euros) com um plano baseado nos dados e uma automação live em 14 dias.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function JumpstartAuditPagePT() {
  return (
    <AutomisEnShell>
      <JumpstartHeroPT />
      <Step1FreeConsultationPT />
      <Step2JumpstartAuditPT />
      <SampleAuditDownloadPT />
      <WhoItsForPT />
      <JumpstartFaqPT />
      <JumpstartBookingPT />
    </AutomisEnShell>
  );
}
