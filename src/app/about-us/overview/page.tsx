'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Brain, Heart, Users, Shield, Globe, Sparkles } from 'lucide-react';
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import vision from '@/assets/vision.jpg'
import mission from '@/assets/mission.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import hero1 from '@/assets/mis.jpg'
import hero2 from '@/assets/mis2.jpg'
import hero3 from '@/assets/mis7.jpg'
import hero4 from '@/assets/vision.jpg'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const OverviewPage = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const coreValues = [
    {
      icon: Brain,
      title: 'Learning Beyond Memorization',
      description: 'Tangible learning tools and opportunities for exploration, discovery, and comprehension, empowering students to learn how to learn.'
    },
    {
      icon: Heart,
      title: 'Holistic Development',
      description: 'A nurturing environment where learning is enjoyable and integral to life, cultivating motor skills, coordination, and confidence.'
    },
    {
      icon: Users,
      title: 'Social & Emotional Growth',
      description: 'Development of positive relationships with peers and family, emphasizing the values of sharing and caring.'
    },
    {
      icon: Shield,
      title: 'Integrity, Respect & Collaboration',
      description: 'Upholding values of integrity, respect, collaboration, and innovation to enrich every student\'s educational journey.'
    },
    {
      icon: Globe,
      title: 'Global Citizenship',
      description: 'Fostering a global perspective through cultural understanding and international awareness.'
    },
    {
      icon: Sparkles,
      title: 'Innovation & Creativity',
      description: 'Encouraging creative thinking, problem-solving, and innovative approaches to learning and challenges.'
    }
  ];

  const timelineData = [
    {
      date: 'April 2013',
      phase: 'Phase - 01',
      title: 'The Beginning',
      description: 'The gates of Knowledge of Mysore International School (earlier known as MLZS) was opened to the students. It was an amazing journey of catering wisdom to students to excel in all walks of life.'
    },
    {
      date: 'March 2018',
      phase: 'Phase - 02',
      title: 'First Milestone',
      description: "The school crossed all hurdles and it's first 10th batch passed out in 2018 with flying colours. Our young minds have kept our name high with excellent results in every board exams."
    },
    {
      date: '2020-2023',
      phase: 'Phase - 03',
      title: 'International Recognition',
      description: 'The School achieved many milestones on the way. The most important amongst them being the ISA (INTERNATIONAL SCHOOL AWARD) 2016-19 and the INTERNATIONAL DIMENSIONS IN SCHOOL.'
    },
    {
      date: '2024',
      phase: 'Phase - 04',
      title: 'New Identity',
      description: 'We underwent a significant transformation and rebranded our school from Mount Litera Zee School to Mysore International School.'
    }
  ];

  return (
    <div className="bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

     

      {/* Vision & Mission Section */}
      <section className="py-20 md:mt-40 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#580B57] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Vision & Mission
            </h2>
            <p className="text-[#666666] text-lg">
              Guiding Our Educational Excellence
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={vision}
                    alt="Vision"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-light text-[#580B57] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Vision
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    Embracing our legacy as the best school in India, we aspire to nurture empathetic and
                    innovative global citizens who excel as discerning thinkers, collaborative problem
                    solvers, and proactive contributors to society.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={mission}
                    alt="Mission"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-light text-[#580B57] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Mission
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    At Mysore International School, our mission embodies a commitment to fostering a
                    dynamic and innovative educational environment. We provide a world-class education
                    that nurtures the complete development of our students.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32 bg-[#F9F4FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#580B57] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Our Core Values
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Mysore International School
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
            
                  <div>
                    <h3 className="text-xl font-light text-[#580B57] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {value.title}
                    </h3>
                    <p className="text-[#666666] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#580B57] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Our Journey
            </h2>
            <p className="text-[#666666] text-lg">
              A Legacy of Excellence Through the Years
            </p>
          </motion.div>

          {/* Timeline */}
          <Timeline position="alternate-reverse">
            {timelineData.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    m: 'auto 0',
                    fontFamily: 'var(--font-display)',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 300,
                    color: '#580B57'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.date}
                  </motion.div>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    <TimelineDot
                      sx={{
                        bgcolor: '#580B57',
                        width: 16,
                        height: 16,
                        margin: '12px 0'
                      }}
                    />
                  </motion.div>
                  {index !== timelineData.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: '#580B57' }} />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mb-2">
                      <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold">
                        {item.phase}
                      </span>
                    </div>
                    <h3 className="text-xl font-light text-[#580B57] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverviewPage;
