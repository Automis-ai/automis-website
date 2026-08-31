/**
 * L'unica dichiarazione di CHI e' Automis, per i motori di ricerca.
 *
 * Perche' esiste. Per la query di marca "automis" il sito e' in posizione media 4,3
 * con un CTR del 6,8% (444 impressioni e 30 click su 90 giorni, misurati in Search
 * Console il 31/08/2026). Sopra di lui, nella SERP, non c'e' un concorrente: ci sono
 * il nostro LinkedIn, il nostro Instagram e la nostra pagina Facebook. Il sito non
 * aveva mai detto a Google che quei profili e automis.ai sono la STESSA entita' e che
 * il sito ne e' la casa, quindi Google doveva indovinare il legame, e indovinava male.
 *
 * `sameAs` e' la riga che fa quel lavoro. Il resto del nodo serve solo a rendere
 * l'entita' identificabile.
 *
 * Cosa NON c'e', deliberatamente:
 *   - `description`: descrivere Automis e' posizionamento, e il posizionamento vive in
 *     knowledge/brand.md e business.md, che non si toccano senza accordo. Lo schema
 *     funziona identico senza: a consolidare l'entita' sono name, url, logo e sameAs.
 *   - `legalName`: i terms scrivono "Automis" senza forma societaria. In Estonia sarebbe
 *     presumibilmente "Automis OU", ma presumibilmente non basta: si aggiunge quando
 *     qualcuno lo legge sul certificato di registrazione.
 *   - `foundingDate`: i terms danno il numero di registro, non la data di costituzione.
 *   - `vatID`: la partita IVA e' in rilascio (Luca, 31/08/2026). Va aggiunta qui appena
 *     arriva — e' un altro dato che solo l'azienda vera possiede.
 *
 * Sede legale e codice di registro invece ci sono: confermati da Luca il 31/08/2026 e
 * gia' pubblici nei terms of service del sito.
 *
 * I quattro profili sono quelli gia' linkati nel footer del sito, non un elenco nuovo:
 * verificati uno per uno il 31/08/2026, rispondono tutti 200. Se un profilo cambia
 * URL o viene chiuso, va tolto DA QUI oltre che dal footer: un sameAs che punta a una
 * pagina morta indebolisce l'entita' invece di rafforzarla.
 */

const SITE = "https://automis.ai";

/** Riferimento al nodo Organization, per chi lo cita invece di ridescriverlo. */
export const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

const SAME_AS = [
  "https://www.linkedin.com/company/automisai",
  "https://www.instagram.com/automis.ai/",
  "https://www.facebook.com/automisai",
  "https://x.com/AutomisAI",
];

export default function OrganizationJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Automis",
        url: SITE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/assets/images/logos/logo.png`,
          // Misure reali del file, lette dal PNG. Non stimate: un logo dichiarato
          // con dimensioni che non tornano e' un motivo di scarto.
          width: 611,
          height: 255,
        },
        sameAs: SAME_AS,
        // Sede legale e numero di registro: rafforzano l'entita' con dati che solo
        // l'azienda vera possiede, ed e' il tipo di segnale che aiuta a distinguerci
        // dagli omonimi (theautomis.com e AutoMIS di AutoSoft Dynamics).
        // Fonte: i terms of service di questo stesso sito, in tutte e tre le lingue.
        address: {
          "@type": "PostalAddress",
          streetAddress: "Järvevana tee 9",
          addressLocality: "Tallinn",
          addressRegion: "Harju maakond",
          postalCode: "11314",
          addressCountry: "EE",
        },
        identifier: {
          "@type": "PropertyValue",
          name: "Estonian business registry code",
          value: "17179196",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE,
        name: "Automis",
        publisher: { "@id": ORG_ID },
        // Niente SearchAction: la casella di ricerca interna non esiste, e
        // dichiararla farebbe promettere a Google una funzione che non c'e'.
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
