import { Inter } from 'next/font/google';
import './globals.css';
import './responsive.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Apex — JAMB & WAEC exam preparation',
  description: 'Prepare smarter for JAMB and WAEC with personalised practice, realistic mock exams, and clear insight into your progress.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
