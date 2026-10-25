import React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

export default function FavoriteButton({ isFavorite, onToggle, className = "" }: FavoriteButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={onToggle}
      aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
      className={`p-2.5 rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
        isFavorite
          ? "bg-rose-50 text-rose-500 shadow-sm"
          : "bg-white/80 backdrop-blur-sm text-meyra-muted hover:text-meyra-text hover:bg-white"
      } ${className}`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
    </motion.button>
  );
}
