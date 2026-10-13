import localFont from "next/font/local";

/*
  Montserrat 700 e Open Sans 400 (sottoinsieme latin, licenza OFL), serviti da noi.

  Prima stavano in next/font/google: a ogni `next build` Next scaricava il CSS da Google Fonts e,
  se la risposta non era quella attesa (rete, limite di richieste, build in parallelo), la build
  cadeva con «Cannot read properties of null (reading '1')». Ora i file sono nel repo e la build
  del layout non dipende piu' dalla rete (la pagina /it/luca-ig lo e' finche' non passa a lib/v2/fonts-luca.js). Stessi pesi, stesse variabili CSS (--font-montserrat,
  --font-open-sans) che public/assets/css/style.css legge per titoli e testo delle pagine vecchie.

  Sono i file che Google serve per il latin con un solo peso (v31 / v44): se un giorno serve un altro
  peso o un'altra lingua con accenti fuori dal latin, si aggiunge qui il file, non si torna a Google.
*/
export const montserrat = localFont({
  src: [{ path: "./fonts/montserrat-700-latin.woff2", weight: "700", style: "normal" }],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["sans-serif"],
});

export const openSans = localFont({
  src: [{ path: "./fonts/open-sans-400-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-open-sans",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["sans-serif"],
});
