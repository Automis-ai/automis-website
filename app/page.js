import { Space_Grotesk, Inter } from "next/font/google";
import AkpagerLayout from "@/layouts/AkpagerLayout";
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

// Fonts scoped to the EN home only (other locales keep Montserrat/Open Sans).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-en",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-en",
  display: "swap",
});

export const metadata = {
  title: "Automis — AI Automation Agency for Business | Voice, Sales & Admin AI",
  description:
    "Automis is a strategic AI automation agency for businesses in Europe & the US. We build the AI voice agents, automations, and company-brain systems your business is missing — end to end.",
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
    title: "Automis — The AI automation agency that builds the system your business is missing",
    description:
      "AI voice agents, marketing automation, and company-brain systems — built end to end around how your business actually works.",
    url: "https://automis.ai/",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable} home-en-root`}>
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

      <style
        // Scope the new fonts to the EN home without touching global styles.
        dangerouslySetInnerHTML={{
          __html: `
            .home-en-root { font-family: var(--font-body-en), 'Open Sans', sans-serif; }
            .home-en-root .font-display { font-family: var(--font-display-en), 'Montserrat', sans-serif; letter-spacing: -0.01em; }
          `,
        }}
      />
    </div>
  );
}
