import ArcangeloLanding from "@/components/arcangelo/ArcangeloLanding";

export const metadata = {
  title: "Free AI Playbooks · Automis",
  description:
    "Grab the free niche AI Playbooks, watch our Voice AI live, or book a call. I build the AI systems businesses are missing, daily AI, no hype.",
  alternates: { canonical: "https://automis.ai/playbook" },
  openGraph: {
    title: "Free AI Playbooks · Automis",
    description: "Free niche AI Playbooks + a live Voice AI demo. No hype.",
    url: "https://automis.ai/playbook",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ArcangeloLanding />;
}
