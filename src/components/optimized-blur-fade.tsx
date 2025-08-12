"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedBlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  inView?: boolean;
  inViewMargin?: number;
}

export default function OptimizedBlurFade({
  children,
  className,
  delay = 0,
  duration = 0.3,
  inView = true,
  inViewMargin = -50,
}: OptimizedBlurFadeProps) {
  const [isVisible, setIsVisible] = useState(!inView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) {
      // If inView is false, show immediately
      setTimeout(() => setIsVisible(true), delay * 1000);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: `${inViewMargin}px` 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, inView, inViewMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        isVisible 
          ? "opacity-100 blur-0 translate-y-0" 
          : "opacity-0 blur-sm translate-y-4",
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionProperty: 'opacity, filter, transform',
      }}
    >
      {children}
    </div>
  );
}
