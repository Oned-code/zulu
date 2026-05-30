'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import type { Article } from '@/types/index';

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/news/${article.category}/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-zulu-indigo"
    >
      <div className="aspect-[16/9] overflow-hidden">
        {article.featuredImage && !imgError && (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zulu-indigo via-zulu-indigo/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
        <div className="flex items-center space-x-3">
          <span className="bg-zulu-gold text-zulu-indigo px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
            {article.category}
          </span>
          <span className="flex items-center text-zulu-gold/70 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {article.readTime} min read
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-zulu-gold group-hover:text-zulu-gold/90 transition-colors">
          {article.title}
        </h2>
        <p className="text-zulu-gold/60 text-sm max-w-2xl line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center space-x-2 text-zulu-gold/50 text-xs">
          <User className="h-3 w-3" />
          <span>{article.author}</span>
          <span>|</span>
          <span>
            {new Intl.DateTimeFormat('en-ZA', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            }).format(new Date(article.publishedAt))}
          </span>
        </div>
      </div>
    </Link>
  );
}
