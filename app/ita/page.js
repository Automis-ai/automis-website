"use client";

import { useEffect } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import HeroSection from "./sections/HeroSection";
import PainPointsSection from "./sections/PainPointsSection";
import StepSection from "./sections/StepSection";
import ResultsSection from "./sections/ResultsSection";
import TryAIDemoSection from "./sections/TryAIDemoSection";
import AdvancedTechSection from "./sections/AdvancedTechSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import FAQSection from "./sections/FAQSection";
import TestimonialsSection from "./sections/Testimonials";

const ItaPage = () => {
  return (
    <AkpagerLayout>
      <HeroSection />
      <PainPointsSection />
      <StepSection />
      <ResultsSection />
      <TryAIDemoSection />
      <AdvancedTechSection />
      <BeforeAfterSection />
      <FAQSection />
      <TestimonialsSection />
    </AkpagerLayout>
  );
};

export default ItaPage;
