"use client";

import HeaderNavigation from "@/components/sections/header-navigation";
import HeroVideoSection from "@/components/sections/hero-video-section";
import MissionStatementSection from "@/components/sections/mission-statement-section";
import FounderSection from "@/components/sections/founder-section";
import SignatureProgramsSection from "@/components/sections/signature-programs-section";
import StatsByNumbersSection from "@/components/sections/stats-by-numbers-section";
import StudentTestimonialsSection from "@/components/sections/student-testimonials-section";
import EventGalleryPage from "@/components/sections/event-gallery-page";
import CampusOverviewSection from "@/components/sections/campus-overview-section";
import DiscoverCtaSection from "@/components/sections/discover-cta-section";
import Footer from "@/components/sections/footer";
import SEOFAQSection from "@/components/SEOFAQSection";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-12 md:pb-0">
      <HeaderNavigation />
      
      <main>
        <HeroVideoSection />
        
        <section id="mission-statement">
          <MissionStatementSection />
        </section>
        
        <FounderSection />
        
        <SignatureProgramsSection />
        
        <StatsByNumbersSection />
        
        <StudentTestimonialsSection />
        
        <EventGalleryPage />
        
        <SEOFAQSection />

        <CampusOverviewSection />
      
        <DiscoverCtaSection />
      </main>
      
      <Footer />
    </div>
  );
}