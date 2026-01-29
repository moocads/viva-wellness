"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { useAnimation } from "@/lib/use-animation";

export function BestSelling() {
  const bestSellers = products.slice(0, 4);
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-wide mb-4 animate-fade-up ${isVisible ? 'visible' : ''}`}>
            Best Selling Floors
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto animate-fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Discover our most popular flooring options, chosen by homeowners and
            designers alike for their exceptional quality and timeless appeal.
          </p>
        </div>

        {/* Product Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-stagger-left ${isVisible ? 'visible' : ''}`}>
          {bestSellers.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {product.collection}
                </p>
                <h3 className="text-sm font-medium">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center animate-fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
          >
            VIEW PRODUCTS
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
