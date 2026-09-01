"use client"
import Image from 'next/image';
import type { BackgroundImage } from '../../types/types';

export default function BackgroundImage({ data, blur, showContent = true, showTitle = true }: {
  data: BackgroundImage;
  blur?: boolean;
  showContent?: boolean;
  showTitle?: boolean;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const remoteImageUrl = data?.background_image?.filename_disk
    ? `${apiUrl}/assets/${data.background_image.filename_disk}?format=webp&width=1920&quality=70`
    : null;
  const imageSrc = remoteImageUrl || '/images/hero_image.png';

  return (
    <div
      className="w-full bg-cover bg-center relative px-4 sm:px-12 py-20 min-h-[500px] md:min-h-screen lg:min-h-screen xl:min-h-screen z-8"
      style={{
        background: 'linear-gradient(135deg, #222 0%, #444 100%)',
      }}
    >
      <Image
        src={imageSrc}
        alt={data?.title || 'Background'}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className={`object-cover ${blur ? 'blur-md' : ''}`}
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-x-0 px-4 sm:px-4 bottom-4 z-30">
        <div className="mx-auto pt-14 xl:py-12 max-w-5xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl text-white">
          <div className="container-content">
            {showTitle && data?.title && (
              <h1 className="font-bold mb-6 text-[2.65rem] md:text-7xl 2xl:text-8xl leading-tight">
                {data.title}
              </h1>
            )}
            {data?.sub_title && (
              <h2 className="font-bold mb-6 text-3xl md:text-4xl 2xl:text-6xl leading-tight">
                {data.sub_title}
              </h2>
            )}
            {showContent && data?.content && data?.sub_title ?(
              <h3 className="text-xl md:text-4xl 2xl:text-4xl leading-relaxed">
                {data.content}
              </h3>
            ):
            (
              <h2 className="text-xl md:text-4xl 2xl:text-4xl leading-relaxed">
                {data.content}
              </h2>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
