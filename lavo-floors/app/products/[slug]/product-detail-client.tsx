"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteModal } from "@/components/quote-modal";
import { ProductImageSlider } from "@/components/products/product-image-slider";
import { ProductCard } from "@/components/products/product-card";

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
      {/* Back Button */}
      <section className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Product Image Slider */}
            <div>
              <ProductImageSlider 
                images={product.images || []} 
                productName={product.name}
              />
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              {/* SKU Number - 14px */}
              <p className="text-[14px] text-muted-foreground mb-4">
                {product.sku}
              </p>

              {/* Product Name - 32px */}
              <h1 className="text-[32px] font-bold tracking-wide mb-6">
                {product.name}
              </h1>

              {/* Product Parameters Table */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-border">
                        <td className="py-3 text-sm text-muted-foreground">
                          {spec.label}
                        </td>
                        <td className="py-3 text-sm font-medium text-right">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Contact Sales Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
              >
                CONTACT SALES
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
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
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
