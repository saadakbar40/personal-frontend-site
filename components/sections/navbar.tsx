'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/components/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [0.85, 1]);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const isHome = pathname === '/';
  const isAbout = pathname === '/about';

  const homeLinks = [
    { label: 'Thoughts', target: 'thoughts' },
    { label: 'You', target: 'about-you' },
    { label: 'Favorites', target: 'favorites' },
    { label: 'Gallery', target: 'gallery' },
  ];

  return (
    <motion.header
      style={{ opacity }}
      className="navbar-gradient fixed left-0 right-0 top-0 z-50 border-b border-white/10"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Logo — always visible on all screens */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-tight text-white"
        >
          <span>🌸</span>
          <span>Ayesha</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isHome
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isAbout
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            About Me
          </Link>
          {isHome &&
            homeLinks.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                className="rounded-full px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden text-xs font-medium text-white/70 sm:inline">
              Hi, {user.name.split(' ')[0]}
            </span>
          )}
          <ThemeToggle />
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="flex h-10 items-center gap-1.5 rounded-full bg-white/15 px-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-white/25"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/25 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isHome
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isAbout
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              About Me
            </Link>
            {isHome &&
              homeLinks.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
