"use client";

import BackgroundParalax from '@/components/common/BackgroundParalax.tsx';
import AboutContent from '@/components/about/AboutContent.tsx';
import YoutubeCard from '@/components/cards/YoutubeCard.tsx';
import BackgroundOverlay from '@/components/common/BackgroundOverlay.tsx';
import { useMediaQuery } from '@/hooks/useMediaQuery.tsx';
import { AboutUsPageData } from '@/types/about.ts';

interface AboutProps {
  data: AboutUsPageData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="relative w-full">
      {isMobile ? (
        <BackgroundOverlay>
          <BackgroundParalax data={data} />
          <YoutubeCard 
            video_link={data?.video_link} 
            video_title={data?.video_title} 
            video_description={data?.video_description} 
            video_button_content={''} 
          />
        </BackgroundOverlay>
      ) : (
        <BackgroundParalax data={data} />
      )}
      <AboutContent data={data} />
    </div>
  );
};

export default About;