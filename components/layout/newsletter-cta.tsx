'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setEmail('');
    setSubmitting(false);
  };

  return (
    <section className="bg-zulu-indigo text-zulu-gold py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Get Africa&apos;s Smartest Business Newsletter
        </h2>
        <p className="mb-6 text-zulu-gold/70">
          Join 25,000+ African business leaders who get exclusive insights,
          market trends, and AI-powered business strategies every week.
        </p>
        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="relative flex-1 md:w-96">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-zulu-gold/30 text-white placeholder:text-zulu-gold/50 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !email}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${!email || submitting ? 'bg-white/10 text-zulu-gold/50 cursor-not-allowed' : 'bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90'}`}
            >
              {submitting ? 'Submitting...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <span className="h-8 w-8 flex items-center justify-center bg-zulu-gold text-zulu-indigo rounded-full text-xs font-bold">
                OK
              </span>
            </div>
            <p className="font-medium">
              Thanks for subscribing! You&apos;re now part of the ZuluFun community.
            </p>
            <p className="text-zulu-gold/60 text-sm">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
