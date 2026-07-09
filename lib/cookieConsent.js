/*
  Re-opens the CookieYes preferences dialog so a visitor can change or withdraw
  consent at any time (required: withdrawing must be as easy as giving).

  CookieYes is injected through GTM, so its API is not guaranteed to exist on
  the page (e.g. GTM blocked, or the container edited). We therefore try the
  documented global first, then fall back to clicking the floating revisit
  badge, and finally give up silently rather than throwing.
*/

const REVISIT_SELECTORS = [
  "[data-cky-tag='revisit-consent']",
  ".cky-btn-revisit",
  ".cky-btn-revisit-wrapper button",
];

export function openCookieSettings() {
  if (typeof window === "undefined") return false;

  if (typeof window.revisitCkyConsent === "function") {
    window.revisitCkyConsent();
    return true;
  }

  for (const selector of REVISIT_SELECTORS) {
    const el = document.querySelector(selector);
    if (el) {
      el.click();
      return true;
    }
  }

  return false;
}
