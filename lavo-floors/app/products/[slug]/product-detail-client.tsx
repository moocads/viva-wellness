"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteModal } from "@/components/quote-modal";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specs = [
    { label: "Colour", value: product.colour },
    { label: "Collection", value: product.collection },
    { label: "Size", value: product.size },
    { label: "Thickness", value: product.thickness },
    { label: "Length", value: product.length },
    { label: "Width", value: product.width },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">
            {product.metaLine}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Specifications */}
              <div className="border-t border-border pt-6 mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
                  Specifications
                </h3>
                <dl className="space-y-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
              >
                GET QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold tracking-wide mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.slug}
                href={`/products/${relatedProduct.slug}`}
                className="group bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {relatedProduct.collection}
                  </p>
                  <h3 className="text-sm font-medium">{relatedProduct.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
      />
    </>
  );
}
