import OurTeamPage from '@/components/our_team/OurTeamPage';
import type { Metadata } from 'next';
import { fetchTeam } from '@/hooks/useGetTeam';

export const metadata: Metadata = {
  title: 'Our team | Active RE',
  description: 'Connect with our global reinsurance experts in treaty, facultative, MGAs, surety, retrocession, and more.',
  alternates: {
    canonical: 'https://active-re.com/our-team',
  },
  openGraph: {
    title: 'Our team',
    description: 'Profesionales expertos en reaseguro',
    type: 'website',
  },
};

export default async function OurTeam() {
const data = await fetchTeam();
  
  return <OurTeamPage data={data} />;
}

