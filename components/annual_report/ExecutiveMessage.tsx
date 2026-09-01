"use client"
import React from 'react'
import ImageBack from '../common/ImageBack'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type Side = 'left' | 'right'

interface Props {
  title: string
  imageDiskName?: string
  alt?: string
  messageHtml?: string
  name?: string
  imageSide?: Side
  className?: string
  page?: number
  quote?: string
  onOpenPage?: (page: number) => void
}

export default function ExecutiveMessage({
  title,
  imageDiskName,
  alt = 'executive portrait',
  messageHtml,
  name,
  imageSide = 'left',
  className = '',
  page,
  quote,
  onOpenPage,
}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const ImageBlock = (
        <div className="relative w-full max-w-[320px] shrink-0 mx-auto md:mx-0 mb-4">
      {imageDiskName ? (
        <ImageBack
          src={imageDiskName}
          alt={alt}
          activeTransition={false}
          className="h-[300px] md:h-[320px]"
        />
      ) : (
        <div className="h-[300px] md:h-[320px] w-full bg-slate-100 border border-slate-200" />
      )}
      {/* Mobile overlay quote */}
      {isMobile && quote ? (
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4 pointer-events-none">
          <div className="bg-primary-500/90 backdrop-blur-sm text-white font-display italic shadow-sm p-4 w-full max-w-xs text-center flex flex-col items-center">
            <span className="text-4xl leading-none text-celeste-200 select-none">“</span>
            <blockquote className="text-sm mt-2">{quote}</blockquote>
          </div>
        </div>
      ) : null}
      {/* Desktop quote below image */}
      {!isMobile && quote ? (
        <figure className="relative mt-4 md:mb-4 w-full">
          <div className="w-3 bg-celeste-500"></div>
          <div className="pt-6 h-8 w-8 flex items-center justify-center bg-celeste-500 text-primary-900 font-serif text-6xl leading-none select-none">
            “
          </div>
          <div className='pl-8'>
            <div className="relative bg-primary-500 text-white font-display italic shadow-sm p-5">
              <blockquote className="text-[16px] text-celeste-200">
                {quote}
              </blockquote>
            </div>
          </div>
        </figure>
      ) : null}
    </div>
  )

  return (
    <section className={`w-full ${className}`}>
      {isMobile &&
        <>
          <h2 className="text-sm md:text-base font-bold text-primary-500" style={{ fontFamily: "Poppins" }}>{title}</h2>
          <p className="mt-1 mb-6 font-semibold text-md text-slate-800" style={{ fontFamily: "Poppins" }}>{name}</p>
        </>
      }
      <div
        className={`grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-10`}>
        {imageSide === 'left' ? (
          <div className="md:col-span-4 flex md:justify-start justify-center order-1 md:order-1">{ImageBlock}</div>
        ) : null}

        {/* Message */}
        <div className={`md:col-span-8 order-2 ${imageSide === 'right' ? 'md:order-1' : 'md:order-2'}`}>
          <div className="text-slate-700 leading-relaxed">
            {!isMobile &&
              <>
                <h2 className="text-sm md:text-base font-bold text-primary-500" style={{ fontFamily: "Poppins" }}>{title}</h2>
                {name && (
                  <p className="mt-1 mb-6 font-semibold text-md text-slate-800" style={{ fontFamily: "Poppins" }}>{name}</p>
                )}
              </>
            }
            <div className={`relative overflow-hidden font-family-display text-[15px] md:text-[16px]`}>
              {messageHtml ? (
                <div
                  className="max-w-none text-xl text-gray-800"
                  dangerouslySetInnerHTML={{ __html: messageHtml || '' }}
                />
              ) : (
                <p className="text-slate-500">No message available.</p>
              )}

            </div>
            {page && onOpenPage && page > 0 ? (
              <span
                className="text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer"
                onClick={() => onOpenPage(page)}
              >
                Read more
              </span>
            ) : null}
          </div>

        </div>

        {imageSide === 'right' ? (
          <div className="md:col-span-4 flex md:justify-end justify-center order-1 md:order-2">{ImageBlock}</div>
        ) : null}
      </div>
    </section>
  )
}
