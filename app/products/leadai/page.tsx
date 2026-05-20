import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Bot, Zap, Filter, PhoneCall, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'LeadAI | ZuluFun.io',
  description: 'Our core AI engine that scrapes, scores, and routes high-intent consumer leads.',
};

export default function LeadAIPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-zulu-indigo text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold text-zulu-gold backdrop-blur-md border border-white/10 mb-6">
                <Bot className="w-4 h-4" />
                <span>Flagship Product</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Meet <span className="text-zulu-gold">LeadAI.</span>
              </h1>
              <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                The autonomous engine that powers ZuluFun's marketplace. LeadAI handles the entire acquisition funnel—from capturing intent to routing verified leads directly to your CRM.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold h-14 px-8">
                  <Link href="/b2b">Buy Leads Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-zulu-gold/20 blur-3xl rounded-full" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Live Routing</h3>
                    <p className="text-sm text-zinc-400">Processing incoming requests...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { niche: 'Solar', area: 'Sandton', time: 'Just now' },
                    { niche: 'Security', area: 'Cape Town', time: '2m ago' },
                    { niche: 'Real Estate', area: 'Durban', time: '5m ago' },
                  ].map((lead, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-xl flex justify-between items-center animate-pulse">
                      <div>
                        <p className="font-bold text-white">{lead.niche} Lead</p>
                        <p className="text-xs text-zinc-400">{lead.area}</p>
                      </div>
                      <span className="text-xs text-zulu-gold font-medium">{lead.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capabilities"
            title="How LeadAI Works"
            description="A seamless, fully automated pipeline from consumer intent to business revenue."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-zulu-indigo/5 text-zulu-indigo rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">1. Capture & Score</h3>
              <p className="text-zinc-600 leading-relaxed">
                LeadAI captures intent from our news platform and external ads, scoring the lead based on urgency and budget.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-zulu-gold/10 text-zulu-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">2. PIN Verification</h3>
              <p className="text-zinc-600 leading-relaxed">
                Every phone number is verified via SMS PIN to ensure zero spam and high contact rates for our B2B buyers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">3. Instant Routing</h3>
              <p className="text-zinc-600 leading-relaxed">
                The verified lead is instantly routed to matching businesses based on their active filters and available credits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-zulu-indigo mb-6">Ready to tap into the stream?</h2>
          <p className="text-xl text-zinc-600 mb-10">Stop relying on manual prospecting. Let LeadAI feed your sales team.</p>
          <Button asChild size="lg" className="bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90 font-bold h-14 px-10 text-lg">
            <Link href="/b2b">View Available Leads <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
