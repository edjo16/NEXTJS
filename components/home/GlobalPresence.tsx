"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { HomePageData } from "../../types/home"


export default function GlobalPresence({ data }: { data: HomePageData }) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [mapActivated, setMapActivated] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const toggleOverlay = () => {
      setOverlayVisible(prev => {
        const next = !prev;
        if (!next) setMapActivated(true);
        return next;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") toggleOverlay();
    };


    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activateMap = () => {
    setMapActivated(true);
    setOverlayVisible(false);
  };

  return (
    <>
    <div className="section-container-top">
      <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
      <h2 className="text-2xl font-bold mb-2 text-primary-500">{data?.global_presence_title}</h2>
    </div>
    <div style={{ height: "80vh", position: "relative", margin: "0 auto", overflow: "hidden" }}>
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/mapa_pc.webp" />
        <img
          src="/images/mapa_mobil.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: iframeLoaded ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />
      </picture>
      {overlayVisible && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "rgb(21 94 113)",
            pointerEvents: "auto",
            gap: "10px",
          }}
        >
          {/* <h2 className="font-bold text-5xl mb-4">Explore our Geographical Scope</h2> */}
          <div className="flex justify-center items-center">
            <div className="nudge-left">
              <ChevronLeft className="text-secondary-500" />
            </div>
            <div className="nudge-left delay-200">
              <ChevronLeft className="text-secondary-500" />
            </div>

            <button
              onClick={activateMap}
              className="font-bold text-md bg-white/60 border border-secondary-500 p-2 text-secondary-500 hover:bg-secondary-500 hover:text-white"
            >
              {data?.global_presence_button}
            </button>

            <div className="nudge-right">
              <ChevronRight className="text-secondary-500" />
            </div>
            <div className="nudge-right delay-200">
              <ChevronRight className="text-secondary-500" />
            </div>
          </div>
        </div>
      )}

      {!overlayVisible && (
      <div className="absolute bottom-2 left-1 sm:left-1 md:left-1/2 md:translate-x-[-50%] z-20">
        <div className="flex justify-center items-center">
            <div className="nudge-right delay-200">
              <ChevronRight className="text-secondary-500" />
            </div>

        <button
          onClick={() => setOverlayVisible(true)}
          className="font-bold text-xs md:text-sm bg-white/90 border border-secondary-500 p-2 text-secondary-500 hover:bg-secondary-500 hover:text-white  backdrop-blur rounded"
        >
          End Interactivity
        </button>
            <div className="nudge-right">
              <ChevronLeft className="text-secondary-500" />
            </div>
          </div>
          </div>
      )}

      {mapActivated && (
        <iframe
          src="/map.gl.html"
          title="Global Presence Map"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: 1,
            pointerEvents: overlayVisible ? "none" : "auto",
            background: "transparent",
            opacity: iframeLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          allowFullScreen
        />
      )}
      <span className="text-sm text-gray-200 absolute -bottom-6 left-20 z-20">*Excludes sanctioned countries </span>
    </div>
    </>
  );
}

