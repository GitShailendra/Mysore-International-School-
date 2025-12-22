import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysoreinternationalschool.com'
  
  const routes = [
    '',
    '/about-us/overview',
    '/about-us/history',
    '/about-us/founder-chairman',
    '/academics/curriculum',
    '/academics/faculty-team',
    '/admissions/how-to-apply',
    '/admissions/careers',
    '/student-life/athletics',
    '/student-life/arts-activities',
    '/student-life/events-community-service',
    '/our-campus',
    '/gallery',
    '/contact-us',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('admissions') ? 0.9 : 0.8,
  }))
}
