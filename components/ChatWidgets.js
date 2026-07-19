// components/ChatWidgets.js
"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

// The ElevenLabs ConvAI test widgets belong ONLY to the single-page Voice-AI
// landers, which live exclusively on voice.automis.ai (prospect-only, kept out
// of organic search). They must never appear on the main automis.ai site.
//
// This is load-bearing now that the European-Portuguese MAIN site is served at
// the public path /pt (middleware rewrites automis.ai/pt -> app/pt-site): a bare
// `pathname === "/pt"` check would also match the main-site home, so we gate on
// the HOST as well. Only voice.automis.ai (and local dev, which middleware treats
// as the voice host) renders the widget.
const LANDER_AGENTS = {
  "/ita": "agent_6901k7t47hzvfz69c0k41z23540r",
  "/fr": "agent_2301k951bevxfs89r0s7vyr93cq5",
  "/pt": "agent_5501k9s44q79fkja12p86txkxq0n",
  "/en": "agent_4001k7szwpqcetwvp9de8c3dqm25", // Lana — EN lead-gen + demo booking
};

export default function ChatWidgets() {
  const pathname = usePathname();

  // Read the host after mount (window is undefined during SSR). Starting false
  // keeps the server and first client render identical (no hydration mismatch);
  // the effect flips it on the voice host, then the widget appears.
  const [isVoiceHost, setIsVoiceHost] = useState(false);
  useEffect(() => {
    const h = window.location.hostname;
    setIsVoiceHost(h === "voice.automis.ai" || h === "localhost" || h === "127.0.0.1");
  }, []);

  const agentId = isVoiceHost ? LANDER_AGENTS[pathname] : null;
  if (!agentId) return null;

  return (
    <>
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  );
}
