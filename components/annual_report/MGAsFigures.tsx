
"use client"
import React from 'react'
import { Card } from "../ui/card"
import ImageBack from '../common/ImageBack'
type UWItem = {
    icon: React.ReactNode
    title: string
    mgas_icon: string
}


interface InHouseUnderWrittingProps {
    items?: UWItem[]
    className?: string
    title?: string
    mgas_content?: string
}

export default function MGAsFigures({
    items = [],
    className = "",
    title,
    mgas_content = ""

}: InHouseUnderWrittingProps) {
    return (
        <section className={`w-full ${className} mb-20`}>
            <div className="max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 text-left">{title}</h2>
                )}
                <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 mb-8 font-family-display"
                    dangerouslySetInnerHTML={{ __html: mgas_content }}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {items.map((item, idx) => (
                        <Card
                            key={idx}
                            className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-3 md:p-6 flex flex-col items-center text-center"
                        >
                            <ImageBack
                                src={item?.mgas_icon}
                                alt={item.title}
                                style={{ height: 150 }}
                                activeTransition={false}
                            />
                            <p className="mt-4 text-sm md:text-base text-gray-800 font-semibold leading-relaxed">
                                {item.title}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
