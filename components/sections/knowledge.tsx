'use client';

import { motion } from 'framer-motion';
import {
  PawPrint,
  UtensilsCrossed,
  MapPin,
  Sun,
  Clock,
  Briefcase,
  Trophy,
  Quote,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

interface KnowledgeCard {
  icon: LucideIcon;
  title: string;
  placeholder: string;
  gradient: string;
}

const cards: KnowledgeCard[] = [
  {
    icon: PawPrint,
    title: 'Favourite Animal',
    placeholder: 'A quiet companion...',
    gradient: 'from-amber-500/15 to-orange-500/10',
  },
  {
    icon: UtensilsCrossed,
    title: 'Favourite Food',
    placeholder: 'Comfort on a plate...',
    gradient: 'from-rose-500/15 to-pink-500/10',
  },
  {
    icon: MapPin,
    title: 'Favourite Place',
    placeholder: 'Somewhere that feels calm...',
    gradient: 'from-sky-500/15 to-cyan-500/10',
  },
  {
    icon: Sun,
    title: 'Favourite Season',
    placeholder: 'The time of year that feels like home...',
    gradient: 'from-yellow-500/15 to-amber-500/10',
  },
  {
    icon: Clock,
    title: 'Favourite Time',
    placeholder: 'Dawn, dusk, or the quiet hours...',
    gradient: 'from-indigo-500/15 to-violet-500/10',
  },
  {
    icon: Briefcase,
    title: 'Dream Job',
    placeholder: 'Work that feels meaningful...',
    gradient: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    icon: Trophy,
    title: 'Biggest Goal',
    placeholder: 'Something worth striving for...',
    gradient: 'from-fuchsia-500/15 to-purple-500/10',
  },
  {
    icon: Quote,
    title: 'Favourite Quote',
    placeholder: 'Words that stay with you...',
    gradient: 'from-violet-500/15 to-indigo-500/10',
  },
  {
    icon: GraduationCap,
    title: 'One Skill You Want To Learn',
    placeholder: 'Something new, something exciting...',
    gradient: 'from-green-500/15 to-emerald-500/10',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Knowledge() {
  return (
    <section id="knowledge" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-72 w-96 -translate-x-1/2 rounded-full bg-sky-500/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Knowledge
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Tell Me More About Yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A gentle collection of the little things that make you, you.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              whileHover={{ y: -6 }}
              className={`glass group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 transition-shadow hover:shadow-xl`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground italic">
                  {card.placeholder}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
