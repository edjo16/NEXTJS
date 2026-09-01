import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../../styles/annual-report-2025.css';
import AnnualReport2025 from '@/components/annual_report_2025/AnnualReport2025';

export const revalidate = 3600;


export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Annual Report ${year}`,
    description: `Active Re presents its ${year} Annual Report — risk capacity, stability and long-term resilience.`,
    alternates: { canonical: `https://active-re.com/annual-report/${year}` },
    openGraph: {
      title: `Annual Report ${year}`,
      description: `Active Re presents its ${year} Annual Report.`,
      type: 'website',
    },
  };
}


export default async function AnnualReportYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const y = Number(year);
  if (!Number.isInteger(y)) notFound();

  return (
    <div>
      <AnnualReport2025 />
    </div>
  );
}
