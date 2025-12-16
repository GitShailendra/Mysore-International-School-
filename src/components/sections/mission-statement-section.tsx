"use client";

import { useRef } from "react";
import Image from 'next/image';
import { motion, useInView } from "framer-motion";
import logo from "../../assets/SVG/mislight2.svg";


const MissionStatementSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative bg-secondary py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display italic text-xl text-brand-dark-gray mb-4"
          >
            Empowering Minds, Shaping Futures
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold uppercase text-4xl lg:text-[3.5rem] leading-tight text-primary mb-6 max-w-3xl"
          >
            OUR VISION & MISSION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-primary max-w-3xl mx-auto mb-8"
          >
            At Mysore International School, we aspire to nurture empathetic and innovative global citizens who excel as discerning thinkers, collaborative problem solvers, and proactive contributors to society. We provide a world-class education that nurtures the physical, intellectual, emotional, social, and cultural aspects of our students, equipping each one with the tools necessary to transform into a well-rounded, highly educated, and productive adult.
          </motion.p>
        
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-10 right-10 z-0 hidden md:block"
      >
        <Image
          src={logo}
          alt="Mysore International School Seal"
          width={128}
          height={128}
          className="opacity-100"
        />
      </motion.div>
    </section>
  );
};

export default MissionStatementSection;