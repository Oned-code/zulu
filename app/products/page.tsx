import Link from 'next/link';
import { SectionHeader } from '@/components/shared/section-header';
import { Bot, Megaphone, FileSearch, Code2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PRODUCTS = [
  {
    id: 'leadai',
    name: 'LeadAI',
    description: 'Our core AI engine that scrapes, scores, and routes high-intent consumer leads directly to your business dashboard in real-time.',
    icon: Bot,
    color: 'bg-zulu-indigo',
    link: '/products/leadai',
    features: ['Real-time lead routing', 'Automated SMS/Email follow-ups', 'CRM Integration', 'Predictive lead scoring']
  },
  {
    id: 'adai',
    name: 'AdAI',
    description: 'Autonomous Google Ads campaign management. AdAI constantly optimizes bids, keywords, and copy to maximize your ROI.',
    icon: Megaphone,
    color: 'bg-zulu-red',
    link: '/products/adai',
    features: ['24/7 Bid Optimization', 'Dynamic Ad Copy generation', 'Competitor tracking', 'Automated budget pacing']
  },
  {
    id: 'audit',
    name: 'AuditAI',
    description: 'Get a free, comprehensive analysis of your current lead generation strategy and discover untapped revenue opportunities.',
    icon: FileSearch,
    color: 'bg-zulu-gold',
    link: '/products/audit',
    features: ['Website conversion analysis', 'Local SEO scoring', 'Competitor benchmarking', 'Actionable growth roadmap']
  },
  {
    id: 'api',
    name: 'Zulu API',
    description: 'Enterprise-grade API access to our complete African business dataset, real-time lead feeds, and market analytics.',
    icon: Code2,
    color: 'bg-zinc-800',
    link: '/products/api',
    features: ['RESTful architecture', 'Webhooks for real-time events', '99.9% uptime SLA', 'Comprehensive documentation']
  }
];

export const metadata = {
  title: 'Our Products | ZuluFun.io',
  description: 'AI-powered business tools to automate and scale your lead generation.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-zulu-indigo text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,183,64,0.15)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Autopilot for your <span className="text-zulu-gold">business growth.</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed mb-10">
              ZuluFun.io provides a suite of autonomous AI agents designed to handle your lead generation, advertising, and sales routing without human intervention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 w-full sm:w-auto font-bold text-lg h-14 px-8">
                <Link href="/b2b">Explore the Marketplace</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-bold text-lg h-14 px-8 bg-transparent">
                <Link href="/products/audit">Get a Free Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Suite"
            title="AI Agents Built for Revenue"
            description="Choose the right tools to accelerate your customer acquisition."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.id} className="bg-white rounded-3xl p-8 lg:p-12 border border-zinc-200 shadow-xl shadow-zinc-200/20 group hover:border-zulu-gold/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full ${product.color}`} />
                  
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${product.color} text-white shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-zulu-indigo mb-4">{product.name}</h3>
                  <p className="text-zinc-600 text-lg leading-relaxed mb-8 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zulu-gold" />
                        <span className="text-zinc-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={product.link} className="inline-flex items-center text-zulu-indigo font-bold text-lg hover:text-zulu-gold transition-colors mt-auto">
                    Learn more about {product.name} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
