/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Pages retired in the 2026-07 site rollout — keep old links alive.
    return [
      { source: "/paid-ads-management", destination: "/ai-automations", permanent: true },
      { source: "/it/paid-ads-management", destination: "/it", permanent: true },
      { source: "/coming-soon", destination: "/", permanent: true },
      { source: "/blog-details", destination: "/blog", permanent: true },
      // Free consultation now lives as step 1 of the Jumpstart Audit ladder.
      { source: "/consultation", destination: "/jumpstart-audit", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
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