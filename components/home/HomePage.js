"use client";

import dynamic from "next/dynamic";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import home from "@/content/home.en";
import Hero from "./Hero";
import PainPoints from "./PainPoints";
import PillarsExplorer from "./PillarsExplorer";
import VoiceFlagship from "./VoiceFlagship";
import HowWeWork from "./HowWeWork";
import Results from "./Results";
import Guarantee from "./Guarantee";
import FinalCta from "./FinalCta";

const ClientLogosCarousel = dynamic(() => import("@/components/ClientLogosCarousel"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <AkpagerLayout>
      <main>
        <Hero content={home.hero} />
        <div className="border-y border-white/5 py-10">
          <ClientLogosCarousel title="Growing with businesses across Portugal and Italy" />
        </div>
        <PainPoints content={home.painPoints} />
        <PillarsExplorer content={home.pillars} />
        <VoiceFlagship content={home.voice} />
        <HowWeWork content={home.how} />
        <Results content={home.results} />
        <Guarantee content={home.guarantee} />
        <FinalCta content={home.finalCta} bookingUrl={home.bookingUrl} />
      </main>
    </AkpagerLayout>
  );
}
