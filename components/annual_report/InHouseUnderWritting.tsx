"use client"
import React from 'react'
import { Card } from "../ui/card"
import { Handshake, BriefcaseBusiness, Factory } from "lucide-react"

type UWItem = {
  icon?: React.ReactNode | string
  title: string
  amount: string
  unit?: string
  description: string
  page?: number
}

interface InHouseUnderWrittingProps {
  items?: UWItem[]
  className?: string
  title?: string
  onOpenPage?: (page: number) => void
}

export default function InHouseUnderWritting({
  items = [],
  className = "",
  title,
  onOpenPage,
}: InHouseUnderWrittingProps) {
  const renderIcon = (icon?: UWItem['icon']) => {
    if (!icon) return null
    if (React.isValidElement(icon)) return icon
    if (typeof icon === 'string') {
      // Try to detect the component name from the string
      const match = icon.match(/<\s*([A-Za-z0-9_]+)/)
      const name = match?.[1]
      const iconMap: Record<string, React.ElementType> = {
        Factory,
        Handshake,
        BriefcaseBusiness,
      }
      const Comp = name ? iconMap[name] : undefined
      if (Comp) return <Comp className="h-9 w-9 text-primary-500" aria-hidden />
    }
    return null
  }

  return (
    <section className={`w-full ${className} mb-20`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 text-left">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <Card
              key={idx}
              className={`bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-3 md:p-6 flex flex-col items-center text-center ${item.page && onOpenPage ? 'cursor-pointer hover:ring-2 hover:ring-orange-100' : ''
                }`}
              onClick={() => {
                if (item.page && onOpenPage) onOpenPage(item.page)
              }}
              role={item.page && onOpenPage ? 'button' : undefined}
              tabIndex={item.page && onOpenPage ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && item.page && onOpenPage) {
                  e.preventDefault()
                  onOpenPage(item.page)
                }
              }}
            >
              <div className="mb-2">{renderIcon(item.icon)}</div>
              {item.title && (
                <h3 className="text-base md:text-lg font-semibold text-primary-500 decoration-gray-900">
                  {(
                    (item.title || "").split(/\/n|\n/g)
                  ).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <>
                          <span className="inline md:hidden"> </span>
                          <br className="hidden md:block" />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </h3>
              )}
              <div className="mt-3 text-xl md:text-2xl font-extrabold text-orange-700">{item.amount}</div>
              {item.unit && (
                <div className="text-xs md:text-sm uppercase tracking-wide text-orange-700">{item.unit}</div>
              )}
              <p className="mt-4 h-48 text-sm md:text-base text-gray-800 leading-relaxed">
                {item.description}
              </p>
              {item.page && onOpenPage && (
                <div className="mt-4 text-sm text-orange-700">
                  Read More
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
