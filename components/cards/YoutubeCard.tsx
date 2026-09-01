"use client";
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useRef, useState } from 'react'
import { Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { RegularButton } from '../ui/buttons'
import { JSX } from 'react';

export default function YoutubeCard({ video_title='', video_description ='', video_link= '', video_button_content}: { video_title: string, video_description: string, video_link: string,video_button_content:string  }): JSX.Element {
  const isMobiile = useMediaQuery('(max-width: 768px)')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleLoadedData = () => {
    setIsLoading(false)
  }

  return (
    <section id="offices" className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-6 mb-12 md:mb-0">
      {!isMobiile && (
        <div className="flex flex-col justify-center">
          <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">{video_title}</h2>
          <p className="text-xl text-gray-800 mb-8">{video_description}</p>
          {video_button_content !== '' &&<RegularButton text={video_button_content} link={`/our-team`} />}
        </div>
      )}
      <div className="relative w-full h-60 md:h-80 2xl:h-96 order-2 md:order-1 z-20 p-4 md:p-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            {isLoading && (
              <div className="flex items-center justify-center absolute inset-0 bg-black bg-opacity-40 z-30">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500"></div>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              onLoadedData={handleLoadedData}
            >
              <source src="/images/Active Re sin subs.mp4" type="video/mp4" />
            </video>

            {/* Botones flotantes */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
              <button
                onClick={restartVideo}
                className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow"
                title="Reiniciar video"
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={toggleMute}
                className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

