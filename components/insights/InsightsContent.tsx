"use client";
import React from 'react';
import { motion } from "framer-motion"
import FeaturedNews from "../../components/insights/FeaturedNews"
import RecentNews from "../../components/insights/RecentNews"
import TeamArticles from "../../components/insights/TeamArticles"
import VideoSection from "../../components/insights/VideoSection"
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { fadeInVariants } from '../../utils/animations.ts';
import { News, UseDataResult } from '../../types/insights';


const InsightsContent: React.FC<UseDataResult> = ({data}) => {
  const news = data?.news && data.news.sort((a: News, b: News) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
  const articles = news.filter((item: News) => item?.tags?.includes("Articles"))
  const justNews = news.filter((item: News) => !item?.tags?.includes("Articles"))
  const section = useScrollAnimation(0.2);
  const featuredNewsSection = useScrollAnimation(0.2);
  const recentNewsSection = useScrollAnimation(0.2);
  const videoSection = useScrollAnimation(0.2);
  const featuredNews = justNews.slice(0, 2) || [];
  const recentNews = justNews.slice(2) || [];
  return (
    <>
              <motion.div
                id='press-release'
                ref={section.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={section.inView ? "visible" : "hidden"}
              >
                <FeaturedNews news={featuredNews} title={data?.featured_title || ''} />
              </motion.div>
              <motion.div
                ref={featuredNewsSection.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={featuredNewsSection.inView ? "visible" : "hidden"}
              >
                <RecentNews news={recentNews} />
              </motion.div>
              <motion.div
                id='articles-and-interviews'
                ref={recentNewsSection.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={recentNewsSection.inView ? "visible" : "hidden"}
                className='bg-gray-50'
              >
                <TeamArticles team_articles={articles|| []} title={data?.articles_title || ''} />
              </motion.div>
              <motion.div
                id='media'
                ref={videoSection.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={videoSection.inView ? "visible" : "hidden"}
                className='mt-12 md:mt-14'
              >
                <VideoSection youtube_videos={data?.youtube_videos || []} title={data?.youtube_videos_title || ''} />
              </motion.div>
    </>
  );
};

export default InsightsContent;
