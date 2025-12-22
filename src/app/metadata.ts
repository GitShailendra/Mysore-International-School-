import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'Best School in Mysore | Top International & CBSE School',
  description: 'Mysore International School - Ranked as the best school in Mysore offering world-class CBSE education, international curriculum, state-of-the-art facilities, and holistic development programs. Enroll now!',
  keywords: 'best school in Mysore, best international school in Mysore, top CBSE school Mysore, Mysore International School, quality education Mysore, best school near me',
  openGraph: {
    title: 'Best School in Mysore | Mysore International School',
    description: 'Top-ranked international school in Mysore offering excellence in CBSE education with world-class facilities.',
    url: 'https://mysoreinternationalschool.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mysore International School Campus',
      },
    ],
  },
  alternates: {
    canonical: 'https://mysoreinternationalschool.com',
  },
}
