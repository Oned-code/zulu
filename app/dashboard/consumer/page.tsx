'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Quote {
  id: string;
  niche: string;
  title: string;
  description: string;
  location: string;
  city: string;
  status: string;
  created_at: string;
  expires_at: string;
}

const NICHE_ICONS: Record<string, typeof Home> = {
  power: Home,
  security: ShieldCheck,
  real_estate: Home,
  automotive: Home,
  education: Home,
  crypto: Home,
};

const NICHE_LABELS: Record<string, string> = {
  power: 'Solar & Energy',
  security: 'Security',
  real_estate: 'Real Estate',
  automotive: 'Automotive',
  education: 'Education',
  crypto: 'Crypto',
};

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Active' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'In Progress' },
  closed: { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400', label: 'Closed' },
  expired: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400', label: 'Expired' },
};

export default function ConsumerDashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch('/api/quotes?limit=20');
        const data = await res.json();
        if (data.quotes) {
          setQuotes(data.quotes);
        }
      } catch (e) {
        console.error('Failed to fetch quotes:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchQuotes();
  }, []);

  const activeQuotes = quotes.filter(q => q.status === 'open' || q.status === 'in_progress');
  const pastQuotes = quotes.filter(q => q.status === 'closed' || q.status === 'expired');

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12 flex items-center justify-center">
        <div className="text-zinc-500">Loading your requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zulu-indigo">My Requests</h1>
            <p className="text-zinc-500 mt-1">Manage your quotes and connected professionals.</p>
          </div>
          <Button asChild className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">
            <Link href="/quotes">New Request</Link>
          </Button>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zulu-indigo mb-2">No requests yet</h3>
            <p className="text-zinc-500 mb-6">Submit your first quote request and get matched with verified professionals.</p>
            <Button asChild className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">
              <Link href="/quotes">Get Quotes</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Active Requests */}
              {activeQuotes.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-zulu-indigo mb-4">Active Requests ({activeQuotes.length})</h2>
                  <div className="space-y-4">
                    {activeQuotes.map((quote) => {
                      const Icon = NICHE_ICONS[quote.niche] || Home;
                      const statusStyle = STATUS_STYLES[quote.status] || STATUS_STYLES.open;
                      return (
                        <div key={quote.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                          <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-zulu-indigo/10 rounded-lg">
                                <Icon className="w-5 h-5 text-zulu-indigo" />
                              </div>
                              <div>
                                <h3 className="font-bold text-zulu-indigo">{quote.title}</h3>
                                <p className="text-xs text-zinc-500">
                                  {NICHE_LABELS[quote.niche] || quote.niche} • Requested {new Date(quote.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                                </p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 ${statusStyle.bg} ${statusStyle.text} text-xs font-semibold rounded-full`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${quote.status === 'open' ? 'animate-pulse' : ''}`} />
                              <span>{statusStyle.label}</span>
                            </span>
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-zinc-600 mb-4">{quote.description || 'No description provided.'}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Expires {new Date(quote.expires_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                              </span>
                              <Button variant="outline" size="sm" className="text-xs">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Past Requests */}
              {pastQuotes.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-zulu-indigo mb-4">Past Requests ({pastQuotes.length})</h2>
                  <div className="space-y-4">
                    {pastQuotes.map((quote) => {
                      const Icon = NICHE_ICONS[quote.niche] || Home;
                      const statusStyle = STATUS_STYLES[quote.status] || STATUS_STYLES.closed;
                      return (
                        <div key={quote.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden opacity-75">
                          <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-zinc-100 rounded-lg">
                                <Icon className="w-5 h-5 text-zinc-500" />
                              </div>
                              <div>
                                <h3 className="font-bold text-zinc-700">{quote.title}</h3>
                                <p className="text-xs text-zinc-400">
                                  {NICHE_LABELS[quote.niche] || quote.niche} • {new Date(quote.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                                </p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 ${statusStyle.bg} ${statusStyle.text} text-xs font-semibold rounded-full`}>
                              {statusStyle.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="font-bold text-zulu-indigo mb-4">Profile Completeness</h3>
                <div className="h-2 w-full bg-zinc-100 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%]" />
                </div>
                <p className="text-xs text-zinc-500 mb-4">85% Complete</p>
                <Button variant="outline" className="w-full text-sm">Complete Profile</Button>
              </div>

              <div className="bg-zulu-indigo p-6 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,183,64,0.2)_0%,_transparent_60%)]" />
                <h3 className="font-bold text-zulu-gold mb-2 relative z-10">Need a different service?</h3>
                <p className="text-sm text-zinc-300 mb-4 relative z-10">We have thousands of verified pros ready to help.</p>
                <Button className="w-full bg-white text-zulu-indigo hover:bg-zinc-100 font-bold relative z-10">
                  Browse Categories
                </Button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
