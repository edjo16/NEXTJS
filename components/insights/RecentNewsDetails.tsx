"use client";
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { News } from "../../types/insights"
import ImageBack from "../common/ImageBack"
import { formatDate } from "../../utils/formatDate"
import Link from "next/link"
import { Subtitle } from "../ui/subtitle"
import { useMediaQuery } from "../../hooks/useMediaQuery"

export default function RecentNews({ news, rute = "news" }: { news: News[], rute?: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(news.length / itemsPerPage) || 0

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleItems = news.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <>
      {visibleItems.length > 0 && (
        <section className="pt-10 pb-12  mx-auto mt-6">
          <Subtitle title={"Relevant Content"} />
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-4`}>
            {visibleItems.map((item, index) => (
              <Link href={`/${rute}/${item?.code}`} key={item?.id}>
                <motion.div
                  key={item.id}
                  className="grid grid-cols-2 gap-4 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[180px] bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ImageBack src={item?.preview_image.filename_disk} alt={item?.title} height={180} />
                  <div className="p-3 flex-grow flex flex-col justify-between bg-white">
                    <h4 className="font-medium text-sm">{item?.title_preview}</h4>
                    <p className="text-gray-600">{formatDate(item?.date)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={prevPage}
              className="w-12 h-12 bg-secondary-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 border border-secondary-500 text-secondary-500 flex items-center justify-center mr-2 hover:bg-secondary-500 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}
    </>
  )
}
