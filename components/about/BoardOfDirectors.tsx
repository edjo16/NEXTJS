import { motion } from "framer-motion"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import Image from "../common/ImageBack"

type Director = {
  id: number
  integrant_index: number
  integrant_image: string
  integrant_name: string
  integrant_position: string
}

interface ValuesDirectorsProps {
  data: Director[]
}

export default function BoardOfDirectors({ data, title }: ValuesDirectorsProps & { title: string }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const directors: Director[] = data || []

  // Animation for the title
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Animation for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }


  // Animation for the background - starting from bottom
  const backgroundVariants = {
    initial: { height: "50%", bottom: 0, top: "auto" },
    hover: {
      height: "100%",
      transition: { duration: 0.3 },
    },
  }

  // function to render a director
  const renderDirector = (director: Director, index: number) => (
    <motion.div
      key={director.id || index}
      className="flex flex-col items-center max-w-[270px]"
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{ ...cardVariants }}
    >
      {/* Imagen */}
      <div className="relative w-full h-[280px] md:h-[380px] max-w-[300px] xl:max-w-[500px] aspect-square bg-gray-400 mb-1 overflow-hidden">
        {/* Background element that animates */}
        <motion.div
          className="absolute left-0 right-0 bg-gray-400 z-0"
          initial="initial"
          variants={backgroundVariants}
        />

        <Image
          src={director?.integrant_image || "/placeholder.svg"}
          alt={director?.integrant_name}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        <div className="absolute bottom-0 w-full h-1.5 bg-primary-500 z-20"></div>
      </div>

      {/* Información */}
      <div className="text-center">
        <p className="font-bold text-sm text-gray-900">{director?.integrant_name}</p>
        <p className={`font-semibold text-sm text-gray-800`}>{director?.integrant_position}</p>
      </div>
    </motion.div>
  )

  // Group directors by rows according to the design
  const firstRow = directors.slice(0, 3)
  const secondRow = directors.slice(3, 5)
  const thirdRow = directors.slice(5, 8)

  return (
    <div className="max-w-7xl xl:max-w-7xl mx-auto w-full  mb-6 xl:mb-10">
      <motion.div className="mb-8" initial="hidden" animate="visible" variants={titleVariants}>
        <div className="flex mb-2">
          <div className="w-16 h-1 bg-secondary-500"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-500">{title}</h2>
      </motion.div>
      {isMobile ? (
        <>
          <div className="grid grid-cols-2 gap-6 mb-5 xl:mb-10">
            {directors.map((director, index) => renderDirector(director, index))}
          </div>
        </>
      ) : (
        <>
          {/* first row - 3 directors */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-36 2xl:gap-60">
            {firstRow.map((director, index) => renderDirector(director, index))}
          </div>
          {/* second row - 2 directors centered */}
          <div className="w-full flex items-center py-10 gap-4">
            <div className="h-[0.25px] bg-gray-200 flex-1" />
            <h2 className="whitespace-nowrap text-2xl md:text-3xl font-bold text-primary-500">
             Independent Directors
            </h2>
            <div className="h-[0.25px] bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-36 mb-2 xl:mb-3 2xl:gap-60">
            {secondRow.map((director, index) => renderDirector(director, index + firstRow.length))}
          </div>
 
          {/* third row - 3 directors */}
          <div className="w-full flex items-center py-10 gap-4">
            <div className="h-[0.25px] bg-gray-200 flex-1" />
            <h2 className="whitespace-nowrap text-2xl md:text-3xl font-bold text-primary-500">
             Alternate Directors
            </h2>
            <div className="h-[0.25px] bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-36 2xl:gap-60">
            {thirdRow.map((director, index) => renderDirector(director, index + firstRow.length + secondRow.length))}
          </div>

        </>
      )}
    </div>
  )
}
