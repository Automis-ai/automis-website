"use client";

import { useEffect } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import HeroSection from "./sections/HeroSection";
import PainPointsSection from "./sections/PainPointsSection";
import StepSection from "./sections/StepSection";
import ResultsSection from "./sections/ResultsSection";
import TryAIDemoSection from "./sections/TryAIDemoSection";

const ItaPage = () => {
  return (
    <AkpagerLayout>
      <HeroSection />
      <PainPointsSection />
      <StepSection />
      <ResultsSection />
      <TryAIDemoSection />
    </AkpagerLayout>
  );
};

export default ItaPage;
