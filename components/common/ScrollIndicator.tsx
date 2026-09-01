
import { motion, useScroll } from "framer-motion"
export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-secondary-500 origin-left z-40"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
