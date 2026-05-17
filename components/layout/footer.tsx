'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // In a real app, you would send this to your backend
    // For now, we'll just simulate
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSuccess(true)
    setEmail('')
    setSubmitting(false)
  }

  return (
    <footer className="bg-zulu-indigo text-zulu-indigo/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Platform */}
          <div>
            <h3 className="text-zulu-gold font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-zulu-gold transition-colors">LeadAI Platform</Link></li>
              <li><Link href="/products" className="hover:text-zulu-gold transition-colors">AdAI</Link></li>
              <li><Link href="/b2b" className="hover:text-zulu-gold transition-colors">B2B Marketplace</Link></li>
              <li><Link href="/api" className="hover:text-zulu-gold transition-colors">API Access</Link></li>
              <li><Link href="/audit" className="hover:text-zulu-gold transition-colors">Audit Tool</Link></li>
            </ul>
          </div>
          {/* Verticals */}
          <div>
            <h3 className="text-zulu-gold font-semibold mb-4">Verticals</h3>
            <ul className="space-y-2">
              <li><Link href="/quotes/solar" className="hover:text-zulu-gold transition-colors">Solar Quotes</Link></li>
              <li><Link href="/quotes/security" className="hover:text-zulu-gold transition-colors">Security Quotes</Link></li>
              <li><Link href="/quotes/property" className="hover:text-zulu-gold transition-colors">Real Estate</Link></li>
              <li><Link href="/quotes/automotive" className="hover:text-zulu-gold transition-colors">Auto Repair</Link></li>
              <li><Link href="/quotes/education" className="hover:text-zulu-gold transition-colors">Schools</Link></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-zulu-gold font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-zulu-gold transition-colors">About</Link></li>
              <li><Link href="/investors" className="hover:text-zulu-gold transition-colors">Investors</Link></li>
              <li><Link href="/careers" className="hover:text-zulu-gold transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-zulu-gold transition-colors">Contact</Link></li>
              <li><Link href="/press" className="hover:text-zulu-gold transition-colors">Press</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-zulu-gold font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-zulu-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-zulu-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="/popia" className="hover:text-zulu-gold transition-colors">POPIA Compliance</Link></li>
              <li><Link href="/cookies" className="hover:text-zulu-gold transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zulu-indigo/80">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="text-zulu-indigo/70 hover:text-zulu-gold transition-colors text-lg">
                in
              </a>
              <a href="#" className="text-zulu-indigo/70 hover:text-zulu-gold transition-colors text-lg">
                X
              </a>
              <a href="#" className="text-zulu-indigo/70 hover:text-zulu-gold transition-colors text-lg">
                ig
              </a>
            </div>
            <p className="text-center text-zulu-indigo/60 text-sm">
              Proudly African — Powering Business Across the Continent
            </p>
            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="px-3 py-2 rounded-md bg-zulu-indigo/80 border border-zulu-indigo/60 text-zulu-gold placeholder-zulu-indigo/40 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
                />
                <button
                  type="submit"
                  disabled={submitting || !email}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${!email || submitting ? 'bg-zulu-indigo/80 cursor-not-allowed' : 'bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90'}`}
                >
                  {submitting ? 'Submitting...' : 'Subscribe'}
                </button>
              </form>
              {success && (
                <p className="text-zulu-gold font-medium">
                  Thanks for subscribing!
                </p>
              )}
            </div>
            <p className="text-center text-zulu-indigo/40 text-xs">
              &copy; {new Date().getFullYear()} ZuluFun.io. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}