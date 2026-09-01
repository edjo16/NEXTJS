import HomeClient from '@/components/home/HomeClient';
import type { Metadata } from 'next';
import { fetchInitialData } from '@/hooks/useGetInitialData';
import { fetchInsights } from '@/hooks/useGerInsigths';
import { News } from '@/types/insights';

// Generar metadata dinámica desde el servidor
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchInitialData();
    return {
      title: data?.title || 'Active Re | Reinsurance Company for Financial Institutions',
      description: data?.content?.substring(0, 160) || 'Specialised, Innovative and Trusted Worldwide. A global reinsurance partner offering strategic, ethical, and high-performing solutions across diverse markets.',
      alternates: {
        canonical: 'https://active-re.com',
      },
      openGraph: {
        title: data?.title || 'Active Re | Reinsurance Company for Financial Institutions',
        description: data?.content?.substring(0, 200) || 'A global reinsurance partner offering strategic, ethical, and high-performing solutions across diverse markets.',
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Active Re | Reinsurance Company for Financial Institutions',
      description: 'Specialised, Innovative and Trusted Worldwide. A global reinsurance partner offering strategic, ethical, and high-performing solutions across diverse markets.',
      alternates: {
        canonical: 'https://active-re.com',
      },
      openGraph: {
        title: 'Active Re | Reinsurance Company for Financial Institutions',
        description: 'A global reinsurance partner offering strategic, ethical, and high-performing solutions across diverse markets.',
        type: 'website',
        images: [
          {
            url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/54123061-72be-43a4-a0ea-1054c05bd61f.png?format=webp`,
            width: 1200,
            height: 630,
            alt: 'Home',
          },
        ],
      },
    };
  }
}

// Server Component con SSR
export default async function HomePage() {
  // Fetch data en el servidor
  const [data, insightsData] = await Promise.all([
    fetchInitialData().catch(() => null),
    fetchInsights().catch(() => null),
  ]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Error loading content</p>
      </div>
    );
  }

  // Preparar datos para el componente cliente
  const recentNews = data?.news?.slice(0, 3).sort((a: News, b: News) => a.index_articles_home - b.index_articles_home) || [];
  const youtube_videos = insightsData?.youtube_videos || [];
  const lines = data?.primary_information ? [data.primary_information[0]] : [];
  const insights = data?.primary_information ? [data.primary_information[1]] : [];

  return (
    <HomeClient
      data={data}
      recentNews={recentNews}
      youtube_videos={youtube_videos}
      lines={lines}
      insights={insights}
    />
  );
}
