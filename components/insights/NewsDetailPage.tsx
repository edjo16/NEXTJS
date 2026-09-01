"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDataContext } from '@/context/DataContext';
import { News } from '@/types/insights';
import NewsSections from '@/components/insights/news/NewSections';
import { Subtitle } from '@/components/ui/subtitleInsigths';
import RecentNewsDetails from '@/components/insights/RecentNewsDetails';
import { ChevronLeft } from 'lucide-react';
import Loading from '@/components/common/Loading';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import { useParams } from 'next/navigation';

const NewsDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    useCanonicalUrl(code ? `/news/${code}` : '/news');
    
    const context = useDataContext();
    if (!context) return <div>Error: Context not available</div>;
    const { cache } = context;

    const recentNews = cache?.insightsData?.news.filter((item: News) => item.code !== code);
    const newsItem: News | undefined = cache?.insightsData?.news.find((item: News) => item.code === code);
    if (!newsItem) {
        return <Loading />;
    }
    const title = newsItem.tags.includes("Articles") ? "Articles​" : newsItem.tags.includes("Interviews") ? "Interviews​" : 'Press Release';

    return (
        <div className="relative w-full">
            <div className="min-h-screen">
                <div className="relative bg-background-dark-b text-white min-h-68 h-[250px] sm:h-[200px] md:h-[370px] overflow-hidden">
                    <Image
                        src={title === "Articles​" ? "/images/articles.png" : "/images/insights_background.png"}
                        alt="Compliance Background"
                        fill
                        className="object-cover z-0"
                        priority
                    />

                    <div className="absolute inset-x-0 px-4 sm:px-4 bottom-4 z-10">
                        <div className="mx-auto pt-14 xl:ax-w-5xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl  text-white">
                            <div className="container-content">
                                {/* <h2 className="font-bold mb-6 text-[2.7rem] xs:text-[3.5rem] md:text-6xl xl:text-6xl leading-tight">
                                    {title === "Articles​" ? "Articles" : title}
                                </h2> */}
                            </div>
                        </div>
                    </div>
                </div>

                <section className={title === "Articles​" ? "mx-auto py-14 p-4  md-p-0 md:px-8 xl:py-14 max-w-3xl" : "mx-auto py-14 sm:p-2 px-4 md:px-4 xl:py-14 max-w-6xl "}>
                    <div className="flex mb-6 -ml-2">
                        <Link href="/news">
                            <span className="text-secondary-500 hover:text-primary-500 cursor-pointer font-semibold text-lg">
                                <ChevronLeft className="inline-block h-6 w-6" />
                                Insights
                            </span>
                        </Link>
                    </div>
                    <Subtitle title={newsItem?.title} copy_writer={newsItem?.copy_writer} type={title} />
                    <NewsSections newsItem={newsItem} />
                </section>
                {/* <div className='mx-auto w-10/12 border-b-2 border-b-gray-100 h-1'></div> */}
                <div className='bg-gray-50'>
                    <section className="py-6 px-4 xl:py-8 max-w-6xl mx-auto bg-gray-50/90">
                        <RecentNewsDetails news={recentNews} />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;
