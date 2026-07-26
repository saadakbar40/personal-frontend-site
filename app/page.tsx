'use client';

import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Thoughts } from '@/components/sections/thoughts';
import { AboutYou } from '@/components/sections/about-you';
import { Favorites } from '@/components/sections/favorites';
import { Knowledge } from '@/components/sections/knowledge';
import { Gallery } from '@/components/sections/gallery';
import { FinalMagic } from '@/components/sections/final-magic';
import { Footer } from '@/components/sections/footer';
import { ScrollProgress, ScrollToTop } from '@/components/scroll-utils';
import { RouteGuard } from '@/components/route-guard';

export default function Home() {
  return (
    <RouteGuard>
      <main className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Thoughts />
        <AboutYou />
        <Favorites />
        <Knowledge />
        <Gallery />
        <FinalMagic />
        <Footer />
        <ScrollToTop />
      </main>
    </RouteGuard>
  );
}
