"use client";
import { useState, useCallback, useEffect } from "react"
import { ArrowRight, RefreshCw, AlertCircle } from "lucide-react"
import type { YoutubeVideos } from "../../types/insights"
import { Subtitle } from "../ui/subtitle"

interface VideoState {
  loading: boolean
  error: boolean
  retryCount: number
}

interface VideoPlayerProps {
  video: YoutubeVideos
  index: number
}

function VideoPlayer({ video, index }: VideoPlayerProps) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const [videoState, setVideoState] = useState<VideoState>({
    loading: false,
    error: false,
    retryCount: 0,
  })

  const MAX_RETRIES = 3
  const RETRY_DELAY = 2000 

  const resetVideo = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      loading: true,
      error: false,
    }))
  }, [])

  const handleRetry = useCallback(() => {
    if (videoState.retryCount < MAX_RETRIES) {
      setVideoState((prev) => ({
        loading: true,
        error: false,
        retryCount: prev.retryCount + 1,
      }))
    }
  }, [videoState.retryCount])

  const handleVideoLoad = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      loading: false,
      error: false,
    }))
  }, [])

  const handleVideoError = useCallback(() => {
    setVideoState((prev) => ({
      ...prev,
      loading: false,
      error: true,
    }))

    // Auto-retry after delay if we haven't exceeded max retries
    if (videoState.retryCount < MAX_RETRIES) {
      setTimeout(() => {
        handleRetry()
      }, RETRY_DELAY)
    }
  }, [videoState.retryCount, handleRetry])

  // Reset retry count when video changes
  useEffect(() => {
    setVideoState({
      loading: false,
      error: false,
      retryCount: 0,
    })
  }, [video.id])

  return (
    <div
      key={`${video.id}-${videoState.retryCount}`}
      className="relative group fade-in-section is-visible transition-transform duration-300 hover:scale-105"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
  <div className="relative w-full h-[214px] sm:h-[150px] md:h-[168px] lg:h-[178px] xl:h-[184px] 2xl:h-[260px] bg-black rounded-lg overflow-hidden">
        <a
          href={`https://www.youtube.com/watch?v=${video.code_link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 z-20 p-2"
          title="Watch on YouTube"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 group-hover:text-white">
            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.11-2.115C19.413 3.5 12 3.5 12 3.5s-7.413 0-9.388.571A2.994 2.994 0 0 0 .502 6.186C0 8.162 0 12 0 12s0 3.838.502 5.814a2.994 2.994 0 0 0 2.11 2.115C4.587 20.5 12 20.5 12 20.5s7.413 0 9.388-.571a2.994 2.994 0 0 0 2.11-2.115C24 15.838 24 12 24 12s0-3.838-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        {videoState.loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-600" />
              <p className="text-sm text-gray-600">
                {videoState.retryCount > 0
                  ? `Trying again... (${videoState.retryCount}/${MAX_RETRIES})`
                  : "Charging video..."}
              </p>
            </div>
          </div>
        )}

        {videoState.error && videoState.retryCount >= MAX_RETRIES && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="text-sm text-gray-600">Error loading video</p>
              <button
                onClick={handleRetry}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <video
          key={`video-${video.id}-${videoState.retryCount}`}
          className="w-full h-full object-fit 2xl:object-cover"
          src={`${apiUrl}/assets/${video?.media_video?.filename_disk}`}
          poster={`${apiUrl}/assets/${video?.media_image?.filename_disk}`}
          controls
          controlsList="nodownload"
          preload="none"
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            opacity: videoState.loading ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

      </div>

      <p className="mt-2 text-sm font-medium">{video?.title}</p>
    </div>
  )
}

export default function VideoSection({
  youtube_videos,
  title = "Explore our videos",
}: { youtube_videos: YoutubeVideos[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = youtube_videos.length - itemsPerPage + 1 > 0 ? youtube_videos.length - itemsPerPage + 1 : 1


  const visibleVideos = youtube_videos.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="section-container-top">
      <div className="flex items-center justify-between">
        <div>
          <Subtitle title={title} />
        </div>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 2xl:gap-8">
        {visibleVideos.map((video, index) => (
          <VideoPlayer key={video.id} video={video} index={index} />
        ))}
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <div></div>
        <button
          className={`w-60 text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `}
          onClick={() => window.open(`https://www.youtube.com/@active-re`, "_blank")}
        >
          Go to Our Channel <ArrowRight className="ml-1" size={18} />
        </button>
      </div>
    </section>
  )
}

