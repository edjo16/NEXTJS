import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { MapPin, Pause, Play } from "lucide-react"

type Office = {
  id: number
  office_country: string
  Office_image: string
  office_content: string
}

interface OfficesProps {
  data: Office[]
}

export default function Offices({ data, title }: OfficesProps & { title: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const offices: Office[] = data || []
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  // Automatic carousel effect
  useEffect(() => {
    if (offices.length === 0 || isPaused) return

    intervalRef.current = setInterval(() => {
      setSelectedOfficeIndex((prev) => (prev === offices.length - 1 ? 0 : prev + 1))
    }, 12000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [offices.length, isPaused])

  const handleImageClick = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setSelectedOfficeIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <>
      <div className="border-t-4 border-secondary-500 w-20 mb-4"></div>
      <h2 className="text-3xl font-bold text-primary-500 mb-8">{title}</h2>

      <div className="relative mb-8">
          <div className="absolute top-2 right-2 z-20 bg-white">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={`w-10 h-10 border bg-secondary-500 text-white flex items-center justify-center hover:bg-white hover:text-secondary-500 hover:border-secondary-500 transition-colors`}
              aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
              {isPaused ? <Play/>: <Pause/>}
            </button>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-[3fr,2fr] xl:grid-cols-[2fr,2fr] gap-0">
          {/* Images Section */}
          <div className="relative overflow-hidden h-[300px] md:h-[350px] transition-all duration-500">
            <div className="flex h-full w-full">
              {offices.map((office, index) => {
                // Determine flex classes based on selection state
                let flexClasses = "flex-1"
                if (selectedOfficeIndex === index) {
                  flexClasses = "flex-[1.3] z-10"
                } else {
                  flexClasses = "flex-[0.5] opacity-70"
                }

                return (
                  <div
                    key={office.id}
                    className={`h-full transition-all duration-500 ease-in-out cursor-pointer relative ${flexClasses}`}
                    onMouseEnter={() => handleImageClick(index)}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={`${apiUrl}/assets/${office.Office_image}`}
                      alt={`${office.office_country} Office`}
                      fill
                      className="object-cover"
                    />
                    {selectedOfficeIndex !== index && (
                      <div className="absolute bottom-0 left-0 right-0  text-white p-5 text-sm">
                        <MapPin className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                )
              })}
                {/* Pause Button */}
            </div>
          </div>

          {/* Content Section - Always visible */}
          <div className="bg-sky-100 p-6 flex flex-col justify-center text-black h-[300px] md:h-[350px]">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">{offices[selectedOfficeIndex]?.office_country}</h3>
            <p className="text-md md:text-lg text-gray-800">{offices[selectedOfficeIndex]?.office_content}</p>
          </div>
        </div>

        </div>
    </>
  )
}
