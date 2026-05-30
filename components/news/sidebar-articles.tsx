'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/types/index';

interface SidebarArticleProps {
  article: Article;
}

function SidebarArticle({ article }: SidebarArticleProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/news/${article.category}/${article.slug}`}
      className="group flex items-center space-x-4 p-3 bg-white rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:shadow-md transition-all duration-300"
    >
      {article.featuredImage && !imgError && (
        <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-zinc-100">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          {article.category}
        </span>
        <h4 className="text-zulu-indigo text-sm font-semibold group-hover:text-zinc-600 transition-colors line-clamp-2 mt-0.5">
          {article.title}
        </h4>
      </div>
    </Link>
  );
}

interface SidebarArticlesProps {
  articles: Article[];
}

export function SidebarArticles({ articles }: SidebarArticlesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Latest Stories</h3>
      {articles.map((article) => (
        <SidebarArticle key={article.id} article={article} />
      ))}
    </div>
  );
}
