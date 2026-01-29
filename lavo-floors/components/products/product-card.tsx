"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-card"
    >
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        onMouseEnter={() => hasMultipleImages && setCurrentImageIndex(1)}
        onMouseLeave={() => hasMultipleImages && setCurrentImageIndex(0)}
      >
        {images.length > 0 && (
          <>
            {/* First image - always visible */}
            <Image
              src={images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-500 ${
                currentImageIndex === 0 ? "opacity-100" : "opacity-0 absolute"
              }`}
            />
            {/* Second image - fades in on hover */}
            {hasMultipleImages && (
              <Image
                src={images[1] || "/placeholder.svg"}
                alt={`${product.name} - View 2`}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  currentImageIndex === 1 ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </>
        )}
        {images.length === 0 && (
          <Image
            src="/placeholder.svg"
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 truncate">
          {product.metaLine}
        </p>
        <h3 className="text-sm font-medium">{product.name}</h3>
      </div>
    </Link>
  );
}
