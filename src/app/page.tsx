"use client";

import TopSection from "@/app/(sections)/TopSection";
import { useWeatherFetcher } from "@/hooks/use-weather-fetcher";
import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("@/app/(sections)/MapSection"), {
  ssr: false,
});

export default function Home() {
  useWeatherFetcher();

  return (
    <main className="flex flex-col gap-16">
      <TopSection />
      <MapSection />
    </main>
  );
}
