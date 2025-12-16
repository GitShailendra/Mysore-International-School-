"use client";

import { useState, useRef } from "react";
import { Pause, Play, ChevronDown } from "lucide-react";

export default function HeroVideoSection() {
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
      </div>
    </section>
  );
}