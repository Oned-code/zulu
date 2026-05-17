import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArticleGrid } from '@/components/news/article-grid';
import { FeaturedArticle } from '@/components/news/featured-article';
import NewsletterCTA from '@/components/layout/newsletter-cta';
import { AdBanner } from '@/components/shared/ad-banner';
import { SectionHeader } from '@/components/shared/section-header';
import Breadcrumb from '@/components/layout/breadcrumb';
import { getArticlesByCategory } from '@/lib/data';
import type { ContentCategory } from '@/types/index';

const categoryInfo: Record<string, { label: string; description: string }> = {
  energy: { label: 'Energy', description: 'Power solutions, renewable energy, and electricity news for Africa.' },
  security: { label: 'Security', description: 'Safety, security systems, and crime prevention insights.' },
  property: { label: 'Property', description: 'Real estate, housing, property investment, and urban development.' },
  automotive: { label: 'Automotive', description: 'Automotive industry, vehicle news, and transportation innovations.' },
  education: { label: 'Education', description: 'Education sector, learning technologies, and academic developments.' },
  ai: { label: 'AI & Technology', description: 'Artificial intelligence, machine learning, and AI tools for African businesses.' },
  business: { label: 'Business', description: 'Business news, entrepreneurship, and economic trends across the continent.' },
  technology: { label: 'Technology', description: 'Technology innovations, gadgets, and digital transformation in Africa.' },
};

export default async function CategoryNewsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const info = categoryInfo[category];

  if (!info) {
    notFound();
  }

  const articles = await getArticlesByCategory(category);
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="lg:w-2/3 space-y-8">
              <Breadcrumb />
              <section className="mb-8">
                <h1 className="text-2xl font-bold text-zulu-indigo mb-2">{info.label}</h1>
                <p className="text-zulu-indigo/60 max-w-xl">{info.description}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-zulu-indigo/50">{articles.length} articles</span>
                </div>
              </section>

              {featuredArticle && <FeaturedArticle article={featuredArticle} />}

              {remainingArticles.length > 0 && (
                <>
                  <SectionHeader
                    eyebrow="Latest"
                    title={`${info.label} News`}
                    description={`Stay updated with the latest developments in ${info.label.toLowerCase()}`}
                  />
                  <ArticleGrid articles={remainingArticles} columns={3} showExcerpt showImage />
                </>
              )}

              {articles.length === 0 && (
                <div className="text-center py-12 text-zulu-indigo/50">
                  No articles in this category yet. Check back soon!
                </div>
              )}
            </div>

            <div className="lg:w-1/3 space-y-6 mt-8 lg:mt-0">
              <SectionHeader eyebrow="Get Quotes" title={`Get ${info.label} Quotes`} description={`Connect with trusted ${info.label.toLowerCase()} service providers`} />
              <Link
                href={category === 'energy' ? '/quotes/solar' : category === 'security' ? '/quotes/security' : category === 'property' ? '/quotes/property' : category === 'automotive' ? '/quotes/automotive' : category === 'education' ? '/quotes/education' : '/quotes'}
                className="w-full bg-zulu-gold text-zulu-indigo py-3 rounded-md font-medium text-center hover:bg-zulu-gold/90 transition-colors block"
              >
                Get Quotes
              </Link>
              <NewsletterCTA />
              <AdBanner
                title={`Find ${info.label} Providers`}
                description={`Get connected with verified ${info.label.toLowerCase()} service providers in your area.`}
                ctaText="Get Quotes"
                ctaHref="/quotes"
                sponsor="ZuluFun Marketplace"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
