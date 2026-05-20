'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Briefcase, Menu, Search, UserRound, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { label: 'AI', href: '/ai' },
  { label: 'Crypto', href: '/crypto' },
  { label: 'Energy', href: '/energy' },
  { label: 'Security', href: '/security' },
  { label: 'Property', href: '/property' },
  { label: 'Auto', href: '/automotive' },
  { label: 'Education', href: '/education' },
  { label: 'Business', href: '/business' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/news?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    router.push('/auth/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zulu-indigo/80 text-zulu-gold shadow-lg shadow-zulu-indigo/15 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zulu-gold text-zulu-indigo">
              <Briefcase className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-bold leading-tight">ZuluFun.io</span>
              <span className="hidden text-xs text-zulu-gold/65 sm:block">Africa&apos;s autonomous business engine</span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1 overflow-x-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zulu-gold text-zulu-indigo'
                        : 'text-zulu-gold/75 hover:bg-white/10 hover:text-zulu-gold'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="rounded-md p-2 text-zulu-gold/80 transition-colors hover:bg-white/10 hover:text-zulu-gold"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/quotes" className="rounded-md bg-zulu-gold px-4 py-2 text-sm font-semibold text-zulu-indigo transition-colors hover:bg-zulu-gold/90">
              Get Quotes
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 border border-zulu-gold/30 hover:border-zulu-gold transition-colors ml-2"
                >
                  <UserRound className="h-4 w-4 text-zulu-gold" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-zinc-200">
                    <div className="px-4 py-2 border-b border-zinc-100">
                      <p className="text-sm font-medium text-zinc-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zulu-gold/75 transition-colors hover:bg-white/10 hover:text-zulu-gold ml-2 border border-zulu-gold/30">
                <UserRound className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-md p-2 text-zulu-gold md:hidden"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="hidden border-t border-zulu-gold/10 py-3 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zulu-gold/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ZuluFun news..."
                className="w-full rounded-md border border-zulu-gold/25 bg-white/10 py-2 pl-10 pr-3 text-sm text-white placeholder:text-zulu-gold/45 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
              />
            </div>
          </form>
        )}
      </div>

      {menuOpen && (
        <div className="border-t border-zulu-gold/10 bg-zulu-indigo px-4 py-5 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zulu-gold/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full rounded-md border border-zulu-gold/25 bg-white/10 py-2 pl-10 pr-3 text-sm text-white placeholder:text-zulu-gold/45 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
            />
          </form>
          <div className="grid gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-zulu-gold text-zulu-indigo' : 'text-zulu-gold/75 hover:bg-white/10 hover:text-zulu-gold'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link href="/quotes" onClick={() => setMenuOpen(false)} className="rounded-md bg-zulu-gold px-4 py-2 text-center text-sm font-semibold text-zulu-indigo">
              Get Quotes
            </Link>
            {user ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-md border border-zulu-gold/25 px-4 py-2 text-center text-sm font-semibold text-zulu-gold">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="rounded-md border border-zulu-gold/25 px-4 py-2 text-center text-sm font-semibold text-zulu-gold">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
