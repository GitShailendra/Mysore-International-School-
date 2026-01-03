"use client";

import { useState, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function CampusLifeSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="container mx-auto px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-[3rem] leading-tight text-primary mb-8"
          >
            Life at Mysore International School
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-1 bg-accent mb-8 mx-auto origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-primary max-w-4xl mx-auto leading-relaxed"
          >
            Discover the vibrant life at Mysore International School—engaging classrooms, dynamic sports, co-curricular opportunities, and a campus designed to inspire learning and leadership.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/mis.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-6 right-6">
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition-opacity hover:opacity-70 bg-white/20 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-white" />
              ) : (
                <Play className="h-6 w-6 ml-1 fill-white" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
