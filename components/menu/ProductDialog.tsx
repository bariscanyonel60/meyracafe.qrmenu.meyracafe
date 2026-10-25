import React, { useEffect, useRef } from "react";
import { Product } from "@/types/menu";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/format";
import { X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDialog({
  product,
  isOpen,
  onClose,
}: ProductDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const price = product.variants[0]?.price || 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#193357]/50 backdrop-blur-sm"
        />

        <motion.div
          ref={dialogRef}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-modal overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col z-10"
        >
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Kapat"
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#193357] shadow-md hover:bg-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full aspect-[4/3] bg-[#FAF7F2]">
            <ProductImage
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 500px"
              priority
            />
          </div>

          <div className="p-6 overflow-y-auto space-y-4">
            <div>
              <span className="text-xs font-medium text-[#BC9D77] uppercase tracking-wider block mb-1">
                {product.categoryName}
              </span>
              <h2 id="modal-product-title" className="font-serif font-bold text-2xl text-[#193357]">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E3D4BB]">
              <div>
                <span className="text-xs text-[#977958] block">Fiyat</span>
                <span className="font-serif font-bold text-2xl text-[#193357]">
                  {formatPrice(price)}
                </span>
              </div>
            </div>

            {product.imageMatch && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] text-[#977958] text-xs border border-[#E3D4BB]/60">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{product.imageMatch}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
