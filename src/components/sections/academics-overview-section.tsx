"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AcademicsOverviewSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
            Academics Overview
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
          className="max-w-4xl mx-auto mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-primary leading-relaxed text-center"
          >
            Mysore International School offers a structured CBSE curriculum that combines strong academic foundations with skill-building, projects, and experiential learning. From early years to higher grades, students are supported to reach their highest potential.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Foundational Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="bg-background p-8 rounded-2xl shadow-lg"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-display font-bold text-xl md:text-2xl text-primary mb-4"
            >
              Foundational Stage
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-body text-primary leading-relaxed"
            >
              In the early and primary years, classroom experiences focus on language, numeracy, creativity, and social skills through age-appropriate, activity-based learning. The emphasis is on curiosity, confidence, and joyful engagement.
            </motion.p>
          </motion.div>

          {/* Preparatory & Middle Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="bg-background p-8 rounded-2xl shadow-lg"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="font-display font-bold text-xl md:text-2xl text-primary mb-4"
            >
              Preparatory & Middle Stage
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="font-body text-primary leading-relaxed"
            >
              In the preparatory and middle grades, students strengthen core subjects while exploring science, mathematics, languages, social science, and technology through projects, experiments, and collaborative work. Critical thinking and communication skills are systematically developed.
            </motion.p>
          </motion.div>

          {/* Secondary Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
            className="bg-background p-8 rounded-2xl shadow-lg"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-display font-bold text-xl md:text-2xl text-primary mb-4"
            >
              Secondary Stage
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-body text-primary leading-relaxed"
            >
              At the secondary level, the focus is on board examination readiness, career awareness, and higher-order skills. Students are guided to set academic goals, participate in competitions, and build portfolios that reflect both achievement and character.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
