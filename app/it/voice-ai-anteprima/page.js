// PROVVISORIA, solo locale: anteprima della pagina Voice AI v2 per Luca. Non va committata.
import AutomisEnShell from "@/components/site/AutomisEnShell";
import VoicePage from "@/components/v2/voice/VoicePage";

export const metadata = { title: "Anteprima Voice AI v2", robots: { index: false, follow: false } };

export default function VoiceAnteprima({ searchParams }) {
  return (
    <AutomisEnShell>
      <VoicePage locale="it" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
