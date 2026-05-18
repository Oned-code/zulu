'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumb() {
  const pathname = usePathname()
  
  // Define breadcrumb items based on pathname
  const items: BreadcrumbItem[] = []
  
  if (pathname === '/') {
    items.push({ label: 'Home', href: '/' })
  } else {
    // Always start with Home
    items.push({ label: 'Home', href: '/' })
    
    // Split pathname into segments
    const segments = pathname.split('/').filter(Boolean)
    
    // Build breadcrumb items for each segment
    let path = ''
    segments.forEach((segment, index) => {
      path += `/${segment}`
      // Map segment to label (this is simplified - in reality you'd have a mapping)
      let label = segment
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
      
      // Special cases for better labels
      if (segment === 'ai') label = 'AI'
      if (segment === 'quotes') label = 'Get Quotes'
      if (segment === 'dashboard') label = 'Dashboard'
      
      items.push({
        label,
        href: path
      })
    })
  }
  
  // Make last item not a link (current page)
  const lastItem = items[items.length - 1]
  const otherItems = items.slice(0, -1)
  
  return (
    <>
      <nav className="text-zulu-indigo/50 text-sm">
        <ol className="flex items-center flex-wrap gap-2 text-zulu-indigo/50" aria-label="Breadcrumb">
          {otherItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <Link href={item.href} className="hover:text-zulu-gold transition-colors">
                {item.label}
              </Link>
              <ChevronRight className="h-4 w-4 text-zulu-indigo/30" />
            </span>
          ))}
          <li className="text-zulu-indigo/70">{lastItem.label}</li>
        </ol>
      </nav>
      
      {/* Schema.org BreadcrumbList structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href
          }))
        }, null, 2)}
      </script>
    </>
  )
}
