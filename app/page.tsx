import Link from 'next/link';
import { BatteryCharging, Car, GraduationCap, Home, ShieldCheck } from 'lucide-react';
import NewsletterCTA from '@/components/layout/newsletter-cta';
import { TrendingBar } from '@/components/news/trending-bar';
import { ArticleGrid } from '@/components/news/article-grid';
import { SectionHeader } from '@/components/shared/section-header';
import { getPublishedArticles } from '@/lib/data';

const trendingTopics = [
  { label: 'Load Shedding Solutions', count: 12 },
  { label: 'AI Business Tools', count: 8 },
  { label: 'Solar Financing', count: 15 },
  { label: 'Security Integration', count: 9 },
  { label: 'PropTech Trends', count: 7 },
  { label: 'EV Charging Infrastructure', count: 6 },
  { label: 'Online Learning Platforms', count: 11 },
];

const NICHES = [
  { key: 'power', label: 'Power & Energy', color: 'bg-zulu-indigo text-zulu-gold', description: 'Solar power, inverters, and battery solutions' },
  { key: 'security', label: 'Security', color: 'bg-zulu-red text-white', description: 'Alarm systems, CCTV, and access control' },
  { key: 'real_estate', label: 'Real Estate', color: 'bg-zulu-gold text-zulu-indigo', description: 'Property buying, selling, and rentals' },
  { key: 'automotive', label: 'Automotive', color: 'bg-zulu-indigo/90 text-zulu-gold', description: 'Vehicle repairs and maintenance' },
  { key: 'education', label: 'Education', color: 'bg-zulu-red/90 text-white', description: 'Schools, tutoring, and online courses' },
];

const nicheIcons = {
  power: BatteryCharging,
  security: ShieldCheck,
  real_estate: Home,
  automotive: Car,
  education: GraduationCap,
};

