"use client";

import { useState } from "react";
import Link from "next/link";
import { useAnimation } from "@/lib/use-animation";

type HeroProps = {
  /** 第一个 Collection 详情页，例如 /products/water-resistant-laminate */
  collectionHref?: string;
};

export function Hero({ collectionHref = "/products" }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/lavo-floor-home-hero-banner-01.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <p className={`text-sm md:text-base tracking-widest uppercase mb-4 opacity-90 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          Engineered flooring solutions for every space
        </p>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-8 text-balance animate-fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          LAVO FLOORS. BUILT FOR LIVING.
        </h1>
        <Link
          href={collectionHref}
          className={`px-8 py-3 bg-white text-foreground text-sm font-medium tracking-wide hover:bg-white/90 transition-colors animate-fade-up ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          VIEW PRODUCTS
        </Link>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeSlide === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
