"use client";

import AkpagerLayout from "@/layouts/AkpagerLayout";
import ScrollProgress from "./sections/ScrollProgress";
import HeroSection from "./sections/HeroSection";
import StatsBand from "./sections/StatsBand";
import PainPointsSection from "./sections/PainPointsSection";
import BeforeAfterSection from "./sections/BeforeAfterSection";
import StepSection from "./sections/StepSection";
import ResultsSection from "./sections/ResultsSection";
import AdvancedTechSection from "./sections/AdvancedTechSection";
import TestimonialsSection from "./sections/Testimonials";
import FAQSection from "./sections/FAQSection";
import BookingSection from "./sections/BookingSection";
import { CtaBand } from "./sections/_ui";

const EnPage = () => {
  return (
    <AkpagerLayout hideHeaderNav>
      <ScrollProgress />
      <HeroSection />
      <StatsBand />
      <PainPointsSection />
      <BeforeAfterSection />
      <StepSection />
      <ResultsSection />
      <CtaBand
        eyebrow="Ready to get started?"
        title="Stop missing calls — and customers."
        subtitle="Watch your voice assistant answer, qualify and book, live."
      />
      <AdvancedTechSection />
      <TestimonialsSection />
      <FAQSection />
      <BookingSection />
    </AkpagerLayout>
  );
};

export default EnPage;
