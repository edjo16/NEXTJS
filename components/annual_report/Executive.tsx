"use client"
import React from 'react'
import BackgroundTitleReport from '../common/BackgroundTitleReport'
import ExecutiveMessage from './ExecutiveMessage'

export default function Executive({ executive, onOpenPage }: { executive: any, onOpenPage?: (page: number) => void }) {
  const chairmanPage = typeof executive?.chairman_page !== 'undefined' ? Number(executive.chairman_page) : undefined
  const ceoPage = typeof executive?.ceo_page !== 'undefined' ? Number(executive.ceo_page) : undefined

  return (
    <section id="executive" className="container-regular max-w-3xl py-16">
      <BackgroundTitleReport data={executive} />

      <div className="mx-auto max-w-3xl space-y-20">
        <ExecutiveMessage
          title={executive?.chairman_title || ''}
          imageDiskName={executive?.chairman?.filename_disk}
          alt="Executive Chairman"
          messageHtml={(executive as any)?.chairman_message}
          name={executive?.chairman_name}
          imageSide="left"
          page={chairmanPage}
          quote={executive?.chairman_quote}
          onOpenPage={onOpenPage}
        />
        {/* Divider line */}
        <hr className="border-orange-500" />

        <ExecutiveMessage
          title={executive?.ceo_title || ''}
          imageDiskName={executive?.ceo?.filename_disk}
          alt="CEO"
          messageHtml={(executive as any)?.ceo_message}
          name={executive?.ceo_name}
          imageSide="right"
          page={ceoPage}
          quote={executive?.ceo_quote}
          onOpenPage={onOpenPage}
        />
      </div>
    </section>
  )
}
