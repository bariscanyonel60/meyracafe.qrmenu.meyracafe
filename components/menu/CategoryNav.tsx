import React, { useRef, useEffect } from "react";
import { Category } from "@/types/menu";
import { Sparkles, LucideIcon } from "lucide-react";

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

interface TabItem {
  id: string;
  name: string;
  icon?: LucideIcon;
}

export default function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allTabs: TabItem[] = [
    { id: "all", name: "Tümü", icon: Sparkles },
    ...categories,
  ];

  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E3D4BB] py-3 shadow-sm">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 max-w-7xl mx-auto"
      >
        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              data-category={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 min-h-[40px] flex-shrink-0 ${
                isActive
                  ? "bg-[#193357] text-white shadow-sm font-semibold"
                  : "bg-white text-[#193357] border border-[#E3D4BB] hover:bg-[#FAF7F2]"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-[#BC9D77]" />}
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
