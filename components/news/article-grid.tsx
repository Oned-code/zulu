import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Article } from '@/types/index';

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
  showExcerpt?: boolean;
  showImage?: boolean;
}

export function ArticleGrid({ articles, columns = 3, showExcerpt = false, showImage = false }: ArticleGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/news/${article.category}/${article.slug}`}
          className="group bg-white/95 rounded-3xl border border-zulu-indigo/10 hover:border-zulu-gold/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {showImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-zulu-gold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-zulu-indigo/30">-</span>
              <span className="flex items-center text-xs text-zulu-indigo/50">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime} min
              </span>
            </div>
            <h3 className="text-zulu-indigo font-semibold group-hover:text-zulu-gold transition-colors line-clamp-2">
              {article.title}
            </h3>
            {showExcerpt && (
              <p className="text-zulu-indigo/60 text-sm line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-zulu-indigo/40">
              <span>{article.author}</span>
              <span>
                {new Intl.DateTimeFormat('en-ZA', {
                  day: 'numeric',
                  month: 'short',
                  timeZone: 'UTC',
                }).format(new Date(article.publishedAt))}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
