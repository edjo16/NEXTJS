"use client"
import React from 'react'
import {HeroPageData} from '../../types/anualReport'
export default function HeroContent({ hero }: { hero: HeroPageData }) {
  return (
          <section id="summary" className="container-regular max-w-5xl pt-0">
        {/* Overlap panel on top of the first section */}
        <div className="relative -mt-10 md:-mt-20 lg:-mt-28">
          <div className="relative z-20 bg-white rounded-tr-2xl rounded-tl-2xl p-5 md:p-8">
            <h2 className="max-w-4xl mx-auto text-slate-900 font-semibold text-base md:text-xl 2xl:text-3xl leading-relaxed">
              {hero?.hero_content_title}
            </h2>
          </div>
        </div>
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 mb-8 font-family-display"
               dangerouslySetInnerHTML={{ __html: hero?.hero_content}}
          />
        </div>
      </section>
  )
}
