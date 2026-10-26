"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __meyraRecoverCache?: () => void;
  }
}

export default function MenuError() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    window.__meyraRecoverCache?.();
    const timer = window.setTimeout(() => setStuck(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-serif text-xl text-[#193357]">Menü yeniden açılıyor</p>
        <p className="mt-2 text-sm text-[#977958]">Eski önbellek temizleniyor.</p>
        {stuck ? (
          <button
            type="button"
            className="mt-5 rounded-full bg-[#193357] px-5 py-2 text-sm text-white"
            onClick={() => {
              try {
                sessionStorage.removeItem("meyra-cache-reload");
              } catch {
                // Oturum deposu kapalıysa doğrudan yenile.
              }
              const url = new URL(window.location.href);
              url.searchParams.set("nocache", String(Date.now()));
              window.location.replace(url.toString());
            }}
          >
            Yeniden dene
          </button>
        ) : null}
      </div>
    </main>
  );
}
