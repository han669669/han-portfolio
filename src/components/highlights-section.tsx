"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BlurFade from "@/components/magicui/blur-fade";
import { OptimizedImage } from "@/components/optimized-image";

type Highlight = {
  tag: string;
  title: string;
  blurb: string;
  image: string;
  stack: string[];
  url: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    tag: "LUXURY BRANDING",
    title: "Fragrance Product",
    blurb: "Premium perfume product page with book-a-consultation and store locations.",
    image: "/luxury perfume mockup (v2).jpg",
    stack: [
      "React",
      "React Router",
      "Typescript",
      "Vite",
      "TailWindCSS",
      "Framer Motion",
      "PostCSS",
      "Autoprefixer",
      "Radix UI",
      "Lucide React",
      "Vercel",
      "Warp.dev",
      "Claude Opus 4.1",
      "Claude Sonnet 4",
    ],
    url: "https://lancomesingaporeperfume.craftedbyhan.xyz/",
  },
  {
    tag: "REAL ESTATE",
    title: "Listings Platform",
    blurb: "Luxury real estate marketplace featuring pristine, top-tier UI/UX and polished interactions.",
    image: "/real estate mockup (v2).jpg",
    stack: [
      "React",
      "Typescript",
      "Vite",
      "TailWindCSS",
      "React Query",
      "Framer Motion",
      "Lucide React",
      "Windsurf",
      "Claude Sonnet 3.5",
      "Meta AI Llama 3.1",
      "Cloudflare"
    ],
    url: "https://malaysiahomefinder.craftedbyhan.xyz/",
  },
  {
    tag: "AI INTEGRATION",
    title: "Plug-in AI Services",
    blurb: "Integrating AI APIs into existing websites and web apps to power smart features.",
    image: "/ai integration mockup (v1).jpg",
    stack: [
      "HTML",
      "CSS",
      "Javascript",
      "Express.js",
      "Node.js",
      "compromise(nlp package)",
      "minisearch(text search engine)",
      "OpenRouter API",
      "liquid/lfm-7b",
      "VSCode",
      "Cline",
      "Vercel",
      "Gemini 2.0",
    ],
    url: "https://saasvibesearch.craftedbyhan.xyz/",
  },
  {
    tag: "ANALYTICS",
    title: "Live Dashboard",
    blurb: "API-driven, always up-to-date dashboards built with Recharts for clear, useful overviews.",
    image: "/fred-dashboard mockup (v1).jpg",
    stack: [
      "React",
      "Next.js",
      "Typescript",
      "TailWindCSS",
      "Recharts",
      "Lucide React",
      "FRED API",
      "Vercel",
      "Warp.dev",
      "Claude Opus 4.1",
      "Claude Sonnet 4"
    ],
    url: "https://example.com/live-dashboard",
  },
  {
    tag: "INSTAGRAM TOOLS",
    title: "Before-After Reels",
    blurb: "Convert two photos (before/after) into a short WebM video ideal for Instagram Reels or Stories.",
    image: "/before-after-tool mockup (v1).jpg",
    stack: [
      "React",
      "Vite",
      "Javascript",
      "TailWindCSS",
      "Lucide React",
      "Radix UI",
      "Zustand",
      "Canvas API",
      "MediaRecorder API",
      "WebP/JPEG Compression",
      "Vercel",
      "Warp.dev",
      "Claude Opus 4.1",
      "Claude Sonnet 4"
    ],
    url: "https://beforeandafter.craftedbyhan.xyz/",
  },
  {
    tag: "CREATIVE WEB TOOLS",
    title: "Batch Photo Editor",
    blurb: "Edit photos in batches with fast copy-paste adjustments for quick edits, auto adjusting photos with iOS-like algorithm for consistent results.",
    image: "/photo-editor mockup (v1).jpg",
    stack: [
      "React",
      "Vite",
      "Javascript",
      "TailWindCSS",
      "shadcn",
      "Lucide React",
      "Canvas API",
      "JSZip",
      "Vercel",
      "Warp.dev",
      "Claude Opus 4.1",
      "Claude Sonnet 4"
    ],
    url: "https://propertyphotospro.craftedbyhan.xyz/",
  },
];

