import AutomisEnShell from "@/components/site/AutomisEnShell";
import JumpstartHero from "@/components/jumpstart/JumpstartHero";
import Step1FreeConsultation from "@/components/jumpstart/Step1FreeConsultation";
import Step2JumpstartAudit from "@/components/jumpstart/Step2JumpstartAudit";
import WhoItsFor from "@/components/jumpstart/WhoItsFor";
import JumpstartFaq from "@/components/jumpstart/JumpstartFaq";
import JumpstartBooking from "@/components/jumpstart/JumpstartBooking";

export const metadata = {
  title: "Jumpstart Marketing & AI Audit | Automis, Find Where You Leak Time & Money",
  description:
    "It starts with a free discovery call. The full Jumpstart Audit (€1,450) is a two-week deep dive: we interview your team, analyze your funnel and ad spend, and hand you a data-backed plan plus a live automation.",
  keywords: [
    "Jumpstart Audit",
    "marketing and AI audit",
    "free AI consultation",
    "business automation audit",
    "AI opportunity assessment",
    "automation strategy call",
  ],
  alternates: { canonical: "https://automis.ai/jumpstart-audit" },
  openGraph: {
    title: "Jumpstart Marketing & AI Audit | Automis",
    description:
      "A free discovery call to start, then a two-week Jumpstart Audit (€1,450): interviews, real analysis, and a data-backed plan you can act on.",
    url: "https://automis.ai/jumpstart-audit",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, Jumpstart Marketing & AI Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumpstart Marketing & AI Audit | Automis",
    description:
      "Free 30-minute consultation, then a deep Jumpstart Audit (€1,450) with a data-backed plan and a live automation in 14 days.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function JumpstartAuditPage() {
  return (
    <AutomisEnShell>
      <JumpstartHero />
      <Step1FreeConsultation />
      <Step2JumpstartAudit />
      <WhoItsFor />
      <JumpstartFaq />
      <JumpstartBooking />
    </AutomisEnShell>
  );
}
