'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowDown, Sparkles, Camera } from 'lucide-react';
import { useProfile } from '@/components/profile-context';

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const slides: Slide[] = [
  {
    src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Misty mountain peaks at dawn',
    caption: 'Where the sky meets the mountains',
  },
  {
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Calm lake reflecting a soft sky',
    caption: 'Still waters, quiet thoughts',
  },
  {
    src: 'https://images.pexels.com/photos/1271593/pexels-photo-1271593.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Soft clouds over a lavender field',
    caption: 'Fields that whisper gently',
  },
  {
    src: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Minimal lifestyle workspace with warm light',
    caption: 'Slow mornings, warm light',
  },
  {
    src: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'A quiet path through a misty forest',
    caption: 'Paths that lead somewhere calm',
  },
];

const AUTO_INTERVAL = 3500;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [index, setIndex] = useState(0);
  const { photo, setPhoto } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(t);
  }, [next]);

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const scrollToContent = () =>
    document
      .getElementById('about')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Image slider */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].src}
              alt={slides[index].alt}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Premium overlay: blue → indigo gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/75 via-indigo-800/70 to-indigo-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-white/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content with profile picture on the side */}
      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center md:flex-row md:items-center md:gap-14 md:text-left"
      >
        {/* Profile picture — placed on the left on desktop, top on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative shrink-0 order-1 md:order-1"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/30 blur-2xl" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/15 shadow-2xl sm:h-52 sm:w-52">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Your profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-7xl">
                🌸
              </div>
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="glass-dark absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white shadow-lg transition-transform hover:scale-105"
          >
            <Camera className="h-3.5 w-3.5 text-sky-300" />
            Change Photo
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </motion.div>

        {/* Text content */}
        <div className="order-2 flex-1 text-white md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-dark mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/90"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-300" />
            A little space, made with thought
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-balance text-4xl font-semibold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Welcome Ayesha <span className="inline-block">🌸</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base text-white/90 drop-shadow sm:text-lg md:text-xl md:mx-0"
          >
            Some pages are created with code...
            <br className="hidden sm:block" /> This one was created with thought.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="mt-8 md:mt-10"
          >
            <button
              onClick={scrollToContent}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full premium-gradient px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-900/30 transition-all hover:shadow-2xl hover:shadow-blue-900/40 sm:px-8 sm:py-4"
            >
              <span className="relative z-10">Let&apos;s Explore</span>
              <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation dots + caption */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium text-white/80 drop-shadow"
          >
            {slides[index].caption}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/40 p-1"
        >
          <span className="h-2 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
