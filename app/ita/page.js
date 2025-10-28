"use client";

import { useEffect } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import HeroSection from "./sections/HeroSection";
import PainPointsSection from "./sections/PainPointsSection";

const ItaPage = () => {
  return (
    <AkpagerLayout>
      <HeroSection />
      <PainPointsSection />
    </AkpagerLayout>
  );
};

export default ItaPage;
