import { notFound } from 'next/navigation';
import Link from 'next/link';
import NewsletterCTA from '@/components/layout/newsletter-cta';
import { AdBanner } from '@/components/shared/ad-banner';
import Breadcrumb from '@/components/layout/breadcrumb';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data';
import { RelatedArticles } from '@/components/news/related-articles';

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getPublishedArticles())
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Breadcrumb />

            <header className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-zulu-gold/20 text-zulu-gold px-3 py-1 rounded-full text-xs font-medium">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <span className="text-zulu-indigo/40 text-xs">{publishedDate}</span>
                <span className="text-zulu-indigo/40 text-xs">{article.readTime} min read</span>
              </div>
              <h1 className="text-4xl font-bold text-zulu-indigo md:text-5xl">
                {article.title}
              </h1>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-zulu-indigo/50">By {article.author}</span>
              </div>
            </header>

            {article.featuredImage && (
              <div className="mb-8">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}

            <article className="prose prose-zulu-indigo max-w-none text-zulu-indigo/80">
              <p className="text-lg leading-relaxed">{article.excerpt}</p>
              <div className="mt-6 leading-relaxed whitespace-pre-wrap">{article.content}</div>
            </article>

            <section className="my-12">
              <div className="mb-6">
                <span className="text-zulu-gold font-medium text-xs tracking-wider uppercase">Take Action</span>
                <h2 className="text-2xl font-bold text-zulu-indigo mt-2">Get Quotes for {article.category.charAt(0).toUpperCase() + article.category.slice(1)} Solutions</h2>
                <p className="text-zulu-indigo/60 mt-1">Connect with verified providers in your area</p>
              </div>
              <Link
                href={`/quotes/${article.category}`}
                className="inline-flex items-center px-6 py-3 bg-zulu-gold text-zulu-indigo font-medium rounded-lg hover:bg-zulu-gold/90 transition-colors"
              >
                Get Quotes
              </Link>
            </section>

            <section className="mb-12 pt-8 border-t border-zulu-indigo/20">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-zulu-indigo/20">
                  <span className="text-zulu-gold font-bold">{article.author.charAt(0)}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-zulu-indigo font-semibold">{article.author}</h3>
                  <p className="text-zulu-indigo/60 text-sm">
                    Business correspondent covering {article.category} across Africa.
                  </p>
                </div>
              </div>
            </section>

            {relatedArticles.length > 0 && (
              <>
                <div className="mb-6">
                  <span className="text-zulu-gold font-medium text-xs tracking-wider uppercase">Related</span>
                  <h2 className="text-2xl font-bold text-zulu-indigo mt-2">More on {article.category.charAt(0).toUpperCase() + article.category.slice(1)}</h2>
                </div>
                <RelatedArticles articles={relatedArticles} />
              </>
            )}

            <NewsletterCTA />

            <AdBanner
              title={`Find ${article.category.charAt(0).toUpperCase() + article.category.slice(1)} Providers`}
              description="Get connected with verified service providers in your area."
              ctaText="Get Quotes"
              ctaHref={`/quotes/${article.category}`}
              sponsor="ZuluFun Marketplace"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
