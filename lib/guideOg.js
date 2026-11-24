// Meta per l'anteprima del link (LinkedIn, WhatsApp) di una guida. Senza questi campi la pagina eredita
// descrizione, immagine e lingua inglesi dal layout root. L'immagine la genera /api/guide-og/[code].
const GENERIC = "Guide pratiche sull'IA per ruolo, settore e strumento. Le ricevi su WhatsApp, le leggi online e, se ti blocchi, risponde Luca.";

export function guideOg({ guida, title, url, fallback = GENERIC }) {
  const description = guida?.promessa || fallback;
  const image = `/api/guide-og/${guida ? guida.code : "generica"}`;
  const alt = guida ? guida.titolo : "Le guide di Luca Casillo, Automis";
  return {
    description,
    openGraph: { title, description, url, siteName: "Automis", type: "website", locale: "it_IT", images: [{ url: image, width: 1200, height: 630, alt }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
