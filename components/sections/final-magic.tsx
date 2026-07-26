'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Check, Sparkles, Heart } from 'lucide-react';
import { useForm } from '@/components/form-context';
import { Button } from '@/components/ui/button';

export function FinalMagic() {
  const { resetForm } = useForm();
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleSubmit = useCallback(() => {
    setOpen(true);
    setConfetti(true);
    resetForm();
    const t = setTimeout(() => setConfetti(false), 7000);
    return () => clearTimeout(t);
  }, [resetForm]);

  return (
    <section
      id="final"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/12 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            The end
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            One last little step
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Thank you for wandering through this small space. Whenever
            you&apos;re ready, complete the journey.
          </p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10"
          >
            <Button
              onClick={handleSubmit}
              className="group relative h-14 overflow-hidden rounded-full premium-gradient px-10 text-base font-semibold text-white shadow-xl shadow-blue-900/20 transition-shadow hover:shadow-2xl hover:shadow-blue-900/30"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Complete This Little Journey ✨
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Confetti */}
      {confetti && size.w > 0 && (
        <Confetti
          width={size.w}
          height={size.h}
          recycle={false}
          numberOfPieces={260}
          gravity={0.25}
          colors={['#3B82F6', '#6366F1', '#0EA5E9', '#8B5CF6', '#38BDF8', '#F8FFF8']}
        />
      )}

      {/* Success modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
            >
              {/* Gradient ring */}
              <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-blue-500/30 via-transparent to-sky-500/30" />

              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg"
              >
                <Check className="h-10 w-10" strokeWidth={3} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-2xl font-semibold"
              >
                Thank You, Ayesha! 🌸
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                It truly means a lot that you took the time to explore this
                little space.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
              >
                <Heart className="h-3.5 w-3.5 text-rose-400" />
                <span>Made with care, just for you</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => setOpen(false)}
                className="mt-7 w-full rounded-full premium-gradient py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-[1.02]"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
