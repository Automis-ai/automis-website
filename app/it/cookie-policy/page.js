import CookiePolicy from "@/components/legal/CookiePolicy";

export const metadata = {
  title: "Cookie Policy | Automis",
  description:
    "Quali cookie usa automis.ai, a cosa servono, quanto durano e come cambiare o revocare il consenso in qualsiasi momento.",
  alternates: {
    canonical: "https://automis.ai/it/cookie-policy",
    languages: {
      en: "https://automis.ai/cookie-policy",
      "it-IT": "https://automis.ai/it/cookie-policy",
      "x-default": "https://automis.ai/cookie-policy",
    },
  },
  openGraph: {
    title: "Cookie Policy | Automis",
    description: "Quali cookie usa automis.ai, a cosa servono e come cambiare o revocare il consenso.",
    url: "https://automis.ai/it/cookie-policy",
    siteName: "Automis",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

export default function CookiePolicyPageIt() {
  return <CookiePolicy locale="it" />;
}
