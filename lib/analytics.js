/*
  Thin dataLayer wrapper.

  Pushing to the dataLayer neither reads nor writes cookies, so it is safe to
  call before the visitor has answered the cookie banner. Whether an event is
  actually transmitted to GA4 / Meta is decided by the tag's consent settings
  inside GTM (Consent Mode v2). Keep it that way.

  NEVER push personal data here (name, email, phone, free-text message).
  The dataLayer is readable by every tag in the container.
*/

export function pushEvent(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Locale is useful on every event: EN and IT funnels are reported separately.
export function localeFromPath(pathname) {
  return pathname && pathname.startsWith("/it") ? "it" : "en";
}
