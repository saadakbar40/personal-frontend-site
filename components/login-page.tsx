'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '@/components/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';

interface Rule {
  label: string;
  test: (v: string) => boolean;
}

const rules: Rule[] = [
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: 'One number', test: (v) => /[0-9]/.test(v) },
  { label: 'One special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
  { label: 'Minimum 8 characters', test: (v) => v.length >= 8 },
];

export function LoginPage() {
  const router = useRouter();
  const { user, login, ready } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ready && user) router.replace('/');
  }, [ready, user, router]);

  const ruleStates = useMemo(
    () => rules.map((r) => r.test(password)),
    [password]
  );
  const allValid = ruleStates.every(Boolean);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim() && emailValid && allValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError('');
    if (!canSubmit) return;
    login(name.trim(), email.trim());
    router.replace('/');
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-sky-400/30 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 bottom-10 h-[32rem] w-[32rem] rounded-full bg-indigo-500/30 blur-[140px]"
        />
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
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

      <div className="absolute right-5 top-5 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass-strong relative w-full max-w-md rounded-3xl p-7 shadow-2xl sm:p-9"
      >
        {/* Header */}
        <div className="mb-7 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl premium-gradient text-3xl shadow-lg"
          >
            🌸
          </motion.div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in gently to enter this little space.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-12 w-full rounded-xl border border-border bg-background/60 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-border bg-background/60 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {touched && email && !emailValid && (
              <p className="text-xs text-destructive">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="h-12 w-full rounded-xl border border-border bg-background/60 pl-10 pr-11 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Live validation checklist */}
            <AnimatePresence>
              {password.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1.5 overflow-hidden"
                >
                  {rules.map((r, i) => {
                    const ok = ruleStates[i];
                    return (
                      <li
                        key={r.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <motion.span
                          animate={{ scale: ok ? [1, 1.2, 1] : 1 }}
                          className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                            ok
                              ? 'bg-emerald-500 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {ok ? (
                            <Check className="h-3 w-3" strokeWidth={3} />
                          ) : (
                            <X className="h-2.5 w-2.5" strokeWidth={3} />
                          )}
                        </motion.span>
                        <span
                          className={
                            ok
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-muted-foreground'
                          }
                        >
                          {r.label}
                        </span>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl premium-gradient text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>Enter the Space</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Frontend only — nothing is stored on a server.
        </p>
      </motion.div>
    </main>
  );
}
