'use client';

import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

const thoughts = [
  {
    text: 'Respect comes before every relationship.',
    accent: 'from-sky-500/15 to-indigo-500/10',
  },
  {
    text: 'Trust takes time to build, but it creates the strongest bonds.',
    accent: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    text: 'Kindness is never wasted.',
    accent: 'from-amber-500/15 to-orange-500/10',
  },
];

const featured =
  'The strongest relationships begin with respect, grow with trust, and last with sincerity.';

export function Thoughts() {
  return (
    <section
      id="thoughts"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            My thoughts
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Quiet reflections
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A few simple beliefs that shape how I see people and the world.
          </p>
        </motion.div>

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 overflow-hidden rounded-3xl premium-gradient p-[1.5px] shadow-2xl shadow-blue-900/15"
        >
          <div className="relative rounded-3xl bg-card/95 px-8 py-12 text-center sm:px-16 sm:py-16">
            <motion.div
              animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg"
            >
              <Sparkles className="h-7 w-7" />
            </motion.div>
            <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
            <p className="mx-auto max-w-2xl text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl md:text-3xl">
              {featured}
            </p>
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-sky-500" />
          </div>
        </motion.div>

        {/* Quote cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {thoughts.map((thought, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`glass group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thought.accent} p-8`}
            >
              <Quote className="mb-5 h-9 w-9 text-primary/40" />
              <p className="text-xl font-medium leading-relaxed text-foreground/90">
                {thought.text}
              </p>
              <div className="mt-6 h-1 w-12 rounded-full bg-accent/50 transition-all duration-500 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
