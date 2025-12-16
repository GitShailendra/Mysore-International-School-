import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import OurCampusSection from './OurCampusSection'

export const metadata: Metadata = {
  title: 'Our Campus - Mysore International School',
  description: 'Explore the state-of-the-art campus facilities at Mysore International School',
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