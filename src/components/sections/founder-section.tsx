"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import image from "../../../public/drjosephthom.png";
const FounderSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0 overflow-hidden">
              <Image
                src={image}
                alt="School Founder Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 -z-10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-primary/10 -z-10 hidden lg:block" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display italic text-xl text-primary mb-4"
            >
              Founder & Chairman
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-[3rem] leading-tight text-primary mb-4"
            >
              DR. JOSEPH K. THOMAS
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-24 h-1 bg-accent mb-8 mx-auto lg:mx-0 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-lg text-primary mb-6 leading-relaxed"
            >
              An army veteran, corporate leader, educationist, and social entrepreneur, Dr. Joseph K. Thomas's journey from the battlefield to the classroom has been illustrious and inspiring. A great visionary and educationist at heart, Mysore International School is the fulfilment of his dream to transform education and empower young minds.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-body text-lg text-primary mb-8 leading-relaxed"
            >
              Dr. Joseph is the recipient of 4 National Awards, International Awards, and numerous prestigious school accolades, including the Gem of India Award, International Achiever's Award for Educational Excellence, and International Leadership Innovation Excellence Award. Under his visionary leadership, Mysore International School has established itself as a beacon of academic excellence and holistic development.
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border-l-4 border-accent pl-6 py-2 mb-8"
            >
              <p className="font-display italic text-xl text-primary">
                "The honors I am most proud of are the ones awarded to my school such as being ranked No.1 School in Mysore. Knowing that I am making a difference in the lives of school children is the greatest reward."
              </p>
              <cite className="block mt-3 font-body text-sm text-muted-foreground not-italic">
                — Dr. Joseph K. Thomas, Founder & Chairman
              </cite>
            </motion.blockquote>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              href="/about-us/founder-chairman"
              className="inline-block border-2 border-primary text-primary font-semibold py-3 px-8 rounded-[24px] text-lg transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Learn More About Our Founder
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Background decorative seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/bear-seal-large-1.png"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-[600px]"
        />
      </div>
    </section>
  );
};

export default FounderSection;
