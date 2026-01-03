"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SchoolLeadershipSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background"
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
            School Leadership
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-1 bg-accent mb-8 mx-auto origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="bg-secondary p-8 md:p-12 rounded-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-lg md:text-xl text-primary leading-relaxed"
            >
              The leadership team at Mysore International School brings together experienced educators who are committed to child-centric, values-driven education.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-lg md:text-xl text-primary leading-relaxed mt-4"
            >
              Their shared goal is to provide an inspiring environment where academic excellence is balanced with character, creativity, and citizenship.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
