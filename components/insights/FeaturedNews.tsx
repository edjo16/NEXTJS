"use client";
import { motion } from "framer-motion"
import { News } from "../../types/insights"
import ImageBack from "../common/ImageBack"
import { formatDate } from "../../utils/formatDate"
import Link  from "next/link"
import { Subtitle } from "../ui/subtitle"

export default function FeaturedNews({ news, title='Stay up to date with our Press Release' }: { news: News[], title: string }) {
  return (
    <div className="section-container">
      <div className="flex items-center justify-between">
        <div><Subtitle title={title} /></div>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
        {news && news.map((item, index) => (
          <Link href={`/news/${item?.code}`} key={item?.id} className="block">
            <motion.div
              className="group bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-52 md:h-56">
                <div className="w-full h-full">
                  <ImageBack
                    src={item?.preview_image?.filename_disk || "/placeholder.svg"}
                    alt={item?.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="flex gap-2">
                  {item?.tags?.map((tag: string, index: number) => (
                    <span key={index} className="inline-block px-3 py-1 text-xs font-semibold bg-gray-50 text-primary-500 rounded-full mb-3">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {item?.title_preview}
                </h3>
                {item?.content_preview && (
                  <p className="text-gray-800 mb-4 line-clamp-2">{item?.content_preview}</p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500">{formatDate(item?.date)}</span>
                  <span className="text-orange-600 font-medium hover:underline">Read More</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
