"use client";

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { News } from "../../types/insights"
import ImageBack from "../common/ImageBack"
import { formatDate } from "../../utils/formatDate"
import Link  from "next/link"
import { Subtitle } from "../ui/subtitle"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { RegularButton } from "../ui/buttons"
import { useInsigth } from "../../context/Insight";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"
import { InsightType } from "../../context/Insight";

export default function RecentNews({ news, rute = "news" }: { news: News[], rute?: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const { setSelectedInsigth } = useInsigth()
  const router = useRouter();

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

 const handleClick = (type: InsightType) => {
    setSelectedInsigth(type)
    router.push("/news")
  }
  return (
    <>
      {visibleItems.length > 0 && (
        <section className="section-container-top">
          {/* <Subtitle title={"Recent news"} /> */}
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-4`}>
            {visibleItems.map((item, index) => (
              <Link href={`/${rute}/${item?.code}`} key={item?.id}>
                <motion.div
                  key={item.id}
                  className="flex shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[180px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ImageBack src={item?.preview_image.filename_disk} alt={item?.title} width={380} />
                  <div className="p-3 flex-grow flex flex-col justify-between bg-white">
                    <h4 className="font-medium text-sm">{item?.title_preview}</h4>
                    <p className="text-gray-800">{formatDate(item?.date)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-end gap-2">
          <div className="flex justify-end mt-12 gap-2">
          </div>
           <button className={` text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `}
          onClick={(e) => handleClick('Press Release')}>
              View All Press Releases <ArrowRight className="ml-1" size={18}  />
          </button>
          </div>
        </section>
      )}
    </>
  )
}