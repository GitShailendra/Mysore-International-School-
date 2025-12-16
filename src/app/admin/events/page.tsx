'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import StaggeredMenu from '@/components/StaggeredMenu'
import { IEvent } from '@/types/event'

type EventCategory = 'Cultural' | 'Sports' | 'Academic' | 'National' | 'Festival' | 'Competition'

export default function AdminEventGalleryPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [events, setEvents] = useState<IEvent[]>([])
  
  // Filter state
  const [filterCategory, setFilterCategory] = useState<string>('all')
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Cultural' as EventCategory,
    description: '',
    thumbnail: null as File | null,
    galleryImages: [] as File[],
    driveLink: ''
  })

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/admin/dashboard' },
    { label: 'Admissions', ariaLabel: 'Manage admissions', link: '/admin/admissions' },
    { label: 'Event Gallery', ariaLabel: 'Manage events and gallery', link: '/admin/events' },
    { label: 'News & Events', ariaLabel: 'Manage news and events', link: '/admin/news-events' }
  ]

  const categories: EventCategory[] = ['Cultural', 'Sports', 'Academic', 'National', 'Festival', 'Competition']

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/events')
      const data = await response.json()
      
      if (data.success) {
        setEvents(data.data)
      } else {
        alert('Failed to fetch events')
      }
    } catch (error) {
      console.error('Fetch events error:', error)
      alert('Failed to fetch events')
    } finally {
      setIsLoading(false)
    }
  }

  // Filter events based on category only
  const filteredEvents = events.filter(event => {
    if (filterCategory !== 'all' && event.category !== filterCategory) {
      return false
    }
    return true
  })

  const handleResetFilters = () => {
    setFilterCategory('all')
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, thumbnail: file })
    }
  }

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const filesArray = Array.from(files)
      setFormData({ ...formData, galleryImages: [...formData.galleryImages, ...filesArray] })
    }
  }

  const removeGalleryImage = (index: number) => {
    const newImages = formData.galleryImages.filter((_, i) => i !== index)
    setFormData({ ...formData, galleryImages: newImages })
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.thumbnail) {
      alert('Please select a thumbnail image')
      return
    }

    if (formData.galleryImages.length < 4 || formData.galleryImages.length > 12) {
      alert('Please upload 4-12 gallery images')
      return
    }

    try {
      setIsSubmitting(true)

      const form = new FormData()
      form.append('title', formData.title)
      form.append('date', formData.date)
      form.append('category', formData.category)
      form.append('description', formData.description)
      form.append('driveLink', formData.driveLink)
      form.append('thumbnail', formData.thumbnail)
      
      formData.galleryImages.forEach((file, index) => {
        form.append(`galleryImage${index}`, file)
      })

      const response = await fetch('/api/events', {
        method: 'POST',
        body: form,
      })

      const data = await response.json()

      if (data.success) {
        alert('Event created successfully!')
        setShowCreateModal(false)
        fetchEvents()
        setFormData({
          title: '',
          date: '',
          category: 'Cultural',
          description: '',
          thumbnail: null,
          galleryImages: [],
          driveLink: ''
        })
      } else {
        alert(data.message || 'Failed to create event')
      }
    } catch (error) {
      console.error('Create event error:', error)
      alert('Failed to create event')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = async (event: IEvent) => {
    setEditingEventId(event._id)
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split('T')[0],
      category: event.category,
      description: event.description,
      thumbnail: null,
      galleryImages: [],
      driveLink: event.driveLink
    })
    setShowEditModal(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingEventId) return

    try {
      setIsSubmitting(true)

      const form = new FormData()
      form.append('title', formData.title)
      form.append('date', formData.date)
      form.append('category', formData.category)
      form.append('description', formData.description)
      form.append('driveLink', formData.driveLink)
      
      if (formData.thumbnail) {
        form.append('thumbnail', formData.thumbnail)
      }
      
      if (formData.galleryImages.length > 0) {
        formData.galleryImages.forEach((file, index) => {
          form.append(`galleryImage${index}`, file)
        })
      }

      const response = await fetch(`/api/events/${editingEventId}`, {
        method: 'PUT',
        body: form,
      })

      const data = await response.json()

      if (data.success) {
        alert('Event updated successfully!')
        setShowEditModal(false)
        setEditingEventId(null)
        fetchEvents()
        setFormData({
          title: '',
          date: '',
          category: 'Cultural',
          description: '',
          thumbnail: null,
          galleryImages: [],
          driveLink: ''
        })
      } else {
        alert(data.message || 'Failed to update event')
      }
    } catch (error) {
      console.error('Update event error:', error)
      alert('Failed to update event')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        alert('Event deleted successfully!')
        fetchEvents()
      } else {
        alert(data.message || 'Failed to delete event')
      }
    } catch (error) {
      console.error('Delete event error:', error)
      alert('Failed to delete event')
    }
  }

  return (
    <div className="min-h-screen bg-white pb-12 md:pb-0">
      <StaggeredMenu
        position="right"
        items={menuItems}
        displayItemNumbering={false}
        menuButtonColor="#580B57"
        openMenuButtonColor="#580B57"
        changeMenuColorOnOpen={true}
        colors={['#D1A3FF', '#580B57']}
        accentColor="#580B57"
        logoUrl="/fulllogo.svg"
        isFixed={true}
        displaySocials={false}
        showLogout={true}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <header className="mb-8 sm:mb-12 mt-16 sm:mt-20">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4 tracking-tight">
            Event Gallery Management
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Create and manage school event galleries
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto font-body font-semibold text-white bg-primary px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#6B0F6B] transition-colors duration-300 rounded-lg"
          >
            Create New Event
          </button>
        </header>

        {/* Filters Section */}
        <div className="mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="font-display text-lg sm:text-xl font-semibold text-primary mb-4">
            Filter Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full font-body text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all duration-300 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 font-body text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : (
          <section>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-lg sm:text-xl text-gray-600">
                  {events.length === 0 ? 'No events found. Create your first event!' : 'No events match your filters.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {filteredEvents.map((event) => (
                  <div 
                    key={event._id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-primary transition-colors duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                      {/* Thumbnail */}
                      <div className="lg:w-1/3">
                        <div 
                          className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => openImageModal(event.thumbnail.url)}
                        >
                          <Image
                            src={event.thumbnail.url}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl sm:text-4xl">
                              🔍
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                          <span className="font-body text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest px-2 sm:px-3 py-1 bg-purple-100 rounded-full">
                            {event.category}
                          </span>
                          <span className="font-body text-xs sm:text-sm text-gray-500">
                            {event.photoCount} Photos
                          </span>
                        </div>
                        {event.date && (
    <div className="font-body text-xs sm:text-sm text-gray-500 mb-2">
      {new Date(event.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </div>
  )}
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-2">
                          {event.title}
                        </h3>
                        <p className="font-body text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                          {event.description}
                        </p>

                        {/* Gallery Images Preview */}
                        <div className="mb-3 sm:mb-4">
                          <p className="font-body text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            Gallery Images:
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {event.galleryImages.slice(0, 8).map((image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square rounded overflow-hidden cursor-pointer group"
                                onClick={() => openImageModal(image.url)}
                              >
                                <Image
                                  src={image.url}
                                  alt={`${event.title} - ${index + 1}`}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                              </div>
                            ))}
                            {event.galleryImages.length > 8 && (
                              <div className="relative aspect-square rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                <span className="font-body text-xs sm:text-sm text-gray-600">
                                  +{event.galleryImages.length - 8}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                         {event.driveLink && (
    <a
      href={event.driveLink}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body text-xs sm:text-sm text-primary hover:text-[#6B0F6B] transition-colors inline-block mb-3 sm:mb-4"
    >
      View Full Album on Google Drive →
    </a>
  )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button 
                            onClick={() => handleEditClick(event)}
                            className="w-full sm:w-auto font-body text-sm sm:text-base px-4 sm:px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(event._id)}
                            className="w-full sm:w-auto font-body text-sm sm:text-base px-4 sm:px-6 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Full size preview"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal - (keeping the same as before) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 overflow-y-auto flex-1 modal-scrollable">
              <div className="mb-8">
                <h2 className="font-display text-4xl font-bold text-primary mb-2">
                  Create New Event
                </h2>
                <p className="font-body text-gray-600">
                  Fill in the details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    disabled={isSubmitting}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      className="hidden"
                      id="thumbnail-upload"
                      onChange={handleThumbnailUpload}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                      {formData.thumbnail ? (
                        <div className="font-body text-green-600 mb-2">
                          ✓ {formData.thumbnail.name}
                        </div>
                      ) : (
                        <>
                          <div className="font-body text-gray-600 mb-2">
                            Click to upload event thumbnail
                          </div>
                          <div className="font-body text-sm text-gray-500">
                            PNG, JPG up to 5MB
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Gallery Images (4-12 images) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="gallery-upload"
                      onChange={handleGalleryImageUpload}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="gallery-upload" className="cursor-pointer">
                      <div className="font-body text-gray-600 mb-2">
                        Click to upload gallery images
                      </div>
                      <div className="font-body text-sm text-gray-500">
                        Select 4-12 images (PNG, JPG)
                      </div>
                    </label>
                  </div>
                  {formData.galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-body text-sm text-gray-700">
                        Selected: {formData.galleryImages.length} image(s)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.galleryImages.map((file, index) => (
                          <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="text-red-600 hover:text-red-800"
                              disabled={isSubmitting}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Google Drive Album Link (Optional)
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Paste the shareable link to your Google Drive folder"
                    value={formData.driveLink}
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    disabled={isSubmitting}
                  />
                  <p className="font-body text-sm text-gray-500 mt-2">
                    Paste the shareable link to your Google Drive folder containing all event photos
                  </p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors rounded-lg"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors rounded-lg disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - keeping same as before */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 overflow-y-auto flex-1 modal-scrollable">
              <div className="mb-8">
                <h2 className="font-display text-4xl font-bold text-primary mb-2">
                  Edit Event
                </h2>
                <p className="font-body text-gray-600">
                  Update the event details below
                </p>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                {/* Same fields as create modal */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Date  (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    disabled={isSubmitting}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Event Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Update Thumbnail (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="thumbnail-upload-edit"
                      onChange={handleThumbnailUpload}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="thumbnail-upload-edit" className="cursor-pointer">
                      {formData.thumbnail ? (
                        <div className="font-body text-green-600 mb-2">
                          ✓ {formData.thumbnail.name}
                        </div>
                      ) : (
                        <>
                          <div className="font-body text-gray-600 mb-2">
                            Click to upload new thumbnail
                          </div>
                          <div className="font-body text-sm text-gray-500">
                            Leave empty to keep existing
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Update Gallery Images (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="gallery-upload-edit"
                      onChange={handleGalleryImageUpload}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="gallery-upload-edit" className="cursor-pointer">
                      <div className="font-body text-gray-600 mb-2">
                        Click to upload new gallery images
                      </div>
                      <div className="font-body text-sm text-gray-500">
                        Leave empty to keep existing images
                      </div>
                    </label>
                  </div>
                  {formData.galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-body text-sm text-gray-700">
                        New images: {formData.galleryImages.length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.galleryImages.map((file, index) => (
                          <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="text-red-600 hover:text-red-800"
                              disabled={isSubmitting}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Google Drive Album Link (Optional)
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Paste the shareable link to your Google Drive folder"
                    value={formData.driveLink}
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingEventId(null)
                    }}
                    className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors rounded-lg"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors rounded-lg disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
