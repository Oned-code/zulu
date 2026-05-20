import Link from 'next/link';
import { SectionHeader } from '@/components/shared/section-header';
import { BatteryCharging, Car, GraduationCap, Home, ShieldCheck, TrendingUp, Users, Target, Zap, Bitcoin, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const B2B_NICHES = [
  { key: 'power', label: 'Solar & Energy', icon: BatteryCharging, leadsAvailable: '2,450+', avgROI: '310%' },
  { key: 'security', label: 'Security Systems', icon: ShieldCheck, leadsAvailable: '1,820+', avgROI: '285%' },
  { key: 'real_estate', label: 'Real Estate', icon: Home, leadsAvailable: '950+', avgROI: '420%' },
  { key: 'automotive', label: 'Automotive', icon: Car, leadsAvailable: '3,100+', avgROI: '190%' },
  { key: 'education', label: 'Education', icon: GraduationCap, leadsAvailable: '1,200+', avgROI: '215%' },
  { key: 'crypto', label: 'Crypto', icon: Bitcoin, leadsAvailable: '4,500+', avgROI: '450%' },
];

export const metadata = {
  title: 'B2B Lead Marketplace | ZuluFun.io',
  description: 'Buy highly qualified, verified leads for your South African business.',
};

export default function B2BMarketplacePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="bg-zulu-indigo text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold text-zulu-gold backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Live Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Stop chasing leads. <br />
                <span className="text-zulu-gold">Start closing them.</span>
              </h1>
              <p className="text-xl text-zinc-300 leading-relaxed max-w-lg">
                Access South Africa's most qualified, intent-driven consumer requests. Buy leads directly from our platform, control your budget, and grow your revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold text-lg h-14 px-8">
                  <Link href="/auth/register?type=business">Create a Business Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold text-lg h-14 px-8 bg-transparent">
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-zulu-gold/20 blur-3xl rounded-full" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative">
                <h3 className="text-zulu-gold font-bold text-lg mb-6 flex items-center"><Zap className="w-5 h-5 mr-2" /> Live Lead Feed</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-xl flex justify-between items-center animate-pulse">
                      <div>
                        <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                        <div className="h-3 w-24 bg-white/10 rounded" />
                      </div>
                      <div className="h-8 w-20 bg-zulu-gold/20 rounded-lg border border-zulu-gold/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-100">
            <div className="text-center px-4">
              <p className="text-4xl font-extrabold text-zulu-indigo mb-2">9.5k+</p>
              <p className="text-zinc-500 font-medium">Monthly Active Leads</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-extrabold text-zulu-indigo mb-2">100%</p>
              <p className="text-zinc-500 font-medium">Phone PIN Verified</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-extrabold text-zulu-indigo mb-2">Max 4</p>
              <p className="text-zinc-500 font-medium">Competitors per Lead</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-extrabold text-zulu-indigo mb-2">Zero</p>
              <p className="text-zinc-500 font-medium">Long-term Contracts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Niches */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Marketplaces"
            title="Choose Your Industry"
            description="Select your niche to view available leads, pricing, and volume in your area."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {B2B_NICHES.map((niche) => {
              const Icon = niche.icon;
              return (
                <Link href={`/b2b/${niche.key}`} key={niche.key} className="group">
                  <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-zinc-200/60 hover:border-zulu-gold/40 hover:bg-white hover:shadow-[0_20px_50px_rgba(27,27,58,0.06)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-zinc-100/50 rounded-xl flex items-center justify-center text-zulu-indigo group-hover:bg-zulu-indigo group-hover:text-zulu-gold group-hover:scale-110 transition-all duration-300 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-zulu-indigo">{niche.leadsAvailable}</span>
                        <span className="text-xs text-zinc-500 uppercase font-semibold">Leads/Mo</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-zulu-indigo mb-2">{niche.label}</h3>
                    <div className="flex items-center text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {niche.avgROI} Avg ROI
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works & Pricing */}
      <section id="pricing" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeader
                eyebrow="How It Works"
                title="Fair, transparent lead buying."
                description="We don't lock you into retainers. You only pay for the leads you want."
              />
              <div className="space-y-8 mt-10">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zulu-gold/20 flex items-center justify-center text-zulu-indigo font-bold text-xl">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-zulu-indigo mb-2">Top Up Credits</h4>
                    <p className="text-zinc-600 leading-relaxed">Add funds to your account via PayFast. 1 Credit = R1. Minimum top-up is R500.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zulu-gold/20 flex items-center justify-center text-zulu-indigo font-bold text-xl">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-zulu-indigo mb-2">Set Your Filters</h4>
                    <p className="text-zinc-600 leading-relaxed">Choose your service areas, specific sub-niches, and daily budget limits.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zulu-gold/20 flex items-center justify-center text-zulu-indigo font-bold text-xl">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-zulu-indigo mb-2">Receive Leads Instantly</h4>
                    <p className="text-zinc-600 leading-relaxed">When a consumer requests a quote matching your filters, it appears in your dashboard and your phone via SMS.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
              <h3 className="text-2xl font-bold text-zulu-indigo mb-6">Lead Tiers</h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-5 h-5 text-zulu-gold" />
                      <h4 className="font-bold text-lg text-zulu-indigo">Exclusive</h4>
                    </div>
                    <p className="text-sm text-zinc-500">Sold only to you. Highest conversion.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-zulu-indigo">R350<span className="text-sm text-zinc-400 font-normal">/lead</span></span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-5 h-5 text-zulu-indigo" />
                      <h4 className="font-bold text-lg text-zulu-indigo">Duo</h4>
                    </div>
                    <p className="text-sm text-zinc-500">Shared with max 1 competitor.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-zulu-indigo">R200<span className="text-sm text-zinc-400 font-normal">/lead</span></span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-5 h-5 text-zinc-400" />
                      <h4 className="font-bold text-lg text-zulu-indigo">Quad</h4>
                    </div>
                    <p className="text-sm text-zinc-500">Shared with max 3 competitors.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-zulu-indigo">R120<span className="text-sm text-zinc-400 font-normal">/lead</span></span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-6 text-center">Prices vary slightly by niche. Full pricing available upon registration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
