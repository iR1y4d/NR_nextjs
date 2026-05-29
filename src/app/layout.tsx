import type { Metadata } from 'next';
import { Poppins, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VetMed Imports - Veterinary Equipment & Medicines',
  description:
    'VetMed Imports - Your trusted partner in veterinary equipment and medicines. We specialize in importing high-quality veterinary products for clinics, hospitals, and farms.',
  keywords:
    'veterinary equipment, veterinary medicines, animal health, vet supplies, pet care, veterinary imports',
  authors: [{ name: 'VetMed Imports' }],
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'theme-color': '#3B82F6',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cairo.variable} antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
