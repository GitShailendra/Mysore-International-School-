import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Site Map - Mysore International School',
  description: 'Complete site map of Mysore International School website pages - navigate through all sections including admissions, academics, campus facilities, and contact information.',
  keywords: 'site map, website navigation, Mysore International School pages, school website structure',
  alternates: {
    canonical: 'https://mysoreinternationalschool.com/site-map',
  },
}

export default function SitemapPage() {
  const siteLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/about-us/founder-chairman', label: 'Founder & Chairman' },
    { href: '/about-us/overview', label: 'About Us Overview' },
    { href: '/our-campus', label: 'Our Campus' },
    { href: '/academics', label: 'Academics' },
    { href: '/academics/curriculum', label: 'Curriculum' },
    { href: '/academics/faculty-team', label: 'Faculty & Team' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/admissions/how-to-apply', label: 'How to Apply' },
    { href: '/admissions/careers', label: 'Careers' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/student-life', label: 'Student Life' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            Sitemap
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-4xl leading-tight">
            Navigate through all pages of Mysore International School website.
          </p>
        </div>
      </section>

      {/* Sitemap Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-6 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200"
              >
                <span className="font-body text-lg text-gray-700 hover:text-primary">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
