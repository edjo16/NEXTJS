"use client";
import { useState, useEffect } from 'react';
import type { BackgroundImage } from '../../types/types';

export default function BackgroundParalax({ data, blur, showContent = true, showTitle = true}: {
  data: BackgroundImage;
  blur?: boolean;
  showContent?: boolean;
  showTitle?: boolean;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const [loaded, setLoaded] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const imageUrl = `${apiUrl}/assets/${data?.background_image?.filename_disk}?format=webp&width=1920&quality=70`;

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full bg-cover bg-center relative px-4 sm:px-12 py-20 min-h-[500px] md:min-h-screen lg:min-h-screen xl:min-h-screen z-8"
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
          backgroundPosition: `center ${offsetY * 0.4}px`,
          zIndex: 1,
        }}
      />
      <div className="absolute inset-x-0 px-4 sm:px-4 bottom-4 z-10">
        <div className="mx-auto pt-14 xl:py-12 max-w-5xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl  text-white">
          <div className="container-content ">
              <h1 className="font-bold mb-6 text-[2.75rem] md:text-7xl 2xl:text-8xl leading-tight">
              {showTitle && data?.title}
            </h1>
            {data?.sub_title &&
            <h2 className="font-bold mb-6 text-3xl md:text-4xl 2xl:text-6xl leading-tight">
              {data?.sub_title}
            </h2>
            }
            <h3 className="text-xl md:text-3xl 2xl:text-4xl leading-relaxed">
              {showContent && data?.content}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
