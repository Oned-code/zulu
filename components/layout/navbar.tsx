'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Sun, Moon, Search, X, ShoppingCart, UserPlus, Bell } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'AI', href: '/ai' },
    { label: 'Energy', href: '/energy' },
    { label: 'Security', href: '/security' },
    { label: 'Property', href: '/property' },
    { label: 'Auto', href: '/automotive' },
    { label: 'Education', href: '/education' },
    { label: 'Business', href: '/business' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Search submitted')
  }

  return (
    <nav className="bg-zulu-indigo/90 backdrop-blur-sm border-b border-zulu-indigo/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-zulu-gold font-bold text-xl">ZuluFun.io</span>
              <span className="text-xs text-zulu-gold/70">Africa's Autonomous Business Engine</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Desktop Navigation */}
            <div className="flex-1 flex justify-center">
              <div className="hidden md:block">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${pathname === item.href ? 'text-zulu-gold border-b-2 border-zulu-gold' : 'text-zulu-indigo/70 hover:text-zulu-indigo' } px-2 py-2 rounded-md transition-all`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Desktop CTA and Auth */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors"
              >
                <Search className="h-5 w-5 text-zulu-gold" />
              </button>
              <Link href="/quotes" className="bg-zulu-gold text-zulu-indigo px-4 py-2 rounded-md font-medium hover:bg-zulu-gold/90 transition-colors">
                Get Quotes
              </Link>
              <div className="relative">
                <button className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors">
                  <Bell className="h-5 w-5 text-zulu-gold" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center bg-zulu-red text-xs rounded-full">
                    3
                  </span>
                </button>
              </div>
              <Link href="/dashboard" className="flex items-center space-x-2 text-zulu-indigo/70 hover:text-zulu-indigo">
                <UserPlus className="h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors"
            >
              {menuOpen ? <X className="h-5 w-5 text-zulu-gold" /> : <Menu className="h-5 w-5 text-zulu-gold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Desktop (always visible on md+) */}
      {searchOpen && !menuOpen && (
        <div className="md:block md:hidden">
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-2 py-4">
              <input
                type="text"
                placeholder="Search ZuluFun.io..."
                className="flex-1 bg-zulu-indigo/80 border border-zulu-indigo/60 rounded-md px-3 py-2 text-zulu-gold placeholder-zulu-indigo/40 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
              />
              <button type="submit" className="bg-zulu-gold text-zulu-indigo px-4 py-2 rounded-md font-medium hover:bg-zulu-gold/90 transition-colors">
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors"
              >
                <X className="h-4 w-4 text-zulu-gold" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-zulu-indigo/95 backdrop-blur-sm z-40">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-zulu-gold font-bold text-xl">ZuluFun.io</span>
              </Link>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors"
            >
              <X className="h-5 w-5 text-zulu-gold" />
            </button>
          </div>
          <div className="space-y-6 py-6">
            {/* Mobile Nav Items */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md ${pathname === item.href ? 'bg-zulu-gold/20 text-zulu-gold' : 'text-zulu-indigo/70 hover:bg-zulu-indigo/80 hover:text-zulu-gold' }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Mobile CTA and Auth */}
            <div className="space-y-4">
              <Link href="/quotes" className="w-full bg-zulu-gold text-zulu-indigo px-4 py-2 rounded-md font-medium hover:bg-zulu-gold/90 transition-colors">
                Get Quotes
              </Link>
              <div className="flex items-center space-x-2">
                <Link href="/dashboard" className="flex-1 text-center py-2 rounded-md border border-zulu-indigo/60 text-zulu-indigo/70 hover:bg-zulu-indigo/80">
                  Dashboard
                </Link>
                <Link href="/auth/signup" className="flex-1 ml-2 text-center py-2 rounded-md bg-zulu-gold text-zulu-indigo font-medium hover:bg-zulu-gold/90">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}