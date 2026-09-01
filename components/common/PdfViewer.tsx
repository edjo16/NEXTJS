"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PdfViewerProps {
  src: string
  title?: string
  height?: number
  maxVh?: number
  className?: string
  page?: number
  pageIsPrinted?: boolean
  onClose?: () => void
  showZoomControls?: boolean
}

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  src,
  title = 'PDF viewer',
  height = 900,
  maxVh = 85,
  className = '',
  page = 1,
  pageIsPrinted = true,
  onClose,
  showZoomControls = true,
}) => {
  const outerHeight = `min(${height}px, ${maxVh}vh)`
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const lastTargetRef = useRef<number | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [containerWidth, setContainerWidth] = useState<number | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [pageLabels, setPageLabels] = useState<string[] | null>(null)
  const [printedOffset, setPrintedOffset] = useState<number | null>(null)
  const [printedMap, setPrintedMap] = useState<Map<number, number> | null>(null)
  const [pdfProxy, setPdfProxy] = useState<any>(null)
  const [pageOffsets, setPageOffsets] = useState<number[] | null>(null)
  // Default zoom: mobile 100%, desktop 50% (requested)
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const initialZoom = isMobile ? 1 : 0.5
  const [zoom, setZoom] = useState(initialZoom)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const measure = () => setContainerWidth(el.clientWidth)
    measure()
    if (isMobile) {
      const onOrient = () => measure()
      window.addEventListener('orientationchange', onOrient)
      return () => window.removeEventListener('orientationchange', onOrient)
    }
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth
      setContainerWidth((prev) => (prev === undefined || Math.abs(prev - w) > 4 ? w : prev))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const onLoadSuccess = async (pdf: any) => {
    try {
      if (!pdf || typeof pdf.numPages === 'undefined') {
        throw new Error('Invalid PDF object');
      }
      setNumPages(pdf.numPages)
      setPdfProxy(pdf)
      if (typeof pdf.getPageLabels === 'function') {
        const labels: string[] | null = await pdf.getPageLabels()
        if (labels && labels.length) {
          setPageLabels(labels)
          const map = new Map<number, number>()
          let firstNumericIdx: number | null = null
          let firstNumericPrinted: number | null = null
          for (let i = 0; i < labels.length; i++) {
            const raw = String(labels[i] ?? '').trim()
            if (/^\d+$/.test(raw)) {
              const printed = parseInt(raw, 10)
              map.set(printed, i + 1)
              if (firstNumericIdx === null) {
                firstNumericIdx = i
                firstNumericPrinted = printed
              }
            }
          }
          if (map.size) setPrintedMap(map)
          if (firstNumericIdx !== null && firstNumericPrinted !== null) {
            setPrintedOffset((firstNumericIdx + 1) - firstNumericPrinted)
          }
        }
      }
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError(err instanceof Error ? err.message : 'Error loading PDF');
    } finally {
      setLoading(false)
    }
  }

  const onLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    console.error('PDF source:', src);
    console.error('Worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
    setError(`Error loading PDF: ${error.message}`)
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!pdfProxy || !numPages || !containerWidth) return
      try {
        const offsets: number[] = []
        let acc = 0
        for (let i = 1; i <= numPages; i++) {
          if (cancelled) return
          const pg = await pdfProxy.getPage(i)
          const base = pg.getViewport({ scale: 1 })
          const scale = (containerWidth * zoom) / base.width
          const heightScaled = base.height * scale
          offsets.push(acc)
          acc += heightScaled + 24 /* gap */
        }
        setPageOffsets(offsets)
      } catch {/* ignore */}
    }
    run()
    return () => { cancelled = true }
  }, [pdfProxy, numPages, containerWidth, zoom])

  useEffect(() => {
    if (!scrollRef.current || !numPages || !page) return
    const clamp = (n: number) => Math.min(Math.max(1, n), numPages)
    const resolveInternal = (requested: number) => {
      if (pageIsPrinted !== false) {
        if (printedMap && printedMap.has(requested)) return printedMap.get(requested) as number
        if (Number.isFinite(printedOffset)) return clamp(requested + (printedOffset as number))
      }
      return clamp(requested)
    }
    const target = resolveInternal(page)
    if (pageOffsets && pageOffsets.length >= target) {
      scrollRef.current.scrollTo({ top: pageOffsets[target - 1], behavior: 'auto' })
      lastTargetRef.current = target
      return
    }
    let attempts = 0
    const raf = () => {
      const wrapper = pageRefs.current.get(target)
      if (wrapper) {
        wrapper.scrollIntoView({ behavior: 'auto', block: 'start' })
        lastTargetRef.current = target
        return
      }
      if (attempts++ < 180) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [numPages, page, pageIsPrinted, printedMap, printedOffset, pageOffsets])

  useEffect(() => {
    if (!scrollRef.current || !pageOffsets || !lastTargetRef.current) return
    const t = lastTargetRef.current
    if (pageOffsets.length >= t) scrollRef.current.scrollTo({ top: pageOffsets[t - 1], behavior: 'auto' })
  }, [zoom, pageOffsets])

  const pages = useMemo(() => Array.from({ length: numPages }, (_, i) => i + 1), [numPages])

  return (
    <div className={`w-full ${className}`}>
      <style>{`@media print { .pdfjs-no-print { display:none!important } }`}</style>
      <div
        ref={containerRef}
        className="pdfjs-no-print relative w-full overflow-hidden rounded-md select-none"
        style={{ height: outerHeight, background: 'transparent' }}
        aria-label={title}
        onContextMenu={(e) => e.preventDefault()}
      >
        {showZoomControls && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, parseFloat((z - 0.1).toFixed(2))))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/70 text-white text-xl font-semibold shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Zoom out"
            >
              –
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, parseFloat((z + 0.1).toFixed(2))))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/70 text-white text-xl font-semibold shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Zoom in"
            >
              +
            </button>
            <div className="min-w-[58px] text-center text-xs font-medium text-white bg-black/50 rounded px-2 py-1">
              {Math.round(zoom * 100)}%
            </div>
          </div>
        )}
        {onClose && (
          <button
            type="button"
            aria-label="Close PDF viewer"
            onClick={onClose}
            className="absolute left-3 bottom-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            ✕
          </button>
        )}
        <div
          ref={scrollRef}
          className="h-full w-full overflow-auto flex flex-col items-center gap-6"
          style={{ scrollBehavior: 'smooth', paddingTop: isMobile ? 0 : 12, paddingBottom: 12 }}
        >
          {loading && <div className="text-slate-300 text-sm">loading...</div>}
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <Document file={src} onLoadSuccess={onLoadSuccess} onLoadError={onLoadError} loading={null}>
            {pages.map((p) => (
              <div
                key={p}
                ref={(el) => {
                  if (el) pageRefs.current.set(p, el)
                  else pageRefs.current.delete(p)
                }}
                className="relative bg-white shadow-lg"
                data-page={p}
                style={containerWidth ? { width: containerWidth * zoom } : undefined}
              >
                <Page
                  pageNumber={p}
                  width={containerWidth ? containerWidth * zoom : undefined}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={null}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfViewer
