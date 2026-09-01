"use client";
import Link from 'next/link';
import type { Address } from "../../types/contacts"
import ImageBack from "../common/ImageBack"
import { motion } from "framer-motion"
import { MapPin, Target } from "lucide-react"
import { useState } from "react"
export default function AddressSection({ address, title }: { address: Address[] , title: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Animation variants for each card
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <>
      <div className="border-t-4 border-secondary-500 w-16 mb-4"></div>
      <h2 className="text-2xl font-bold text-primary-500 mb-8">{title}</h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-2 md:gap-6 lg:gap-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {address && address.map((address, index) => (
          <motion.div
            key={index}
            className="flex flex-col h-full bg-white shadow p-4 relative"
            variants={cardVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Type tag at the top */}
            <div
              className="absolute top-0 right-0 z-10"
            >
              <span
                className={`inline-block ${address?.type === "Representative office"
                  ? "bg-celeste-500"
                  : "bg-ocre-500"
                  } text-white text-xs px-2 py-1 rounded-l-lg`}
              >
                {address?.type}
              </span>
            </div>

            <h3 className="text-secondary-500 font-semibold sm:mt-5 mt-3 mb-2">{address?.city}</h3>
            <p className="text-gray-700 mb-3 text-sm flex-1">{address?.address}</p>
            <div className="mt-auto">
              <Link href={`${address?.link_map}`} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative"
                >
                  <ImageBack
                    src={address?.map_image || "/placeholder.svg"}
                    alt={address?.city}
                    className="h-24 w-24 object-cover rounded shadow-sm"
                  />
                  {hoveredIndex === index && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-300 bg-white/80 px-2 py-1 rounded text-xs shadow">
                    <MapPin/> Let&apos;s go to {address?.city}
                    </span>
                  )}
                  </motion.div>
              </Link>
            </div>
          </motion.div>
  ))}
  </motion.div>
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-ocre-500"></span>
          <p>Domicile Office</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-celeste-500"></span>
          <p>Representative office</p>
        </div>
      </div>
    </>
  )
}

