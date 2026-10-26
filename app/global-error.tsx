"use client";

import { useEffect } from "react";
import { cacheGuardScript } from "@/lib/cache-guard";

declare global {
  interface Window {
    __meyraRecoverCache?: () => void;
  }
}

export default function GlobalError() {
  useEffect(() => {
    window.__meyraRecoverCache?.();
  }, []);

  return (
    <html lang="tr">
      <body>
        <script dangerouslySetInnerHTML={{ __html: cacheGuardScript }} />
        <main className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-serif text-xl text-[#193357]">Menü yeniden açılıyor</p>
            <p className="mt-2 text-sm text-[#977958]">Eski önbellek temizleniyor.</p>
          </div>
        </main>
      </body>
    </html>
  );
}
