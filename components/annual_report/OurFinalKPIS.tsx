"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { fadeInVariants } from '../../utils/animations'

type KPI = {
  label: string
  value: string | number
  unit?: string
}

type Props = {
  title?: string
  subtitle?: string
  data?: KPI[]
}

const DEFAULT_KPIS: KPI[] = [
  { label: 'Gross Written Premium', value: 188.5, unit: 'm' },
  { label: 'Combined Ratio', value: 85.0, unit: '%' },
  { label: 'Loss Ratio', value: 57.7, unit: '%' },
  { label: 'Technical Profitability', value: 26.3, unit: '%' },
  { label: 'Return on Equity', value: 21.1, unit: '%' },
]

export default function OurFinalKPIS(props: Props) {
  const {
    title = 'Our Performance: Financial KPIs',
    subtitle = 'Avg. 5 Years 2020 - 2024',
    data = DEFAULT_KPIS,
  } = props || {}


  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
    }),
  }

  return (
    <section className="py-6 md:py-10 w-full overflow-hidden">
      <motion.div
        className="max-w-7xl md:max-w-6xl xl:max-w-7xl mx-auto px-4"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-500">
            {title}
          </h2>
          <p className="text-md md:text-lg text-gray-400 mt-1">{subtitle}</p>
        </div>

        <div>
          {/* Responsive wrapping grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-stretch">
            {data.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                data-kpi-card
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="w-full h-full bg-white rounded-md px-4 py-4 md:px-5 md:py-5 flex flex-col text-center gap-2 border border-gray-50 md:gap-3 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Label on top */}
                <div className="flex-0">
                  <p className="text-[11px] md:text-xs uppercase tracking-wide text-primary-500/80 font-semibold leading-tight max-w-[12rem] mx-auto break-words h-10 md:h-12 overflow-hidden">
                    {kpi.label}
                  </p>
                </div>

                {/* Big number below */}
                <div className="mt-auto leading-none">
                  <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-secondary-500">
                    {typeof kpi.value === 'number' ? kpi.value.toFixed(kpi.unit === '%' ? 1 : 1) : kpi.value}
                  </span>
                  {kpi.unit && (
                    <span className="ml-1 text-xl md:text-2xl lg:text-3xl font-bold text-secondary-500 align-top">
                      {kpi.unit}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
