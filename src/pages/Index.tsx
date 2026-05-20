import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FounderSection from "@/components/FounderSection";
import AboutSection from "@/components/AboutSection";
import ServicesGridSection from "@/components/ServicesGridSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import SwipeCardGallery from "@/components/SwipeCardGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import LocationSection from "@/components/LocationSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <div
        className="min-h-screen bg-background relative"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <CustomCursor />
        <Navbar />
        <HeroSection />
        <FounderSection />
        <AboutSection />
        <ServicesGridSection />
        <ProcessSection />
        <ProjectsSection />
        <SwipeCardGallery />
        <TestimonialsSection />
        <StatsSection />
        <LocationSection />
        <FaqSection />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
};

export default Index;
