'use client';

import { motion } from 'framer-motion';
import {
  Clapperboard,
  Tv,
  Palette,
  BookOpen,
  Music,
  Mountain,
  Coffee,
  Plane,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { useForm } from '@/components/form-context';
import { useState } from 'react';

interface Category {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  href: string;
}

const categories: Category[] = [
  {
    icon: Clapperboard,
    title: 'Movies & Series',
    description: 'Stories that stay with you long after the credits.',
    gradient: 'from-rose-500/15 to-orange-500/10',
    href: 'https://www.imdb.com/',
  },
  {
    icon: Tv,
    title: 'Dramas',
    description: 'Slow-burn narratives and quiet, powerful moments.',
    gradient: 'from-sky-500/15 to-indigo-500/10',
    href: 'https://mydramalist.com/',
  },
  {
    icon: Palette,
    title: 'Animation & Cartoons',
    description: 'Hand-drawn worlds full of wonder and imagination.',
    gradient: 'from-amber-500/15 to-yellow-500/10',
    href: 'https://myanimelist.net/',
  },
  {
    icon: BookOpen,
    title: 'Books & Learning',
    description: 'Pages that open doors to new ways of thinking.',
    gradient: 'from-emerald-500/15 to-teal-500/10',
    href: 'https://www.goodreads.com/',
  },
  {
    icon: Music,
    title: 'Music',
    description: 'Melodies for mornings, evenings and everything between.',
    gradient: 'from-fuchsia-500/15 to-pink-500/10',
    href: 'https://open.spotify.com/',
  },
  {
    icon: Mountain,
    title: 'Nature',
    description: 'Quiet mountains, soft meadows, and open skies.',
    gradient: 'from-green-500/15 to-lime-500/10',
    href: 'https://www.nationalgeographic.com/',
  },
  {
    icon: Plane,
    title: 'Travel',
    description: 'Open roads, new cities, and unfamiliar horizons.',
    gradient: 'from-cyan-500/15 to-blue-500/10',
    href: 'https://www.lonelyplanet.com/',
  },
  {
    icon: Coffee,
    title: 'Relaxing Things',
    description: 'Slow mornings, warm cups, and gentle evenings.',
    gradient: 'from-stone-500/15 to-amber-500/10',
    href: 'https://www.headspace.com/',
  },
];

const favoriteOptions = [
  'Tea',
  'Chocolate',
  'Flowers',
  'Rain',
  'Books',
  'Movies',
  'Music',
  'Travel',
];

export function Favorites() {
  const { form, toggleFavorite } = useForm();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="favorites" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Favorites
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Things That Make You Happy ✨
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A little collection of the small joys that make ordinary days feel
            special. Tap any card to explore more.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ y: -6 }}
              className={`glass group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-6 transition-shadow hover:shadow-xl`}
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />
              <ExternalLink className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/50 transition-colors group-hover:text-accent" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-card/70 text-primary shadow-sm transition-transform group-hover:scale-110">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                  Explore
                  <motion.span
                    animate={activeCard === i ? { x: 4 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* My Favorites selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass mt-14 rounded-3xl p-6 sm:p-10"
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold">My Favorites</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the ones that feel like you.{' '}
              <span className="text-primary">
                {form.favorites.length} selected
              </span>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {favoriteOptions.map((opt) => {
              const active = form.favorites.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleFavorite(opt)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                      : 'border-border bg-background/50 text-foreground/70 hover:border-accent hover:text-foreground'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
