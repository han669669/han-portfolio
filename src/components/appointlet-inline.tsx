"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// No script handling here; we load https://js.appointlet.com/ once in src/app/layout.tsx

interface AppointletInlineProps {
  url?: string;
  buttonLabel?: string;
  hideLabel?: string;
  buttonClassName?: string;
  containerClassName?: string;
}

export default function AppointletInline({
  url = "https://appt.link/hanlin",
  buttonLabel = "Schedule a free consultation 😎💬",
  hideLabel = "Close / Hide",
  buttonClassName = "inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold text-sm px-3 py-1.5 shadow-md hover:from-green-700 hover:to-emerald-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
  containerClassName,
}: AppointletInlineProps) {
  const [open, setOpen] = useState(false);
  const panelId = useMemo(() => "appointlet-inline-panel", []);
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [useIframe, setUseIframe] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [renderEmbed, setRenderEmbed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mount the heavy embed only after the panel begins to open once; keep it mounted afterwards
  useEffect(() => {
    if (open && !renderEmbed) {
      const id = setTimeout(() => setRenderEmbed(true), 50);
      return () => clearTimeout(id);
    }
  }, [open, renderEmbed]);

  // If the Appointlet script doesn't initialize the inline widget (SPA edge case),
  // fall back to a direct iframe after a short delay when opened and embed mounted.
  useEffect(() => {
    if (!open || !mounted || !renderEmbed) return;
    // Always prefer direct iframe on iOS/real devices to avoid touch/hit-testing bugs.
    setUseIframe(true);
  }, [open, mounted, renderEmbed]);

  useEffect(() => {
    if (!open) return;
    // While open, reduce likelihood of iOS back-swipe gestures affecting the page
    const html = document.documentElement as HTMLElement;
    const body = document.body as HTMLElement;
    const prevHtmlOverscrollX = (html.style as any).overscrollBehaviorX;
    const prevBodyOverscrollX = (body.style as any).overscrollBehaviorX;
    const prevHtmlTouchAction = (html.style as any).touchAction;
    const prevBodyTouchAction = (body.style as any).touchAction;

    (html.style as any).overscrollBehaviorX = 'none';
    (body.style as any).overscrollBehaviorX = 'none';
    (html.style as any).touchAction = 'manipulation';
    (body.style as any).touchAction = 'manipulation';

    return () => {
      (html.style as any).overscrollBehaviorX = prevHtmlOverscrollX || '';
      (body.style as any).overscrollBehaviorX = prevBodyOverscrollX || '';
      (html.style as any).touchAction = prevHtmlTouchAction || '';
      (body.style as any).touchAction = prevBodyTouchAction || '';
    };
  }, [open]);

  return (
    <div className="w-full text-center">
      <button
        type="button"
        className={buttonClassName}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? hideLabel : buttonLabel}
      </button>

      {/* Inline embed container with smooth, cheap transition (no max-height). */}
      <div
        id={panelId}
        className={cn(
          "relative z-40 mx-auto mt-3 w-full grid min-h-0 transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          containerClassName
        )}
      >
        <div className="relative z-40 rounded-2xl min-h-0">
          <div
            className={cn(
              "rounded-2xl border border-gray-200 bg-white pt-2 pr-2 pb-2 pl-5 md:pl-3 dark:border-zinc-800 dark:bg-zinc-900 transition-opacity duration-200 ease-out motion-reduce:transition-none pointer-events-auto overscroll-contain touch-pan-y",
              open ? "opacity-100" : "opacity-0"
            )}
            ref={holderRef}
            suppressHydrationWarning
            aria-hidden={!open}
          >
            {mounted && renderEmbed && (
              // Always use a direct iframe to avoid injected wrappers that can interfere on iOS Safari
              <iframe
                title="Appointment Scheduler"
                src={`${url}${url.includes("?") ? "&" : "?"}embed=true`}
                className="relative z-50 mt-1 w-full h-[70vh] md:h-[900px] rounded-xl"
                loading="lazy"
                allow="fullscreen"
                style={{ touchAction: "manipulation" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
