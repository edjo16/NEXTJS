"use client"
import { useEffect, useState } from 'react';
import type { BackgroundImageAnnualReport as BgType } from '../../types/types';

interface Props {
  data: BgType;
  year?: string | number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showContent?: boolean;
}

export default function BackgroundAnualReport({
  data,
  year,
  showTitle = true,
  showSubtitle = true,
  showContent = false,
}: Props) {
  // Access Vite env; cast to any to avoid typing issues outside /src
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const [loaded, setLoaded] = useState(false);

  const imageUrl = data?.hero_image?.filename_disk
    ? `${apiUrl}/assets/${data.hero_image.filename_disk}?format=webp`
    : '/images/hero_image.webp';

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[88vh] lg:min-h-[75vh] overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Image */}
        <div className="relative w-full md:w-[50%] min-h-[280px] md:min-h-[88vh]">
          <picture>
            <source srcSet={imageUrl} type="image/webp" />
            <img
              src={'/images/hero_image.webp'}
              alt={data?.title || 'Background'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </picture>
        </div>

        {/* Right: Content panel */}
        <div className="relative w-full md:w-[50%] bg-[#0B2B35] text-white flex items-center">
          <div className="w-full px-6 sm:px-10 md:px-12 lg:px-14 py-12 md:py-12">
            {year && (
              <p className="text-3xl md:text-4xl font-semibold mb-6 opacity-90">{year}</p>
            )}
            {showTitle && (
              <h1 className="font-extrabold text-5xl leading-tight md:text-6xl 2xl:text-7xl mb-6 whitespace-pre-line">
                {data?.title}
              </h1>
            )}
            {showSubtitle && data?.sub_title && (
              <p className="text-xl md:text-2xl font-bold text-cyan-200/90 uppercase tracking-wide">
                {data?.sub_title}
              </p>
            )}
            {showContent && data?.content && (
              <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
                {data?.hero_content_title}
              </p>
            )}
              <p className="mt-6 font-semibold text-md md:text-xl text-gray-100 leading-relaxed">
                {data?.executive_title}
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}
