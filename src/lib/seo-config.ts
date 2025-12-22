import { Metadata } from 'next'

export const siteConfig = {
  name: 'Mysore International School',
  description: 'Best International School in Mysore - Excellence in CBSE Education, World-Class Facilities, Holistic Development',
  url: 'https://mysoreinternationalschool.com',
  ogImage: 'https://mysoreinternationalschool.com/og-image.jpg',
  keywords: [
    'best school in Mysore',
    'best international school in Mysore',
    'top CBSE school Mysore',
    'international school Mysore',
    'best CBSE school in Mysore',
    'top school in Mysore',
    'Mysore International School',
    'quality education Mysore',
    'world-class school Mysore',
    'best school near me Mysore',
    'international curriculum Mysore',
    'CBSE board school Mysore',
    'holistic education Mysore',
    'best primary school Mysore',
    'best high school Mysore',
  ],
  authors: [{ name: 'Mysore International School' }],
  creator: 'Mysore International School',
  publisher: 'Mysore International School',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mysoreinternationalschool.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mysoreinternationalschool.com',
    siteName: 'Mysore International School',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mysore International School - Best School in Mysore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MysoreIntSchool',
    creator: '@MysoreIntSchool',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': 'https://mysoreinternationalschool.com/#organization',
  name: 'Mysore International School',
  alternateName: 'MIS Mysore',
  url: 'https://mysoreinternationalschool.com',
  logo: 'https://mysoreinternationalschool.com/fulllogo.svg',
  description: 'Best International School in Mysore offering world-class CBSE education with state-of-the-art facilities and holistic development programs.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '92/1-3, HD Kote Road, Rayanakere Post',
    addressLocality: 'Mysore',
    addressRegion: 'Karnataka',
    postalCode: '570008',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.2987654',
    longitude: '76.6234567',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-8884-300-400',
      contactType: 'Admissions',
      email: 'admissions@mysoreinternationalschool.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-8277-237-785',
      contactType: 'General Inquiries',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  ],
  sameAs: [
    'https://www.facebook.com/mysoreinternationalschool',
    'https://www.instagram.com/mysoreinternationalschool',
    'https://www.linkedin.com/company/mysore-international-school',
    'https://twitter.com/MysoreIntSchool',
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://mysoreinternationalschool.com/#website',
  url: 'https://mysoreinternationalschool.com',
  name: 'Mysore International School',
  description: 'Best International School in Mysore - Excellence in CBSE Education',
  publisher: {
    '@id': 'https://mysoreinternationalschool.com/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://mysoreinternationalschool.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const courseSchema = (courseName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: courseName,
  description: description,
  provider: {
    '@id': 'https://mysoreinternationalschool.com/#organization',
  },
})
