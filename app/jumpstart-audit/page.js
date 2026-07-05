import AutomisEnShell from "@/components/site/AutomisEnShell";
import JumpstartHero from "@/components/jumpstart/JumpstartHero";
import WhatYouGet from "@/components/jumpstart/WhatYouGet";
import HowItWorks from "@/components/jumpstart/HowItWorks";
import WhatWeLookAt from "@/components/jumpstart/WhatWeLookAt";
import WhoItsFor from "@/components/jumpstart/WhoItsFor";
import JumpstartFaq from "@/components/jumpstart/JumpstartFaq";
import JumpstartBooking from "@/components/jumpstart/JumpstartBooking";

export const metadata = {
  title: "Free 30-Minute AI Audit | Automis, Find Your Highest-ROI Automations",
  description:
    "Book a free 30-minute AI Audit. We map exactly where your business loses time and money, then hand you the top AI automations to fix it. No commitment.",
  keywords: [
    "AI audit",
    "free AI audit",
    "business automation audit",
    "AI opportunity assessment",
    "AI consultation",
    "automation strategy call",
  ],
  alternates: { canonical: "https://automis.ai/jumpstart-audit" },
  openGraph: {
    title: "Free 30-Minute AI Audit | Automis",
    description:
      "See exactly where your business leaks time and money, and the highest-ROI AI automations to fix it, in one free 30-minute call.",
    url: "https://automis.ai/jumpstart-audit",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis, Free 30-minute AI Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 30-Minute AI Audit | Automis",
    description:
      "See exactly where your business leaks time and money, and the highest-ROI AI automations to fix it, in one free 30-minute call.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function JumpstartAuditPage() {
  return (
    <AutomisEnShell>
      <JumpstartHero />
      <WhatYouGet />
      <HowItWorks />
      <WhatWeLookAt />
      <WhoItsFor />
      <JumpstartFaq />
      <JumpstartBooking />
    </AutomisEnShell>
  );
}
