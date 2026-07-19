import CookiePolicy from "@/components/legal/CookiePolicy";

export const metadata = {
  title: "Cookie Policy | Automis",
  description:
    "Which cookies automis.ai uses, what they are for, how long they last, and how to change or withdraw your consent at any time.",
  alternates: {
    canonical: "https://automis.ai/cookie-policy",
    languages: {
      en: "https://automis.ai/cookie-policy",
      "it-IT": "https://automis.ai/it/cookie-policy",
      "pt-PT": "https://automis.ai/pt/cookie-policy",
      "x-default": "https://automis.ai/cookie-policy",
    },
  },
  openGraph: {
    title: "Cookie Policy | Automis",
    description: "Which cookies automis.ai uses, what they are for, and how to change or withdraw your consent.",
    url: "https://automis.ai/cookie-policy",
    siteName: "Automis",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicy locale="en" />;
}
