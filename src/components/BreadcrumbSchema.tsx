'use client'

import { breadcrumbSchema } from '@/lib/seo-config'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const fullItems = [
    { name: 'Home', url: 'https://mysoreinternationalschool.com' },
    ...items
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(fullItems)) }}
      />
      
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {fullItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {index === fullItems.length - 1 ? (
                <span className="font-medium text-primary">{item.name}</span>
              ) : (
                <Link
                  href={item.url.replace('https://mysoreinternationalschool.com', '')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
