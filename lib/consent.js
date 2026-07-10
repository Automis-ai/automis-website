/*
  Consent state: the single source of truth for the cookie banner.

  The visitor's choice lives in a first-party cookie so it survives reloads and
  can be read synchronously by the inline Consent Mode script *before* GTM
  loads. Google's Consent Mode v2 signals are derived from it, never the other
  way round.

  We only ever ask about the cookies we actually set (see /cookie-policy):
    statistics -> GA4 (_ga, _ga_*) + Microsoft Clarity (_clck, _clsk)
    marketing  -> Meta pixel (_fbp)

  functionality_storage and personalization_storage stay denied: we set no
  cookies in those buckets. If that ever changes, add a category here rather
  than quietly granting them.
*/

export const CONSENT_COOKIE = "automis_consent";

// Bump when the categories or the policy materially change: a version mismatch
// re-asks the visitor instead of silently reusing a stale choice.
export const CONSENT_VERSION = 1;

// The Garante's guidance: do not re-prompt a visitor who already answered
// before 6 months have passed.
export const CONSENT_MAX_AGE_DAYS = 180;

export const CATEGORIES = ["statistics", "marketing"];

export const DENY_ALL = { statistics: false, marketing: false };
export const GRANT_ALL = { statistics: true, marketing: true };

/** Consent Mode v2 signals for a given set of categories. */
export function toConsentSignals(categories) {
  const stats = categories?.statistics ? "granted" : "denied";
  const ads = categories?.marketing ? "granted" : "denied";
  return {
    analytics_storage: stats,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

export function readConsent() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + CONSENT_COOKIE + "=([^;]*)")
  );
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    if (parsed?.v !== CONSENT_VERSION) return null; // stale -> ask again
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories) {
  if (typeof document === "undefined") return null;
  const record = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    categories: {
      statistics: !!categories.statistics,
      marketing: !!categories.marketing,
    },
  };
  const value = encodeURIComponent(JSON.stringify(record));
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
  return record;
}

/**
 * Tell Google (and, through GTM's consent checks, every other tag) what changed.
 * gtag() is defined by the inline Consent Mode script that runs before GTM.
 */
export function applyConsent(categories) {
  if (typeof window === "undefined") return;
  const signals = toConsentSignals(categories);
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", signals);
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_update",
    consent_statistics: !!categories.statistics,
    consent_marketing: !!categories.marketing,
  });
}

/** Event used to reopen the preferences dialog from anywhere (e.g. the footer). */
export const OPEN_PREFERENCES_EVENT = "automis:open-cookie-preferences";
