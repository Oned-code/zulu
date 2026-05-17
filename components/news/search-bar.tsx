'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/news?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-full bg-zulu-indigo/5 border border-zulu-indigo/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zulu-indigo placeholder:text-zulu-indigo/40 focus:outline-none focus:ring-2 focus:ring-zulu-gold/50 focus:border-zulu-gold/30"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zulu-indigo/40" />
    </form>
  );
}
