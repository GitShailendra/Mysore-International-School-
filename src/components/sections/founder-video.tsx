"use client";

import { useState } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export default function HeroVideoSection() {
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/9FC-8oaAsUM?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=9FC-8oaAsUM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
          title="Mysore International School Founder Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)'
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

        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex gap-3">
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-opacity hover:opacity-70 md:h-12 md:w-12"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 fill-white md:h-6 md:w-6" />
            ) : (
              <Volume2 className="h-5 w-5 fill-white md:h-6 md:w-6" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}