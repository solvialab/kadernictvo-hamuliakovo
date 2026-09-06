import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
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
  title: '[Názov salónu] — Kadernícky ateliér',
  description:
    'Komorné kaderníctvo s dvoma kreslami a osobným prístupom. Strih, farba a chvíľa pre seba. Objednávanie telefonicky a cez Facebook.',
  icons: { icon: '/favicon.svg' },
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
