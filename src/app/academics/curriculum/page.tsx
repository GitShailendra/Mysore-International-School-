"use client";

import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import ScrollReveal from '@/components/ScrollReveal'
import DiscoverCtaSection from '@/components/sections/discover-cta-section'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'

export default function CurriculumPage() {
  // Add smooth scroll styles to document
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add custom CSS for slower scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth !important;
        -webkit-scroll-behavior: smooth !important;
        scroll-snap-type: y proximity;
        scroll-padding-top: 120px;
      }
      
      body {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      /* Slow down scroll momentum */
      * {
        scroll-behavior: smooth;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  // Helper component for animated sections
  const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ delay: delay + 0.3 }}
        className={className}
      >
        {children}
      </motion.section>
    );
  };

  const curriculumStages = [
    {
      title: "Foundational Years",
      grades: "Pre-K to Grade 2",
      description: "Early childhood education focusing on play-based learning, social skills, and basic literacy.",
      features: [
        "Play-based learning",
        "Social-emotional development",
        "Basic literacy & numeracy",
        "Creative expression"
      ]
    },
    {
      title: "CBSE Core",
      grades: "Grade 3 to Grade 10",
      description: "Comprehensive CBSE curriculum with emphasis on academic excellence and competitive exam preparation.",
      features: [
        "CBSE curriculum",
        "Mathematics & Science focus",
        "Language proficiency",
        "Competitive exam prep"
      ]
    },
    {
      title: "International Enrichment",
      grades: "Grade 11",
      description: "Advanced curriculum with international perspectives, leadership development, and global citizenship.",
      features: [
        "Global perspectives",
        "Leadership development",
        "Advanced academics",
        "Career guidance"
      ]
    }
  ]

  const subjects = [
    "English",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Arts & Music",
    "Languages"
  ]

  const learningApproaches = [
    {
      title: "Personalized Learning",
      description: "Individual attention and adaptive learning strategies for every student."
    },
    {
      title: "Collaborative Learning",
      description: "Group projects and peer learning to develop teamwork skills."
    },
    {
      title: "Critical Thinking",
      description: "Problem-solving and analytical skills development through inquiry-based learning."
    }
  ]

  const academicPrograms = [
    {
      title: "Pre-Primary School",
      description: "Where curiosity and joy meet in a safe, joyful space.",
      age: "3-6 years",
      schedule: "9:00 AM - 4:00 PM"
    },
    {
      title: "Primary School",
      description: "Where curiosity and joy meet in a safe, joyful space.",
      age: "6-11 years",
      schedule: "9:00 AM - 4:00 PM"
    },
    {
      title: "Middle School",
      description: "Providing a secure and engaging space for young minds.",
      age: "11-14 years",
      schedule: "9:00 AM - 4:00 PM"
    },
    {
      title: "High School",
      description: "Cultivating minds, fostering growth in a secure, dynamic atmosphere.",
      age: "14-16 years",
      schedule: "9:00 AM - 4:00 PM"
    }
  ]

  return (
    <main 
      className="min-h-screen bg-white overflow-x-hidden scroll-smooth" 
      style={{
        scrollBehavior: 'smooth',
        scrollSnapType: 'y proximity',
        scrollPaddingTop: '120px'
      }}
    >
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            Our Curriculum
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-4xl leading-tight mx-auto">
            Blending tradition with innovation for holistic learning
          </p>
        </div>
      </section>

      {/* Introduction */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal
            baseOpacity={0}
            baseRotation={0}
            blurStrength={6}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            enableBlur={true}
          >
            <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed">
              Our curriculum blends academic rigor with hands-on learning and innovative teaching 
              methodologies. We integrate academics with social, emotional, and physical development, 
              fostering critical thinking and creativity in every learner.
            </p>
          </ScrollReveal>
        </div>
      </AnimatedSection>

      {/* Orchids Partnership */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
            Orchids Partnership
          </h2>
          <div className="font-body text-xl text-gray-700 leading-relaxed space-y-6">
            <p>
              MIS is a Knowledge Partner with Orchids from the Academic Year 2024.
            </p>
            <p>
              It emphasizes bringing out values in children through a practical approach.
            </p>
            <p>
              Orchids provides us with Future Skills programmes such as The Climate Quest and Young Pioneers that enable students to be future ready and willing to face the challenges of the 21st century. They support us in developing a curriculum that is both locally relevant and sustainable for long-term success. To achieve this, Orchids provides us comprehensive training to empower our curriculum developers, enabling them to make future improvements more effectively.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Curriculum Stages */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-20">
            {curriculumStages.map((stage, index) => (
              <div 
                key={index} 
                className="pb-20 border-b border-gray-200 last:border-b-0"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
                      {stage.title}
                    </h2>
                    <div className="font-body text-xl text-gray-600 mb-6">
                      {stage.grades}
                    </div>
                    <p className="font-body text-xl text-gray-700 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-4">
                      {stage.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="font-body text-lg text-gray-700 leading-relaxed flex items-start"
                        >
                          <span className="text-primary mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Subjects Offered */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Subjects Offered
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="font-body text-xl text-gray-700"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Learning Approaches */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Our Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {learningApproaches.map((approach, index) => (
              <div key={index}>
                <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                  {approach.title}
                </h3>
                <p className="font-body text-lg text-gray-700 leading-relaxed">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Academic Programs */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
              Our Academic Programs
            </h2>
            <p className="font-body text-xl text-gray-700 leading-relaxed max-w-4xl">
              At Mysore International School, our mission is to offer affordable, high-quality 
              education and childcare services across all childhood stages. Committed to fostering 
              growth and success, we ensure every child thrives in a nurturing environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {academicPrograms.map((program, index) => (
              <div 
                key={index}
                className="border-t border-gray-200 pt-8"
              >
                <h3 className="font-display text-3xl font-semibold text-primary mb-4">
                  {program.title}
                </h3>
                <p className="font-body text-lg text-gray-700 mb-6 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex gap-8">
                  <div>
                    <div className="font-body text-sm text-gray-500 mb-1 uppercase tracking-widest">
                      Age
                    </div>
                    <div className="font-body text-lg text-gray-700">
                      {program.age}
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-sm text-gray-500 mb-1 uppercase tracking-widest">
                      Schedule
                    </div>
                    <div className="font-body text-lg text-gray-700">
                      {program.schedule}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Enrollment CTA */}
      <DiscoverCtaSection />

      <Footer />
    </main>
  )
}
