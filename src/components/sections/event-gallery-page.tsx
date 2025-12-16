'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IEvent } from '@/types/event'

export default function EventGalleryPage() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/events')
      const data = await response.json()
      
      if (data.success) {
        // Get only 6 events for homepage
        setEvents(data.data.slice(0, 6))
      }
    } catch (error) {
      console.error('Fetch events error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
            Event Gallery
          </h2>
          <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
            Relive the joy, excitement, and achievements of our vibrant school community
          </p>
        </div>

        {/* Events Grid */}
        <div className="mb-12">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
              <p className="mt-4 font-body text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-xl text-gray-600">No events found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link 
                  key={event._id}
                  href={`/gallery/${event._id}`}
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                    <Image
                      src={event.thumbnail.url}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-body font-semibold">
                      {event.photoCount} Photos
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="font-body text-sm font-semibold text-primary uppercase tracking-widest">
                      {event.category}
                    </span>

                    {/* Conditionally render date only if it exists */}
                    {event.date && (
                      <div className="font-body text-sm text-gray-500 mb-2 mt-2">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    )}

                    <h3 className="font-display text-2xl font-semibold text-primary mb-2 group-hover:text-[#6B0F6B] transition-colors">
                      {event.title}
                    </h3>

                    <p className="font-body text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="font-body text-sm font-semibold text-primary group-hover:text-[#6B0F6B] transition-colors">
                      View Photos →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* View Full Gallery Button */}
        {!isLoading && events.length > 0 && (
          <div className="text-center">
            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 font-body font-semibold text-white bg-primary px-8 py-4 rounded-lg hover:bg-[#6B0F6B] transition-all duration-300 hover:shadow-lg"
            >
              <span>View Full Gallery</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
