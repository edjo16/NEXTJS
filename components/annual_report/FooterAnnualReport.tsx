"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from "../ui/subtitle"
import ImageBack from "../../components/common/ImageBack"

type Props = {
    onOpenReport: () => void
}

const cards = [
    {
        key: 'financial-statement',
        title: 'Financial Statement',
        subtitle: 'Open Financial Statement',
        image: 'ba9b4254-dfe1-4061-a4a9-172a99aa3771.png',
        action: 'link' as const,
        href:
            'https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/ffc47826-a624-4615-9db4-4f6a186eb5b8?format=webp&quality=75',
    },
    {
        key: 'annual-report',
        title: 'View Annual Report',
        subtitle: 'Open PDF viewer',
        image:'8bbcbab7-5c08-409d-8370-f14864055453.webp',
        action: 'open-report' as const,
    },
    {
        key: 'view-rating',
        title: 'View Rating',
        subtitle: 'A.M. Best press release',
        image: '79d0aea1-bbcf-479a-9ced-db2e63d5d52a.png',
        action: 'link' as const,
        href: 'https://news.ambest.com/PR/PressContent.aspx?altsrc=108&refnum=36429',
    },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } },
}

export default function FooterAnnualReport({ onOpenReport }: Props) {
    return (
       <div className='bg-gray-50'>
        <section className="container-regular max-w-6xl">
            <div className='mx-auto max-w-6xl py-12'>
                <Subtitle title={"Official Documents"} />
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {cards.map((c) => (
                        <motion.div key={c.key} variants={fadeUp}>
                            <Card
                                title={c.title}
                                subtitle={c.subtitle}
                                image={c.image}
                                onClick={() => {
                                    if (c.action === 'open-report') onOpenReport()
                                }}
                                href={c.action === 'link' ? c.href : undefined}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
           </div>
    )
}

function Card({
    title,
    subtitle,
    href,
    image,
    onClick,
}: {
    title: string
    subtitle?: string
    image?:string
    href?: string
    onClick?: () => void
}) {
    const content = (
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}
          transition={{ duration: 0.25 }}
          className='grid grid-cols-2 shadow-md overflow-hidden min-h-[180px] bg-white'
        >
        {image &&<ImageBack src={image} alt="footer" />}
        <div
            className="group relative overflow-hidden border border-slate-200 bg-white shadow-sm p-6 cursor-pointer"
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={0}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick()
            }}
        >
            <div className="text-primary-500 font-semibold text-lg">{title}</div>
            {subtitle ? (
                <div className="text-slate-500 text-sm mt-1">{subtitle}</div>
            ) : null}
        </div>
        </motion.div>
    )

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                {content}
            </a>
        )
    }

    return content
}

