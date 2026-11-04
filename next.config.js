/** @type {import('next').NextConfig} */
const NO_STORE = "private, no-cache, no-store, max-age=0, must-revalidate";

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  async headers() {
    return [
      {
        // HTML only — leave hashed /_next/static assets cacheable.
        source: "/",
        headers: [
          { key: "Cache-Control", value: NO_STORE },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
          { key: "Surrogate-Control", value: "no-store" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
