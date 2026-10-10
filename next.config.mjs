/** @type {import('next').NextConfig} */
const nextConfig = {
  // scripts/verify.sh builds into .next-verify so it never clobbers a running `next dev`.
  // Unset everywhere else (Vercel included), so production still builds into .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    // Pages retired in the 2026-07 site rollout — keep old links alive.
    //
    // Sito v2 (10/2026): escono /jumpstart-audit, /consultation e /ai-automations. I redirect di
    // next.config girano PRIMA del middleware, quindi valgono sui percorsi pubblici, /pt compreso
    // (il middleware riscrive /pt -> /pt-site solo dopo). 308 permanenti, query string conservata
    // (le UTM dei link gia' in giro arrivano a destinazione).
    return [
      { source: "/paid-ads-management", destination: "/systems", permanent: true },
      { source: "/it/paid-ads-management", destination: "/it", permanent: true },
      { source: "/coming-soon", destination: "/", permanent: true },
      { source: "/blog-details", destination: "/blog", permanent: true },
      // IG-bio landing renamed: /arcangelo -> /playbook.
      { source: "/arcangelo", destination: "/playbook", permanent: true },
      // Jumpstart Audit e consulenza gratuita: la prenotazione e il Finder vivono in /contact.
      { source: "/jumpstart-audit", destination: "/contact", permanent: true },
      { source: "/it/jumpstart-audit", destination: "/it/contact", permanent: true },
      { source: "/pt/jumpstart-audit", destination: "/pt/contact", permanent: true },
      { source: "/consultation", destination: "/contact", permanent: true },
      { source: "/it/consultation", destination: "/it/contact", permanent: true },
      { source: "/pt/consultation", destination: "/pt/contact", permanent: true },
      // La vecchia pagina delle automazioni lascia il posto all'hub dei sistemi.
      { source: "/ai-automations", destination: "/systems", permanent: true },
      { source: "/it/ai-automations", destination: "/it/systems", permanent: true },
      { source: "/pt/ai-automations", destination: "/pt/systems", permanent: true },
    ];
  },
  // Queste due righe hanno risparmiato una ristrutturazione da 158 file.
  //
  // Il root layout legge headers() per l'attributo <html lang>, il che rende dinamica
  // ogni pagina del sito: `cache-control: private, no-store` e `x-vercel-cache: MISS`
  // su ogni richiesta, Googlebot compreso. L'unico modo per tornare statici sarebbe
  // spezzare l'app in sette root layout con i route group — 158 file spostati, e
  // niente di verificabile prima del deploy.
  //
  // MISURATO in produzione il 31/08/2026: con questi header la seconda richiesta alla
  // stessa URL risponde `x-vercel-cache: HIT` su tutte le pagine provate (/, /blog,
  // /it/blog, /pt/blog, un articolo, /it/voice-ai), mentre /api/* resta MISS e il
  // browser continua a ricevere no-store. Beneficio preso, ristrutturazione annullata.
  //
  // CDN-Cache-Control e Vercel-CDN-Cache-Control sono letti dalla CDN e NON vengono
  // inoltrati al browser, quindi non cambiano il comportamento del client: per
  // questo possono convivere con il no-store che Next emette dalla lambda.
  //
  // /api/* resta fuori: sono route con effetti (consent, contact, conversions) e
  // cacharle sarebbe un errore, non un'ottimizzazione.
  async headers() {
    return [
      {
        // /en/try is a live demo served from another project via rewrite. A 1h CDN cache
        // there serves stale HTML after a redeploy, so it is excluded alongside /api.
        source: "/((?!api/|en/try).*)",
        headers: [
          { key: "Vercel-CDN-Cache-Control", value: "max-age=3600" },
          { key: "CDN-Cache-Control", value: "max-age=3600" },
        ],
      },
    ];
  },

  async rewrites() {
    // /it/prova non e' una pagina del sito: e' l'app della demo porta a porta, servita da un
    // progetto Vercel separato. Cosi' si itera sulla demo senza toccare automis.ai.
    // Il :path* serve anche alle sue API interne, che vivono sotto /it/prova/api/.
    return [
      {
        source: "/it/prova",
        destination: "https://automis-prova-attivita-automis-team.vercel.app/it/prova",
      },
      {
        source: "/it/prova/:path*",
        destination: "https://automis-prova-attivita-automis-team.vercel.app/it/prova/:path*",
      },
      // /en/try is the English twin of /it/prova: a separate Vercel project
      // (automis-try-en) so the Italian demo is never touched by English changes.
      {
        source: "/en/try",
        destination: "https://automis-try-en-automis-team.vercel.app/en/try",
      },
      {
        source: "/en/try/:path*",
        destination: "https://automis-try-en-automis-team.vercel.app/en/try/:path*",
      },
      // Sito v2: le due landing e-commerce (solo in italiano) sono file statici in
      // public/ecommerce-static, portati cosi' come sono dalla cartella di lavoro. Il percorso
      // pubblico resta quello del sito: /it/ecommerce/<piattaforma>.
      {
        source: "/it/ecommerce/shopify",
        destination: "/ecommerce-static/shopify/index.html",
      },
      {
        source: "/it/ecommerce/woocommerce",
        destination: "/ecommerce-static/woocommerce/index.html",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;