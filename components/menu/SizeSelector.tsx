import React from "react";
import { Variant } from "@/types/menu";

interface SizeSelectorProps {
  variants: Variant[];
  selectedLabel: string;
  onSelectSize: (label: string, e?: React.MouseEvent) => void;
  size?: "sm" | "md";
}

export default function SizeSelector({
  variants,
  selectedLabel,
  onSelectSize,
  size = "sm",
}: SizeSelectorProps) {
  if (!variants || variants.length <= 1) return null;

  return (
    <div
      className="inline-flex bg-[#EFECE6] p-1 rounded-lg border border-meyra-border"
      onClick={(e) => e.stopPropagation()}
    >
      {variants.map((variant) => {
        const isSelected = variant.label === selectedLabel;
        return (
          <button
            key={variant.label}
            type="button"
            onClick={(e) => onSelectSize(variant.label, e)}
            className={`font-medium rounded-md transition-all duration-200 min-h-[36px] px-3 flex items-center justify-center ${
              size === "sm" ? "text-xs" : "text-sm"
            } ${
              isSelected
                ? "bg-white text-meyra-text shadow-sm font-semibold"
                : "text-meyr-muted hover:text-meyra-text opacity-70 hover:opacity-100"
            }`}
          >
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
