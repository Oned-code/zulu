'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Linkedin, Twitter, Instagram, ChevronDown, Search } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'AI', href: '/ai' },
    { label: 'Energy', href: '/energy' },
    { label: 'Security', href: '/security' },
    { label: 'Property', href: '/property' },
    { label: 'Auto', href: '/automotive' },
    { label: 'Education', href: '/education' },
    { label: 'Business', href: '/business' },
  ];

  const categories = [
    { label: 'AI', color: 'bg-zulu-indigo/20 text-zulu-gold' },
    { label: 'Energy', color: 'bg-zulu-gold/20 text-zulu-indigo' },
    { label: 'Security', color: 'bg-zulu-red/20 text-zulu-red' },
    { label: 'Property', color: 'bg-zulu-gold/20 text-zulu-gold' },
    { label: 'Auto', color: 'bg-zulu-indigo/20 text-zulu-gold' },
    { label: 'Education', color: 'bg-zulu-red/20 text-zulu-red' },
    { label: 'Business', color: 'bg-zulu-indigo/20 text-zulu-gold' },
  ];

  return (
    <div className="fixed inset-0 z-50 hidden md:hidden">
      <div className="flex h-16 items-center justify-between px-4 bg-zulu-indigo/95 backdrop-blur-sm">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-zulu-gold font-bold text-xl">ZuluFun.io</span>
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors"
        >
          <X className="h-5 w-5 text-zulu-gold" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ZuluFun.io..."
                className="w-full bg-zulu-indigo/80 border border-zulu-indigo/60 rounded-md px-4 py-2 text-zulu-gold placeholder-zulu-indigo/40 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-zulu-indigo/40" />
              </div>
            </div>
          </div>

          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-zulu-indigo/70 hover:bg-zulu-indigo/80 hover:text-zulu-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <h2 className="text-zulu-gold font-semibold mb-3">Categories</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.label} className="border border-zulu-indigo/60 rounded-md overflow-hidden">
                  <button className="w-full flex items-center justify-between px-4 py-3 text-left text-zulu-indigo/70 hover:bg-zulu-indigo/80 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 flex items-center justify-center rounded-md ${cat.color}`}>
                        {cat.label.charAt(0)}
                      </div>
                      <span>{cat.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-zulu-indigo/40" />
                  </button>
                  <div className="border-t border-zulu-indigo/60 bg-zulu-indigo/50">
                    <Link href={`/${cat.label.toLowerCase()}`} className="block px-4 py-2 text-zulu-indigo/60 hover:text-zulu-gold">
                      View all {cat.label} content
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-6">
          <Link href="/quotes" className="w-full bg-zulu-gold text-zulu-indigo py-3 rounded-md font-medium text-center hover:bg-zulu-gold/90 transition-colors mt-4 block">
            Get Quotes
          </Link>

          <div className="mt-4 space-y-3">
            <Link href="/dashboard" className="w-full text-center py-2 rounded-md border border-zulu-indigo/60 text-zulu-indigo/70 hover:bg-zulu-indigo/80 block">
              Dashboard
            </Link>
            <Link href="/auth/signup" className="w-full bg-zulu-gold text-zulu-indigo py-2 rounded-md font-medium text-center hover:bg-zulu-gold/90 block">
              Sign Up
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-zulu-indigo/70">Dark Mode</span>
            <button className="p-2 rounded-md hover:bg-zulu-indigo/80 transition-colors">
              <Sun className="h-5 w-5 text-zulu-gold" />
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-zulu-gold font-semibold mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-zulu-indigo/60 hover:text-zulu-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-zulu-indigo/60 hover:text-zulu-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zulu-indigo/60 hover:text-zulu-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
