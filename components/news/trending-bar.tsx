'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

interface TrendingTopic {
  label: string;
  count: number;
}

interface TrendingBarProps {
  topics: TrendingTopic[];
}

export function TrendingBar({ topics }: TrendingBarProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center space-x-6 py-3 px-4">
        <div className="flex items-center space-x-2 text-zulu-gold text-sm font-medium shrink-0">
          <TrendingUp className="h-4 w-4" />
          <span>Trending:</span>
        </div>
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/news?q=${encodeURIComponent(topic.label)}`}
            className="shrink-0 flex items-center space-x-2 text-zulu-gold/70 hover:text-zulu-gold transition-colors text-sm"
          >
            <span>{topic.label}</span>
            <span className="text-zulu-gold/40 text-xs">({topic.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
