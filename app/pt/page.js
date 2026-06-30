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

const PtPage = () => {
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
        eyebrow="Pronto para começar?"
        title="Deixe de perder chamadas — e clientes."
        subtitle="Veja o seu assistente de voz a atender, qualificar e marcar, em direto."
      />
      <AdvancedTechSection />
      <TestimonialsSection />
      <FAQSection />
      <BookingSection />
    </AkpagerLayout>
  );
};

export default PtPage;
