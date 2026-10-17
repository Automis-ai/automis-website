import AutomisEnShell from "@/components/site/AutomisEnShell";
import ContactView from "@/components/v2/contact/ContactView";

export const metadata = {
  title: "Contact Automis | Talk to a Strategic AI Automation Partner",
  description:
    "Get in touch with Automis. Send a message or book a 30-minute discovery call and see where AI can win back time, calls, and revenue for your business.",
  alternates: {
    canonical: "https://automis.ai/contact",
    languages: {
      en: "https://automis.ai/contact",
      "it-IT": "https://automis.ai/it/contact",
      "pt-PT": "https://automis.ai/pt/contact",
      "x-default": "https://automis.ai/contact",
    },
  },
  openGraph: {
    title: "Contact Automis | Talk to a Strategic AI Automation Partner",
    description:
      "Send us a message or book a discovery call. We'll map where your business loses time and money, then build the AI systems to fix it.",
    url: "https://automis.ai/contact",
    siteName: "Automis",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Automis",
    description:
      "Send us a message or book a discovery call with a strategic AI automation partner.",
  },
};

export default function ContactPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <ContactView lang="en" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
