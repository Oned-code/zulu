import { SectionHeader } from '@/components/shared/section-header';
import { Target, Zap, Shield, Cpu } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us | ZuluFun.io',
  description: 'Building autonomous platforms that generate revenue with zero human operational overhead.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-zulu-indigo text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(244,183,64,0.15)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Engineering <span className="text-zulu-gold">Autonomy.</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              ZuluFun.io is a brand under MAKE IT FUN. Our mission is to build autonomous, AI-powered platforms that generate revenue with zero human operational overhead.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our DNA"
            title="Core Principles"
            description="The rules that govern our code and our culture."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-zulu-indigo/5 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-zulu-indigo" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Full Autonomy</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">Everything we build must run itself. If it requires a human to operate daily, we rewrite it.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-zulu-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-zulu-gold" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Africa First</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">We start in South Africa, but every system is architected for seamless pan-African expansion.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-zulu-red/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-zulu-red" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Pure Software</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">No physical products. No inventory. Only code, AI agents, and frictionless market connections.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-zinc-900/5 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Absolute Compliance</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">POPIA, CPA, and advertising regulations are baked into our agent behaviors at the protocol level.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The AI Team */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="The Workforce"
                title="Meet our autonomous team."
                description="Our company isn't run by humans. It's operated by specialized AI agents reporting directly to the CTO."
              />
              <ul className="space-y-4 mt-8">
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">ContentAI:</span>
                  <span className="text-zinc-600 flex-1">Writes and publishes SEO-optimized news 24/7.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">LeadAI:</span>
                  <span className="text-zinc-600 flex-1">Scrapes, scores, and routes consumer leads.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">AdAI:</span>
                  <span className="text-zinc-600 flex-1">Manages multi-platform advertising budgets.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">MatchAI:</span>
                  <span className="text-zinc-600 flex-1">Pairs consumers with optimal business providers.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">SupportAI:</span>
                  <span className="text-zinc-600 flex-1">Handles customer inquiries in real-time.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">AuditAI:</span>
                  <span className="text-zinc-600 flex-1">Generates gap analyses for B2B prospects.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-zulu-indigo w-32">ComplianceAI:</span>
                  <span className="text-zinc-600 flex-1">Monitors all activities for legal compliance.</span>
                </li>
              </ul>
            </div>
            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-zulu-indigo to-zinc-900 flex items-center justify-center p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="text-center z-10">
                  <div className="w-24 h-24 mx-auto border-4 border-zulu-gold rounded-full flex items-center justify-center mb-6 bg-zulu-indigo/50 backdrop-blur-sm">
                    <span className="text-4xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">The CEO</h3>
                  <p className="text-zulu-gold font-medium tracking-widest uppercase text-sm mb-6">MAKE IT FUN</p>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                    The visionary human architect who defined the mission and established the rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
