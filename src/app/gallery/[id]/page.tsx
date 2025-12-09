'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import NewsEventsSidebar from '@/components/sections/news-events-sidebar'
import { IEvent } from '@/types/event'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setEvent(data.data)
      } else {
        alert('Event not found')
        router.push('/gallery')
      }
    } catch (error) {
      console.error('Fetch event error:', error)
      alert('Failed to load event')
      router.push('/gallery')
    } finally {
      setIsLoading(false)
    }
  }

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
    setShowImageModal(true)
  }

  const nextImage = () => {
    if (event) {
      setSelectedImageIndex((prev) => 
        prev === event.galleryImages.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (event) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? event.galleryImages.length - 1 : prev - 1
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <HeaderNavigation />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <p className="mt-4 font-body text-gray-600">Loading event...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="min-h-screen">
      <HeaderNavigation />
      
      <MobileNewsEventsWrapper />

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="hidden md:block fixed top-1/2 right-0 -translate-y-1/2 z-30 bg-[#D1A3FF] hover:bg-[#C0A2FF] text-[#580B57] font-display font-semibold text-sm tracking-[0.1em] py-4 px-3 transition-all duration-300 hover:px-4 shadow-lg"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        NEWS & EVENTS
      </button>

      <NewsEventsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="bg-white">
        {/* Back to Gallery Button - Enhanced */}
        <div className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 font-body font-semibold text-primary hover:text-white bg-white hover:bg-primary border-2 border-primary px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <span className="text-xl">←</span>
              <span>Back to Gallery</span>
            </Link>
          </div>
        </div>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-body text-sm font-semibold text-primary uppercase tracking-widest px-4 py-2 bg-[#F9F4FB] rounded-full">
                {event.category}
              </span>
              <span className="font-body text-sm text-gray-500">{event.photoCount} Photos</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 tracking-tight">
              {event.title}
            </h1>

            <div className="font-body text-lg text-gray-500 mb-4">
              {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <p className="font-body text-xl text-gray-600 max-w-3xl">{event.description}</p>

            <div className="mt-6">
              <a href={event.driveLink} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white bg-primary px-6 py-3 rounded-lg hover:bg-[#6B0F6B] transition-colors">
                <span>📁</span>
                <span>View Full Album on Google Drive</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-primary mb-8">Photo Gallery</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group" 
                    onClick={() => openImageModal(index)}>
                  <Image src={image.url} alt={`${event.title} - Photo ${index + 1}`} fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Back to Gallery Button */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-6xl text-center">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 font-body font-semibold text-primary hover:text-white bg-white hover:bg-primary border-2 border-primary px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <span className="text-xl">←</span>
              <span>Back to Gallery</span>
            </Link>
          </div>
        </section>
      </main>

      {showImageModal && event && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4" 
            onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button onClick={() => setShowImageModal(false)} 
                    className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center">
              ×
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center">
              ‹
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center">
              ›
            </button>
            <div className="relative w-full h-full">
              <Image src={event.galleryImages[selectedImageIndex].url} alt={`${event.title} - Photo ${selectedImageIndex + 1}`} 
                    fill className="object-contain" onClick={(e) => e.stopPropagation()} />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full font-body text-sm">
              {selectedImageIndex + 1} / {event.galleryImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
