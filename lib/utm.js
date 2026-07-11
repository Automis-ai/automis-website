/*
  First-touch attribution capture.

  When a visitor first lands, we record the UTM parameters, ad click ids, the
  landing path and the referrer. We attach this to leads (Finder, contact form)
  so GHL / GA4 can tell which channel and which piece of content produced a
  lead, not just which channel the session started on.

  Stored in sessionStorage, NOT a cookie: it is first-party, lasts only for the
  session, and is not cross-site tracking, so it does not need cookie consent.
  It is captured first-touch (the first page of the session wins) so a later
  internal navigation does not overwrite the original source.
*/

const KEY = "automis_attribution";
const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return; // first touch only

    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const field of FIELDS) {
      const value = params.get(field);
      if (value) data[field] = value.slice(0, 200);
    }
    data.landing_path = window.location.pathname;
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.host)) {
      data.referrer = ref.slice(0, 300);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // sessionStorage can throw (private mode, quota); attribution is best-effort.
  }
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
