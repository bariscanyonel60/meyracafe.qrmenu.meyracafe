import { Coffee, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export default function EmptyState({
  title = "Ürün bulunamadı",
  description = "Arama kriterlerinize veya seçtiğiniz filtrelere uygun ürün bulunamadı.",
  onReset,
  resetLabel = "Filtreleri Temizle",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-meyra-sage-light flex items-center justify-center text-meyra-sage mb-4">
        <Coffee className="w-8 h-8 opacity-70" />
      </div>
      <h3 className="font-serif font-semibold text-xl text-meyra-text mb-2">{title}</h3>
      <p className="text-sm text-meyra-muted max-w-sm mb-6">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-meyra-text text-meyra-bg text-sm font-medium hover:bg-meyra-copper transition-colors min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{resetLabel}</span>
        </button>
      )}
    </div>
  );
}
