"use client";

import { useEffect } from "react";

// Silences known noisy dev-only analytics messages in local development
// Does NOT run in production (we only include this component in dev).
export default function DevConsoleSilencer() {
  useEffect(() => {
    const patterns = [
      /Error during captureScrollEvent: .*failed to get page/i,
      /Error during captureClickEvent: .*failed to get page/i,
      /\[BrowserPreview\].*Extension RPC Error: Extension ID not available/i,
      /Google Maps JavaScript API has been loaded directly without loading=async/i,
      /ACTIVITY\s*\{\s*"type"\s*:\s*"scheduler:loaded"/i,
      /The key \"1\" is not recognized and ignored\./i,
    ];

    const originalError = console.error.bind(console);
    const originalWarn = console.warn.bind(console);
    const originalLog = console.log.bind(console);
    const originalInfo = console.info ? console.info.bind(console) : console.log.bind(console);
    const originalDebug = console.debug ? console.debug.bind(console) : console.log.bind(console);

    function shouldSilence(args: IArguments | any[]): boolean {
      const text = Array.from(args)
        .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
        .join(" ");
      return patterns.some((re) => re.test(text));
    }

    // Wrap console methods during dev session
    (console as any).error = (...args: any[]) => {
      if (shouldSilence(args)) return;
      originalError(...args);
    };
    (console as any).warn = (...args: any[]) => {
      if (shouldSilence(args)) return;
      originalWarn(...args);
    };
    (console as any).log = (...args: any[]) => {
      if (shouldSilence(args)) return;
      originalLog(...args);
    };
    (console as any).info = (...args: any[]) => {
      if (shouldSilence(args)) return;
      originalInfo(...args);
    };
    (console as any).debug = (...args: any[]) => {
      if (shouldSilence(args)) return;
      originalDebug(...args);
    };

    // Add a window.onerror listener to mark as handled (best-effort)
    const onError = (message: string | Event, source?: string, lineno?: number, colno?: number, error?: Error) => {
      const text = typeof message === 'string' ? message : (error?.message || '');
      if (patterns.some((re) => re.test(text))) {
        return true; // signal handled
      }
      return undefined;
    };
    window.onerror = onError;

    return () => {
      // restore
      (console as any).error = originalError;
      (console as any).warn = originalWarn;
      (console as any).log = originalLog;
      (console as any).info = originalInfo;
      (console as any).debug = originalDebug;
      // restore default onerror by clearing
      window.onerror = null;
    };
  }, []);

  return null;
}
