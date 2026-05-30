'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/types/index';

interface RelatedArticleCardProps {
  article: Article;
}

function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/news/${article.category}/${article.slug}`}
      className="group flex items-center space-x-4 p-4 bg-zulu-indigo/5 rounded-lg hover:bg-zulu-indigo/10 transition-colors"
    >
      {article.featuredImage && !imgError && (
        <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden bg-zinc-100">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="flex-1 space-y-2">
        <h3 className="text-zulu-indigo font-semibold text-lg group-hover:text-zulu-gold transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-zulu-indigo/50 text-sm line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <RelatedArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
