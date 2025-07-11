import './globals.css';

import type { Metadata } from 'next';
import { DM_Mono, Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import { TRPCReactProvider } from '@/trpc/client';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Meetique',
    default: 'Meetique',
  },
  description: ' Meet with an agent. Get a clear summary. Stay focused.',
  keywords: [
    'meetique',
    'meet',
    'meeting',
    'agent',
    'summary',
    'focus',
    'ai',
    'productivity',
  ],
  openGraph: {
    title: 'Meetique',
    description: 'Meet with an agent. Get a clear summary. Stay focused.',
    url: 'https://meetique.vercel.app',
    siteName: 'Meetique',
    images: [
      {
        url: 'https://meetique.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Meetique',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meetique',
    description: 'Meet with an agent. Get a clear summary. Stay focused.',
    images: [
      {
        url: 'https://meetique.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Meetique',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <head>
          <meta name='apple-mobile-web-app-title' content='Meetique' />
        </head>
        <html lang='en'>
          <body className={`${inter.className} ${dmMono.variable} antialiased`}>
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
