import AutomisEnShell from "@/components/site/AutomisEnShell";
import AboutHero from "@/components/about/AboutHero";
import AboutBeliefs from "@/components/about/AboutBeliefs";
import AboutProcess from "@/components/about/AboutProcess";
import AboutFounders from "@/components/about/AboutFounders";
import FinalCta from "@/components/home/FinalCta";

export const metadata = {
  title: "About Automis | Two Founders, Hands-On With Every AI Build",
  description:
    "Automis is a founder-led, strategic AI integrator. Meet the two founders who design, build, and ship the AI systems your business is missing, end to end.",
  keywords: [
    "about Automis",
    "AI integrator",
    "founder-led AI",
    "strategic AI integrator",
    "AI automation team",
    "GDPR AI",
  ],
  alternates: { canonical: "https://automis.ai/about" },
  openGraph: {
    title: "About Automis | Two founders, hands-on with your build",
    description:
      "A founder-led strategic AI integrator. We design, build, and ship the AI systems your business is missing, and you own what we deliver.",
    url: "https://automis.ai/about",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis — Two founders, hands-on with your build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Automis | Two founders, hands-on with your build",
    description:
      "A founder-led strategic AI integrator. We design, build, and ship the AI systems your business is missing.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function AboutPage() {
  return (
    <AutomisEnShell>
      <AboutHero />
      <AboutBeliefs />
      <AboutProcess />
      <AboutFounders />
      <FinalCta />
    </AutomisEnShell>
  );
}
