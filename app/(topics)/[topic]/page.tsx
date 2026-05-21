import { SectionHeader } from '@/components/shared/section-header';
import { getPublishedArticles } from '@/lib/data';
import { ArticleGrid } from '@/components/news/article-grid';
import { Bot, Sparkles, BrainCircuit, BatteryCharging, ShieldCheck, Home, Car, GraduationCap, Briefcase, Bitcoin, Cpu, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Configuration for each dynamic topic
const TOPIC_CONFIG = {
  ai: {
    title: 'The Intelligence Hub',
    nicheName: 'Artificial Intelligence',
    description: 'Explore how Artificial Intelligence is reshaping industries, driving innovation, and accelerating economic growth across the African continent.',
    icon: Bot,
    color: 'text-zulu-gold',
    bg: 'bg-zulu-gold/10',
    borderColor: 'border-zulu-gold/20',
    shadow: 'shadow-[0_0_50px_rgba(244,183,64,0.3)]'
  },
  energy: {
    title: 'Power & Energy Hub',
    nicheName: 'Solar & Energy',
    description: 'Latest insights on solar energy, off-grid solutions, and the future of power infrastructure in South Africa.',
    icon: BatteryCharging,
    color: 'text-zulu-indigo',
    bg: 'bg-zulu-indigo/10',
    borderColor: 'border-zulu-indigo/20',
    shadow: 'shadow-[0_0_50px_rgba(30,27,75,0.3)]'
  },
  security: {
    title: 'Security Hub',
    nicheName: 'Security Systems',
    description: 'Innovations in residential and commercial security, smart surveillance, and access control.',
    icon: ShieldCheck,
    color: 'text-zulu-red',
    bg: 'bg-zulu-red/10',
    borderColor: 'border-zulu-red/20',
    shadow: 'shadow-[0_0_50px_rgba(220,38,38,0.3)]'
  },
  property: {
    title: 'Real Estate Hub',
    nicheName: 'Real Estate',
    description: 'Trends in property management, proptech, and the evolving South African housing market.',
    icon: Home,
    color: 'text-zulu-gold',
    bg: 'bg-zulu-gold/10',
    borderColor: 'border-zulu-gold/20',
    shadow: 'shadow-[0_0_50px_rgba(244,183,64,0.3)]'
  },
  automotive: {
    title: 'Automotive Hub',
    nicheName: 'Automotive',
    description: 'The future of mobility, EV adoption, and automotive services across the continent.',
    icon: Car,
    color: 'text-zulu-indigo',
    bg: 'bg-zulu-indigo/10',
    borderColor: 'border-zulu-indigo/20',
    shadow: 'shadow-[0_0_50px_rgba(30,27,75,0.3)]'
  },
  education: {
    title: 'Education Hub',
    nicheName: 'Education',
    description: 'EdTech advancements, upskilling initiatives, and modern learning solutions.',
    icon: GraduationCap,
    color: 'text-zulu-red',
    bg: 'bg-zulu-red/10',
    borderColor: 'border-zulu-red/20',
    shadow: 'shadow-[0_0_50px_rgba(220,38,38,0.3)]'
  },
  business: {
    title: 'Business & Economy',
    nicheName: 'Business Development',
    description: 'Macro-economic trends, startup ecosystems, and enterprise scaling strategies.',
    icon: Briefcase,
    color: 'text-zulu-gold',
    bg: 'bg-zulu-gold/10',
    borderColor: 'border-zulu-gold/20',
    shadow: 'shadow-[0_0_50px_rgba(244,183,64,0.3)]'
  },
  crypto: {
    title: 'Crypto Hub',
    nicheName: 'Crypto & Blockchain',
    description: 'Blockchain adoption, decentralized finance, and cryptocurrency regulations in Africa.',
    icon: Bitcoin,
    color: 'text-zulu-gold',
    bg: 'bg-zulu-gold/10',
    borderColor: 'border-zulu-gold/20',
    shadow: 'shadow-[0_0_50px_rgba(244,183,64,0.3)]'
  }
};

export function generateStaticParams() {
  return Object.keys(TOPIC_CONFIG).map((topic) => ({
    topic,
  }));
}

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const config = TOPIC_CONFIG[params.topic as keyof typeof TOPIC_CONFIG];
  if (!config) return { title: 'Not Found' };
  
  return {
    title: `${config.title} | ZuluFun.io`,
    description: config.description,
  };
}

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const topicKey = params.topic as keyof typeof TOPIC_CONFIG;
  const config = TOPIC_CONFIG[topicKey];

  if (!config) {
    notFound();
  }

  const allArticles = await getPublishedArticles();
  const topicArticles = allArticles.filter((a) => a.category === topicKey || a.tags.includes(topicKey));
  const Icon = config.icon;

  // Map the topic key to the quote niche key (fallback to 'general' if not a direct match)
  const quoteNicheMap: Record<string, string> = {
    energy: 'power',
    security: 'security',
    property: 'real_estate',
    automotive: 'automotive',
    education: 'education',
    crypto: 'crypto',
  };
  const targetQuoteRoute = quoteNicheMap[topicKey] || '';

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-transparent text-zulu-indigo py-16 relative overflow-hidden mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-zinc-200`}>
            <Icon className={`w-10 h-10 text-black`} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            {config.title}
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic CTA Banner */}
        <div className="bg-gradient-to-r from-zulu-indigo to-[#2a2466] rounded-3xl p-8 md:p-12 mb-16 text-white shadow-xl flex flex-col md:flex-row items-center justify-between border border-zulu-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-zulu-gold opacity-10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="md:w-2/3 mb-8 md:mb-0 relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need an expert in {config.nicheName}?</h2>
            <p className="text-zinc-300 text-lg max-w-xl">
              Don't just read about it. Get matched with up to 4 verified, top-tier professionals in your area who specialize in this exact industry.
            </p>
          </div>
          
          <div className="md:w-1/3 flex justify-md-end relative z-10 w-full md:w-auto">
            <Link 
              href={`/quotes${targetQuoteRoute ? `/${targetQuoteRoute}` : ''}`}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(244,183,64,0.4)]"
            >
              Get a Quote Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Feature Cards for AI (legacy support to keep design nice) */}
        {topicKey === 'ai' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-zinc-200/60 shadow-sm hover:shadow-[0_20px_50px_rgba(27,27,58,0.04)] hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4">
              <div className="bg-zulu-indigo/10 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-zulu-indigo" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zulu-indigo mb-2">Automated Operations</h3>
                <p className="text-zinc-600 leading-relaxed">Discover how local businesses are leveraging AI to reduce operational costs and scale faster than ever before.</p>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-zinc-200/60 shadow-sm hover:shadow-[0_20px_50px_rgba(27,27,58,0.04)] hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4">
              <div className="bg-zulu-gold/20 p-3 rounded-xl">
                <BrainCircuit className="w-6 h-6 text-zulu-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zulu-indigo mb-2">Predictive Analytics</h3>
                <p className="text-zinc-600 leading-relaxed">Learn how data-driven models are forecasting market trends and consumer behavior in emerging markets.</p>
              </div>
            </div>
          </div>
        )}

        <SectionHeader
          eyebrow="Latest Articles"
          title={`${config.title.replace(' Hub', '')} News & Perspectives`}
          description="Insights curated by our autonomous ContentAI agent."
        />
        
        {topicArticles.length > 0 ? (
          <ArticleGrid articles={topicArticles} columns={4} showExcerpt showImage />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200">
            <p className="text-zinc-500">Our ContentAI agent is currently gathering the latest insights for this topic. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
