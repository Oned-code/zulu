import Link from 'next/link';
import NewsletterCTA from '@/components/layout/newsletter-cta';
import { TrendingBar } from '@/components/news/trending-bar';
import { ArticleGrid } from '@/components/news/article-grid';
import { SectionHeader } from '@/components/shared/section-header';
import { NicheCard } from '@/components/shared/niche-card';
import { FeaturedArticle } from '@/components/news/featured-article';
import { SearchBar } from '@/components/news/search-bar';
import { AdBanner } from '@/components/shared/ad-banner';
import { StatsCard } from '@/components/shared/stats-card';
import { CTAButton } from '@/components/shared/cta-button';
import { getPublishedArticles } from '@/lib/data';
import { Zap, Shield, Home, Car, GraduationCap, Users, Building2, TrendingUp } from 'lucide-react';

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
  { key: 'power' as const, icon: Zap, label: 'Power & Energy', color: 'bg-zulu-indigo', description: 'Solar power, inverters, and battery solutions' },
  { key: 'security' as const, icon: Shield, label: 'Security', color: 'bg-zulu-red', description: 'Alarm systems, CCTV, and access control' },
  { key: 'real_estate' as const, icon: Home, label: 'Real Estate', color: 'bg-zulu-gold', description: 'Property buying, selling, and rentals' },
  { key: 'automotive' as const, icon: Car, label: 'Automotive', color: 'bg-zulu-indigo/90', description: 'Vehicle repairs and maintenance' },
  { key: 'education' as const, icon: GraduationCap, label: 'Education', color: 'bg-zulu-red/90', description: 'Schools, tutoring, and online courses' },
];

export default async function HomePage() {
  const allArticles = await getPublishedArticles();
  const featuredArticle = allArticles[0];
  const sidebarArticles = allArticles.slice(1, 3);
  const gridArticles = allArticles.slice(0, 5);
  const energyArticles = allArticles.filter((a) => a.category === 'energy');
  const securityArticles = allArticles.filter((a) => a.category === 'security');
  const propertyArticles = allArticles.filter((a) => a.category === 'property');
  const aiArticles = allArticles.filter((a) => a.category === 'ai' || a.category === 'technology');
  const businessArticles = allArticles.filter((a) => a.category === 'business');

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-zulu-indigo text-zulu-gold py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div className="space-y-6">
              {featuredArticle && (
                <>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-zulu-gold/20 text-zulu-gold px-3 py-1 rounded-full text-xs font-medium">
                      {featuredArticle.category.charAt(0).toUpperCase() + featuredArticle.category.slice(1)}
                    </span>
                    <span className="text-zulu-indigo/40 text-xs">{featuredArticle.readTime} min read</span>
                  </div>
                  <h1 className="text-4xl font-bold text-zulu-gold md:text-5xl lg:text-6xl">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-zulu-indigo/50 text-lg max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-6 flex items-center space-x-4">
                    <Link href={`/news/${featuredArticle.category}/${featuredArticle.slug}`} className="inline-flex items-center px-4 py-2 bg-zulu-gold text-zulu-indigo font-medium rounded-md hover:bg-zulu-gold/90 transition-colors">
                      Read Full Story
                    </Link>
                    <CTAButton variant="text" size="md">
                      Get Quotes
                    </CTAButton>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              {sidebarArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.category}/${article.slug}`}
                  className="group flex items-center space-x-4 p-4 bg-zulu-indigo/90 rounded-lg hover:bg-zulu-indigo/80 transition-colors"
                >
                  <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-zulu-gold/20 text-zulu-gold px-2 py-0.5 rounded-full text-xs font-medium">
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                      <span className="text-zulu-indigo/40 text-xs">{article.readTime} min</span>
                    </div>
                    <h3 className="text-zulu-gold font-semibold text-lg group-hover:text-zulu-gold/80 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW BAR */}
      <section className="bg-zulu-indigo/90">
        <TrendingBar topics={trendingTopics} />
      </section>

      {/* LATEST NEWS GRID */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Latest News"
            title="Stay Informed with Africa's Business Pulse"
            description="Breaking news, insights, and trends shaping the continent's business landscape"
            ctaText="View All News"
            ctaHref="/news"
          />
          {gridArticles.length > 0 ? (
            <ArticleGrid articles={gridArticles} columns={3} showExcerpt showImage />
          ) : (
            <div className="text-center py-12 text-zulu-indigo/50">No articles yet. Check back soon!</div>
          )}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <section className="py-12 bg-zulu-indigo/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {energyArticles.length > 0 && (
            <div className="mb-12">
              <SectionHeader eyebrow="Energy" title="Powering Africa's Future" description="Latest developments in renewable energy, power solutions, and electricity innovation" ctaText="Get Solar Quotes" ctaHref="/quotes/solar" />
              <ArticleGrid articles={energyArticles.slice(0, 3)} columns={3} showExcerpt showImage />
            </div>
          )}

          {securityArticles.length > 0 && (
            <div className="mb-12">
              <SectionHeader eyebrow="Security" title="Keeping Africa Safe" description="Innovations in security technology, crime prevention, and safety solutions" ctaText="Get Security Quotes" ctaHref="/quotes/security" />
              <ArticleGrid articles={securityArticles.slice(0, 3)} columns={3} showExcerpt showImage />
            </div>
          )}

          {aiArticles.length > 0 && (
            <div className="mb-12">
              <SectionHeader eyebrow="AI & Technology" title="The Intelligence Revolution" description="Artificial intelligence, machine learning, and tech innovations transforming African business" />
              <ArticleGrid articles={aiArticles.slice(0, 4)} columns={4} showExcerpt showImage />
            </div>
          )}

          {propertyArticles.length > 0 && (
            <div className="mb-12">
              <SectionHeader eyebrow="Property" title="African Real Estate Insights" description="Property market trends, investment opportunities, and PropTech innovations" ctaText="Find an Agent" ctaHref="/quotes/property" />
              <ArticleGrid articles={propertyArticles.slice(0, 3)} columns={3} showExcerpt showImage />
            </div>
          )}
        </div>
      </section>

      {/* MARKETPLACE PROMO SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Marketplace"
            title="Find Trusted African Service Providers"
            description="Connect with verified businesses across all sectors for reliable quotes and services"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {NICHES.map((niche) => (
              <div key={niche.key} className="bg-white rounded-xl p-6 border border-zulu-indigo/10 hover:border-zulu-gold/30 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center mb-4">
                  <div className={`h-12 w-12 flex items-center justify-center rounded-full ${niche.color}`}>
                    <niche.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-zulu-indigo font-semibold mb-2">{niche.label}</h3>
                <p className="text-zulu-indigo/60 text-sm mb-4">{niche.description}</p>
                <Link href={`/quotes/${niche.key}`} className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-zulu-gold text-zulu-indigo rounded-full hover:bg-zulu-gold/90 transition-colors">
                  Get Quotes <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-zulu-indigo text-zulu-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard icon={Building2} value="6,850+" label="Businesses Served" />
            <StatsCard icon={Users} value="45,200+" label="Leads Generated" />
            <StatsCard icon={TrendingUp} value="240%" label="Average ROI" />
            <StatsCard icon={Zap} value="R125M+" label="Revenue Facilitated" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA />
    </div>
  );
}
