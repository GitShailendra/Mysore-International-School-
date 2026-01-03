"use client";

import { useState, useRef } from "react";
import { Pause, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdmissionHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/mis.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 to-black/50"></div>

      <div className="relative z-10 h-full w-full text-white flex items-center">
        <div className="container mx-auto px-5 sm:px-10 text-center">
          <h1 className="font-display text-white text-5xl md:text-[60px] lg:text-[72px] font-bold uppercase leading-tight tracking-[0.05em] mb-6">
            Mysore International School
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            A leading CBSE school in Mysuru offering global education and holistic development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary text-white hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-[24px] border-2 border-primary"
              asChild
            >
              <a href="/admissions/how-to-apply">Apply for Admission</a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 text-primary border-white  px-8 py-4 text-lg font-semibold rounded-[24px]"
              asChild
            >
              <a href="#location">Schedule Campus Visit</a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about-mis"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-10 w-10 animate-bounce text-white/80 transition-colors hover:text-white" />
      </a>

      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-opacity hover:opacity-70 md:h-12 md:w-12"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-white md:h-6 md:w-6" />
          ) : (
            <Play className="h-5 w-5 ml-1 fill-white md:h-6 md:w-6" />
          )}
        </button>
      </div>
    </section>
  );
}
