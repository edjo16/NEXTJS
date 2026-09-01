"use client";

import React from 'react';
import KeyFigures from '@/components/home/Key';
import BackgroundImage from '@/components/common/BackgroundImage';
import BackgroundOverlay from '@/components/common/BackgroundOverlay';
import HomeContent from '@/components/home/HomeContent';
import type { HomePageData } from '@/types/home';
import type { News } from '@/types/insights';

interface HomeClientProps {
  data: HomePageData;
  recentNews: News[];
  youtube_videos: any[];
  lines: any[];
  insights: any[];
}

const HomeClient: React.FC<HomeClientProps> = ({ 
  data, 
  recentNews, 
  youtube_videos, 
  lines, 
  insights 
}) => {
  return (
    <>
      <BackgroundOverlay priority>
        <BackgroundImage data={data} />
        <KeyFigures 
          data={data?.Key_Figures} 
          title={data?.key_figures_title} 
          title_back={data?.key_figures_info} 
        />
      </BackgroundOverlay>
      <HomeContent 
        data={data} 
        recentNews={recentNews} 
        youtube_videos={youtube_videos} 
        lines={lines} 
        insights={insights} 
      />
    </>
  );
};

export default HomeClient;
