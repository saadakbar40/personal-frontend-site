import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-context';
import { ProfileProvider } from '@/components/profile-context';
import { FormProvider } from '@/components/form-context';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://welcome-ayesha.example.com'),
  title: 'Welcome Ayesha 🌸 — A Thoughtful Little Space',
  description:
    'A small, thoughtful digital experience created with care — a collection of thoughts, memories, interests and beautiful moments, made just for you.',
  keywords: [
    'Ayesha',
    'welcome',
    'personal website',
    'thoughtful',
    'digital experience',
    'Saad',
  ],
  authors: [{ name: 'Saad' }],
  openGraph: {
    title: 'Welcome Ayesha 🌸',
    description:
      'Some pages are created with code... this one was created with thought.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome Ayesha 🌸',
    description:
      'Some pages are created with code... this one was created with thought.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProfileProvider>
              <FormProvider>{children}</FormProvider>
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
