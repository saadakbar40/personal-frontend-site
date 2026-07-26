'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  ShieldCheck,
  BadgeCheck,
  HandHeart,
  Lock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const values: Value[] = [
  {
    icon: Heart,
    title: 'Respect',
    description: 'Valuing each other as equals, always.',
    gradient: 'from-rose-500/15 to-pink-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Trust',
    description: 'The quiet foundation of every bond.',
    gradient: 'from-sky-500/15 to-indigo-500/10',
  },
  {
    icon: BadgeCheck,
    title: 'Honesty',
    description: 'Truth, spoken gently and without fear.',
    gradient: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    icon: HandHeart,
    title: 'Kindness',
    description: 'Small acts that leave a lasting warmth.',
    gradient: 'from-amber-500/15 to-orange-500/10',
  },
  {
    icon: Lock,
    title: 'Loyalty',
    description: 'Standing by, through calm and storm.',
    gradient: 'from-violet-500/15 to-purple-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'Growing together, becoming better.',
    gradient: 'from-green-500/15 to-emerald-500/10',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 blur-2xl" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-card bg-gradient-to-br from-blue-500/15 to-indigo-500/10 shadow-xl sm:h-48 sm:w-48">
              <div className="flex h-full w-full items-center justify-center text-6xl">
                🌸
              </div>
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium uppercase tracking-widest text-accent"
            >
              About this space
            </motion.span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              A little corner of the internet
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0">
              A small collection of thoughts, memories, interests and
              beautiful moments — gathered here quietly, and shared with care.
            </p>
          </div>
        </motion.div>

        {/* Values heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Values
          </span>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What I believe in
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A few quiet principles that shape how I see people and the world.
          </p>
        </motion.div>

        {/* Value cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={item}
              whileHover={{ y: -6 }}
              className={`glass group relative overflow-hidden rounded-2xl bg-gradient-to-br ${value.gradient} p-6 transition-shadow hover:shadow-xl`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <value.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold">{value.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
