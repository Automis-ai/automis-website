"use client";

import AkpagerLayout from "@/layouts/AkpagerLayout";
import home from "@/content/home.en";
import Hero from "./Hero";
import LogoStrip from "./LogoStrip";
import PainPoints from "./PainPoints";
import PillarsExplorer from "./PillarsExplorer";
import VoiceFlagship from "./VoiceFlagship";
import HowWeWork from "./HowWeWork";
import Results from "./Results";
import Guarantee from "./Guarantee";
import FinalCta from "./FinalCta";

export default function HomePage() {
  return (
    <AkpagerLayout>
      <main>
        <Hero content={home.hero} />
        <LogoStrip title="Growing with businesses across Europe" />
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
