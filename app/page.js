import AkpagerLayout from "@/layouts/AkpagerLayout";
import "@/components/home/home-en-fonts.css";
import HeroEN from "@/components/home/HeroEN";
import PainPoints from "@/components/home/PainPoints";
import SystemPillars from "@/components/home/SystemPillars";
import HowWeWork from "@/components/home/HowWeWork";
import Proof from "@/components/home/Proof";
import Industries from "@/components/home/Industries";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import Authority from "@/components/home/Authority";
import FaqEN from "@/components/home/FaqEN";
import FinalCta from "@/components/home/FinalCta";
import PointerGlow from "@/components/ui/PointerGlow";

export const metadata = {
  title: "Automis | AI Automation Agency for Business — Voice, Sales & Admin AI",
  description:
    "Automis is a strategic AI automation agency. We build the AI voice agents, automations, and company-brain systems your business is missing, end to end.",
  keywords: [
    "AI automation agency",
    "AI agency",
    "AI voice agent",
    "business automation",
    "AI for small business",
    "AI receptionist",
  ],
  alternates: { canonical: "https://automis.ai/" },
  openGraph: {
    title: "Automis | The AI automation agency that builds the system your business is missing",
    description:
      "AI voice agents, marketing automation, and company-brain systems, built end to end around how your business actually works.",
    url: "https://automis.ai/",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis — We build the systems your business is missing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automis | The AI automation agency that builds the system your business is missing",
    description:
      "AI voice agents, marketing automation, and company-brain systems, built end to end around how your business actually works.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function Home() {
  return (
    <div className="home-en-root">
      <PointerGlow />
      {/* Preload the two most critical font weights for a fast first paint. */}
      <link rel="preload" href="/fonts/clash-display-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/general-sans-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      <AkpagerLayout>
        <HeroEN />
        <PainPoints />
        <SystemPillars />
        <HowWeWork />
        <Proof />
        <Industries />
        <OpportunityFinder />
        <Authority />
        <FaqEN />
        <FinalCta />
      </AkpagerLayout>
    </div>
  );
}