export default function HighlightsSection() {
  const [active, setActive] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const swipeRef = useRef<{ id: number; startX: number; startY: number; active: boolean; scrolling: boolean }>({ id: -1, startX: 0, startY: 0, active: false, scrolling: false });

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Ensure portal is only used on client after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="highlights" className="pt-2">
      <BlurFade delay={0.12}>
        <h2 className="text-xl font-bold">highlights</h2>
        <p className="text-sm text-muted-foreground mt-1">tap any card to expand</p>
      </BlurFade>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {HIGHLIGHTS.map((item, idx) => (
          <BlurFade key={item.title} delay={0.15 + idx * 0.03}>
            <button
              type="button"
              data-highlight-card
              data-index={idx}
              onClick={() => setActive(idx)}
              className="group relative w-full overflow-hidden rounded-2xl border bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900/60 border-gray-200 dark:border-zinc-800 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              {/* top label (gradient rainbow pill with subtle border) */}
              <span className="pointer-events-none absolute left-3 top-3 z-10">
                <span className="inline-flex items-center rounded-full p-[1px] bg-[conic-gradient(at_10%_10%,#ff80bf_0deg,#9089fc_120deg,#80ffea_240deg,#ff80bf_360deg)] shadow-sm">
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white bg-gray-900/80 backdrop-blur-[2px] ring-1 ring-white/10">
                    {item.tag}
                  </span>
                </span>
              </span>

              {/* card body with preview image */}
              <div className="aspect-[5/3] w-full">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  width={900}
                  height={540}
                  className="h-full w-full object-cover pointer-events-none"
                />
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground max-h-10 overflow-hidden">
                  {item.blurb}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10" />
            </button>
          </BlurFade>
        ))}
      </div>

      {/* Expanded modal via portal with backdrop overlay (standard behavior) */}
      {active !== null && isMounted && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-[min(96vw,700px)] md:w-[min(98vw,1200px)] max-h-[85dvh] md:max-h-[90vh] overflow-hidden rounded-[20px] md:rounded-[28px] bg-background shadow-2xl group"
          >
            <div
              className="relative h-56 md:h-[50vh] w-full touch-pan-y select-none bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%),linear-gradient(180deg,rgba(59,130,246,0.12),transparent)] dark:bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%),linear-gradient(180deg,rgba(59,130,246,0.06),transparent)]"
              onPointerDown={(e) => {
                if (e.pointerType !== 'touch') return;
                // Allow arrows to behave normally
                if ((e.target as HTMLElement).closest('button')) return;
                try {
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                } catch {}
                swipeRef.current.id = e.pointerId;
                swipeRef.current.startX = e.clientX;
                swipeRef.current.startY = e.clientY;
                swipeRef.current.active = false;
                swipeRef.current.scrolling = false;
              }}
              onPointerMove={(e) => {
                if (e.pointerType !== 'touch') return;
                const s = swipeRef.current;
                if (e.pointerId !== s.id || s.scrolling) return;
                const dx = e.clientX - s.startX;
                const dy = e.clientY - s.startY;
                if (!s.active) {
                  if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
                    s.active = true;
                    e.preventDefault();
                  } else if (Math.abs(dy) > Math.abs(dx) + 4) {
                    s.scrolling = true;
                  }
                  return;
                }
                // While swiping horizontally, prevent vertical scroll jank
                e.preventDefault();
              }}
              onPointerUp={(e) => {
                if (e.pointerType !== 'touch') return;
                const s = swipeRef.current;
                if (e.pointerId !== s.id) return;
                const dx = e.clientX - s.startX;
                const threshold = 50; // px
                if (s.active && Math.abs(dx) > threshold) {
                  if (dx > 0) {
                    // swipe right -> previous
                    setActive((prev) => (prev === null ? 0 : (prev + HIGHLIGHTS.length - 1) % HIGHLIGHTS.length));
                  } else {
                    // swipe left -> next
                    setActive((prev) => (prev === null ? 0 : (prev + 1) % HIGHLIGHTS.length));
                  }
                }
                // reset
                swipeRef.current = { id: -1, startX: 0, startY: 0, active: false, scrolling: false };
              }}
              onPointerCancel={() => {
                swipeRef.current = { id: -1, startX: 0, startY: 0, active: false, scrolling: false };
              }}
            >
              <OptimizedImage
                src={HIGHLIGHTS[active].image}
                alt={HIGHLIGHTS[active].title}
                width={1600}
                height={720}
                className="h-full w-full object-cover pointer-events-none"
              />
              {/* Nav arrows over the media area */}
              <button
                type="button"
                aria-label="Previous highlight"
                onClick={() =>
                  setActive((prev) => (prev === null ? 0 : (prev + HIGHLIGHTS.length - 1) % HIGHLIGHTS.length))
                }
                className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 text-gray-100 p-2 shadow-sm backdrop-blur-sm ring-1 ring-white/10 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next highlight"
                onClick={() => setActive((prev) => (prev === null ? 0 : (prev + 1) % HIGHLIGHTS.length))}
                className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 text-gray-100 p-2 shadow-sm backdrop-blur-sm ring-1 ring-white/10 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                ›
              </button>
            </div>

            <div className="p-5 md:p-8 overflow-auto max-h-[calc(85dvh-14rem)] md:max-h-[calc(90vh-50vh)]">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full p-[1px] bg-[conic-gradient(at_10%_10%,#ff80bf_0deg,#9089fc_120deg,#80ffea_240deg,#ff80bf_360deg)] shadow-sm">
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white bg-gray-900/80 backdrop-blur-[2px] ring-1 ring-white/10">
                    {HIGHLIGHTS[active].tag}
                  </span>
                </span>

                {/* External project link (new tab) */}
                <a
                  href={HIGHLIGHTS[active].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open project in a new tab"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white bg-gray-900/80 backdrop-blur-[2px] ring-1 ring-white/10 shadow-sm hover:bg-gray-900/90 hover:ring-white/20 transition group"
                >
                  <span className="hidden sm:inline">Open</span>
                  {/* external-link icon */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                  </svg>
                </a>
              </div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">{HIGHLIGHTS[active].title}</h3>
              <p className="mt-2 text-base text-muted-foreground">
                {HIGHLIGHTS[active].blurb}
              </p>

              {/* Per-highlight tech stack pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {HIGHLIGHTS[active].stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white bg-gray-900/80 backdrop-blur-[2px] ring-1 ring-white/10 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                click outside or press Esc to close
              </p>
            </div>

            {/* Dot indicators */}
            {active !== null && (
              <div className="pointer-events-auto absolute bottom-3 inset-x-0 flex justify-center gap-2">
                {HIGHLIGHTS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Open ${HIGHLIGHTS[i].title}`}
                    onClick={() => setActive(i)}
                    className={
                      (i === active
                        ? "w-2.5 h-2.5 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/70") +
                      " rounded-full transition-colors"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
