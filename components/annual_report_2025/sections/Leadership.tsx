"use client"
import React from 'react'
import { Users } from 'lucide-react'
import { motion } from 'framer-motion'
import ExecutiveMessage from '../sections_body/ExecutiveMessage'
import Kicker from '../primitives/Kicker'
import type { ExecutivePageData } from '@/types/annualReport2025'
import MessageBox from '../primitives/MessageBox'

export default function Executive({ executive, onOpenPage }: { executive: ExecutivePageData, onOpenPage?: (page: number) => void }) {
  const chairmanPage = typeof executive?.chairman_page !== 'undefined' ? Number(executive.chairman_page) : undefined
  const ceoPage = typeof executive?.ceo_page !== 'undefined' ? Number(executive.ceo_page) : undefined

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  return (
    <section id="executive" className="py-8 px-8" style={{ fontFamily: "Poppins" }}>
      <div className="mx-auto max-w-content">
        <Kicker title={executive.title} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          <ExecutiveMessage
            title={executive?.chairman_title || ''}
            imageDiskName={executive?.chairman_image?.filename_disk}
            alt="Executive Chairman"
            quote={executive?.chairman_quote}
            messageHtml={executive?.chairman_message}
            name={executive?.chairman_name}
            position={executive?.chairman_position || 'Executive Chairman'}
            imageSide="left"
            page={chairmanPage}
            onOpenPage={onOpenPage}
            motionDirection="left"
            modalSectionTitle={executive?.section_chairman_title}
            modalContentHtml={executive?.section_chairman_content}
            modalColumn3Html={executive?.section_chairman_3}
            modalSectionItemsTitle={executive?.section_chairman_1_title}
            modalSectionMessage={executive?.section_chairman_message}
          />
            <ExecutiveMessage
                title={executive?.ceo_title || ''}
                imageDiskName={executive?.ceo_image?.filename_disk}
                alt="CEO"
                quote={executive?.ceo_quote}
                messageHtml={executive?.ceo_message}
                name={executive?.ceo_name}
                position={executive?.ceo_position || 'Chief Executive Officer'}
                imageSide="left"
                page={ceoPage}
                onOpenPage={onOpenPage}
                motionDirection="right"
                modalSectionTitle={executive?.section_ceo_title}
                modalContentHtml={executive?.section_ceo_content}
                modalColumn3Html={executive?.section_ceo_3}
                modalSectionItemsTitle={executive?.section_ceo_1_title}
                modalSectionMessage={executive?.section_ceo_message}
                paginateItems
            />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <MessageBox
            icon={<Users className="h-10 w-10" />}
            className="mt-4"
          >
            {executive?.leadership_message}
          </MessageBox>
        </motion.div>
      </div>
    </section>
  )
}
