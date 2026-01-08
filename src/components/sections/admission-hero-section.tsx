"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdmissionHeroSection() {
  const sectionRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    setUserInteracted(true);
    
    // Force reload iframe with new mute parameter
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      const newSrc = currentSrc.replace(/mute=\d/, `mute=${newMuteState ? 1 : 0}`);
      iframeRef.current.src = newSrc;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/Htgvj-znBRY?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=Htgvj-znBRY&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&autohide=1`}
          title="Mysore International School Admission Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

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
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 md:h-14 md:w-14 bg-white/10 backdrop-blur-sm shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6 md:h-7 md:w-7" />
          ) : (
            <Volume2 className="h-6 w-6 md:h-7 md:w-7" />
          )}
        </button>
        <p className="text-white/80 text-xs mt-2 text-center font-medium max-w-[100px]">
          {!userInteracted && isMuted ? "Click anywhere first" : isMuted ? "Sound Off" : "Sound On"}
        </p>
      </div>
    </section>
  );
}
