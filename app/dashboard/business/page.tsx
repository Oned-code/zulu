'use client';

import { useEffect, useState } from 'react';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Target, Users, Wallet, TrendingUp, Settings, Filter } from 'lucide-react';
import Link from 'next/link';

interface Quote {
  id: string;
  niche: string;
  title: string;
  description: string;
  location: string;
  city: string;
  budget_min: number | null;
  budget_max: number | null;
  timeline: string;
  status: string;
  created_at: string;
  expires_at: string;
}

interface Business {
  id: string;
  company_name: string;
  lead_balance: number;
  subscription_tier: string;
}

const NICHE_LABELS: Record<string, string> = {
  power: 'Solar & Energy',
  security: 'Security',
  real_estate: 'Real Estate',
  automotive: 'Automotive',
  education: 'Education',
  crypto: 'Crypto',
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: '⚡ ASAP',
  '1_month': '📅 Within 1 month',
  '3_months': '📅 Within 3 months',
  planning: '🔍 Just planning',
};

export default function BusinessDashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch business profile
        const bizRes = await fetch('/api/v1/businesses/mine');
        const bizData = await bizRes.json();
        if (bizData.business) {
          setBusiness(bizData.business);
        }

        // Fetch available quotes
        const quotesRes = await fetch('/api/quotes?status=open&for=business&limit=20');
        const quotesData = await quotesRes.json();
        if (quotesData.quotes) {
          setQuotes(quotesData.quotes);
        }
      } catch (e) {
        console.error('Failed to fetch dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleBuyLead = async (quoteId: string, price: number) => {
    if (!business) return;
    setBuying(quoteId);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote_id: quoteId,
          business_id: business.id,
          price,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Lead purchased! ${data.message}`);
        // Remove from list
        setQuotes(prev => prev.filter(q => q.id !== quoteId));
        if (data.remainingBalance !== undefined) {
          setBusiness(prev => prev ? { ...prev, lead_balance: data.remainingBalance } : null);
        }
      } else {
        alert(data.error || 'Failed to buy lead');
      }
    } catch (e) {
      alert('Failed to buy lead. Please try again.');
    } finally {
      setBuying(null);
    }
  };

  const filteredQuotes = filter === 'all'
    ? quotes
    : quotes.filter(q => q.niche === filter);

  const getLeadPrice = (niche: string): number => {
    const prices: Record<string, number> = {
      power: 200,
      security: 180,
      real_estate: 300,
      automotive: 150,
      education: 120,
      crypto: 250,
    };
    return prices[niche] || 200;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12 flex items-center justify-center">
        <div className="text-zinc-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zulu-indigo">Dashboard</h1>
            <p className="text-zinc-500 mt-1">{business?.company_name || 'Business Account'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-zinc-200 flex items-center space-x-3 shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Credit Balance</p>
                <p className="text-sm font-bold text-zulu-indigo">R {business?.lead_balance?.toLocaleString() || 0}</p>
              </div>
            </div>
            <Button className="bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90">
              Top Up
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Available Leads</p>
              <h3 className="text-2xl font-bold text-zulu-indigo">{quotes.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Credits Spent</p>
              <h3 className="text-2xl font-bold text-zulu-indigo">R {((1000 - (business?.lead_balance || 0))).toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Subscription</p>
              <h3 className="text-2xl font-bold text-zulu-indigo capitalize">{business?.subscription_tier || 'Free'}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lead Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="font-bold text-zulu-indigo">Available Leads</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-xs h-8 rounded-md border border-zinc-200 bg-white px-2"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(NICHE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    <Filter className="w-3 h-3 mr-2" /> Filter
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-zinc-100">

                {filteredQuotes.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400">
                    <p className="text-lg font-medium mb-2">No leads available</p>
                    <p className="text-sm">Check back soon — new leads are added as consumers submit requests.</p>
                  </div>
                ) : (
                  filteredQuotes.map((quote) => {
                    const price = getLeadPrice(quote.niche);
                    const canAfford = (business?.lead_balance || 0) >= price;
                    return (
                      <div key={quote.id} className="p-6 hover:bg-zinc-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zulu-indigo/10 text-zulu-indigo mb-2">
                              {NICHE_LABELS[quote.niche] || quote.niche}
                            </span>
                            <h4 className="font-bold text-zinc-900">{quote.title}</h4>
                            <p className="text-xs text-zinc-500 mt-1">
                              {quote.location} • {new Date(quote.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="block text-xl font-bold text-zulu-indigo">R {price}</span>
                            <span className="text-xs text-zinc-400">per lead</span>
                          </div>
                        </div>

                        {quote.description && (
                          <p className="text-sm text-zinc-600 mb-4 bg-zinc-50 p-3 rounded-lg italic">
                            "{quote.description.length > 200 ? quote.description.slice(0, 200) + '...' : quote.description}"
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-zinc-500">
                            {quote.budget_max && (
                              <span>Budget: R {quote.budget_min?.toLocaleString()} – R {quote.budget_max.toLocaleString()}</span>
                            )}
                            <span>{TIMELINE_LABELS[quote.timeline] || quote.timeline}</span>
                          </div>
                          <Button
                            onClick={() => handleBuyLead(quote.id, price)}
                            disabled={!canAfford || buying === quote.id}
                            className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold"
                          >
                            {buying === quote.id ? 'Processing...' : canAfford ? `Buy Lead — R ${price}` : 'Insufficient Credits'}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}

              </div>
              <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 text-center">
                <Button variant="link" className="text-zulu-indigo">View All Leads</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Auto-buy settings */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-zulu-indigo">Auto-Buy Filters</h3>
                <Link href="/dashboard/business/settings" className="text-zinc-400 hover:text-zulu-indigo">
                  <Settings className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Status</p>
                    <p className="text-xs text-zinc-500">Currently Active</p>
                  </div>
                  <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600">Daily Cap</span>
                    <span className="font-medium text-zulu-indigo">R 500 / day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Tier</span>
                    <span className="font-medium text-zulu-indigo capitalize">{business?.subscription_tier || 'Free'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-zinc-900 p-6 rounded-2xl text-white">
              <h3 className="font-bold mb-2">Need assistance?</h3>
              <p className="text-sm text-zinc-400 mb-4">Our SupportAI agent is available 24/7 to help with refunds, account issues, or technical support.</p>
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Contact Support
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
