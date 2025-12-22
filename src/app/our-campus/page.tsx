import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import OurCampusSection from './OurCampusSection'

export const metadata: Metadata = {
  title: 'Campus Facilities - Best School in Mysore | World-Class Infrastructure',
  description: 'Explore the state-of-the-art campus facilities at Mysore International School - the best international school in Mysore. Modern classrooms, sports facilities, science labs, library, and safe learning environment with world-class infrastructure.',
  keywords: 'school campus Mysore, best school facilities, international school infrastructure, modern school campus, sports facilities Mysore, school amenities, world-class school infrastructure',
  openGraph: {
    title: 'Campus Facilities - Mysore International School',
    description: 'State-of-the-art campus facilities at the best international school in Mysore.',
    url: 'https://mysoreinternationalschool.com/our-campus',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mysoreinternationalschool.com/our-campus',
  },
}

export default function OurCampusPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />
      <OurCampusSection />
      <Footer />
    </main>
  )
}