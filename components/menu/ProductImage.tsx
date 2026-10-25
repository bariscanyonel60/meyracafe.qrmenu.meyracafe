import React, { useState } from "react";
import Image from "next/image";
import { Coffee } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 120px, 300px",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${fill ? "absolute inset-0" : ""} flex flex-col items-center justify-center bg-meyra-sage-light text-meyra-sage rounded-xl ${className}`}
        style={!fill && width && height ? { width, height } : { width: "100%", height: "100%" }}
      >
        <Coffee className="w-8 h-8 opacity-60 mb-1" />
        <span className="text-[10px] font-medium tracking-wide opacity-70">Meyra</span>
      </div>
    );
  }

  return (
    <div className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden bg-[#EFECE6] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-300 hover:scale-105"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
