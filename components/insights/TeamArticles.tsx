"use client";

import { motion } from "framer-motion"
import ImageBack from "../common/ImageBack"
import { RegularButton } from "../ui/buttons"
import { Subtitle } from "../ui/subtitle"
import Link  from "next/link"
import { formatDate } from "../../utils/formatDate"
import { News } from '../../types/insights';
import { useInsigth } from "../../context/Insight";
import { InsightType } from "../../context/Insight";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"

export default function TeamArticles({ team_articles = [], title='Articles & Interviews​' }: { team_articles: News[], title: string }) {
  const { setSelectedInsigth } = useInsigth()
  const router = useRouter();

  const itemsPerPage = 1;
  const totalPages = Math.ceil(team_articles.length / itemsPerPage);

  if (totalPages === 0) {
    return <p className="text-center text-gray-500">No articles available.</p>;
  }
  const filter_articles = team_articles.filter(item => item.index_articles).sort((a, b) => a.index_articles - b.index_articles);
  const FirstVisibleItem = filter_articles[0];
  const visibleItems = filter_articles.slice(1,3); 
 const handleClick = (type: InsightType) => {
    setSelectedInsigth(type)
    router.push("/news")
  }
  return (
    <section className="section-container">
      <Subtitle title={title} />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
        <div className="flex flex-col md:flex-row gap-8" key={FirstVisibleItem?.code}>
           <Link href={FirstVisibleItem?.code === 'annual-report-2024' ? '/annual-report' : `/news/${FirstVisibleItem?.code}`} key={FirstVisibleItem?.id}className="block">
          <motion.div
            className="group bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-52 md:h-56">
              <div className="w-full h-full">
                <ImageBack
                  src={FirstVisibleItem?.preview_image.filename_disk || "/placeholder.svg"}
                  alt={FirstVisibleItem?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {FirstVisibleItem?.title_preview}
              </h3>
              {FirstVisibleItem?.content_preview && (
                <p className="relative w-full max-w-3xl overflow-hidden  text-gray-700 font-family-display"
                  dangerouslySetInnerHTML={{ __html: FirstVisibleItem?.content_preview }} />
              )}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-md text-gray-500 mt-2">{formatDate(FirstVisibleItem?.date)}</span>
                <span className="text-orange-600 font-medium hover:underline">Read More</span>
              </div>
            </div>
          </motion.div>
          </Link>
        </div>
        <div className="flex flex-col gap-6 justify-between">
          {visibleItems.length > 0 && visibleItems.map((item: News) => (
            <Link href={`/news/${item?.code}`} key={item?.id}>
              <motion.div
                key={item.id}
                className="flex-wrap md:flex md:flex-nowrap shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[180px] bg-white group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="md:w-[340px] md:max-h-[220px] relative">
                <ImageBack src={item?.preview_image.filename_disk} alt={item?.title}
                  className="max-h-full md:w-[200px] md:h-full xl:w-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 flex-grow flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                  <h3 className="text-md md:text-md 2xl:text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {item?.title_preview}</h3>
                  </div>
                  <p className="relative w-full max-w-3xl overflow-hidden  text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item?.content_preview }} />
                  <p className="text-gray-600  mt-2">{formatDate(item?.date)}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-end gap-2 mt-4">
          <button className={` text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `}
          onClick={(e) => handleClick('Articles')}>
              View All Articles <ArrowRight className="ml-1" size={18}  />
          </button>
      </div>
    </section>
  );
}
