"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimation } from "@/lib/use-animation";

export function IntroSection() {
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-wide mb-6 text-balance animate-fade-up ${isVisible ? 'visible' : ''}`}>
          LAVO FLOORS. BUILT FOR LIVING.
        </h2>
        <p className={`text-muted-foreground leading-relaxed mb-8 animate-fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Our engineered hardwood floors combine timeless beauty with modern
          durability. Each plank is crafted with precision, featuring real oak
          veneer over a stable core that resists warping and expanding. From
          Nordic-inspired light tones to rich, dark finishes, find the perfect
          floor to complement your space.
        </p>
        <Link
          href="/products"
          className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide hover:gap-3 transition-all animate-fade-up ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          Discover all Lavo floors
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
