"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin, Star, Video as VimeoIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import logo from "../../assets/SVG/mislight.svg";

const quickLinks = [
  { href: "/contact-us", label: "Contact Us" },
  { href: "/admissions", label: "Admissions" },
  { href: "/admissions/careers", label: "Career Opportunities" },
  { href: "/our-campus", label: "Campus Tour" },
];

const legalLinks = [
  { href: "/sitemap", label: "Sitemap" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Accessibility" },
  { href: "#", label: "School Branding" },
];

const socialLinks = [
  { href: "https://www.instagram.com/mys_intl_school/", icon: <Instagram className="w-4 h-4" />, name: "Instagram" },
  { href: "https://www.facebook.com/Mysore.Intl.School/", icon: <Facebook className="w-4 h-4" />, name: "Facebook" },
  { href: "https://in.linkedin.com/in/mlzsmysore", icon: <Linkedin className="w-4 h-4" />, name: "LinkedIn" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer ref={footerRef} className="bg-primary text-white font-body relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10"
        style={{backgroundImage: 'url(https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_5/v1746193790/Mysore International School/p3u4h62g7n8h69t22q6y/footer_bg-opt.jpg)'}}
      />
      <div className="relative container mx-auto px-5 lg:px-10 pt-16 pb-10 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h4 className="text-[11px] text-white font-bold tracking-[1.1px] uppercase mb-4">Contact</h4>
            <div className="text-[15px] leading-6 space-y-4 text-white">
              <p className="mb-0">
                Mysore International School<br/>
                92/1-5, HD Kote Road<br/>
                D Salundi<br/>
                Karnataka 570008, India
              </p>
              <a href="mailto:admissions@mysoreintlschool.com" className="block hover:underline">admissions@mysoreintlschool.com</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center order-1 lg:order-2"
          >
            <Link href="#">
              <Image
                src={logo}
                height={156}
                alt="Mysore International School Logo"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-center lg:text-right order-3"
          >
            <h4 className="text-[11px] text-white font-bold tracking-[1.1px] uppercase mb-4">Quick Links</h4>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] leading-[30px] text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <nav>
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[11px] font-semibold uppercase tracking-[1.1px] text-white hover:text-accent transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
           
            
          </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05, ease: "easeOut" }}
                  className="flex items-center justify-center w-8 h-8 border border-white rounded-full bg-white text-primary transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;