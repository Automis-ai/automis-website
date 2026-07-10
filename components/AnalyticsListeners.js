"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushEvent, localeFromPath } from "@/lib/analytics";

/*
  One delegated click listener instead of wiring an onClick into every booking
  button across the site. Every "Book a call" / "Prenota una call" CTA is an
  <a> pointing at the LeadConnector booking widget, so we match on the href.

  We can observe the CLICK, not the booking itself: the calendar renders inside
  a third-party iframe, so completion is not visible to us. Real
  booking_completed conversions should come from a LeadConnector webhook into
  GA4 (Measurement Protocol) / Meta CAPI, server-side.
*/

const BOOKING_HREF = "leadconnectorhq.com/widget/bookings";

export default function AnalyticsListeners() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      const anchor = target && target.closest ? target.closest("a[href]") : null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.includes(BOOKING_HREF)) return;

      pushEvent("booking_cta_click", {
        locale: localeFromPath(pathname),
        page_path: pathname,
        cta_text: (anchor.innerText || "").trim().slice(0, 60),
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
