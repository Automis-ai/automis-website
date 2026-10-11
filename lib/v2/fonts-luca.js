import localFont from "next/font/local";

/*
  Font della pagina /it/luca-ig (Montserrat 400/600/700/800 e Open Sans 400/600/700, latin, OFL),
  serviti da noi come quelli di lib/v2/fonts.js. Stanno in un modulo a parte perche' li importa solo
  quella pagina: cosi' le altre non si portano dietro i file che non usano.
  Variabili CSS identiche a quelle che la pagina dichiarava con next/font/google:
  --lucaig-mont e --lucaig-open.
*/
export const lucaMont = localFont({
  src: [
    { path: "./fonts/montserrat-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/montserrat-600-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/montserrat-700-latin.woff2", weight: "700", style: "normal" },
    { path: "./fonts/montserrat-800-latin.woff2", weight: "800", style: "normal" },
  ],
  variable: "--lucaig-mont",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["sans-serif"],
});

export const lucaOpen = localFont({
  src: [
    { path: "./fonts/open-sans-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/open-sans-600-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/open-sans-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--lucaig-open",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["sans-serif"],
});
