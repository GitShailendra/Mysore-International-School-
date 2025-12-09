'use client'

import { useState } from 'react'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import NewsEventsSidebar from '@/components/sections/news-events-sidebar'
import FullGalleryPage from '@/components/sections/full-gallery-page' // CHANGED HERE

export default function GalleryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <HeaderNavigation />
      
      <MobileNewsEventsWrapper />

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="hidden md:block fixed top-1/2 right-0 -translate-y-1/2 z-30 bg-[#D1A3FF] hover:bg-[#C0A2FF] text-[#580B57] font-display font-semibold text-sm tracking-[0.1em] py-4 px-3 transition-all duration-300 hover:px-4 shadow-lg"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Open News & Events"
      >
        NEWS & EVENTS
      </button>

      <NewsEventsSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <main>
        <FullGalleryPage /> {/* CHANGED HERE - NO BUTTON */}
      </main>

      <Footer />
    </div>
  )
}
