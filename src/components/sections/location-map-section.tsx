"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function LocationMapSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="location"
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
            Location
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-1 bg-accent mb-8 mx-auto origin-left"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Address and Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="space-y-6 lg:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-background p-6 lg:p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-start space-x-3 lg:space-x-4">
                <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg lg:text-xl text-primary mb-2">Address</h3>
                  <p className="font-body text-sm lg:text-base text-primary leading-relaxed">
                    Mysore International School<br />
                    92/1–5, H.D. Kote Road, D salundi<br />
                    Mysuru, Karnataka 570008
                  </p>
                  <a
                    href="https://maps.google.com/?q=Mysore+International+School"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 lg:mt-4 font-body font-medium text-primary hover:text-accent transition-colors text-sm lg:text-base"
                  >
                    Get Directions
                    <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-sm lg:text-lg text-primary leading-relaxed bg-background p-6 lg:p-8 rounded-2xl shadow-lg"
            >
              The campus is located on HD Kote Road D salundi with convenient access from key parts of Mysuru, providing a spacious and serene setting for learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-background p-6 lg:p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-start space-x-3 lg:space-x-4">
                <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg lg:text-xl text-primary mb-2">Phone</h3>
                  <div className="font-body text-sm lg:text-base text-primary space-y-1">
                    <div>
                      <a href="tel:08212971010" className="hover:text-accent transition-colors">
                        0821 2971010
                      </a>
                    </div>
                    <div>
                      <a href="tel:+918884414356" className="hover:text-accent transition-colors">
                        8884 414 356
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-background p-6 lg:p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-start space-x-3 lg:space-x-4">
                <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg lg:text-xl text-primary mb-2">Email</h3>
                  <p className="font-body text-sm lg:text-base text-primary break-words">admissions@mysoreinternationalschool.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="relative order-first lg:order-last"
          >
            <div className="bg-background p-4 lg:p-8 rounded-2xl shadow-lg">
              <div className="border-2 border-gray-200 bg-white overflow-hidden aspect-[16/9] lg:aspect-[16/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.8947847894789!2d76.58685!3d12.228557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf644f7358cc0d%3A0xe4fb32672e467b68!2sMysore%20International%20School!5e0!3m2!1sen!2sin!4v1734885000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mysore International School Location - 92/1-3, HD Kote Road, Rayanakere Post, Mysore"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
