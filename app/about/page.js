import AutomisEnShell from "@/components/site/AutomisEnShell";
import AboutView from "@/components/v2/about/AboutView";

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
  alternates: {
    canonical: "https://automis.ai/about",
    languages: {
      en: "https://automis.ai/about",
      "it-IT": "https://automis.ai/it/about",
      "pt-PT": "https://automis.ai/pt/about",
      "x-default": "https://automis.ai/about",
    },
  },
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
        alt: "Automis, Two founders, hands-on with your build",
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

export default function AboutPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <AboutView lang="en" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
