"use client";

import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { openCookieSettings } from "@/lib/cookieConsent";

/*
  Cookie policy for /cookie-policy and /it/cookie-policy.

  The cookie table below is not guesswork: it lists the cookies actually
  observed on automis.ai (name, duration, category) after accepting the banner.
  If a tag is added or removed in GTM, this table must be updated with it.

  This is an accurate technical description, not legal advice. Have it reviewed
  before relying on it.
*/

const LAST_UPDATED = { en: "July 9, 2026", it: "9 luglio 2026" };

// Observed on automis.ai. category: necessary | statistics | marketing
const COOKIES = [
  { name: "cookieyes-consent", provider: "CookieYes", duration: { en: "1 year", it: "1 anno" }, category: "necessary" },
  { name: "_ga", provider: "Google Analytics 4", duration: { en: "13 months", it: "13 mesi" }, category: "statistics" },
  { name: "_ga_14M9EVJL3N", provider: "Google Analytics 4", duration: { en: "13 months", it: "13 mesi" }, category: "statistics" },
  { name: "_clck", provider: "Microsoft Clarity", duration: { en: "1 year", it: "1 anno" }, category: "statistics" },
  { name: "_clsk", provider: "Microsoft Clarity", duration: { en: "1 day", it: "1 giorno" }, category: "statistics" },
  { name: "_fbp", provider: "Meta (Facebook)", duration: { en: "90 days", it: "90 giorni" }, category: "marketing" },
];

const COPY = {
  en: {
    title: "Cookie Policy",
    org: "Automis — AI Agency",
    updated: "Last updated:",
    intro:
      "This page explains which cookies and similar technologies automis.ai uses, what they are for, how long they last, and how you can change or withdraw your choice at any time.",
    s1Title: "1. What cookies are",
    s1Body:
      "Cookies are small text files a website stores on your device. Some are needed for the site to work. Others let us understand how the site is used, or measure the performance of our advertising. We only install the non-essential ones after you have given consent.",
    s2Title: "2. The categories we use",
    cats: {
      necessary: {
        name: "Strictly necessary",
        body: "Required for the site and the cookie banner to function. Always active, no consent needed.",
      },
      statistics: {
        name: "Statistics",
        body: "Help us understand how visitors use the site, in aggregate, so we can improve it. Installed only with your consent.",
      },
      marketing: {
        name: "Marketing",
        body: "Used to measure our advertising and show relevant content. Installed only with your consent.",
      },
    },
    s3Title: "3. Cookies used on this site",
    th: { name: "Cookie", provider: "Provider", duration: "Duration", category: "Category" },
    s4Title: "4. Third parties and international transfers",
    s4Body:
      "The statistics and marketing cookies are set by third parties who act as independent controllers or processors for their own purposes: Google (Google Analytics 4), Microsoft (Clarity) and Meta. These providers may transfer data outside the European Economic Area, including to the United States, relying on the EU-US Data Privacy Framework or on Standard Contractual Clauses. We also embed booking (LeadConnector) and voice-assistant (ElevenLabs) services on some pages.",
    s5Title: "5. Change or withdraw your consent",
    s5Body:
      "You can reopen the cookie preferences at any time and change or withdraw your choice. Withdrawing consent is as easy as giving it. You can also delete cookies from your browser settings.",
    manageBtn: "Manage cookie preferences",
    s6Title: "6. Contact",
    s6Body: "For any question about this policy or about how we handle your data, write to",
    privacyLink: "See also our Privacy Policy",
  },
  it: {
    title: "Cookie Policy",
    org: "Automis — Agenzia di automazione IA",
    updated: "Ultimo aggiornamento:",
    intro:
      "Questa pagina spiega quali cookie e tecnologie simili usa automis.ai, a cosa servono, quanto durano e come puoi cambiare o revocare la tua scelta in qualsiasi momento.",
    s1Title: "1. Cosa sono i cookie",
    s1Body:
      "I cookie sono piccoli file di testo che un sito salva sul tuo dispositivo. Alcuni servono al funzionamento del sito. Altri ci permettono di capire come viene usato, o di misurare le nostre campagne pubblicitarie. Quelli non essenziali li installiamo solo dopo il tuo consenso.",
    s2Title: "2. Le categorie che usiamo",
    cats: {
      necessary: {
        name: "Strettamente necessari",
        body: "Servono al funzionamento del sito e del banner cookie. Sempre attivi, non richiedono consenso.",
      },
      statistics: {
        name: "Statistici",
        body: "Ci aiutano a capire, in forma aggregata, come i visitatori usano il sito, per migliorarlo. Installati solo con il tuo consenso.",
      },
      marketing: {
        name: "Marketing",
        body: "Servono a misurare le nostre campagne e a mostrarti contenuti pertinenti. Installati solo con il tuo consenso.",
      },
    },
    s3Title: "3. Cookie utilizzati su questo sito",
    th: { name: "Cookie", provider: "Fornitore", duration: "Durata", category: "Categoria" },
    s4Title: "4. Terze parti e trasferimenti internazionali",
    s4Body:
      "I cookie statistici e di marketing sono impostati da terze parti che agiscono per proprie finalità come titolari autonomi o responsabili: Google (Google Analytics 4), Microsoft (Clarity) e Meta. Questi fornitori possono trasferire dati fuori dallo Spazio Economico Europeo, inclusi gli Stati Uniti, sulla base del Data Privacy Framework UE-USA o di Clausole Contrattuali Standard. Su alcune pagine integriamo inoltre servizi di prenotazione (LeadConnector) e di assistente vocale (ElevenLabs).",
    s5Title: "5. Cambiare o revocare il consenso",
    s5Body:
      "Puoi riaprire le preferenze sui cookie quando vuoi e cambiare o revocare la tua scelta. Revocare il consenso è semplice quanto darlo. Puoi anche eliminare i cookie dalle impostazioni del tuo browser.",
    manageBtn: "Gestisci le preferenze cookie",
    s6Title: "6. Contatti",
    s6Body: "Per qualsiasi domanda su questa policy o su come trattiamo i tuoi dati, scrivi a",
    privacyLink: "Leggi anche la nostra Privacy Policy",
  },
};

