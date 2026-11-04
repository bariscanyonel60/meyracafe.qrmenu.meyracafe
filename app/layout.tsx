import type { Metadata, Viewport } from "next";
import { cacheGuardScript } from "@/lib/cache-guard";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const buildId = process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_GIT_COMMIT_SHA || "dev";

export const metadata: Metadata = {
  title: "Meyra Kafe | QR Menü",
  description: "Kahve, tatlı ve keyifli molalar için butik kafe menüsü.",
  other: {
    "meyra-build": buildId,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased selection:bg-meyra-copper/20 selection:text-meyra-text">
        <script dangerouslySetInnerHTML={{ __html: cacheGuardScript }} />
        {children}
      </body>
    </html>
  );
}
