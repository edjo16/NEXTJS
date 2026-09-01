"use client";
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  IframeHTMLAttributes
} from 'react';

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement | null, options: any) => any;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type CustomIframeProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  youtubeVideoId?: string;
  children?: ReactNode;
};

const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';

const CustomIframe: React.FC<CustomIframeProps> = ({
  youtubeVideoId,
  children,
  ...props
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!youtubeVideoId) return;

    // Cargar la API de YouTube si no está presente
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = YOUTUBE_IFRAME_API_SRC;
      document.body.appendChild(tag);
    }

    // Esperar a que la API esté lista
    const onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new window.YT.Player(iframeRef.current, {
        videoId: youtubeVideoId,
        events: {
          onError: () => setError(true)
        }
      });
    };

    // @ts-ignore
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // @ts-ignore
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
  }, [youtubeVideoId]);

  if (error) {
    return <div>Video is not available.</div>;
  }

  if (youtubeVideoId) {
    return (
      <div>
        <div
          id={`youtube-player-${youtubeVideoId}`}
          ref={iframeRef as any}
        />
      </div>
    );
  }

  // Renderizado normal de iframe si no es YouTube
  return (
    <iframe
      {...props}
      style={{ border: 'none', ...props.style }}
    >
      {children}
    </iframe>
  );
};

export default CustomIframe;
