/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Pages retired in the 2026-07 site rollout — keep old links alive.
    return [
      { source: "/paid-ads-management", destination: "/ai-automations", permanent: true },
      { source: "/it/paid-ads-management", destination: "/it", permanent: true },
      { source: "/coming-soon", destination: "/", permanent: true },
      { source: "/blog-details", destination: "/blog", permanent: true },
      // IG-bio landing renamed: /arcangelo -> /playbook.
      { source: "/arcangelo", destination: "/playbook", permanent: true },
      // Free consultation now lives as step 1 of the Jumpstart Audit ladder.
      { source: "/consultation", destination: "/jumpstart-audit", permanent: false },
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
        source: "/((?!api/).*)",
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