export default function CookiePolicy({ locale = "en" }) {
  const t = COPY[locale];
  const privacyHref = locale === "it" ? "/it/privacy-policy" : "/privacy-policy";

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">{t.title}</h1>
              <p className="sub-heading text-white/90 mb-2">{t.org}</p>
              <p className="body-text text-white/70">
                {t.updated} {LAST_UPDATED[locale]}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="body-text text-white/80 mb-12">{t.intro}</p>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s1Title}</h2>
                <p className="body-text text-white/70">{t.s1Body}</p>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s2Title}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {["necessary", "statistics", "marketing"].map((key) => (
                    <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="text-white font-semibold mb-2">{t.cats[key].name}</h3>
                      <p className="text-white/60 text-[14px] leading-relaxed">{t.cats[key].body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s3Title}</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-white/[0.05] text-white/80">
                      <tr>
                        <th className="px-4 py-3 font-semibold">{t.th.name}</th>
                        <th className="px-4 py-3 font-semibold">{t.th.provider}</th>
                        <th className="px-4 py-3 font-semibold">{t.th.duration}</th>
                        <th className="px-4 py-3 font-semibold">{t.th.category}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIES.map((c) => (
                        <tr key={c.name} className="border-t border-white/[0.07] text-white/65">
                          <td className="px-4 py-3 font-mono text-white/85">{c.name}</td>
                          <td className="px-4 py-3">{c.provider}</td>
                          <td className="px-4 py-3">{c.duration[locale]}</td>
                          <td className="px-4 py-3">{t.cats[c.category].name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s4Title}</h2>
                <p className="body-text text-white/70">{t.s4Body}</p>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s5Title}</h2>
                <p className="body-text text-white/70 mb-5">{t.s5Body}</p>
                <button
                  type="button"
                  onClick={() => openCookieSettings()}
                  className="inline-flex rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.1]"
                >
                  {t.manageBtn}
                </button>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">{t.s6Title}</h2>
                <p className="body-text text-white/70">
                  {t.s6Body}{" "}
                  <a href="mailto:info@automis.ai" className="text-[#57C7E3] underline">
                    info@automis.ai
                  </a>
                  .
                </p>
                <p className="body-text mt-3">
                  <Link href={privacyHref} className="text-[#57C7E3] underline">
                    {t.privacyLink}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
}
