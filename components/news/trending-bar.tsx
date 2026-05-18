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
    <div className="overflow-hidden bg-zulu-indigo/95 border border-zulu-gold/10 backdrop-blur-sm shadow-lg shadow-zulu-indigo/10">
      <div className="flex flex-wrap items-center gap-4 py-4 px-4 md:px-6">
        <div className="flex items-center space-x-2 text-zulu-gold text-sm font-semibold shrink-0">
          <TrendingUp className="h-4 w-4" />
          <span>Trending:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={`/news?search=${encodeURIComponent(topic.label)}`}
              className="shrink-0 inline-flex items-center space-x-2 rounded-full border border-zulu-gold/10 bg-zulu-indigo/20 px-3 py-1 text-zulu-gold/70 hover:text-zulu-gold transition-colors text-sm"
            >
              <span>{topic.label}</span>
              <span className="text-zulu-gold/40 text-xs">({topic.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
