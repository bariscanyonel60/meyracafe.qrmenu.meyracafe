"use client";

import { useState, useMemo } from "react";
import { MenuData, Product } from "@/types/menu";
import CategoryHome from "./CategoryHome";
import CategoryNav from "./CategoryNav";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import ProductDialog from "./ProductDialog";
import EmptyState from "./EmptyState";
import { matchProduct } from "@/lib/search";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuShellProps {
  data: MenuData;
}

export default function MenuShell({ data }: MenuShellProps) {
  const [currentView, setCurrentView] = useState<"categories" | "products">("categories");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Handle selecting a category from home grid
  const handleSelectCategoryFromHome = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery("");
    setCurrentView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle selecting tab from category nav
  const handleSelectTab = (tabId: string) => {
    setActiveCategory(tabId);
    setSearchQuery("");
  };

  // Back to categories home
  const handleBackToCategories = () => {
    setCurrentView("categories");
    setActiveCategory("all");
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return data.products.filter((product) => {
      if (searchQuery.trim()) {
        const matchesName = matchProduct(product.name, searchQuery);
        const matchesCategory = matchProduct(product.categoryName, searchQuery);
        return matchesName || matchesCategory;
      }

      if (activeCategory !== "all" && currentView === "products") {
        if (product.category !== activeCategory) return false;
      }

      return true;
    });
  }, [data.products, activeCategory, searchQuery, currentView]);

  // Current category name for header
  const currentCategoryName = useMemo(() => {
    if (searchQuery.trim()) return `"${searchQuery}" için arama sonuçları`;
    if (activeCategory === "all") return "Tüm Ürünler";
    const cat = data.categories.find((c) => c.id === activeCategory);
    return cat ? cat.name : "Menü";
  }, [activeCategory, data.categories, searchQuery]);

  return (
    <div className="min-h-screen bg-white pb-16 flex flex-col">
      {/* Search Header section */}
      <div className="bg-white border-b border-[#E3D4BB] py-4 px-4 sm:px-6 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {currentView !== "categories" && !searchQuery && (
            <button
              onClick={handleBackToCategories}
              aria-label="Kategorilere Dön"
              className="p-2.5 rounded-full bg-[#FAF7F2] text-[#977958] hover:bg-[#E3D4BB]/40 transition-colors flex items-center justify-center flex-shrink-0 min-w-[40px] min-h-[40px]"
            >
              <ArrowLeft className="w-5 h-5 text-[#193357]" />
            </button>
          )}
          <div className="flex-grow">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                if (val.trim() && currentView === "categories") {
                  setCurrentView("products");
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area with AnimatePresence */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === "categories" && !searchQuery.trim() ? (
            <motion.div
              key="categories-home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <CategoryHome
                categories={data.categories}
                onSelectCategory={handleSelectCategoryFromHome}
                onViewAll={() => {
                  setActiveCategory("all");
                  setCurrentView("products");
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="product-catalog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <CategoryNav
                categories={data.categories}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectTab}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBackToCategories}
                      className="text-xs font-semibold text-[#977958] hover:underline flex items-center gap-1 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#E3D4BB]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#193357]" />
                      <span className="text-[#193357]">Kategoriler</span>
                    </button>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#193357]">
                      {currentCategoryName}
                    </h2>
                  </div>
                  <span className="text-xs text-[#977958] font-medium">
                    {filteredProducts.length} ürün
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => {
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetails={(p) => setActiveProduct(p)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title="Ürün bulunamadı"
                    description="Arama kriterlerinize veya seçtiğiniz kategoriye uygun ürün bulunamadı."
                    onReset={handleBackToCategories}
                    resetLabel="Kategorilere Dön"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Detail Modal / Bottom Sheet */}
      <ProductDialog
        product={activeProduct}
        isOpen={!!activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
}
