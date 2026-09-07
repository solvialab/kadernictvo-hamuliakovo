import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { salon } from '@/lib/salon';
import { assetUrl } from '@/lib/assets';
const serif = Cormorant_Garamond({
  variable: '--font-editorial',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const sans = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: `${salon.name} — Scilová 5`,
  description:
    'Kaderníctvo Hamuliakovo na Scilovej 5. Komorný salón s dvoma kreslami a osobným prístupom. Objednajte sa na 0944 402 476 alebo cez Facebook.',
  icons: { icon: assetUrl('/images/logo.png') },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F3EFE8',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
