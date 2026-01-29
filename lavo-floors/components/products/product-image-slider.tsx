"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageSliderProps {
  images: string[];
  productName: string;
}

export function ProductImageSlider({ images, productName }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src="/placeholder.svg"
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div>
      {/* Main Image Slider */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden mb-4">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 relative overflow-hidden border-2 transition-colors ${
                currentIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
