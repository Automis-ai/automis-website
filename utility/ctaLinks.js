// src/utility/ctaLinks.js

export const CTA_LINKS = {
  booking: {
    en: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
    it: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
    // Dedicated European-Portuguese calendar.
    pt: "https://api.leadconnectorhq.com/widget/bookings/pt-automis",
  },

  // Example for future:
  // demo: { en: "...", it: "..." },
  // whatsapp: { en: "...", it: "..." },
};

export function getCtaHref(key, locale = "en") {
  const entry = CTA_LINKS[key];
  if (!entry) return "/"; // safe fallback

  // If locale is missing, fallback to EN
  return entry[locale] || entry.en;
}