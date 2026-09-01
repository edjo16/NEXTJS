'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
  amount = 0.1,
  ...props
}: {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  amount?: number
  [key: string]: any
}) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={cn(className)} {...props}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
