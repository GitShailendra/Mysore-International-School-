import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import DiscoverCtaSection from '@/components/sections/discover-cta-section'
export const metadata: Metadata = {
  title: 'Contact Us - Mysore International School',
  description: 'Get in touch with Mysore International School - contact information, location, and inquiry details',
}

export default function ContactUsPage() {
  const contactInfo = [
    {
      title: "School Address",
      details: [
        "Mysore International School",
        "92/1-5, HD Kote Road",
        "Rayanakere Post, SH 33",
        "Karnataka 570008, India"
      ],
      icon: "📍"
    },
    {
      title: "Phone Numbers",
      details: [
        "Main Office: +91 XXX XXX XXXX",
        "Admissions: +91 XXX XXX XXXX",
        "Emergency: +91 XXX XXX XXXX"
      ],
      icon: "📞"
    },
    {
      title: "Email Addresses",
      details: [
        "General: info@mis.edu.in",
        "Admissions: admissions@mis.edu.in",
        "Support: support@mis.edu.in"
      ],
      icon: "📧"
    }
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ]

  const departments = [
    {
      name: "Admissions Office",
      contact: "admissions@mis.edu.in",
      phone: "+91 XXX XXX XXXX",
      description: "For admission inquiries and application support"
    },
    {
      name: "Academic Office",
      contact: "academics@mis.edu.in",
      phone: "+91 XXX XXX XXXX",
      description: "For academic programs and curriculum information"
    },
    {
      name: "Student Services",
      contact: "students@mis.edu.in",
      phone: "+91 XXX XXX XXXX",
      description: "For student support and counseling services"
    },
    {
      name: "Alumni Relations",
      contact: "alumni@mis.edu.in",
      phone: "+91 XXX XXX XXXX",
      description: "For alumni connections and events"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-secondary via-secondary to-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto">
              We'd Love to Hear From You
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white border-2 border-primary rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours & Map */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">

              {/* Office Hours */}
              <div className="bg-secondary rounded-lg p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                  Office Hours
                </h2>
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-primary/20 last:border-b-0">
                      <span className="font-semibold text-primary">{schedule.day}</span>
                      <span className="text-gray-700">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Note:</strong> Campus remains open for students during regular school hours.
                    Administrative offices are available during the hours listed above.
                  </p>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-white border-2 border-primary rounded-lg p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                  Our Location
                </h2>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    Located on HD Kote Road, easily accessible from major Mysore roads.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      Get Directions
                    </button>
                    <button className="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Virtual Tour
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Department Contacts */}
            <div className="bg-white border-2 border-primary rounded-lg p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                Department Contacts
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {dept.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-primary mr-2">📧</span>
                        <span>{dept.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">📞</span>
                        <span>{dept.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-secondary rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Have questions about admissions, academics, or anything else? We'd love to hear from you.
                Send us a message and we'll get back to you as soon as possible.
              </p>

              <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="font-semibold mb-2">Contact Form</p>
                  <p className="text-sm">Interactive contact form coming soon</p>
                  <p className="text-xs mt-4">
                    In the meantime, please reach out to us using the contact information above.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      <DiscoverCtaSection />

      <Footer />
    </main>
  )
}
