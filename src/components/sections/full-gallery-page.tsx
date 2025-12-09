'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IEvent } from '@/types/event'

type EventCategory = 'All' | 'Cultural' | 'Sports' | 'Academic' | 'National' | 'Festival' | 'Competition'

export default function FullGalleryPage() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All')

  const categories: EventCategory[] = ['All', 'Cultural', 'Sports', 'Academic', 'National', 'Festival', 'Competition']

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory))
    }
  }, [selectedCategory, events])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/events')
      const data = await response.json()
      
      if (data.success) {
        setEvents(data.data)
        setFilteredEvents(data.data)
      }
    } catch (error) {
      console.error('Fetch events error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            Event Gallery
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-4xl leading-tight">
            Relive the joy, excitement, and achievements of our vibrant school community. 
            Browse through our collection of memorable events and celebrations.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-body px-6 py-2 border-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-primary bg-primary text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid - NO BUTTON */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
              <p className="mt-4 font-body text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-2xl text-gray-600">
                {selectedCategory === 'All' 
                  ? 'No events found.' 
                  : `No ${selectedCategory} events found.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
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

                    <div className="font-body text-sm text-gray-500 mb-2 mt-2">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>

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
      </section>
    </>
  )
}
