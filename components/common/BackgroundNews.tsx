"use client"
import { useState, useEffect } from 'react';
import type { BackgroundImage } from '../../types/types';

export default function BackgroundImage({ data, blur, showContent = true, showTitle = true}: {
  data: BackgroundImage;
  blur?: boolean;
  showContent?: boolean;
  showTitle?: boolean;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const [loaded, setLoaded] = useState(false);

  const imageUrl = `${apiUrl}/assets/${data?.background_image?.filename_disk}?format=webp&width=1920&quality=70`;

  // Preload the image when the component mounts
  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  return (
    <div
      className="w-full bg-cover bg-center relative px-4 sm:px-12 py-20 min-h-[300px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] z-8"
      style={{
        background: !loaded
          ? 'linear-gradient(135deg, #222 0%, #444 100%)'
          : undefined,
        transition: 'background 0.8s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} ${blur && !loaded ? 'blur-md' : ''}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />
      <div className="absolute inset-x-0 bottom-16 px-12 md:px-32 xl:px-28 z-20">
        <div className="max-w-1xl mx-auto lg:max-w-6xl xl:max-w-7xl xl:mx-20 text-white">
          <div className="max-w-3xl xl:max-w-6xl">
            <h2 className="font-bold mb-6 text-[24px] md:text-4xl xl:text-6xl leading-tight">
              {showTitle && data?.title}
            </h2>
            {data?.sub_title &&
            <h2 className="font-bold mb-6 text-3xl md:text-4xl xl:text-6xl leading-tight">
              {data?.sub_title}
            </h2>
            }
            <h4 className="text-2xl md:text-3xl xl:text-4xl leading-relaxed">
              {showContent && data?.content}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
