import React from 'react';
import { Metadata } from 'next';
import LinesOfBusinessClient from '../../components/lines_of_business/LinesClient';
import { fetchLinesOfBusiness } from '@/hooks/useGetLinesOfBusinnes';

export const metadata: Metadata = {
  title: 'Lines of Business | Active Re',
  description: 'Explore our diverse lines of business and discover the full scope of solutions we provide across global markets.',
  alternates: {
    canonical: 'https://active-re.com/lines-of-business',
  },
};

export default async function LinesOfBusinessPage() {
  const data = await fetchLinesOfBusiness().catch(() => null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Error loading financial information</p>
      </div>
    );
  }

  return <LinesOfBusinessClient data={data} />;
}