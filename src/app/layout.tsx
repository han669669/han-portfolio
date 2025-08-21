import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import DevConsoleSilencer from "@/components/dev-console-silencer";
import ProductionAnalytics from "@/components/production-analytics";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
  icons: {
    icon: '/favicon.svg?v=1'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === 'production';
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Appointlet widget styles (does not affect your custom button) */}
        <link href="https://js.appointlet.com/styles.css" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            {isProd && <ProductionAnalytics />}
            {!isProd && <DevConsoleSilencer />}
            <ServiceWorkerRegistration />
            {/* Appointlet modal/inline script (no styles) */}
            <Script
              src="https://js.appointlet.com/"
              strategy="afterInteractive"
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
