import Insights from '@/components/insights/Insigths';
import type { Metadata } from 'next';
import { fetchInsights } from '@/hooks/useGerInsigths';

export const metadata: Metadata = {
  title: 'Insights | Active RE',
  description: 'Explore in-depth analysis, insightful articles, and comprehensive market perspectives on reinsurance, featuring expert insights from Active Re specialists.',
  alternates: {
    canonical: 'https://active-re.com/insights',
  },
  openGraph: {
    title: 'Insights | Active RE',
    description: 'Analysis and market perspectives',
    type: 'website',
    images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/db4163a4-d57f-48d7-bf4a-bac12a881aae.png?format=webp`,
        width: 1200,
        height: 630,
        alt: 'Insights',
      },
    ],
  },
}

export default async function InsightsPage() {
  const data = await fetchInsights();
  
  return <Insights data={data} />;
}
