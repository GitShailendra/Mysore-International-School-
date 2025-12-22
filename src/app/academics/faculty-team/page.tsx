"use client";

import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import founderPhoto from '@/assets/drjosephthomas.jpg'
import trusteePhoto from '@/assets/leena.jpg'
import principalPhoto from '@/assets/preethi.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import hero1 from '@/assets/mis.jpg'
import hero2 from '@/assets/mis2.jpg'
import hero3 from '@/assets/mis7.jpg'
import hero4 from '@/assets/vision.jpg'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

export default function FacultyPage() {
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

  const stats = [
    { number: "50+", label: "Teaching Faculty" },
    { number: "25+", label: "Support Staff" },
    { number: "100%", label: "Experienced Educators" },
    { number: "15+", label: "Years Average Experience" }
  ]

  const positions = [
    {
      title: "PRIMARY & MIDDLE SCHOOL TEACHERS",
      qualifications: "Bachelors / Masters in the relevant subject with a Diploma / Degree / Masters in Education. Excellent depth in the subject, vision, creativity, and originality of approach are necessary along with excellent communication.\n\nExperience in a similar position is an advantage.",
      requirements: "Teaching subjects including Maths, Physics, Chemistry, Biology, General Science, Social Science, Computer Science, English Literature, Hindi, Sanskrit, French, and Kannada.\n\nProvide a high-quality education to primary and middle school students.\n\nFoster a creative and engaging learning environment."
    },
    {
      title: "MONTESSORI & KINDERGARTEN",
      qualifications: "Degree / Diploma / PG Certification in Early Childhood Education, Montessori Training, Teachers Training, or Nursery Training. Keen interest and enthusiasm to develop a visually rich environment & activity-based curriculum, which enriches the Kindergarten classes with Art, Craft, Music, and Drama.\n\nCandidates should have a passion for teaching toddlers.",
      requirements: "Develop a visually rich and activity-based curriculum for Kindergarten.\n\nCreate an environment that fosters artistic and creative expression."
    },
    {
      title: "PHYSICAL EDUCATION TEACHER (Male & Female)",
      qualifications: "Graduates with experience in a reputed educational institution. Should have a passion for sports and evoke interest & enthusiasm among students.\n\nSwimming coaches also required.",
      requirements: "Teach physical education to students.\n\nPromote sports and fitness among students.\n\nSwimming coaches should have expertise in swimming and coaching."
    }
  ]

  const departments = [
    {
      title: "Academic Leadership",
      description: "Experienced principals and academic coordinators guiding curriculum implementation and educational excellence."
    },
    {
      title: "Teaching Faculty",
      description: "Dedicated educators with expertise in various subjects and innovative teaching methodologies."
    },
    {
      title: "Support Staff",
      description: "Administrative, technical, and maintenance professionals ensuring smooth daily operations."
    },
    {
      title: "Student Support",
      description: "Counselors, special educators, and wellness professionals supporting holistic student development."
    }
  ]

  const qualifications = [
    "Postgraduate degrees in specialized subjects",
    "B.Ed. and teaching certifications",
    "Continuous professional development",
    "Specialized training in modern teaching methods",
    "Technology integration expertise",
    "Child psychology and development knowledge"
  ]

  const development = [
    "Regular workshops and training sessions",
    "International conferences and seminars",
    "Continuous learning and skill enhancement",
    "Collaborative teaching methodologies",
    "Peer learning and mentorship programs"
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
      <MobileNewsEventsWrapper />  ̰

      {/* Hero Carousel Section */}
      {/* Hero Carousel Section */}
            <section className="relative h-screen overflow-hidden">
              <Carousel
                className="w-full h-full"
                opts={{
                  loop: true
                }}
              >
                <CarouselContent className="h-full">
                  <CarouselItem className="h-full basis-full">
                    <div className="relative h-full w-full min-h-screen">
                      <Image
                        src={hero1}
                        alt="Mysore International School - Excellence in Education"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 primary-tint-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
                        <div className="max-w-4xl">
                          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
                            Overview
                          </h1>
                          <p className="font-body text-xl md:text-2xl max-w-2xl mx-auto">
                            Discover our vision, mission, and values that guide our educational excellence
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="h-full basis-full">
                    <div className="relative h-full w-full min-h-screen">
                      <Image
                        src={hero2}
                        alt="Mysore International School - Learning Environment"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 primary-tint-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
                        <div className="max-w-4xl">
                          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
                            Overview
                          </h1>
                          <p className="font-body text-xl md:text-2xl max-w-2xl mx-auto">
                            Discover our vision, mission, and values that guide our educational excellence
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="h-full basis-full">
                    <div className="relative h-full w-full min-h-screen">
                      <Image
                        src={hero3}
                        alt="Mysore International School - Campus Life"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 primary-tint-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
                        <div className="max-w-4xl">
                          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
                            Overview
                          </h1>
                          <p className="font-body text-xl md:text-2xl max-w-2xl mx-auto">
                            Discover our vision, mission, and values that guide our educational excellence
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="h-full basis-full">
                    <div className="relative h-full w-full min-h-screen">
                      <Image
                        src={hero4}
                        alt="Mysore International School - Vision"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 primary-tint-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
                        <div className="max-w-4xl">
                          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
                            Overview
                          </h1>
                          <p className="font-body text-xl md:text-2xl max-w-2xl mx-auto">
                            Discover our vision, mission, and values that guide our educational excellence
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
                <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
              </Carousel>
            </section>

      {/* Introduction with ScrollReveal */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal
            baseOpacity={0}
            baseRotation={0}
            blurStrength={6}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            enableBlur={true}
            as="div"
          >
            <p className="font-body text-primary text-xl md:text-2xl leading-relaxed">
              Our faculty comprises passionate educators, experienced administrators, and dedicated 
              support staff who work together to create a nurturing environment where every student 
              can thrive academically, emotionally, and socially.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="container mx-auto max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={scaleIn}
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-4">
                  {stat.number}
                </div>
                <div className="font-body text-lg text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Leadership Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          {/* Founder */}
          <div className="mb-20">
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-3">
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden rounded-lg">
                  <Image 
                    src={founderPhoto} 
                    alt="Dr. Joseph K Thomas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="mb-6">
                  <div className="font-body text-sm text-gray-500 mb-2 uppercase tracking-widest">
                    Founder & Chairman
                  </div>
                  <h2 className="font-display text-4xl font-bold text-primary mb-2">
                    Dr. Joseph K Thomas
                  </h2>
                  <p className="font-body text-sm text-gray-600">
                    MA., MBA., MDBA., MRICS (London) Ph.D (Management)
                  </p>
                </div>
                <div className="space-y-4 font-body text-lg text-gray-700 leading-relaxed">
                  <p>
                    An army veteran, corporate leader, educationist and social entrepreneur. His journey 
                    from the battle ground to the classroom has been illustrious.
                  </p>
                  <p>
                    Recipient of 4 National Awards, International Awards and numerous prestigious honors 
                    including 'Gem of India Award', 'International Achiever's Award for Educational Excellence' 
                    and 'International Leadership Innovation Excellence Award'.
                  </p>
                  <p className="italic text-primary">
                    "The honors I am most proud of are the ones awarded to my school. Knowing that I am 
                    making a difference in the lives of school children is the greatest reward."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trustee & Principal Side by Side */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Trustee/Secretary */}
            <div>
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden mb-6 rounded-lg">
                <Image 
                  src={trusteePhoto} 
                  alt="Helena Joseph"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="font-body text-sm text-gray-500 mb-2 uppercase tracking-widest">
                Trustee/Secretary
              </div>
              <h3 className="font-display text-3xl font-bold text-primary mb-6">
                Helena Joseph
              </h3>
              <p className="font-body text-lg text-gray-700 leading-relaxed italic text-primary">
                "Education is not learning of facts but training of the mind to think"
              </p>
            </div>

            {/* Principal */}
            <div>
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden mb-6 rounded-lg">
                <Image 
                  src={principalPhoto} 
                  alt="Dr. Preethi Vincent"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="font-body text-sm text-gray-500 mb-2 uppercase tracking-widest">
                Principal
              </div>
              <h3 className="font-display text-3xl font-bold text-primary mb-2">
                Dr. Preethi Vincent
              </h3>
              <p className="font-body text-sm text-gray-600 mb-6">
                M.A, B.Ed, M.Phil, Ph.D
              </p>
              <p className="font-body text-lg text-gray-700 leading-relaxed italic text-primary">
                "Education is a shared commitment between dedicated teachers, motivated students and 
                enthusiastic parents with high expectations"
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Departments */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Our Departments
          </h2>

          <div className="space-y-16">
            {departments.map((dept, index) => (
              <div 
                key={index} 
                className="pb-16 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6 tracking-tight">
                  {dept.title}
                </h3>
                <p className="font-body text-xl text-gray-700 leading-relaxed max-w-4xl">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Professional Excellence */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Professional Excellence
          </h2>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Qualifications */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-8">
                Qualifications
              </h3>
              <ul className="space-y-4">
                {qualifications.map((qual, index) => (
                  <li 
                    key={index} 
                    className="font-body text-lg text-gray-700 leading-relaxed"
                  >
                    {qual}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Development */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-8">
                Professional Development
              </h3>
              <ul className="space-y-4">
                {development.map((item, index) => (
                  <li 
                    key={index} 
                    className="font-body text-lg text-gray-700 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal
            baseOpacity={0}
            baseRotation={0}
            blurStrength={6}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            enableBlur={true}
            as="div"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Our Commitment
            </h2>
            <p className="font-body text-xl text-gray-700 leading-relaxed text-center">
              Every member of our faculty and staff is committed to providing exceptional educational 
              experiences that inspire curiosity, foster growth, and prepare students for success in an 
              ever-changing world. We believe in the power of education to transform lives and build a 
              better future for our community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Join Our Team - Positions Table */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight text-center">
            Join Our Team
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="font-display text-xl font-semibold text-primary text-left p-6 border-b border-gray-300">
                    Position
                  </th>
                  <th className="font-display text-xl font-semibold text-primary text-left p-6 border-b border-gray-300">
                    Qualifications
                  </th>
                  <th className="font-display text-xl font-semibold text-primary text-left p-6 border-b border-gray-300">
                    Requirements
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-secondary/30 transition-colors duration-300">
                    <td className="p-6 align-top">
                      <h3 className="font-display text-lg font-semibold text-primary">
                        {position.title}
                      </h3>
                    </td>
                    <td className="p-6 align-top">
                      <div className="font-body text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {position.qualifications}
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      <div className="font-body text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {position.requirements}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Apply */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-3xl font-bold text-primary mb-6">
              How to Apply
            </h3>
            <p className="font-body text-lg text-gray-700 mb-8">
              Mail your latest Resume / CV to{' '}
              <a 
                href="mailto:admissions@mysoreintlschool.com" 
                className="text-primary font-semibold hover:text-[#6B0F6B] transition-colors duration-300"
              >
                admissions@mysoreintlschool.com
              </a>
            </p>
            <p className="font-body text-base text-gray-600">
              Clearly mention the position you are applying for.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  )
}