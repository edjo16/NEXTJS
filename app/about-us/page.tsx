import About from '@/components/about/About';
import type { Metadata } from 'next';
import { fetchAbout } from '@/hooks/useGetAbout';


export const metadata: Metadata = {
  title: 'About us | Active RE',
  description: 'Who We Are, What We Stand For​.We believe that behind every risk, there is a relationship and behind every solution, a responsibility.',
  alternates: {
    canonical: 'https://active-re.com/about-us',
  },
  openGraph: {
    title: 'About us | Active RE',
    description: 'Who We Are, What We Stand For​.We believe that behind every risk, there is a relationship and behind every solution, a responsibility.',
    type: 'website',
    images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/552e0348-04d5-440a-8683-1c9e6ec24c42.jpg?format=webp`,
        width: 1200,
        height: 630,
        alt: 'About us',
      },
    ],
  },

};

export default async function AboutPage() {
  const data = await fetchAbout();
  
  return <About data={data} />;
}
