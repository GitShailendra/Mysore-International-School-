'use client'

import { faqSchema } from '@/lib/seo-config'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is Mysore International School the best school in Mysore?',
    answer: 'Mysore International School is recognized as the best school in Mysore due to our world-class CBSE curriculum, state-of-the-art facilities, experienced faculty, holistic development programs, and consistent academic excellence. We offer international standards of education with a focus on individual student growth, modern infrastructure, and comprehensive extracurricular activities.'
  },
  {
    question: 'What makes Mysore International School the best international school in Mysore?',
    answer: 'As the best international school in Mysore, we combine CBSE curriculum with international teaching methodologies, global perspectives, and partnerships with organizations like Orchids. Our students receive world-class education with exposure to international standards, preparing them for global opportunities while maintaining strong academic foundations.'
  },
  {
    question: 'What curriculum does Mysore International School follow?',
    answer: 'Mysore International School follows the CBSE (Central Board of Secondary Education) curriculum from Pre-K to Grade 11. We enhance this with international teaching methodologies, innovative learning approaches, and partnerships that provide future skills programs. Our curriculum emphasizes academic excellence, critical thinking, and holistic development.'
  },
  {
    question: 'What are the admission requirements for Mysore International School?',
    answer: 'Admission to Mysore International School requires submission of previous school transcripts, birth certificate, passport copy, medical records, and address proof. Students undergo age-appropriate entrance assessments and interviews. Parents also meet with our admissions team to discuss educational goals. We welcome applications throughout the year.'
  },
  {
    question: 'What facilities does the best school in Mysore offer?',
    answer: 'Mysore International School offers state-of-the-art facilities including modern classrooms with smart boards, well-equipped science and computer labs, extensive library, sports facilities for various athletics, arts and music rooms, safe transportation, medical facilities, and a secure campus environment designed for optimal learning.'
  },
  {
    question: 'What is the fee structure at Mysore International School?',
    answer: 'Mysore International School offers competitive and affordable fee structures for world-class education. For detailed information about fees, payment plans, and financial options, please contact our admissions office at +91-8884-300-400 or email admissions@mysoreinternationalschool.com.'
  },
  {
    question: 'Does Mysore International School offer transportation?',
    answer: 'Yes, Mysore International School provides safe and reliable transportation services covering various routes across Mysore. Our buses are equipped with GPS tracking and trained staff to ensure student safety. Contact our admissions office for route details and availability.'
  },
  {
    question: 'What extracurricular activities are available at the best international school in Mysore?',
    answer: 'Mysore International School offers comprehensive extracurricular programs including sports (athletics, basketball, cricket, football), arts (painting, music, dance), cultural activities, community service programs, leadership development, and various clubs. We believe in holistic development beyond academics.'
  },
  {
    question: 'What is the student-teacher ratio at Mysore International School?',
    answer: 'Mysore International School maintains an optimal student-teacher ratio to ensure personalized attention for every student. Our small class sizes allow teachers to focus on individual learning needs, provide customized support, and foster meaningful student-teacher relationships that enhance learning outcomes.'
  },
  {
    question: 'How can I schedule a campus visit to the best school in Mysore?',
    answer: 'To schedule a campus visit to Mysore International School, contact our admissions office at +91-8884-300-400 or +91-8277-237-785, email admissions@mysoreinternationalschool.com, or fill out the inquiry form on our website. We encourage parents to visit our campus to experience our world-class facilities and learning environment firsthand.'
  }
]

export default function SEOFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-xl text-gray-600 mb-12 text-center">
          Everything you need to know about the best school in Mysore
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-display text-lg font-semibold text-primary pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="font-body text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
