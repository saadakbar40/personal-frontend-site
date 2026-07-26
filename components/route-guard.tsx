'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-context';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) router.replace('/login');
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="flex h-12 w-12 items-center justify-center rounded-full premium-gradient text-white shadow-lg"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Preparing your space…</p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
