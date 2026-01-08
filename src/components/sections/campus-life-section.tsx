"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function CampusLifeSection() {
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleMute = () => {
    setIsMuted(!isMuted);
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
          className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video"
        >
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/fJPbc3oF20w?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=fJPbc3oF20w&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
            title="Life at Mysore International School"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-6 right-6">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition-opacity hover:opacity-70 bg-white/20 backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
