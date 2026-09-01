import CareersPage from '@/components/careers/CareersPage';
import type { Metadata } from 'next';
import { fetchCareers } from '@/hooks/useGetCarrers';

export const metadata: Metadata = {
  title: 'Careers | Active RE',
  description: 'Advance your career in the dynamic reinsurance industry with Active Re, where innovation meets global opportunities.',
  alternates: {
    canonical: 'https://active-re.com/careers',
  },
  openGraph: {
    title: 'Careers | Active RE',
    description: 'Building your future at Active Re',
    type: 'website',
  },
};

export default async function Page() {
  const data = await fetchCareers();

  return <CareersPage data={data} />;
}