"use client";

import AkpagerLayout from "@/layouts/AkpagerLayout";
import home from "@/content/home.en";
import { ScrollProgress } from "./home-ui";
import Hero from "./Hero";
import LogoStrip from "./LogoStrip";
import ProofBand from "./ProofBand";
import Problem from "./Problem";
import Pillars from "./Pillars";
import VoiceFlagship from "./VoiceFlagship";
import HowWeWork from "./HowWeWork";
import Results from "./Results";
import Wedge from "./Wedge";
import FinalCta from "./FinalCta";

export default function HomePage() {
  return (
    <AkpagerLayout>
      <ScrollProgress />
      <main>
        <Hero content={home.hero} />
        <LogoStrip title={home.logos.label} />
        <ProofBand content={home.proof} />
        <Problem content={home.problem} />
        <Pillars content={home.pillars} />
        <VoiceFlagship content={home.voice} />
        <HowWeWork content={home.how} />
        <Results content={home.results} />
        <Wedge content={home.wedge} />
        <FinalCta content={home.finalCta} bookingUrl={home.bookingUrl} />
      </main>
    </AkpagerLayout>
  );
}
