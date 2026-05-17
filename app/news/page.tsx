'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArticleGrid } from '@/components/news/article-grid';
import { CategoryNav } from '@/components/news/category-nav';
import { SearchBar } from '@/components/news/search-bar';
import NewsletterCTA from '@/components/layout/newsletter-cta';
import { AdBanner } from '@/components/shared/ad-banner';
import { SectionHeader } from '@/components/shared/section-header';
import { TrendingBar } from '@/components/news/trending-bar';
import { getPublishedArticles } from '@/lib/data';
import type { Article } from '@/types/index';

const trendingTopics = [
  { label: 'Load Shedding Solutions', count: 12 },
  { label: 'AI Business Tools', count: 8 },
  { label: 'Solar Financing', count: 15 },
  { label: 'Security Integration', count: 9 },
  { label: 'PropTech Trends', count: 7 },
];

async function NewsPageInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';

  const allArticles = await getPublishedArticles();

  let filteredArticles = [...allArticles];

  if (category !== 'all') {
    filteredArticles = filteredArticles.filter((article) => article.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  return (
    <div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="lg:w-3/4 space-y-8">
              <SearchBar />
              <CategoryNav />
              <TrendingBar topics={trendingTopics} />
              <SectionHeader
                eyebrow="Latest News"
                title={`Showing ${filteredArticles.length} articles`}
                description={search ? `Results for "${search}"` : 'Latest news from across Africa'}
              />
              {filteredArticles.length > 0 ? (
                <ArticleGrid articles={filteredArticles} columns={3} showExcerpt showImage />
              ) : (
                <div className="text-center py-12 text-zulu-indigo/50">
                  No articles found. Check back soon for updates!
                </div>
              )}
            </div>
            <div className="lg:w-1/4 space-y-6 mt-8 lg:mt-0">
              <NewsletterCTA />
              <AdBanner
                title="Grow Your Business with ZuluFun"
                description="Connect with thousands of African consumers looking for your services."
                ctaText="List Your Business"
                ctaHref="/auth/register"
                sponsor="ZuluFun"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-zulu-indigo/50">Loading news...</div>}>
      <NewsPageInner />
    </Suspense>
  );
}
