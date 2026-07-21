"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  readConsent,
  writeConsent,
  applyConsent,
  DENY_ALL,
  GRANT_ALL,
  OPEN_PREFERENCES_EVENT,
} from "@/lib/consent";

/*
  First-party cookie banner. Replaces CookieYes, whose free tier is single
  language while we serve English, Italian and Portuguese.

  Design constraints taken from the Garante's 2021 cookie guidelines:
    - "Reject all" must be exactly as prominent as "Accept all" -> both buttons
      render with the identical class string. Do not restyle one of them.
    - No X / dismiss affordance: closing must not be mistaken for consent.
    - Nothing is pre-ticked; toggles start off.
    - Continuing to scroll or browse is NOT consent, so the banner never
      auto-dismisses and never blocks the page (no cookie wall).
    - Withdrawing is as easy as giving: the footer reopens this dialog.
    - We do not re-ask before 6 months (see CONSENT_MAX_AGE_DAYS).
*/

const GRAD = "linear-gradient(120deg,#3C91E6,#57C7E3)";

const COPY = {
  en: {
    title: "We respect your privacy",
    body: "We use necessary cookies to make this site work. With your consent we also use statistics and marketing cookies to understand how the site is used and to measure our campaigns.",
    accept: "Accept all",
    reject: "Reject all",
    customise: "Customise",
    save: "Save preferences",
    cookiePolicy: "Cookie Policy",
    privacyPolicy: "Privacy Policy",
    prefsTitle: "Cookie preferences",
    cats: {
      necessary: { name: "Strictly necessary", body: "Required for the site to work. Always active.", always: "Always active" },
      statistics: { name: "Statistics", body: "Help us understand how the site is used, in aggregate." },
      marketing: { name: "Marketing", body: "Let us measure our advertising campaigns." },
    },
  },
  it: {
    title: "Rispettiamo la tua privacy",
    body: "Usiamo cookie necessari per far funzionare il sito. Con il tuo consenso usiamo anche cookie statistici e di marketing, per capire come viene usato il sito e per misurare le nostre campagne.",
    accept: "Accetta tutti",
    reject: "Rifiuta tutti",
    customise: "Personalizza",
    save: "Salva le preferenze",
    cookiePolicy: "Cookie Policy",
    privacyPolicy: "Privacy Policy",
    prefsTitle: "Preferenze cookie",
    cats: {
      necessary: { name: "Strettamente necessari", body: "Servono al funzionamento del sito. Sempre attivi.", always: "Sempre attivi" },
      statistics: { name: "Statistici", body: "Ci aiutano a capire, in forma aggregata, come viene usato il sito." },
      marketing: { name: "Marketing", body: "Ci permettono di misurare le nostre campagne pubblicitarie." },
    },
  },
  pt: {
    title: "Respeitamos a sua privacidade",
    body: "Utilizamos cookies necessários para o funcionamento do site. Com o seu consentimento, usamos também cookies de estatística e de marketing, para perceber como o site é utilizado e para medir as nossas campanhas.",
    accept: "Aceitar todos",
    reject: "Rejeitar todos",
    customise: "Personalizar",
    save: "Guardar preferências",
    cookiePolicy: "Política de Cookies",
    privacyPolicy: "Política de Privacidade",
    prefsTitle: "Preferências de cookies",
    cats: {
      necessary: { name: "Estritamente necessários", body: "Necessários para o funcionamento do site. Sempre ativos.", always: "Sempre ativos" },
      statistics: { name: "Estatística", body: "Ajudam-nos a perceber, de forma agregada, como o site é utilizado." },
      marketing: { name: "Marketing", body: "Permitem-nos medir as nossas campanhas publicitárias." },
    },
  },
};

// /ita is the Italian voice lander; /luca-ig is Luca's Italian IG lander.
// de/es/fr landers fall back to English.
function localeFrom(pathname) {
  const seg = (pathname || "/").split("/").filter(Boolean)[0];
  if (seg === "it" || seg === "ita" || seg === "luca-ig") return "it";
  if (seg === "pt") return "pt";
  return "en";
}

// Identical for accept and reject. Equal prominence is a legal requirement here,
// not a style preference.
const PRIMARY_BTN =
  "w-full sm:w-auto rounded-xl px-6 py-3 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#3C91E6]" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function ConsentBanner() {
  const pathname = usePathname();
  const locale = localeFrom(pathname);
  const t = COPY[locale] || COPY.en;

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState(DENY_ALL);

  useEffect(() => {
    setMounted(true);
    if (!readConsent()) setOpen(true);

    const reopen = () => {
      const existing = readConsent();
      setPrefs(existing?.categories || DENY_ALL);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  const decide = useCallback(
    (categories) => {
      const record = writeConsent(categories);
      applyConsent(categories);
      setOpen(false);
      setShowPrefs(false);

      // Durable proof of consent. Best-effort: never block or break the UI.
      if (record) {
        fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...record, locale, path: pathname }),
          keepalive: true,
        }).catch(() => {});
      }
    },
    [locale, pathname]
  );

  if (!mounted || !open) return null;

  const cookieHref = locale === "it" ? "/it/cookie-policy" : "/cookie-policy";
  const privacyHref = locale === "it" ? "/it/privacy-policy" : "/privacy-policy";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.prefsTitle}
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-5"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.12] bg-[#04101c]/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <h2 className="font-display text-[1.15rem] font-semibold text-white">{t.title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/65">{t.body}</p>

        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
          <Link href={cookieHref} className="text-[#57C7E3] underline hover:text-white">
            {t.cookiePolicy}
          </Link>
          <Link href={privacyHref} className="text-[#57C7E3] underline hover:text-white">
            {t.privacyPolicy}
          </Link>
        </p>

        {showPrefs && (
          <div className="mt-5 space-y-3 border-t border-white/[0.08] pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[14.5px] font-semibold text-white">{t.cats.necessary.name}</p>
                <p className="mt-0.5 text-[13px] text-white/55">{t.cats.necessary.body}</p>
              </div>
              <span className="flex-shrink-0 text-[12px] font-semibold text-[#8fe0f0]">
                {t.cats.necessary.always}
              </span>
            </div>

            {["statistics", "marketing"].map((key) => (
              <div key={key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14.5px] font-semibold text-white">{t.cats[key].name}</p>
                  <p className="mt-0.5 text-[13px] text-white/55">{t.cats[key].body}</p>
                </div>
                <Toggle
                  checked={!!prefs[key]}
                  label={t.cats[key].name}
                  onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {showPrefs ? (
            <button
              type="button"
              onClick={() => decide(prefs)}
              className="w-full rounded-xl border border-white/20 px-5 py-3 text-[14.5px] font-semibold text-white/85 transition-colors hover:bg-white/[0.06] sm:mr-auto sm:w-auto"
            >
              {t.save}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="w-full rounded-xl border border-white/20 px-5 py-3 text-[14.5px] font-semibold text-white/85 transition-colors hover:bg-white/[0.06] sm:mr-auto sm:w-auto"
            >
              {t.customise}
            </button>
          )}

          {/* Reject and Accept share PRIMARY_BTN on purpose: equal prominence. */}
          <button type="button" onClick={() => decide(DENY_ALL)} className={PRIMARY_BTN} style={{ background: GRAD }}>
            {t.reject}
          </button>
          <button type="button" onClick={() => decide(GRANT_ALL)} className={PRIMARY_BTN} style={{ background: GRAD }}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
