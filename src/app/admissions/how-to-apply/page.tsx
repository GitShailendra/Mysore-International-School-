'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import HeaderNavigation from '@/components/sections/header-navigation'
import Footer from '@/components/sections/footer'
import MobileNewsEventsWrapper from '@/components/mobile-news-events-wrapper'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import ScrollReveal from '@/components/ScrollReveal'

export default function HowToApplyPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    occupation: '',
    category: 'Admission',
    message: '',
    source: 'Website'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = ['Admission', 'Inquiry', 'Visit', 'Other']
  const sources = ['Website', 'Facebook', 'Instagram', 'Newspaper', 'Friends/Family', 'Google Search', 'Other']

  const admissionProcess = [
    {
      step: "01",
      title: "Initial Inquiry",
      description: "Contact our admissions office to express interest and schedule a campus visit."
    },
    {
      step: "02",
      title: "Application Submission",
      description: "Complete and submit the online application form with required documents."
    },
    {
      step: "03",
      title: "Entrance Assessment",
      description: "Students undergo age-appropriate entrance tests and interviews."
    },
    {
      step: "04",
      title: "Parent Interview",
      description: "Parents meet with admissions team to discuss educational goals and partnership."
    },
    {
      step: "05",
      title: "Final Decision",
      description: "Admissions committee reviews applications and makes final decisions."
    }
  ]

  const requirements = [
    {
      category: "Academic Records",
      items: ["Previous school transcripts", "Report cards", "Transfer certificates"]
    },
    {
      category: "Personal Documents",
      items: ["Birth certificate", "Passport copy", "Medical records", "Address proof"]
    },
    {
      category: "Application Forms",
      items: ["Completed admission form", "Parent declaration", "Emergency contact information"]
    }
  ]

  const ageCriteria = [
    { grade: "Pre-K", age: "3-4 years" },
    { grade: "Kindergarten", age: "4-5 years" },
    { grade: "Grade 1", age: "5-6 years" },
    { grade: "Grade 2", age: "6-7 years" },
    { grade: "Grade 3+", age: "Based on previous grade completion" }
  ]

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          setFormData({
            studentName: '',
            parentName: '',
            email: '',
            phone: '',
            occupation: '',
            category: 'Admission',
            message: '',
            source: 'Website'
          })
          setSuccess(false)
        }, 2000)
      } else {
        setError(data.message || 'Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <HeaderNavigation />
      <MobileNewsEventsWrapper />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 tracking-tight">
            How to Apply
          </h1>
          <p className="font-body text-2xl md:text-3xl text-gray-600 max-w-3xl leading-tight">
            Join our community of lifelong learners
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal
            baseOpacity={0}
            baseRotation={0}
            blurStrength={6}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            enableBlur={true}
            as="div"
          >
            <p className="font-body text-xl text-gray-700 leading-relaxed">
              Our admission process is designed to ensure the best fit between students, families, 
              and our educational community. We welcome applications throughout the year and are 
              committed to finding students who will thrive in our learning environment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight text-center">
            Admission Process
          </h2>

          <ScrollStack
            useWindowScroll={true}
            itemDistance={100}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="50%"
            scaleEndPosition="30%"
            baseScale={0.88}
          >
            {admissionProcess.map((step, index) => (
              <ScrollStackItem key={index}>
                <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 max-w-5xl mx-auto">
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-2">
                      <div className="font-display text-6xl font-bold text-primary opacity-20">
                        {step.step}
                      </div>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="font-body text-xl text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Age Criteria & Requirements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20">
            {/* Age Criteria */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-12 tracking-tight">
                Age Criteria
              </h2>
              <div className="space-y-6">
                {ageCriteria.map((criteria, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-baseline pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-body text-xl font-semibold text-primary">
                      {criteria.grade}
                    </span>
                    <span className="font-body text-lg text-gray-700">
                      {criteria.age}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-12 tracking-tight">
                Required Documents
              </h2>
              <div className="space-y-10">
                {requirements.map((req, index) => (
                  <div key={index}>
                    <h3 className="font-display text-2xl font-semibold text-primary mb-5">
                      {req.category}
                    </h3>
                    <ul className="space-y-3">
                      {req.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="font-body text-lg text-gray-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8">
            Important Information
          </h2>
          <div className="space-y-6 font-body text-xl text-gray-700 leading-relaxed">
            <p>
              All documents must be original or certified copies. International applicants may need 
              to provide additional documentation as required by local regulations.
            </p>
            <p>
              Entrance assessments are tailored to the student's grade level and are designed to 
              understand their learning style and academic foundation, not to create barriers to entry.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
            Ready to Apply?
          </h2>
          <p className="font-body text-xl text-gray-700 mb-16 leading-relaxed">
            Contact our admissions team to begin your journey with Mysore International School.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="font-body text-sm text-gray-500 mb-3 uppercase tracking-widest">
                Call Us
              </div>
              <a 
                href="tel:+918884300400" 
                className="font-body text-2xl font-semibold text-primary hover:text-[#6B0F6B] transition-colors duration-300"
              >
                +91 8884 300 400
              </a>
            </div>

            <div>
              <div className="font-body text-sm text-gray-500 mb-3 uppercase tracking-widest">
                Email Us
              </div>
              <a 
                href="mailto:admissions@mysoreinternationalschool.com" 
                className="font-body text-2xl font-semibold text-primary hover:text-[#6B0F6B] transition-colors duration-300"
              >
                admissions@mysoreinternationalschool.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">Success!</p>
              <p className="text-sm">Your inquiry has been submitted. We'll get back to you soon.</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form Header */}
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
              Schedule a Visit
            </h2>
            <p className="font-body text-xl text-gray-700 leading-relaxed">
              We encourage you to schedule a campus visit to experience our learning environment 
              firsthand and meet our dedicated faculty. Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Student Name */}
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                name="studentName"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                placeholder="Enter parent's occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                value={formData.source}
                onChange={handleChange}
              >
                {sources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none bg-white"
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
              onClick={handleSubmit}
              disabled={isSubmitting || success}
              className="w-full py-4 px-6 bg-primary text-white rounded-lg font-body font-semibold hover:bg-[#6B0F6B] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : success ? (
                'Submitted Successfully!'
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}