import React from 'react'
import { BrochureSection } from '../../types/about'
import Image from '../common/ImageBack'
import { JSX } from 'react';
export default function Brochure({brochure_section}: {brochure_section: BrochureSection}): JSX.Element {
  return (
    <>
    <div className="p-6 flex flex-col justify-center order-2 md:order-1">
      <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
      <h2 className="text-2xl font-bold mb-2 text-primary-500">{brochure_section?.brochure_title}</h2>
      <p className="text-md md:text-lg text-gray-800">{brochure_section?.brochure_description}</p>
    </div>
    <div className="relative w-full md:h-auto order-1 md:order-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image 
          src = {brochure_section?.brochure_image} alt = {brochure_section?.brochure_title}
          className="w-full h-auto md:w-[400px] md:h-[500px] lg:w-[400px] lg:h-[500px] xl:w-[400px] xl:h-[600px]"
          />
        </div>
      </div>
    </div>
    </>
  )
}
