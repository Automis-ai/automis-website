"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushEvent, localeFromPath } from "@/lib/analytics";
import { captureAttribution } from "@/lib/utm";

/*
  One delegated click listener instead of wiring an onClick into every CTA
  across the site. It emits:
    - booking_cta_click  for LeadConnector booking CTAs (the booking itself is
      a third-party iframe, so we only see the click; the completed booking
      arrives server-side via /api/conversions/booking)
    - contact_channel_click  for tel: and mailto: links (micro-conversions)

  It also captures first-touch attribution once per session.

  Pushing to the dataLayer touches no cookies, so it is safe pre-consent; GTM's
  consent settings decide whether anything is transmitted. The actual phone
  number / email address is never pushed, only that a channel was clicked.
*/

const BOOKING_HREF = "leadconnectorhq.com/widget/bookings";

export default function AnalyticsListeners() {
  const pathname = usePathname();

  // First-touch attribution: once per session, as early as possible.
  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      const anchor = target && target.closest ? target.closest("a[href]") : null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const locale = localeFromPath(pathname);

      if (href.includes(BOOKING_HREF)) {
        pushEvent("booking_cta_click", {
          locale,
          page_path: pathname,
          cta_text: (anchor.innerText || "").trim().slice(0, 60),
        });
        return;
      }

      // Micro-conversions: intent signals, not the contact detail itself.
      if (href.startsWith("tel:")) {
        pushEvent("contact_channel_click", { locale, page_path: pathname, channel: "phone" });
        return;
      }
      if (href.startsWith("mailto:")) {
        pushEvent("contact_channel_click", { locale, page_path: pathname, channel: "email" });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
