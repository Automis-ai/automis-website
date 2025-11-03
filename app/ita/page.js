"use client";

import { useEffect } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import HeroSection from "./sections/HeroSection";
import PainPointsSection from "./sections/PainPointsSection";
import StepSection from "./sections/StepSection";
import ResultsSection from "./sections/ResultsSection";
import AdvancedTechSection from "./sections/AdvancedTechSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import FAQSection from "./sections/FAQSection";
import TestimonialsSection from "./sections/Testimonials";

const ItaPage = () => {
  return (
    <AkpagerLayout hideHeaderNav>
      <HeroSection />
      <div className="max-w-[1150px] mx-auto">
        <PainPointsSection />
        <StepSection />
        <ResultsSection />
        <AdvancedTechSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </AkpagerLayout>
  );
};

export default ItaPage;
