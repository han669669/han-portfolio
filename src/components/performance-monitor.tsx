"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Observe Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Observe First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Observe Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsScore = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
          console.log('CLS:', clsScore);
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Monitor resource loading
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.name.includes('.mp4') || entry.name.includes('.webm')) {
              console.log(`Video loaded: ${entry.name} - ${entry.duration}ms`);
            }
          });
        });
        resourceObserver.observe({ type: 'resource', buffered: true });

      } catch (e) {
        console.error('Performance monitoring error:', e);
      }
    }

    // Page visibility monitoring
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Pause non-critical operations when page is hidden
        console.log('Page hidden - pausing operations');
      } else {
        console.log('Page visible - resuming operations');
      }
    });

    // Connection monitoring
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      connection.addEventListener('change', () => {
        console.log('Connection changed:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });
      });
    }

  }, []);

  return null;
}