export default async function HomePage() {
  const allArticles = await getPublishedArticles();
  const featuredArticle = allArticles[0];
  const sidebarArticles = allArticles.slice(1, 3);
  const gridArticles = allArticles.slice(3, 7);
  const energyArticles = allArticles.filter((a) => a.category === 'energy');
  const securityArticles = allArticles.filter((a) => a.category === 'security');
  const propertyArticles = allArticles.filter((a) => a.category === 'property');
  const aiArticles = allArticles.filter((a) => a.category === 'ai' || a.category === 'technology');
  const businessArticles = allArticles.filter((a) => a.category === 'business');

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-transparent text-zulu-indigo py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0.02)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div className="space-y-6">
              {featuredArticle ? (
                <>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-black/5 text-zinc-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span className="text-zinc-400 text-xs font-medium">{featuredArticle.readTime} min read</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zulu-indigo leading-tight">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-zulu-indigo/60 text-lg max-w-2xl leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-6 flex items-center space-x-4">
                    <Link href={`/news/${featuredArticle.category}/${featuredArticle.slug}`} className="inline-flex items-center px-5 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition-all shadow-md shadow-black/10">
                      Read Full Story
                    </Link>
                    <Link href="/quotes" className="inline-flex items-center px-5 py-2.5 border border-black/20 text-black font-semibold rounded-lg hover:bg-black/5 transition-all">
                      Get Quotes
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zulu-indigo leading-tight">
                    Africa's Autonomous Business Engine
                  </h1>
                  <p className="text-zulu-indigo/60 text-lg">
                    Connecting consumers with trusted service providers across the continent.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Latest Stories</h3>
              {sidebarArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.category}/${article.slug}`}
                  className="group flex items-center space-x-4 p-3 bg-white rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h4 className="text-zulu-indigo text-sm font-semibold group-hover:text-zinc-600 transition-colors line-clamp-2 mt-0.5">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW BAR */}
      <section className="bg-zulu-indigo/95 border-y border-zulu-gold/5">
        <TrendingBar topics={trendingTopics} />
      </section>

      {/* LATEST NEWS GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Latest News"
            title="Stay Informed with Africa's Business Pulse"
            description="Breaking news, insights, and trends shaping the continent's business landscape"
            ctaText="View All News"
            ctaHref="/news"
          />
          {gridArticles.length > 0 ? (
            <ArticleGrid articles={gridArticles} columns={4} showExcerpt showImage />
          ) : (
            <div className="text-center py-12 text-zinc-400">No articles yet. Check back soon!</div>
          )}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {energyArticles.length > 0 && (
            <div className="mb-16">
              <SectionHeader eyebrow="Energy" title="Powering Africa's Future" description="Latest developments in renewable energy, power solutions, and electricity innovation" ctaText="Get Solar Quotes" ctaHref="/quotes/solar" />
              <ArticleGrid articles={energyArticles.slice(0, 4)} columns={4} showExcerpt showImage />
            </div>
          )}

          {securityArticles.length > 0 && (
            <div className="mb-16">
              <SectionHeader eyebrow="Security" title="Keeping Africa Safe" description="Innovations in security technology, crime prevention, and safety solutions" ctaText="Get Security Quotes" ctaHref="/quotes/security" />
              <ArticleGrid articles={securityArticles.slice(0, 4)} columns={4} showExcerpt showImage />
            </div>
          )}

          {aiArticles.length > 0 && (
            <div className="mb-16">
              <SectionHeader eyebrow="AI & Technology" title="The Intelligence Revolution" description="Artificial intelligence, machine learning, and tech innovations transforming African business" />
              <ArticleGrid articles={aiArticles.slice(0, 4)} columns={4} showExcerpt showImage />
            </div>
          )}

          {propertyArticles.length > 0 && (
            <div className="mb-16">
              <SectionHeader eyebrow="Property" title="African Real Estate Insights" description="Property market trends, investment opportunities, and PropTech innovations" ctaText="Find an Agent" ctaHref="/quotes/property" />
              <ArticleGrid articles={propertyArticles.slice(0, 4)} columns={4} showExcerpt showImage />
            </div>
          )}
        </div>
      </section>

      {/* MARKETPLACE PROMO SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Marketplace"
            title="Find Trusted African Service Providers"
            description="Connect with verified businesses across all sectors for reliable quotes and services"
            alignment="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {NICHES.map((niche) => {
              const Icon = nicheIcons[niche.key as keyof typeof nicheIcons];

              return (
              <div key={niche.key} className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-zinc-200/60 hover:border-zulu-gold/40 hover:bg-white hover:shadow-[0_20px_50px_rgba(27,27,58,0.06)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
                <div className="flex h-14 w-14 items-center justify-center mb-6">
                  <div className={`h-14 w-14 flex items-center justify-center rounded-xl ${niche.color} shadow-lg shadow-zulu-indigo/10 transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-zulu-indigo font-bold text-xl mb-3">{niche.label}</h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{niche.description}</p>
                <Link href={`/quotes/${niche.key}`} className="inline-flex items-center text-sm font-bold text-zulu-indigo/80 hover:text-zulu-indigo transition-colors w-fit">
                  Get Quotes <span className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300">-&gt;</span>
                </Link>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-zulu-indigo relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(244,183,64,0.06)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zulu-gold mb-3">Trusted by Thousands</h2>
            <p className="text-zulu-gold/50 max-w-lg mx-auto">Powering business connections across Africa with AI-driven lead generation</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-3xl md:text-4xl font-bold text-zulu-gold mb-1">6,850+</p>
              <p className="text-zulu-gold/50 text-sm">Businesses Served</p>
            </div>
            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-3xl md:text-4xl font-bold text-zulu-gold mb-1">45,200+</p>
              <p className="text-zulu-gold/50 text-sm">Leads Generated</p>
            </div>
            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-3xl md:text-4xl font-bold text-zulu-gold mb-1">240%</p>
              <p className="text-zulu-gold/50 text-sm">Average ROI</p>
            </div>
            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-3xl md:text-4xl font-bold text-zulu-gold mb-1">R125M+</p>
              <p className="text-zulu-gold/50 text-sm">Revenue Facilitated</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA />
    </div>
  );
}
