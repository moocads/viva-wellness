"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/lib/use-animation";

export function LifestyleImage() {
  const { ref, isVisible } = useAnimation({ threshold: 0.2 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 计算元素在视口中的位置
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // 当元素进入视口时开始计算进度
      // 从元素顶部进入视口到完全离开视口底部
      const startPoint = windowHeight;
      const endPoint = -elementHeight;
      const totalDistance = startPoint - endPoint;
      const currentDistance = elementTop;
      
      // 计算滚动进度 (0 到 1)
      let progress = (startPoint - currentDistance) / totalDistance;
      progress = Math.max(0, Math.min(1, progress)); // 限制在 0-1 之间
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 计算 transform 值
  // translateY: 0 → -80px
  const translateY = -scrollProgress * 80;
  // scale: 1.02 → 1.06
  const scale = 1.02 + scrollProgress * 0.4;

  return (
    <section ref={ref}>
      <div className="max-w-full mx-auto px-0 overflow-hidden">
        <div
          ref={imageRef}
          className={`relative w-full h-[300px] md:h-[500px] bg-cover bg-center bg-no-repeat animate-fade-in ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundImage: "url('/images/lavo-floor-lifestyle-bg.jpg')",
            transform: `translateY(${translateY}px) scale(${scale})`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* 暗角/渐变 overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>
      </div>
    </section>
  );
}
