"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimation } from "@/lib/use-animation";
import { useEffect, useState } from "react";

type SeriesCardItem = {
  id: string;
  href: string;
  imageUrl: string;
  collectionName: string;
  seriesName: string;
  seriesShortDescription: string;
};

export function SeriesCards() {
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });
  const [series, setSeries] = useState<SeriesCardItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/series-cards");
        if (!res.ok) return;
        const json = (await res.json()) as { items: SeriesCardItem[] };
        if (!cancelled) setSeries(json.items || []);
      } catch {
        // ignore
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} className="px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-6 animate-stagger ${isVisible ? 'visible' : ''}`}>
          {series.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative h-[300px] md:h-[400px] overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs uppercase tracking-widest mb-2 opacity-80">
                  {item.collectionName}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Series -{item.seriesName}
                </h3>
                <p className="text-sm opacity-80 mb-4 max-w-md">
                  {item.seriesShortDescription}
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
