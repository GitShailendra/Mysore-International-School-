"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import image from "../../assets/camp.jpg"
import { motion, useInView } from 'framer-motion';

const ActionButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="font-semibold text-center border-2 border-primary text-primary py-[10px] px-[24px] rounded-[24px] transition-colors duration-300 hover:bg-primary hover:text-white"
  >
    {children}
  </a>
);

const CampusOverviewSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Side: Image (60% width on lg screens) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-3/5 w-full relative h-[500px] lg:h-auto"
        >
          <Image
            src={image}
            alt="Aerial view of Mysore International School campus"
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right Side: Content (40% width on lg screens) */}
        <div className="lg:w-2/5 w-full bg-white flex items-center justify-center">
          <div className="py-16 px-8 sm:px-12 md:px-16 lg:px-12 xl:p-24 w-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-[90px] h-[4px] bg-accent mb-8 origin-left"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="font-['Playfair_Display'] italic text-2xl text-muted-foreground mb-2"
            >
              Step into
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="font-['Playfair_Display'] text-5xl lg:text-6xl font-semibold text-primary mb-6"
            >
              OUR CAMPUS
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="font-['Inter'] text-primary text-base md:text-lg leading-relaxed mb-10"
            >
              Located on HD Kote Road, Rayanakere Post, Mysore, our state-of-the-art campus is thoughtfully designed to create a safe and stimulating learning environment. The campus features modern classrooms with interactive smart boards, well-resourced science and computer laboratories, comprehensive library, arts and music studios, sports facilities, green spaces, and inclusive infrastructure designed to support holistic development.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <ActionButton href="#">Campus Tour</ActionButton>
              <ActionButton href="#">360° Views</ActionButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusOverviewSection;