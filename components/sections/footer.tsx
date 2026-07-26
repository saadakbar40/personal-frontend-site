'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer-gradient relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]" />
        <div className="absolute right-1/4 top-0 h-40 w-72 rounded-full bg-indigo-500/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl px-6 py-20 text-center"
      >
        <div className="mb-5 text-3xl">🌸</div>

        <p className="text-sm font-medium uppercase tracking-widest text-white/50">
          Designed &amp; Developed by
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Saad
        </h3>
        <p className="mt-2 text-sm font-medium text-sky-300">
          (Udaas Developer)
        </p>
        <p className="mt-1 text-sm text-white/60">Full Stack Web Developer</p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
          <span>Made with</span>
          <span aria-hidden>☕</span>
          <span>, Code &amp; Good Intentions.</span>
        </div>

        {/* Social icons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {[
            { icon: Github, label: 'GitHub', href: 'https://github.com' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
            { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:scale-110 hover:border-sky-400/40 hover:text-sky-300"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </div>

        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} — A thoughtful little space.
        </p>
      </motion.div>
    </footer>
  );
}
