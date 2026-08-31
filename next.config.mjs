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
  // SPIKE, non da tenere se non funziona. Domanda: la CDN di Vercel accetta di
  // cachare le risposte di pagine rese dinamicamente? Oggi ogni pagina esce con
  // `cache-control: private, no-store` e `x-vercel-cache: MISS` perche' il root
  // layout legge headers(). Se questi due header bastano, si ottiene il beneficio
  // (cache CDN, TTFB, crawl budget) senza spostare 158 file in route group.
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