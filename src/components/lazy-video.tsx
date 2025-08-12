"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use compressed video if available
  const videoSrc = src.replace('/public/', '/').replace('.mp4', '');
  const compressedMp4 = `/compressed${videoSrc}.mp4`;
  const compressedWebm = `/compressed${videoSrc}.webm`;
  const originalSrc = src;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsLoading(false);
      });
    }
  }, [shouldLoad]);

  // Generate a placeholder div with blur effect
  const placeholderElement = (
    <div 
      className={`${className} bg-gray-200 dark:bg-gray-800 animate-pulse`}
      aria-label="Video loading..."
    />
  );

  return (
    <div ref={containerRef} className="relative">
      {shouldLoad ? (
        <>
          {isLoading && placeholderElement}
          <video
            ref={videoRef}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            className={`${className} ${isLoading ? 'invisible absolute' : ''}`}
          >
            <source src={compressedWebm} type="video/webm" />
            <source src={compressedMp4} type="video/mp4" />
            <source src={originalSrc} type="video/mp4" />
          </video>
        </>
      ) : (
        poster ? (
          <Image
            src={poster}
            alt="Video thumbnail"
            width={500}
            height={300}
            className={className}
            loading="lazy"
          />
        ) : (
          placeholderElement
        )
      )}
    </div>
  );
}
