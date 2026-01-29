"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimation } from "@/lib/use-animation";

const contentData = [
  {
    image: "/images/lavo-floor-home-split-feature-01.jpg",
    title: "Quality You Can See. Performance You Can Trust.",
    description:
      "Every Lavo floor is manufactured to the highest standards. Our multi-layer construction ensures dimensional stability, while the premium oak surface delivers the warmth and character of real wood. Backed by our 25-year warranty for complete peace of mind.",
  },
  {
    image: "/images/lavo-floor-home-split-feature-02.jpg",
    title: "Technical design",
    description:
      "Lorem ipsum dolor sit amet consectetur. Erat tristique volutpat cursus non eu interdum. Id quisque faucibus ut dolor fermentum mattis amet.",
  },
  {
    image: "/images/lavo-floor-home-split-feature-03.jpg",
    title: "Customer support",
    description:
      "Lorem ipsum dolor sit amet consectetur. Erat tristique volutpat cursus non eu interdum. Id quisque faucibus ut dolor fermentum mattis amet.",
  },
];

const features = [
  "Individual approach",
  "Technical design",
  "Customer support",
];

export function SplitFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });

  useEffect(() => {
    // 设置自动切换定时器
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
    }, 5000);

    // 清理定时器
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    // 重置定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
    }, 5000);
  };

  return (
    <section ref={ref} className="py-20 bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            {contentData.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="relative min-h-[120px] mb-6">
              {contentData.map((item, index) => (
                <h2
                  key={index}
                  className={`absolute top-0 left-0 text-3xl md:text-4xl font-bold tracking-wide text-balance transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.title}
                </h2>
              ))}
            </div>
            <div className="relative min-h-[100px] mb-8">
              {contentData.map((item, index) => (
                <p
                  key={index}
                  className={`absolute top-0 left-0 text-muted-foreground leading-relaxed transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.description}
                </p>
              ))}
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleFeatureClick(index)}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 border-2 transition-colors duration-300 ${
                      index === activeIndex
                        ? "bg-foreground border-foreground"
                        : "bg-transparent border-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      index === activeIndex
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              LEARN MORE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
