import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meyra Kafe | QR Menü",
  description: "Kahve, tatlı ve keyifli molalar için butik kafe menüsü.",
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
        {children}
      </body>
    </html>
  );
}
