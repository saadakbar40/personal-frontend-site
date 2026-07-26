'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  User,
  Compass,
  Sparkles,
  GraduationCap,
  Target,
  Mail,
  Check,
  Pencil,
  type LucideIcon,
} from 'lucide-react';
import { useProfile } from '@/components/profile-context';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { ScrollProgress, ScrollToTop } from '@/components/scroll-utils';
import { RouteGuard } from '@/components/route-guard';

interface Section {
  id: string;
  icon: LucideIcon;
  title: string;
  placeholder: string;
}

const sections: Section[] = [
  {
    id: 'about',
    icon: User,
    title: 'About Me',
    placeholder:
      'A calm, curious person who values honesty, kindness and quiet moments. I believe small things matter most...',
  },
  {
    id: 'journey',
    icon: Compass,
    title: 'My Journey',
    placeholder:
      'Every step has taught me something — about people, about patience, about growth...',
  },
  {
    id: 'skills',
    icon: Sparkles,
    title: 'Skills',
    placeholder: 'Listening, learning, patience, creativity, gentle honesty...',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    placeholder: 'A path shaped by curiosity and the people who guided it...',
  },
  {
    id: 'goals',
    icon: Target,
    title: 'Goals',
    placeholder:
      'To grow a little every day, to stay kind, and to build something meaningful...',
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Information',
    placeholder: 'Reach out gently — email, a message, or a quiet hello...',
  },
];

function EditableSection({ section, index }: { section: Section; index: number }) {
  const [value, setValue] = useState('');
  const [editing, setEditing] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`relative flex w-full items-center ${
        isLeft ? 'justify-start' : 'justify-end'
      } md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute top-7 hidden h-4 w-4 rounded-full border-4 border-background bg-accent md:block ${
          isLeft ? '-right-2' : '-left-2'
        }`}
      />

      <div className="glass group w-full rounded-2xl p-6 transition-shadow hover:shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <section.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">{section.title}</h3>
          </div>
          <button
            onClick={() => setEditing((e) => !e)}
            aria-label={editing ? 'Save' : 'Edit'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {editing ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </button>
        </div>
        {editing ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={section.placeholder}
            className="min-h-[100px] w-full resize-none rounded-xl border border-border bg-background/60 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            autoFocus
          />
        ) : (
          <p className="min-h-[60px] text-sm leading-relaxed text-muted-foreground">
            {value || (
              <span className="italic text-muted-foreground/60">
                {section.placeholder}
              </span>
            )}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function AboutMePage() {
  const { photo, setPhoto } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <RouteGuard>
    <main className="relative min-h-screen overflow-x-hidden pt-20">
      <ScrollProgress />
      <Navbar />

      {/* Header */}
      <section className="relative px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            {/* Profile photo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 blur-2xl" />
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-card bg-gradient-to-br from-blue-500/15 to-indigo-500/10 shadow-2xl sm:h-52 sm:w-52">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt="Profile"
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
                className="glass-strong absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium shadow-lg transition-transform hover:scale-105"
              >
                <Camera className="h-3.5 w-3.5 text-accent" />
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

            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-accent">
                About Me
              </span>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                A little more about me
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                A quiet profile — feel free to read, or to gently edit any
                section and make it your own. Nothing is saved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />

          <div className="flex flex-col gap-10 md:gap-16">
            {sections.map((section, i) => (
              <div
                key={section.id}
                className={`flex w-full ${
                  i % 2 === 0
                    ? 'md:justify-start'
                    : 'md:justify-end'
                }`}
              >
                <EditableSection section={section} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
    </RouteGuard>
  );
}
