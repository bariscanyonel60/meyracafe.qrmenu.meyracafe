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
        source: "/",
        headers: [
          { key: "Cache-Control", value: NO_STORE },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
          // Must stay ahead of Next's infinite static stale time so the
          // browser parses this as 0 (parseInt stops at the first value).
          { key: "x-nextjs-stale-time", value: "0" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
