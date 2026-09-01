import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

type Values = {
  id: number
  value_title: string
  image_background: string
  value_description: string
}

interface ValuesCarouselProps {
  data: Values[]
}

export default function ValuesCarousel({ data }: ValuesCarouselProps) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
  const slides: Values[] = data || []
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }, [slides.length])


  // Function to go to a specific slide
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  // Effect for autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div id='values' className="w-full h-[450px] md:h-[500px] lg:h-[500px] xl:h-[800px] bg-cover bg-center relative">
      {/* Slides */}
      {slides &&
        slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image with overlay */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <Image
                src={
                  slide?.image_background
                    ? `${apiUrl}/assets/${slide?.image_background}`
                    : "/placeholder.svg?height=800&width=1200"
                }
                alt={slide?.value_title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content of slide */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center text-white text-center px-4">

              <h2 className="text-4xl md:text-5xl font-bold mt-16 lg:mt-28">Our Values</h2>
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-semibold mb-2">{slide?.value_title}</h3>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-orange-500" />
                </div>
                <p className="text-lg md:text-xl mt-2 max-w-2xl">{slide?.value_description}</p>
              </div>              </div>

          </div>
        ))}

      {/* Navigation Buttons (uncomment if needed) */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" size={24} />
      </button> */}

      {/* Indicators (dots) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides &&
          slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-orange-500" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
      </div>
    </div>
  )
}
