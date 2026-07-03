import ArcangeloLanding from "@/components/arcangelo/ArcangeloLanding";

export const metadata = {
  title: "Arcangelo · AI Automation — Free AI Playbooks | Automis",
  description:
    "Grab the free niche AI Playbooks, watch our Voice AI live, or book a free call. I build the AI systems businesses are missing — daily AI, no hype.",
  alternates: { canonical: "https://automis.ai/arcangelo" },
  openGraph: {
    title: "Arcangelo · AI Automation — Free AI Playbooks",
    description: "Free niche AI Playbooks + a live Voice AI demo. No hype.",
    url: "https://automis.ai/arcangelo",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ArcangeloLanding />;
}
