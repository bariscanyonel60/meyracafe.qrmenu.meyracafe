import { getMenuData } from "@/lib/menu";
import MenuShell from "@/components/menu/MenuShell";
import Image from "next/image";

export default function Home() {
  const data = getMenuData();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Brand Header with Logo */}
      <header className="bg-white border-b border-[#E3D4BB]/60 py-6 px-4 sm:px-8 text-center shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center">
            <Image
              src="/images/logo/Meyra_Cafe_Orijinal_Logo.png"
              alt="Meyra Kafe Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#193357] tracking-wide mb-1">
            {data.brand}
          </h1>
          <p className="text-xs sm:text-sm text-[#977958] font-medium tracking-wider uppercase">
            Kahve, tatlı ve keyifli molalar
          </p>
        </div>
      </header>

      {/* Menu Content Shell */}
      <div className="flex-grow">
        <MenuShell data={data} />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E3D4BB]/60 py-6 px-4 text-center text-xs text-[#977958]">
        <p>© {new Date().getFullYear()} {data.brand}. Tüm hakları saklıdır. Görseller temsilidir.</p>
      </footer>
    </div>
  );
}
