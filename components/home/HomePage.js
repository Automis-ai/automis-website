"use client";

import AkpagerLayout from "@/layouts/AkpagerLayout";
import home from "@/content/home.en";
import { ScrollProgress } from "./home-ui";
import Hero from "./Hero";
import LogoStrip from "./LogoStrip";
import Leak from "./Leak";
import SystemPillars from "./SystemPillars";
import VoiceFlagship from "./VoiceFlagship";
import HowWeWork from "./HowWeWork";
import Results from "./Results";
import Guarantees from "./Guarantees";
import FinalCta from "./FinalCta";

export default function HomePage() {
  return (
    <AkpagerLayout>
      <ScrollProgress />
      <main>
        <Hero content={home.hero} />
        <LogoStrip title={home.logos.label} />
        <Leak content={home.leak} />
        <SystemPillars content={home.pillars} />
        <VoiceFlagship content={home.voice} />
        <Results content={home.results} />
        <HowWeWork content={home.how} />
        <Guarantees content={home.wedge} />
        <FinalCta content={home.finalCta} bookingUrl={home.bookingUrl} />
      </main>
    </AkpagerLayout>
  );
}
