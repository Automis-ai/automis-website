"use client";

import { useEffect } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import HeroSection from "./sections/HeroSection";
import PainPointsSection from "./sections/PainPointsSection";
import StepsSection from "./sections/StepsSection";
import ResultsSection from "./sections/ResultsSection";
import AdvancedTechSection from "./sections/AdvancedTechSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import FAQSection from "./sections/FAQSection";
import TestimonialsSection from "./sections/Testimonials";

const FrPage = () => {
  return (
    <AkpagerLayout hideHeaderNav>
      <HeroSection />
      <div className="max-w-[1150px] mx-auto">
        <PainPointsSection />
        <StepsSection />
        <ResultsSection />
        <AdvancedTechSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </AkpagerLayout>
  );
};

export default FrPage;
