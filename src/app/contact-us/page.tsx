import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import DiscoverCtaSection from '@/components/sections/discover-cta-section'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Best School in Mysore | Mysore International School',
  description: 'Contact Mysore International School - the best international school in Mysore. Get admission information, schedule campus visits, and reach our team. Located at HD Kote Road, Mysore. Call +91-8884-300-400',
  keywords: 'contact Mysore International School, best school in Mysore contact, school admission inquiry, Mysore school address, international school contact number',
  openGraph: {
    title: 'Contact Us - Mysore International School',
    description: 'Get in touch with the best international school in Mysore. Schedule a campus visit today.',
    url: 'https://mysoreinternationalschool.com/contact-us',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mysoreinternationalschool.com/contact-us',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            Contact Us
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-4xl leading-tight">
            Get in touch with Mysore International School. We're here to answer your questions and help you learn more about our community.
          </p>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column - Contact Details */}
            <div className="space-y-12">
              {/* Address */}
              <div className="pb-12 border-b border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                      Visit Us
                    </h2>
                    <address className="font-body text-lg text-gray-700 not-italic leading-relaxed">
                      Mysore International School<br />
                      92/1-3, HD Kote Road<br />
                      Rayanakere Post<br />
                      5 Minutes from Srirampura Ring Road<br />
                      Mysore – 570008
                    </address>
                    <a
                      href="https://maps.google.com/?q=Mysore+International+School"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 font-body font-medium text-primary hover:text-[#6B0F6B] transition-colors"
                    >
                      Get Directions
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Admissions Contact */}
              <div className="pb-12 border-b border-gray-200">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">
                  Admissions
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="font-body text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                      Admission Officer
                    </div>
                    <div className="font-body text-lg text-gray-700 mb-1">
                      Ms. Ranjitha
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <a
                      href="mailto:admissions@mysoreinternationalschool.com"
                      className="font-body text-gray-700 hover:text-primary transition-colors"
                    >
                      admissions@mysoreinternationalschool.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="font-body text-gray-700">
                      <a href="tel:+918884300400" className="hover:text-primary transition-colors">
                        +91 8884 300 400
                      </a>
                      {' / '}
                      <a href="tel:+918277237785" className="hover:text-primary transition-colors">
                        +91 8277 237 785
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accounts Contact */}
              <div className="pb-12 border-b border-gray-200">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">
                  Accounts & Finance
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="font-body text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                      Accountant
                    </div>
                    <div className="font-body text-lg text-gray-700 mb-1">
                      Mrs. Parameswari
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <a
                      href="mailto:accounts@mysoreinternationalschool.com"
                      className="font-body text-gray-700 hover:text-primary transition-colors"
                    >
                      accounts@mysoreinternationalschool.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="font-body text-gray-700">
                      <a href="tel:08212971010" className="hover:text-primary transition-colors">
                        0821 2971010
                      </a>
                      {' / '}
                      <a href="tel:+918884414356" className="hover:text-primary transition-colors">
                        8884 414 356
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                      Office Hours
                    </h2>
                    <div className="font-body text-lg text-gray-700 space-y-2">
                      <div className="flex justify-between gap-8">
                        <span>Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Saturday</span>
                        <span className="font-medium">8:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-semibold text-primary mb-8">
            Find Us
          </h2>
          <div className="border-2 border-gray-200 bg-white overflow-hidden aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.8947847894789!2d76.58685!3d12.228557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf644f7358cc0d%3A0xe4fb32672e467b68!2sMysore%20International%20School!5e0!3m2!1sen!2sin!4v1734885000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mysore International School Location - 92/1-3, HD Kote Road, Rayanakere Post, Mysore"
            ></iframe>
          </div>
        </div>
      </section>

      <DiscoverCtaSection />

      <Footer />
    </main>
  )
}
