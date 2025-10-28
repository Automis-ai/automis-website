// components/ChatWidgets.js
"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ChatWidgets() {
  const pathname = usePathname();

  return (
    <>
      {/* Default chatbot */}
      {pathname !== "/ita" && (
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-widget-id="68ab42078df6cd8fd2938446"
          strategy="afterInteractive"
        />
      )}

      {/* ElevenLabs widget for /ita */}
      {pathname === "/ita" && (
        <>
          <elevenlabs-convai agent-id="agent_6901k7t47hzvfz69c0k41z23540r"></elevenlabs-convai>
          <Script
            src="https://unpkg.com/@elevenlabs/convai-widget-embed"
            async
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
