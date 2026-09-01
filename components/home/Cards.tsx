import { PrimaryInformation } from "../../types/home"
import PrimaryCard from '../cards/PrimaryCard'
import { motion } from "framer-motion"
import useScrollAnimation from "../../hooks/useScrollAnimation"
import { fadeInVariants } from "../../utils/animations"
import { useMediaQuery } from "../../hooks/useMediaQuery"

function CardItem({ item, reverse, ismobile }: { item: PrimaryInformation, reverse: boolean, ismobile: boolean }) {
  const section = useScrollAnimation(0.2)
  
  return (
    <section className="section-container">
      <motion.div
        ref={section.ref}
        initial="hidden"
        animate={section.inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden"
      >
        <PrimaryCard
          information_title={item?.information_title}
          information_description={item?.information_description}
          information_image={item?.information_image}
          link={item?.link}
          isRemote={ismobile || reverse}
        />
      </motion.div>
    </section>
  )
}

export default function Cards({ data, reverse = false }: { data: PrimaryInformation[], reverse?: boolean }) {
  const ismobile = useMediaQuery("(max-width: 768px)")
  return (
    <>
      {data && data.map((item, index) => (
        <CardItem key={index} item={item} reverse={reverse} ismobile={ismobile} />
      ))}
    </>
  )
}