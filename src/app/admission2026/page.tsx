"use client";

import { useState } from "react";
import HeaderNavigation from "@/components/sections/header-navigation";
import Footer from "@/components/sections/footer";
import AdmissionHeroSection from "@/components/sections/admission-hero-section";
import AboutMISSection from "@/components/sections/about-mis-section";
import UniqueApproachSection from "@/components/sections/unique-approach-section";
import CampusLifeSection from "@/components/sections/campus-life-section";
import VisionMissionSection from "@/components/sections/vision-mission-section";
import FounderSection from "@/components/sections/founder-section";
import CurriculumProgramsSection from "@/components/sections/curriculum-programs-section";
import AtAGlanceSection from "@/components/sections/at-a-glance-section";
import AcademicsOverviewSection from "@/components/sections/academics-overview-section";
import SchoolLeadershipSection from "@/components/sections/school-leadership-section";
import LocationMapSection from "@/components/sections/location-map-section";
import AdmissionFormSection from "@/components/sections/admission-form-section";

export default function Admission2025Page() {
  return (
    <div className="min-h-screen pb-12 md:pb-0">
      <HeaderNavigation />
      
      <main>
        <AdmissionHeroSection />
        <AboutMISSection />
        <UniqueApproachSection />
        <CampusLifeSection />
        <VisionMissionSection />
        <FounderSection />
        <CurriculumProgramsSection />
        <AtAGlanceSection />
        <AcademicsOverviewSection />
        <SchoolLeadershipSection />
        <LocationMapSection />
        <AdmissionFormSection />
      </main>
      
      <Footer />
    </div>
  );
}
