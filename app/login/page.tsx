import type { Metadata } from 'next';
import { LoginPage } from '@/components/login-page';

export const metadata: Metadata = {
  title: 'Login — Welcome Ayesha 🌸',
  description: 'A gentle sign-in before entering the little space.',
};

export default function Page() {
  return <LoginPage />;
}
