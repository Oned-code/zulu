import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Megaphone, Activity, MousePointerClick, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'AdAI | ZuluFun.io',
  description: 'Autonomous Google Ads campaign management powered by AI.',
};

export default function AdAIPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <section className="bg-zulu-red text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-md mb-6">
            <Megaphone className="w-4 h-4" />
            <span>Autonomous Advertising</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Fire your media buyer. <br />
            Hire <span className="text-zinc-900">AdAI.</span>
          </h1>
          <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            AdAI connects directly to your Google Ads account, constantly optimizing bids, testing new copy, and aggressively hunting for the lowest Cost Per Acquisition.
          </p>
          <Button asChild size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 font-bold h-14 px-10 text-lg">
            <Link href="/bespoke">Request Early Access</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="AdAI Capabilities"
            title="Relentless Optimization"
            description="Unlike human managers, AdAI makes thousands of micro-adjustments every single day."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200">
              <Activity className="w-10 h-10 text-zulu-red mb-6" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">24/7 Bid Management</h3>
              <p className="text-zinc-600 leading-relaxed">AdAI monitors auction prices in real-time, adjusting bids up or down based on conversion probability.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200">
              <MousePointerClick className="w-10 h-10 text-zulu-red mb-6" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Dynamic Ad Copy</h3>
              <p className="text-zinc-600 leading-relaxed">It generates and A/B tests thousands of headline and description variations to find the highest CTR.</p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200">
              <TrendingUp className="w-10 h-10 text-zulu-red mb-6" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Budget Pacing</h3>
              <p className="text-zinc-600 leading-relaxed">Ensures your daily budget is spent efficiently, slowing down during expensive hours and accelerating during cheap ones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stop wasting ad spend.</h2>
          <p className="text-xl text-zinc-400 mb-10">AdAI is currently in closed beta. Contact us to see if your account qualifies.</p>
          <Button asChild size="lg" className="bg-zulu-red text-white hover:bg-red-600 font-bold h-14 px-10 text-lg">
            <Link href="/bespoke">Contact Sales <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
