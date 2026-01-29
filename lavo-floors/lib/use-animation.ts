"use client";

import { useEffect, useRef, useState, RefObject } from "react";

export function useAnimation(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.triggerOnce !== false) {
            observer.unobserve(element);
          }
        } else if (options?.triggerOnce === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { ref: ref as RefObject<HTMLElement>, isVisible };
}

