import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'

export const metadata: Metadata = {
  title: 'Careers - Mysore International School',
  description: 'Join our team and be part of shaping future leaders at Mysore International School',
}

export default function CareersPage() {
  const careerOpportunities = [
    {
      title: "Teaching Positions",
      description: "Join our dedicated faculty and inspire young minds with innovative teaching methods.",
      openings: ["Primary Teachers", "Subject Specialists", "Special Education Teachers"]
    },
    {
      title: "Administrative Roles",
      description: "Support our operations and contribute to creating an exceptional learning environment.",
      openings: ["Academic Coordinators", "Administrative Assistants", "Office Managers"]
    },
    {
      title: "Support Staff",
      description: "Essential roles that ensure smooth daily operations and student well-being.",
      openings: ["IT Support", "Facilities Management", "Security Personnel"]
    },
    {
      title: "Student Support",
      description: "Help students thrive academically, emotionally, and socially.",
      openings: ["Counselors", "Librarians", "Student Advisors"]
    }
  ]

  const benefits = [
    { title: "Competitive Salary", description: "Attractive compensation packages" },
    { title: "Professional Development", description: "Continuous learning opportunities" },
    { title: "Work-Life Balance", description: "Flexible schedules and support" },
    { title: "Health Benefits", description: "Comprehensive medical coverage" },
    { title: "Retirement Planning", description: "Pension and savings programs" },
    { title: "Collaborative Environment", description: "Supportive team culture" }
  ]

  return (
    <main className="min-h-screen bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            Careers
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-3xl leading-tight">
            Shape tomorrow's leaders. Join our team of passionate educators and professionals.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            At Mysore International School, we believe in nurturing not just our students, but also 
            our educators and staff. Join a community where your passion for education meets 
            professional excellence, and where every day offers an opportunity to make a 
            meaningful impact.
          </p>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Open Positions
          </h2>

          <div className="space-y-16">
            {careerOpportunities.map((career, index) => (
              <div 
                key={index} 
                className="pb-16 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6 tracking-tight">
                  {career.title}
                </h3>
                <p className="font-body text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
                  {career.description}
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {career.openings.map((opening, openingIndex) => (
                    <div 
                      key={openingIndex} 
                      className="font-body text-lg text-gray-600"
                    >
                      {opening}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="font-body text-lg text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            Application Process
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="font-body text-sm text-gray-500 mb-4 uppercase tracking-widest">
                Step One
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                Submit Your Application
              </h3>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                Send your resume and cover letter to careers@mysoreinternationalschool.com. Include the position you're applying for in the subject line.
              </p>
            </div>

            <div>
              <div className="font-body text-sm text-gray-500 mb-4 uppercase tracking-widest">
                Step Two
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                Application Review
              </h3>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                Our HR team carefully reviews all applications. Shortlisted candidates will be 
                contacted within two weeks.
              </p>
            </div>

            <div>
              <div className="font-body text-sm text-gray-500 mb-4 uppercase tracking-widest">
                Step Three
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                Interview Process
              </h3>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                Selected candidates will participate in multiple rounds of interviews and assessments 
                to ensure the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
            Ready to Join Us?
          </h2>
          <p className="font-body text-xl text-gray-700 mb-12 leading-relaxed">
            We're always looking for passionate individuals to join our community. 
            Send your application to start your journey with us.
          </p>
          <a 
            href="mailto:careers@mysoreinternationalschool.com"
            className="inline-block font-body text-lg font-semibold text-white bg-primary px-10 py-5 hover:bg-[#6B0F6B] transition-colors duration-300"
          >
            careers@mysoreinternationalschool.com
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}