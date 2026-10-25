import { useState } from "react";
import Image from "next/image";
import { Category } from "@/types/menu";
import ProductImage from "./ProductImage";
import { Sparkles, ChevronRight, Coffee } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryHomeProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
}

export default function CategoryHome({
  categories,
  onSelectCategory,
  onViewAll,
}: CategoryHomeProps) {
  const [bannerImageAvailable, setBannerImageAvailable] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Quick Action Banner */}
      <div className="max-w-md mx-auto">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onViewAll}
          aria-label="Tüm Ürünler"
          className="relative isolate flex aspect-[3/1] min-h-[120px] w-full items-center justify-between overflow-hidden rounded-2xl border border-[#E3D4BB] bg-[#193357] p-5 text-left shadow-card transition-all hover:shadow-soft group"
        >
          {bannerImageAvailable && (
            <Image
              src="/images/tum-menu-banner.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 480px) 100vw, 448px"
              className="absolute inset-0 -z-20 object-cover"
              onError={() => setBannerImageAvailable(false)}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#193357]/85 via-[#193357]/45 to-transparent"
          />
          <span className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 flex-shrink-0 text-[#E3D4BB]" />
            <span className="font-serif text-lg font-bold text-white drop-shadow-sm transition-colors group-hover:text-[#E3D4BB] sm:text-xl">
              Tüm Ürünler
            </span>
          </span>
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-white transition-all group-hover:translate-x-1 group-hover:text-[#E3D4BB]" />
        </motion.button>
      </div>

      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 max-w-5xl mx-auto">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#193357] flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#BC9D77]" />
            <span>Kategoriler</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectCategory(category.id)}
                className="group bg-white rounded-2xl border border-[#E3D4BB] overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Category Image */}
                <div className="relative w-full aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                  <ProductImage
                    src={category.image}
                    alt={category.imageAlt ?? category.name}
                    sizes="(max-width: 640px) 50vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Category Title & Action */}
                <div className="p-4 flex items-center justify-between flex-grow">
                  <h3 className="font-serif font-semibold text-sm sm:text-base text-[#193357] group-hover:text-[#BC9D77] transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#BC9D77] flex items-center justify-center group-hover:bg-[#BC9D77] group-hover:text-white transition-colors flex-shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
