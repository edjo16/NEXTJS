import React from 'react';
import { Metadata } from 'next';
import NewsDetailClient from './NewsDetailClient';
import { fetchInsights } from '@/hooks/useGerInsigths';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const insightsData = await fetchInsights();
  const newsItem = insightsData.news.find((item) => item.code === code);

  if (!newsItem) {
    return {
      title: 'News Article',
      description: 'Read the latest news and insights from Active Re',
      alternates: {
        canonical: `https://active-re.com/news/${code}`,
      },
    };
  }

  return {
    title: `${newsItem.title_preview}`,
    description: newsItem.content_preview || 'Read the latest news and insights from Active Re',
    alternates: {
      canonical: `https://active-re.com/news/${code}`,
    },
    openGraph: {
      title: newsItem.title_preview,
      description: newsItem.content_preview || 'Read the latest news and insights from Active Re',
      type: 'article',
      images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/${newsItem?.preview_image?.filename_disk}`,
        width: 1200,
        height: 630,
        alt: `${newsItem.title_preview} image`,
      },
    ],
  },
}
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const insightsData = await fetchInsights();
    return insightsData.news.map((item) => ({ code: item.code }));
  } catch {
    return [];
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { code } = await params;
  const insightsData = await fetchInsights();
  
  const newsItem = insightsData.news.find((item) => item.code === code);
  
  if (!newsItem) {
    notFound();
  }
  
  const recentNews = insightsData.news.filter((item) => item.code !== code);
  
  return <NewsDetailClient newsItem={newsItem} recentNews={recentNews} />;
}