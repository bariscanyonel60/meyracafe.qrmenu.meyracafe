import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Kahve, tatlı veya içecek ara...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-meyra-muted">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white border border-meyra-border rounded-full text-sm text-meyra-text placeholder-meyra-muted/60 focus:outline-none focus:ring-2 focus:ring-meyra-copper/40 focus:border-meyra-copper transition-all shadow-card"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Aramayı temizle"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-meyra-muted hover:text-meyra-text min-w-[44px] min-h-[44px] justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
