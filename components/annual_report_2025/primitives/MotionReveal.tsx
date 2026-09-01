'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

const directionVariants: Record<Direction, Record<string, number>> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.95 },
  none: {},
}

export default function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.2,
  ...props
}: {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
  [key: string]: any
}) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={cn(className)} {...props}>{children}</div>
  }

  const initial = { opacity: 0, ...directionVariants[direction] }
  const animate = { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
