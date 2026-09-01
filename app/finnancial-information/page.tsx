import FinancialInformationClient from '@/components/finnancial_information/FinancialInformationClient';
import { fetchFinancialInformation } from '@/hooks/useGeFinancialInformation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Information | Active RE',
  description: 'Comprehensive overview of Active RE’s audited financial statements, key performance ratios, and the historical evolution of its capital structure.',
  openGraph: {
    title: 'Financial Information | Active RE',
    description: 'Financial statements and performance overview',
    type: 'website',
  },
};

export default async function FinancialInformation() {
  // Fetch data en el servidor
  const data = await fetchFinancialInformation().catch(() => null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Error loading financial information</p>
      </div>
    );
  }

  return <FinancialInformationClient data={data} />;
}