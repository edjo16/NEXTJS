"use client";
import { useState, useEffect } from 'react';
import type { BackgroundImage } from '../../types/types';

export default function BackgroundVideo({ data, blur, showContent = true, showTitle = true }: {
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
            className="w-full bg-cover bg-center relative px-4 sm:px-12 py-20 min-h-[500px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[1000px] z-8"
            style={{
                background: !loaded
                    ? 'linear-gradient(135deg, #222 0%, #444 100%)'
                    : undefined,
                transition: 'background 0.8s cubic-bezier(.4,0,.2,1)',
            }}
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                poster={imageUrl}
            >
                <source src="/images/Active Re sin subs.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 bottom-16 px-4 sm:px-8 z-20">
                <div className="max-w-1xl mx-auto lg:max-w-6xl xl:max-w-7xl xl:mx-20 text-white">
                    <div className="max-w-3xl xl:max-w-6xl">
                        <h2 className="font-bold mb-6 text-[34px] md:text-6xl xl:text-8xl leading-tight">
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
