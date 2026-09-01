"use client";

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { NewsHome } from "../../types/insights"
import ImageBack from "../common/ImageBack"
import { formatDate } from "../../utils/formatDate"
import Link from "next/link"
import { Subtitle } from "../ui/subtitle"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { RegularButton } from "../ui/buttons"

export default function NewsHome({ news, title='Featured', rute='news' }: { news: NewsHome[], title: string, rute?: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(max-width: 1024px) and (min-width: 768px)")
  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3
  const totalPages = news && Math.ceil(news.length / itemsPerPage) || 0
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleItems = news && news.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) || []

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }
  return (
    <>
      {visibleItems && (
          <div className="section-container-back">
            <div className="flex items-center justify-between">
            <div>
              <Subtitle title={title} />
            </div>
              <RegularButton text="View All News" link={`/${rute}`} type="quarterly" />
            </div>

            <div className={`grid grid-cols-1 ${isTablet ? "md:grid-cols-2" : "md:grid-cols-3"} gap-8`}>
              {visibleItems && visibleItems.map((item, index) => (
                <Link href={item?.is_annual_report == true ? item?.annual_report_link : `/${rute}/${item?.code}`} key={item?.id} className="block">
                  <motion.div
                    className="group bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-52 md:h-44">
                      <div className="w-full h-full">
                        <ImageBack
                          src={item?.preview_image || "/placeholder.svg"}
                          alt={item?.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <p className="text-gray-800 mb-4 line-clamp-2">{truncateText(item?.content_preview, 120)}</p>
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
            <div className="flex items-center justify-between">
                <div className="flex md:hidden items-center justify-between mt-10 ">
            {totalPages > 1 && (
              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-500 text-white hover:bg-secondary-500 transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPage}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
            </div>
          </div>
      )}
    </>
  )
}
