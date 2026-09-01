"use client";
import { useState, useEffect, useRef } from "react"
import type { KeyFigure } from "../../types/home"
import ImageBack from "../common/ImageBack"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import useScrollAnimation from "../../hooks/useScrollAnimation"
import { fadeInVariants } from "../../utils/animations"

export default function KeyFigures({ data, title, title_back}: { data: KeyFigure[], title?: string, title_back?: string }) {
  const section = useScrollAnimation(0.2)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const getVisibleItems = () => {
    if (isMobile) return 3
    return 6
  }

  const visibleItems = getVisibleItems()

  const nextSlide = () => {
    if (data) {
      const maxIndex = Math.max(0, data.length - visibleItems)
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + visibleItems))
    }
  }

  const prevSlide = () => {
    if (data) {
      const maxIndex = Math.max(0, data.length - visibleItems)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : Math.max(0, prevIndex - visibleItems)))
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      },
    }),
  }

  // Calculate how many items to show
  const getCardWidth = () => {
    if (isMobile) return "calc(33.333% - 8px)"
    return ""
  }

  return (
    <div className="py-4 md:pb-8 lg:pb-16 px-0.5 md:px4 w-full relative overflow-hidden z-20">
      <motion.section
        ref={section.ref}
        variants={fadeInVariants}
        initial="hidden"
        animate={section.inView ? "visible" : "hidden"}
      >

        <div className="max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
          {!isMobile && (
            <motion.h2
              className="text-4xl font-bold text-center text-white mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title || ""}
            </motion.h2>
          )}
          {/* Mobile Carousel View */}
          {isMobile && (
            <div className="relative pb-4">
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10  text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div ref={carouselRef} className="overflow-hidden mx-6">
                <motion.div
                  className="flex gap-2.5"
                  initial={false}
                  animate={{
                    x: -currentIndex * (100 / visibleItems) + "%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {data &&
                    data.map((item: any, index: number) => (
                      <motion.div
                        className="bg-white rounded-md  mb-2 p-4 flex flex-col items-center justify-center"
                        style={{
                          width: getCardWidth(),
                          minWidth: getCardWidth(),
                          flex: "0 0 calc(33.333% - 8px)",
                        }}
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                      >
                        <ImageBack
                          src={item?.key_icon + ".svg" || "/placeholder.svg"}
                          alt={item?.key_description}
                          className="primary-500 w-8 h-8 mb-4 text-primary-500"
                        />
                        <span className="text-xl md:text-2xl xl:text-4xl font-bold text-secondary-500 mb-1">{item?.key_name}</span>
                        <span className="primary-500 text-sm text-center text-primary-500">{item?.key_description}</span>
                      </motion.div>
                    ))}
                </motion.div>
                <span className="absolute bottom-0 mx-auto text-gray-100 text-xs">{title || 'Rating by AM BEST - Figures in Millions - As of December 31, 2024'}</span>
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10  text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Desktop Grid View */}
          {!isMobile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              {data &&
                data.map((item: any, index: number) => (
                  <motion.div
                    className="bg-white rounded-md p-6 flex flex-col items-center justify-center h-full"
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageBack
                      src={item?.key_icon + ".svg" || "/placeholder.svg"}
                      alt={item?.key_description}
                      className="primary-500 w-8 h-8 mb-4 text-primary-500"
                    />
                    <span className="text-4xl md:text-2xl xl:text-4xl font-bold text-secondary-500 mb-1">
                      {item?.key_name}
                    </span>
                    <span className="primary-500 text-sm text-center text-primary-500">
                      {item?.key_description}
                    </span>
                  </motion.div>
                ))}

              {/* Texto integrado como motion.div */}
              <motion.div
                className="col-span-full flex justify-start items-center mt-2"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <span className="text-gray-100 text-md text-start">
                  {title_back || "Rating by AM BEST - Figures in Millions - As of December 31, 2024"}
                </span>
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

