import Script from "next/script";
import { CONSENT_COOKIE, CONSENT_VERSION } from "@/lib/consent";

/*
  Google Consent Mode v2 defaults.

  This MUST execute before gtm.js. next/script "beforeInteractive" puts it in
  the document head, while GTM stays "afterInteractive", so the ordering holds.

  Everything starts denied. If the visitor already made a choice we replay it
  immediately as an update, so a returning visitor is not tracked while the
  React banner is still hydrating.

  Deliberately dependency-free and inlined: it runs before any bundle is
  evaluated, so it cannot import from lib/consent.js. Keep the cookie name,
  version and signal mapping in sync with that file.
*/

const script = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  try {
    var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
    if (m) {
      var stored = JSON.parse(decodeURIComponent(m[1]));
      if (stored && stored.v === ${CONSENT_VERSION} && stored.categories) {
        var stats = stored.categories.statistics ? 'granted' : 'denied';
        var ads = stored.categories.marketing ? 'granted' : 'denied';
        gtag('consent', 'update', {
          analytics_storage: stats,
          ad_storage: ads,
          ad_user_data: ads,
          ad_personalization: ads,
          functionality_storage: 'denied',
          personalization_storage: 'denied',
          security_storage: 'granted'
        });

        // The container triggers GA4 / Clarity / Meta on this custom event, not
        // on page view (a CookieYes leftover). A returning visitor who already
        // consented needs it too, otherwise their pageview is never measured.
        // Queued now, processed once GTM loads, still gated by each tag's
        // consent check.
        window.dataLayer.push({ event: 'cookie_consent_update' });
      }
    }
  } catch (e) {}
})();
`;

export default function ConsentModeInit() {
  return (
    <Script
      id="consent-mode-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
