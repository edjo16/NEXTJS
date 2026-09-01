import { ReactNode } from 'react';
import { Viewport } from 'next';
import '../styles/globals.css';
import { DataProvider } from '@/context/DataContext';
import { DepartmentProvider } from "@/context/DepartmentContext";
import { InsigthProvider } from "@/context/Insight";
import Footer from '@/components/layout/Footer';
import ClientLayout from '@/components/layout/ClientLayout';
import CookieConsent from '@/components/common/CookieConsent';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: 'Active Re | Reinsurance Company for Financial Institutions',
    template: '%s',
  },
  description: 'Specialised, Innovative and Trusted Worldwide. A global reinsurance partner offering strategic, ethical, and high-performing solutions across diverse markets.',
  keywords: ['reaseguro', 'seguros', 'Active RE', 'reinsurance', 'insurance'],
  authors: [{ name: 'Active RE' }],
  creator: 'Active RE',
  publisher: 'Active RE',
  metadataBase: new URL('https://active-re.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://active-re.com',
    siteName: 'Active RE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: RootLayoutProps) {
  const directusOrigin = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  return (
    <html lang="en">
      <head>
        {directusOrigin && (
          <>
            <link rel="preconnect" href={directusOrigin} />
            <link rel="dns-prefetch" href={directusOrigin} />
          </>
        )}
      </head>
      <body>
        <CookieConsent />
        <DataProvider>
          <DepartmentProvider>
            <InsigthProvider>
              <div className="min-h-screen flex flex-col">
                <ClientLayout>
                  {children}
                </ClientLayout>
                <Footer />
              </div>
            </InsigthProvider >
          </DepartmentProvider >
        </DataProvider>
      </body>
    </html>
  );
}