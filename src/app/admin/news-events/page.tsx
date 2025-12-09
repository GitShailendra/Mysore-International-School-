'use client'

import { useState, useEffect } from 'react'
import StaggeredMenu from '@/components/StaggeredMenu'

// Define the interface WITHOUT importing from model
interface INewsEvent {
  _id: string
  type: 'news' | 'event'
  title: string
  excerpt: string
  fullContent: string
  imageUrl: string
  date: string
  time?: string
  location?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

type FormMode = 'create' | 'edit' | null

export default function AdminNewsEventsPage() {
  const [items, setItems] = useState<INewsEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    type: 'news' as 'news' | 'event',
    title: '',
    excerpt: '',
    fullContent: '',
    date: '',
    time: '',
    location: '',
    status: 'published' as 'draft' | 'published',
    image: null as File | null
  })

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/admin/dashboard' },
    { label: 'Admissions', ariaLabel: 'Manage admissions', link: '/admin/admissions' },
    { label: 'Event Gallery', ariaLabel: 'Manage events and gallery', link: '/admin/events' },
    { label: 'News & Events', ariaLabel: 'Manage news and events', link: '/admin/news-events' }
  ]

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/news-events')
      const data = await response.json()

      if (data.success) {
        setItems(data.data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
      alert('Failed to fetch news and events')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateClick = () => {
    setFormMode('create')
    setFormData({
      type: 'news',
      title: '',
      excerpt: '',
      fullContent: '',
      date: '',
      time: '',
      location: '',
      status: 'published',
      image: null
    })
    setShowModal(true)
  }

  const handleEditClick = (item: INewsEvent) => {
    setFormMode('edit')
    setEditingItemId(item._id.toString())
    setFormData({
      type: item.type,
      title: item.title,
      excerpt: item.excerpt,
      fullContent: item.fullContent,
      date: new Date(item.date).toISOString().split('T')[0],
      time: item.time || '',
      location: item.location || '',
      status: item.status,
      image: null
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formMode === 'create' && !formData.image) {
      alert('Please select an image')
      return
    }

    try {
      setIsSubmitting(true)

      const form = new FormData()
      form.append('type', formData.type)
      form.append('title', formData.title)
      form.append('excerpt', formData.excerpt)
      form.append('fullContent', formData.fullContent)
      form.append('date', formData.date)
      form.append('time', formData.time)
      form.append('location', formData.location)
      form.append('status', formData.status)
      
      if (formData.image) {
        form.append('image', formData.image)
      }

      const url = formMode === 'create' 
        ? '/api/news-events'
        : `/api/news-events/${editingItemId}`

      const response = await fetch(url, {
        method: formMode === 'create' ? 'POST' : 'PUT',
        body: form
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message)
        setShowModal(false)
        fetchItems()
      } else {
        alert(data.message || 'Failed to save')
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/news-events/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        alert('Deleted successfully')
        fetchItems()
      } else {
        alert(data.message || 'Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete')
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
        {/* Header */}
        <header className="mb-8 sm:mb-12 mt-16 sm:mt-20">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4 tracking-tight">
            News & Events Management
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Create and manage news articles and events
          </p>
          <button
            onClick={handleCreateClick}
            className="w-full sm:w-auto font-body font-semibold text-white bg-primary px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#6B0F6B] transition-colors duration-300 rounded-lg"
          >
            Create New Item
          </button>
        </header>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Empty State */}
            {items.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-lg sm:text-xl text-gray-600">No items found. Create your first one!</p>
              </div>
            ) : (
              /* Items List */
              items.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-primary transition-colors duration-300"
                >
                  {/* Mobile Layout */}
                  <div className="block">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
                      <span className={`font-body text-xs sm:text-sm font-semibold uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full ${
                        item.type === 'news' ? 'bg-purple-100 text-primary' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className={`font-body text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full ${
                        item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-body text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="font-body text-xs sm:text-sm text-gray-500 mb-4">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {item.time && ` • ${item.time}`}
                      {item.location && ` • ${item.location}`}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="w-full sm:w-auto font-body text-sm sm:text-base px-4 sm:px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id.toString())}
                        className="w-full sm:w-auto font-body text-sm sm:text-base px-4 sm:px-6 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" 
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white w-full max-w-3xl my-8 rounded-lg overflow-hidden flex flex-col max-h-[calc(100vh-4rem)]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
                {formMode === 'create' ? 'Create New Item' : 'Edit Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Type */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'news' | 'event' })}
                    disabled={isSubmitting}
                  >
                    <option value="news">News</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Full Content *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                    value={formData.fullContent}
                    onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Event-specific fields */}
                {formData.type === 'event' && (
                  <>
                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 7:00 PM"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., School Auditorium"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                  </>
                )}

                {/* Image */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Image {formMode === 'create' ? '*' : '(optional)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required={formMode === 'create'}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    disabled={isSubmitting}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full sm:flex-1 font-body font-semibold px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors rounded-lg text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 font-body font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors rounded-lg disabled:opacity-50 text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : formMode === 'create' ? 'Create' : 'Update'}
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
