"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export default function HeroVideoSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const handleMuteToggle = () => {
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
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/Htgvj-znBRY?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=Htgvj-znBRY&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&autohide=1`}
          title="Mysore International School Hero Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 to-black/50"></div>

      <div className="relative z-10 h-full w-full text-white">
        {/* <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center">
          <h1 className="font-display text-5xl md:text-[60px] lg:text-[72px] font-bold uppercase leading-tight tracking-[0.05em]">
            Our Mission
          </h1>
        </div> */}

        <a
          href="#mission-statement"
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-10 w-10 animate-bounce text-white/80 transition-colors hover:text-white" />
        </a>

        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
          <button
            onClick={handleMuteToggle}
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
      </div>
    </section>
  );
}