"use client";

import React from 'react';
import NewsHome from '@/components/insights/NewsHome';
import VideoSection from '@/components/insights/VideoSection';
import Cards from '@/components/home/Cards';
import GlobalPresence from '@/components/home/GlobalPresence';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function HomeContent({ data, recentNews, youtube_videos, lines, insights }: { data: any, recentNews: any, youtube_videos: any, lines: any, insights: any }) {
    const newsHomeSection = useScrollAnimation(0.2);
    const globalSection = useScrollAnimation(0.2);
    const cardsSection = useScrollAnimation(0.2);
    const cardsSection2 = useScrollAnimation(0.2);
    const videoSection = useScrollAnimation(0.2);

    return (
        <>
            <div
                id="featured"
                ref={newsHomeSection.ref}
                className={`fade-in-section ${newsHomeSection.inView ? 'is-visible' : ''}`}
            >
                <NewsHome news={recentNews} title={data?.title_news_section} />
            </div>
            <div
                id="line-of-business"
                ref={cardsSection.ref}
                className={`fade-in-section ${cardsSection.inView ? 'is-visible' : ''}`}
            >
                <Cards data={lines} />
            </div>
            <div
                id="global-presence"
                ref={globalSection.ref}
                className={`fade-in-section ${globalSection.inView ? 'is-visible' : ''}`}
            >
                <GlobalPresence data={data} />
            </div>
            <div
                id="financial-information"
                ref={cardsSection2.ref}
                className={`fade-in-section ${cardsSection2.inView ? 'is-visible' : ''}`}
            >
                <Cards data={insights} reverse={true} />
            </div>
            <div
                id="media"
                ref={videoSection.ref}
                className={`fade-in-section ${videoSection.inView ? 'is-visible' : ''}`}
            >
                <VideoSection youtube_videos={youtube_videos || []} title={data?.youtube_videos_title} />
            </div>
        </>
    );
}
