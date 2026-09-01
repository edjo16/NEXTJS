"use client"
import { useEffect, useState } from 'react'
import type { BackgroundTtitleImage as BgType } from '../../types/types'

interface Props {
  data: BgType
  showTitle?: boolean
  height?: number | string // banner height
  accentColor?: string // underline color
  overlayMaxWidth?: string // max width for the white box
}

export default function BackgroundTitleReport({
  data,
  showTitle = true,
  height = 120,
  overlayMaxWidth = '820px',
}: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
  const [loaded, setLoaded] = useState(false)

  const imageUrl = data?.title_background?.filename_disk
    ? `${apiUrl}/assets/${data.title_background.filename_disk}?format=webp`
    : '/images/hero_image.webp'

  useEffect(() => {
    if (!imageUrl) return
    const img = new window.Image()
    img.src = imageUrl
    img.onload = () => setLoaded(true)
  }, [imageUrl])

  const bannerStyle: any = {
    '--banner-h': typeof height === 'number' ? `${height}px` : height ?? '120px',
  }

  return (
    <section className="relative w-full overflow-hidden mb-24">
      {/* Background banner */}
      <div className="relative w-full h-[var(--banner-h)] md:h-[160px] 2xl:h-[200px]" style={bannerStyle}>
        <picture>
          <source srcSet={imageUrl} type="image/webp" />
          <img
            src={imageUrl}
            alt={data?.title || 'Background'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </picture>


        {/* Centered overlay title */}
        {showTitle && (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div
              className="bg-white/95 backdrop-blur-[1px] rounded-md shadow-lg border border-slate-200 px-5 py-3 sm:px-6 sm:py-4 md:px-6 md:py-4"
              style={{ maxWidth: overlayMaxWidth }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-slate-900 text-center max-w-[92vw] md:max-w-[78vw] lg:max-w-[720px] xl:max-w-[820px] mx-auto">
                {data?.title}
              </h2>
              {/* <div
                className="mx-auto mt-2 h-[3px] rounded-full w-12 sm:w-20 md:w-24 lg:w-28 xl:w-32"
                style={{ backgroundColor: accentColor }}
              /> */}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
