// import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.className}`} suppressHydrationWarning>
      <body className={'overflow-hidden'}>
      loyout
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
