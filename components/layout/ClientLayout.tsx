'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useManualRevalidate } from '@/hooks/useManualRevalidate';

const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/common/ScrollToTop'), { ssr: false });

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  useManualRevalidate();

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <ScrollToTop />
    </>
  );
}
