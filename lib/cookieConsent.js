import { OPEN_PREFERENCES_EVENT } from "@/lib/consent";

/*
  Re-opens the cookie preferences so a visitor can change or withdraw consent at
  any time (withdrawing must be as easy as giving).

  During the migration both banners may exist: ours, and CookieYes injected
  through GTM. We prefer ours and fall back to CookieYes, so the footer control
  keeps working whichever one is live.
*/

const COOKIEYES_REVISIT_SELECTORS = [
  "[data-cky-tag='revisit-consent']",
  ".cky-btn-revisit",
  ".cky-btn-revisit-wrapper button",
];

export function openCookieSettings() {
  if (typeof window === "undefined") return false;

  // Our own banner listens for this.
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));

  // Legacy: CookieYes, while it is still in the GTM container.
  if (typeof window.revisitCkyConsent === "function") {
    window.revisitCkyConsent();
    return true;
  }
  for (const selector of COOKIEYES_REVISIT_SELECTORS) {
    const el = document.querySelector(selector);
    if (el) {
      el.click();
      return true;
    }
  }

  return true;
}
