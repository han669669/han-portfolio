"use client";

import dynamic from "next/dynamic";

const AnalyticsDynamic = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
const SpeedInsightsDynamic = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

export default function ProductionAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <AnalyticsDynamic />
      <SpeedInsightsDynamic />
    </>
  );
}
