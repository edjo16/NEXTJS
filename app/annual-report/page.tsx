import type { Metadata } from 'next';
import AnualReport from '@/components/annual_report_2025/AnnualReport2025';
import { fetchAnnualReportPrioritized } from '@/hooks/useAnualReport';

export const metadata: Metadata = {
  title: 'Annual Report',
  description: 'Active Re presents its 2025 Annual Report, reflecting a year of resilience, consistent performance, and global diversification.​',
  alternates: {
    canonical: 'https://active-re.com/annual-report',
  },
  openGraph: {
    title: 'Annual Report',
    description: 'Active Re presents its 2025 Annual Report, reflecting a year of resilience, consistent performance, and global diversification.​',
    type: 'website',
    images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/4c77a41e-e360-4303-ab1a-23bde2e56894.png`,
        width: 1200,
        height: 630,
        alt: 'Annual Report',
      },
    ],
  },

};


export default async function AnnualReportPage() {
  // Fetch data en el servidor
  const report = await fetchAnnualReportPrioritized().catch(() => null);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Error loading annual report</p>
      </div>
    );
  }

  return <AnualReport />;
}
