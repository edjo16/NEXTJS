"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { HeroPageData } from '../../../types/annualReport2025'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
}

export default function HeroContent({ hero }: { hero: HeroPageData }) {
    return (
        <section id="summary" className="ml-auto mr-auto max-w-5xl p-0">
            <div className="relative -mt-10 md:-mt-16 lg:-mt-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={stagger}
                  className="relative z-20 text-center bg-white rounded-tr-2xl rounded-tl-2xl pt-4 pb-4 md:pt-4 md:pb-4"
                >
                    <motion.h2 variants={fadeUp} className="max-w-4xl mx-auto text-primary-500 font-semibold text-center text-base md:text-xl 2xl:text-3xl leading-relaxed">
                        {hero?.hero_content_title}
                    </motion.h2>
                    <motion.h3 variants={fadeUp} className="relative overflow-hidden text-center text-base md:text-xl text-gray-800 font-family-display">
                        {hero?.hero_content_subtitle}
                    </motion.h3>
                    {hero?.hero_content && (
                        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-sm md:text-base leading-relaxed text-slate-600">
                            {hero.hero_content}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
