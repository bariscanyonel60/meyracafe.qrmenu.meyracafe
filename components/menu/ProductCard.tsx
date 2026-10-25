import { Product } from "@/types/menu";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/format";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOpenDetails,
}: ProductCardProps) {
  const price = product.variants[0]?.price || 0;
  const showPrice = product.category !== "aperatifler";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-2xl border border-[#E3D4BB] p-3 sm:p-4 shadow-card hover:shadow-soft transition-all duration-300 flex flex-row sm:flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <div className="flex sm:flex-col w-full gap-3.5 sm:gap-4 items-center sm:items-stretch">
        <div className="relative w-[104px] h-[104px] sm:w-full sm:aspect-[4/3] flex-shrink-0 rounded-xl overflow-hidden bg-[#FAF7F2]">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            sizes="(max-width: 640px) 120px, 400px"
          />
        </div>

        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div>
            <div className="mb-1">
              <span className="text-[11px] font-medium text-[#BC9D77] uppercase tracking-wider">
                {product.categoryName}
              </span>
            </div>

            <h3 className="font-serif font-semibold text-base sm:text-lg text-[#193357] group-hover:text-[#BC9D77] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>

          {showPrice && (
            <div className="mt-3 flex items-end justify-between gap-2 pt-2 border-t border-[#E3D4BB]/45">
              <div>
                <span className="font-serif font-bold text-base sm:text-lg text-[#193357]">
                  {formatPrice(price)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
