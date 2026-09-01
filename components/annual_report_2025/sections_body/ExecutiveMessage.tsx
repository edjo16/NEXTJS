"use client"
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ArrowRight, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageBack from '../../common/ImageBack'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

type Side = 'left' | 'right'

interface Props {
    title: string
    imageDiskName?: string
    alt?: string
    messageHtml?: string
    name?: string
    position?: string
    imageSide?: Side
    className?: string
    page?: number
    quote?: string
    onOpenPage?: (page: number) => void
    motionDirection?: 'left' | 'right'
    modalSectionTitle?: string
    modalContentHtml?: string
    modalColumn3Html?: string
    modalSectionItemsTitle?: string
    modalSectionMessage?: string
    paginateItems?: boolean
}

const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } },
}

export default function ExecutiveMessage({
    title,
    imageDiskName,
    alt = 'executive portrait',
    messageHtml,
    name,
    position,
    imageSide = 'left',
    className = '',
    page,
    quote,
    onOpenPage,
    motionDirection = 'left',
    modalSectionTitle,
    modalContentHtml,
    modalColumn3Html,
    modalSectionItemsTitle,
    modalSectionMessage,
    paginateItems = false,
}: Props) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [modalOpen, setModalOpen] = useState(false)
    const isLeft = motionDirection === 'left'
    const slideX = isLeft ? -30 : 30

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const hasOpened = useRef(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLSpanElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const ITEMS_PER_PAGE = 7
    const ITEMS_PER_COL = 4

    const chunks = useMemo(() => {
        if (!modalContentHtml) return []
        const raw = modalContentHtml.split(/;\s*/).filter(c => c.trim().length > 0)
        return raw.map(c => c.replace(/^<p>|<\/p>$/g, ''))
    }, [modalContentHtml])

    const pageCount = useMemo(() => {
        if (!paginateItems) return 1
        return Math.max(1, Math.ceil(chunks.length / ITEMS_PER_PAGE))
    }, [chunks, paginateItems])

    useEffect(() => {
        setTotalPages(pageCount)
        setCurrentPage(c => Math.min(c, pageCount - 1))
    }, [pageCount])

    const pageChunks = useMemo(() => {
        if (!paginateItems) return chunks
        const start = currentPage * ITEMS_PER_PAGE
        return chunks.slice(start, start + ITEMS_PER_PAGE)
    }, [chunks, currentPage, paginateItems])

    const col1Chunks = useMemo(() => {
        if (paginateItems) return pageChunks.slice(0, ITEMS_PER_COL)
        const split = Math.ceil(pageChunks.length / 2)
        return pageChunks.slice(0, split)
    }, [pageChunks, paginateItems])
    const col2Chunks = useMemo(() => {
        if (paginateItems) return pageChunks.slice(ITEMS_PER_COL, ITEMS_PER_PAGE)
        const split = Math.ceil(pageChunks.length / 2)
        return pageChunks.slice(split)
    }, [pageChunks, paginateItems])

    const variants = {
        hidden: { opacity: 0, x: slideX },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
    }

    const ImageBlock = (
        <motion.div
            variants={itemFade}
            className="relative w-full max-w-[280px] shrink-0 mx-auto md:mx-0 mb-0"
        >
            {imageDiskName ? (
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                    <ImageBack
                        src={imageDiskName}
                        alt={alt}
                        activeTransition={false}
                        className="h-[230px] md:h-[255px]"
                    />
                </motion.div>
            ) : (
                <div className="h-[260px] w-full bg-slate-100 border border-slate-200" />
            )}
        </motion.div>
    )

    const goToPage = useCallback((p: number) => {
        setCurrentPage(Math.max(0, Math.min(p, totalPages - 1)))
    }, [totalPages])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setModalOpen(false)
        if (paginateItems && !isMobile && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault()
            goToPage(currentPage + (e.key === 'ArrowRight' ? 1 : -1))
        }
    }, [currentPage, goToPage, isMobile, paginateItems])

    useEffect(() => {
        if (!modalOpen) {
            if (hasOpened.current) {
                triggerRef.current?.focus()
            }
            return
        }
        hasOpened.current = true
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('[data-modal-close]')
        closeBtn?.focus()
        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, scrollY)
        }
    }, [modalOpen])

    const needsPagination = !isMobile && paginateItems && totalPages > 1

    return (
        <motion.section
            variants={variants}
            className={`w-full ${className}`}
        >
            {isMobile &&
                <>
                    <h2 className="text-sm md:text-base font-bold text-primary-500" style={{ fontFamily: "Poppins" }}>{title}</h2>
                    <p className="mt-1 mb-6 font-semibold text-md text-primary-900" style={{ fontFamily: "Poppins" }}>{name}</p>
                </>
            }
            <div
                className={`grid grid-cols-1 md:grid-cols-2 items-start gap-8`}>
                {imageSide === 'left' ? (
                    <div className="col-span-1 flex md:justify-start justify-center order-1 md:order-1">{ImageBlock}</div>
                ) : null}
                <div className={`col-span-1 order-2 ${imageSide === 'right' ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="text-slate-700 leading-relaxed">
                        <motion.h2 variants={itemFade} className="text-sm md:text-base font-bold text-ocre-500" style={{ fontFamily: "Poppins" }}>{title}</motion.h2>
                        <motion.div variants={itemFade} className="pt-6 h-8 w-8 flex items-center justify-center text-ocre-500 select-none">
                            <Quote size={36} className="rotate-180" />
                        </motion.div>
                        <motion.div variants={itemFade} className={`relative overflow-hidden font-family-display text-[15px] md:text-[16px]`}>
                            {quote && (
                                <blockquote className="relative mt-2 mb-2 pl-6 text-primary-900">
                                    <span aria-hidden className="absolute left-0 top-0 font-serif text-2xl leading-none text-ocre-600">&ldquo;</span>
                                    {quote}
                                </blockquote>
                            )}
                            {messageHtml && (
                                <div
                                    className="mt-6 text-primary-900 [&_p]:mt-2"
                                    dangerouslySetInnerHTML={{ __html: messageHtml }}
                                />
                            )}
                        </motion.div>
                        {name && (
                            <motion.p variants={itemFade} className="mt-1 font-semibold text-sm text-primary-900" style={{ fontFamily: "Poppins" }}>{name}</motion.p>
                        )}
                        {position && (
                            <motion.p variants={itemFade} className="mt-1 mb-4 font-semibold text-xs text-primary-900" style={{ fontFamily: "Poppins" }}>{position}</motion.p>
                        )}

                        {modalContentHtml ? (
                            <motion.span
                                ref={triggerRef}
                                variants={itemFade}
                                className="inline-flex items-center gap-2 text-md text-primary-500 hover:text-ocre-500 cursor-pointer group"
                                onClick={() => setModalOpen(true)}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalOpen(true) } }}
                            >
                                Read Message <motion.span
                                    className="inline-block"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                ><ArrowRight size={20} /></motion.span>
                            </motion.span>
                        ) : null}
                    </div>
                </div>

                {imageSide === 'right' ? (
                    <div className="col-span-1 flex md:justify-end justify-center order-1 md:order-2">{ImageBlock}</div>
                ) : null}
            </div>
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-white overflow-y-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-label={modalSectionTitle || title}
                        onKeyDown={handleKeyDown}
                    >
                        <div className="mx-auto max-w-content px-6 md:px-12 py-8 relative">
                            <div data-modal-header className="flex items-start justify-between mb-8">
                                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-ocre-500" style={{ fontFamily: "Poppins" }}>
                                    {modalSectionTitle || title}
                                </h2>
                                <button
                                    data-modal-close
                                    onClick={() => setModalOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0 ml-4"
                                    aria-label="Close modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {(!paginateItems || currentPage === 0) && modalSectionItemsTitle && (
                                <h3 data-section-title className="text-sm md:text-md 2xl:text-lg mb-2" style={{ fontFamily: "Poppins" }}>
                                    {modalSectionItemsTitle}
                                </h3>
                            )}

                            {isMobile ? (
                                <div className="grid grid-cols-1 gap-8">
                                    {chunks.map((c, i) => (
                                        <p key={i} className="mt-2 text-sm md:text-md 2xl:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: c }} />
                                    ))}
                                    {modalColumn3Html && (
                                        <div className="text-sm md:text-md 2xl:text-lg [&_p]:mt-2 leading-relaxed">
                                            <span className="inline" dangerouslySetInnerHTML={{ __html: modalColumn3Html }} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                    <div className="flex flex-col gap-4">
                                        {col1Chunks.map((c, i) => (
                                            <p key={i} className="text-sm md:text-md 2xl:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: c }} />
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {col2Chunks.map((c, i) => (
                                            <p key={i} className="text-sm md:text-md 2xl:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: c }} />
                                        ))}
                                        {(!paginateItems || currentPage === totalPages - 1) && (
                                            <>
                                                <div>
                                                    <p className="text-sm md:text-md 2xl:text-lg font-semibold leading-relaxed" style={{ fontFamily: "Poppins" }}>Sincerely,</p>
                                                    {name && (
                                                        <p className="text-sm md:text-md 2xl:text-lg leading-relaxed" style={{ fontFamily: "Poppins" }}>{name}</p>
                                                    )}
                                                    {position && (
                                                        <p className="text-sm md:text-md 2xl:text-lg leading-relaxed italic" style={{ fontFamily: "Poppins" }}>{position}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-sm md:text-md 2xl:text-lg [&_p]:mt-2 leading-relaxed">
                                        <span className="inline" dangerouslySetInnerHTML={{ __html: modalColumn3Html || '' }} />
                                    </div>
                                </div>
                            )}
                            {needsPagination && (
                                <nav
                                    className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-200"
                                    aria-label="Message pagination"
                                >
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 0}
                                        className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="text-sm text-slate-600" aria-live="polite">
                                        Page {currentPage + 1} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage >= totalPages - 1}
                                        className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </nav>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    )
}
