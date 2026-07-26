import type { Metadata } from 'next';
import { AboutMePage } from '@/components/about-me-page';

export const metadata: Metadata = {
  title: 'About Me — Welcome Ayesha 🌸',
  description:
    'A dedicated profile page — about, journey, skills, education, goals and contact information.',
};

export default function Page() {
  return <AboutMePage />;
}
