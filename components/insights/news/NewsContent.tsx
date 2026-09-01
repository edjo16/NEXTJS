"use client";
import React, { useState } from 'react';
import ImageBack from '../../common/ImageBack';

export const NewsContent: React.FC<{ type: string; content: any; index: number }> = ({ type, content, index }) => {
  switch (type) {
    case 'just_content':
      return (
        <div
          className="force-sans text-black text-sm xl:text-lg font-family-display"
          dangerouslySetInnerHTML={{ __html: content[`s${index}_just_content`] }}
        />
      );

    case 'justImage':
      return <ImageBack src={content[`s${index}_just_image`]?.filename_disk} alt="Section Image" className="w-full h-auto" />;

    case 'contentAndcontent':
      return (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 xl:gap-16 mb-2 bg-white overflow-hidden">
          <div
            className="force-sans relative w-full max-w-3xl overflow-hidden text-black text-sm xl:text-lg font-family-display"
            dangerouslySetInnerHTML={{ __html: content[`s${index}_content_one`] }}
          />
          <div
            className="force-sans flex flex-col text-black font-family-display"
            dangerouslySetInnerHTML={{ __html: content[`s${index}_content_two`] }}
          />
        </div>
      );

    case 'contentAndimage':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 mb-2 bg-white overflow-hidden">
          <div
            className="force-sans flex-1 text-black text-sm xl:text-lg font-family-display"
            dangerouslySetInnerHTML={{ __html: content[`s${index}_content_image_content`] }}
          />
          <ImageBack src={content[`s${index}_content_image_image`]?.filename_disk} alt="Section Image" className="flex-1 h-auto" />
        </div>
      );

    case 'imageContainerAndContent':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 mb-2 bg-white overflow-hidden">
          <ImageBack src={content[`s${index}_image_content_image`]?.filename_disk} alt="Section Image" className="flex-1 h-auto" />
          <div
            className="force-sans flex-1 text-black text-sm xl:text-lg font-family-display"
            dangerouslySetInnerHTML={{ __html: content[`s${index}_image_content_content`] }}
          />
        </div>
      );

    case 'contentAndcarrousel':
      const images = content[`s${index}_content_carrousel`] || [];
      //eslint-disable-next-line
      const [currentIndex, setCurrentIndex] = useState(0);

      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      };

      const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      };
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 mb-2 bg-white overflow-hidden">
          <div className="relative w-full max-w-3xl overflow-hidden">
            <div
              className="force-sans text-black text-sm xl:text-lg font-family-display"
              dangerouslySetInnerHTML={{ __html: content[`s${index}_content_carrousel_content`] }}
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl overflow-hidden">
              {images.map((img: { directus_files_id: string }, idx: number) => (
                <ImageBack
                  key={idx}
                  src={img.directus_files_id}
                  alt={`Carousel Image ${idx}`}
                  className={`w-full transition-transform duration-500 ${idx === currentIndex ? "block" : "hidden"
                    }`}
                />
              ))}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                {"<"}
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                {">"}
              </button>
            </div>
            <div className="mt-4 w-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex space-x-2 w-max px-2">
                {images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            <div className="relative w-full max-w-3xl overflow-hidden">
            <div
              className="force-sans text-black text-sm xl:text-lg font-family-display"
              dangerouslySetInnerHTML={{ __html: content[`s${index}_carrousel_content`] }}
            />
          </div>
            </div>
          </div>
        </div>

      );

    case 'imageAndImage':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 mb-2 bg-white overflow-hidden">
          <ImageBack src={content[`s${index}_image_one`]?.filename_disk} alt="Image One" className="flex-1 h-[340px] object-cover object-center" />
          <ImageBack src={content[`s${index}_image_two`]?.filename_disk} alt="Image Two" className="flex-1 h-[340px] object-cover object-center" />
        </div>
      );

    default:
      return null;
  }
};
