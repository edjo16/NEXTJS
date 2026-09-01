"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { LinesOptions } from "../../types/lineOfBusiness";
import { Subtitle } from "../ui/subtitle";
import Image from "../../components/common/ImageBack";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
export default function OptionsLines({ linesOptions }: { linesOptions: LinesOptions[] }) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const handleCardClick = (id: number) => {
    if (selectedCard === id) {
      setSelectedCard(null)
    } else {
      setSelectedCard(id)
    }
  }

  return (
    <div className="container-regular">
      <div className="flex mb-6 -ml-2">
        <Link href="/">
          <span className="text-secondary-500 hover:text-primary-500 cursor-pointer font-semibold text-lg">
            <ChevronLeft className="inline-block h-6 w-6" />
            Home
          </span>
        </Link>
      </div>
      <Subtitle title={"Explore your options"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {linesOptions && linesOptions.map((card) => (
          <div key={card.id} className="relative">
            {/* Tarjeta original */}
            <div
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => handleCardClick(card.id)}
            >
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src={card.image_option}
                  alt={card.image_option}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{card?.button_content}</span>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta con información adicional */}
            <AnimatePresence>
              {selectedCard === card.id && (
                <motion.div
                  className="absolute z-10 bg-white rounded-lg shadow-xl overflow-hidden h-full"
                  style={{
                    top: 10,
                    left: 10
                  }}
                  initial={{ opacity: 0, x: -5, y: -5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -5, y: -5 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCard(null)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="bg-white h-full flex flex-col">
                    <div className="p-4 flex-1 overflow-y-auto">
                      <h3 className="text-lg text-primary-500 font-bold mb-2">{card.button_content}</h3>
                      <p className="text-gray-600 text-sm mb-4">{card.content}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
