// Private voice demo for one prospect (Kingswell Surgery, NHS GP practice).
// Reached only from a link we send during the call: noindex, kept out of the
// sitemap (next-sitemap.config.js) and out of the locale redirect (lib/locales.js).
import VoiceDemo from "@/components/demo/VoiceDemo";

export const metadata = {
  title: { absolute: "Kingswell Surgery | Phone assistant demo" },
  description: "Private demo of the Kingswell Surgery phone assistant, built by Automis.",
  robots: { index: false, follow: false },
};

const TIPS = [
  "I need to see a doctor about my knee.",
  "Can I order my repeat prescription?",
  "I've been off work ten days, I need a sick note.",
  "I'm ringing for my mum, she's housebound.",
  "Are you a real person?",
  "My husband's got chest pains.",
];

export default function KingswellDemoPage() {
  return (
    <VoiceDemo
      agentId="agent_2101m64f5pwwfd88scjmfqa4y9g8"
      practice="Kingswell Surgery"
      headline="Talk to your new phone assistant"
      intro="It answers the way your reception would: it takes the request, checks the details and sends the team a clean summary. Call it the way a patient would."
      tips={TIPS}
      notes={[
        "Please use made-up patient details only.",
        "This demo is not connected to SystmOne.",
        "No audio is recorded. A text transcript is kept for up to 7 days.",
        "Each request goes to a demo inbox, standing in for your reception team.",
      ]}
    />
  );
}
