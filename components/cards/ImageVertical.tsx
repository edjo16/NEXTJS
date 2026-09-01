"use client";
import ImageBack from '../common/ImageBack'
import { RegularButton } from '../ui/buttons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { JSX } from 'react';

export default function ImageVertical({
  information_title,
  information_description,
  information_image,
  link,
  brochure_file,
}: {
  information_title: string
  information_description: string
  information_image: string
  link?: string
  brochure_file?: string
}): JSX.Element {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
  const isMobile = useMediaQuery('(max-width: 768px)')
  const brochureFileUrl = brochure_file ? `${apiUrl}/assets/${brochure_file}.pdf` : null
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!brochureFileUrl) return
    setIsDownloading(true)
    try {
      const response = await fetch(brochureFileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Active-Re-Brochure.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Error downloading the file:', e)
    }
    setIsDownloading(false)
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {information_title && information_image && (
        <>
          <div className={`flex flex-col justify-center ${isMobile ? 'order-1' : 'order-2 md:order-1'} py-8`}>
            <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-500 mb-6">{information_title}</h2>
            <p className="text-md md:text-xl text-gray-800 mb-8">{information_description || ''}</p>
            {link && (
              <RegularButton
                text={`Learn more`}
                link={link}
              />
            )}
            {brochureFileUrl && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className={`w-full md:w-1/2 z-20 top-4 right-0 group overflow-hidden rounded px-6 py-3 font-medium transition-all
                  ${isDownloading ? 'bg-primary-500/80 text-white' : 'bg-primary-500 text-white hover:bg-secondary-600'}`}
                disabled={isDownloading}
              >
                <AnimatePresence mode="wait">
                  {isDownloading ? (
                    <motion.div
                      key="downloading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: 'linear' }}
                        className="mr-2 h-5 w-5"
                      >
                        <Download className="h-5 w-5" />
                      </motion.div>
                      <span>Downloading...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="download"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      <span>Download Brochure</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>

          <div className={`relative w-full h-auto min-h-200px ${isMobile ? 'order-2' : 'order-1 md:order-2'}`}>
            <ImageBack
              src={information_image}
              alt={information_title}
              fill={!isMobile}
            />
          </div>
        </>
      )}
    </section>
  )
}
