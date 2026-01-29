"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimation } from "@/lib/use-animation";

const series = [
  {
    title: "Series 1",
    subtitle: "Classic Collection",
    description:
      "Timeless designs featuring natural oak tones and traditional patterns for elegant interiors.",
    image: "/images/collection-01.jpg",
    href: "/products/series/series-a",
  },
  {
    title: "Series 2",
    subtitle: "Contemporary Collection",
    description:
      "Modern aesthetics with cool grey tones and minimalist finishes for contemporary spaces.",
    image: "/images/collection-02.jpg",
    href: "/products/series/series-b",
  },
];

export function SeriesCards() {
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-6 animate-stagger ${isVisible ? 'visible' : ''}`}>
          {series.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative h-[300px] md:h-[400px] overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs uppercase tracking-widest mb-2 opacity-80">
                  {item.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm opacity-80 mb-4 max-w-md">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
