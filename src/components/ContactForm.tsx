'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    occupation: '',
    subject: '',
    source: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Add your API call here
    console.log('Form submitted:', formData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent successfully!')
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        occupation: '',
        subject: '',
        source: '',
        message: ''
      })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`border-2 border-gray-200 p-8 ${className}`}>
      <h2 className="font-display text-3xl font-semibold text-primary mb-2">
        Get in Touch
      </h2>
      <p className="font-body text-gray-600 mb-8">
        Fill out the form below and we'll get back to you soon
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Name */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            name="studentName"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter student's full name"
            value={formData.studentName}
            onChange={handleChange}
          />
        </div>

        {/* Parent Name */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Parent's Name *
          </label>
          <input
            type="text"
            name="parentName"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter parent's full name"
            value={formData.parentName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="+91 XXX XXX XXXX"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Parent's Occupation *
          </label>
          <input
            type="text"
            name="occupation"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter parent's occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            name="subject"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select a subject</option>
            <option value="Admission">Admission</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Visit">Visit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Where did you hear about us */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Where did you hear about us? *
          </label>
          <select
            name="source"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Newspaper">Newspaper</option>
            <option value="Friends/Family">Friends/Family</option>
            <option value="Google Search">Google Search</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* Required Fields Note */}
        <p className="font-body text-sm text-gray-500">
          * Required fields
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-primary text-white font-body font-semibold hover:bg-[#6B0F6B] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Contact Us'
          )}
        </button>
      </form>
    </div>
  )
}
