"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { Poppins } from "next/font/google";
import type { BackgroundImageAnnualReport as BgType } from "../../../types/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

interface Props {
  data: BgType;
  year?: string | number;
  /** Etiqueta pequeña del encabezado (por defecto "Annual Report") */
  eyebrow?: string;
  /** Texto del indicador de scroll (por defecto "Begin") */
}

const GOLD = "#f5b942";
const BASE = "#05060c";

export default function HeaderReport({
  data,
  year,
  eyebrow = "Annual Report"
}: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  const imageUrl = data?.hero_image?.filename_disk
    ? `${apiUrl}/assets/${data.hero_image.filename_disk}?format=webp`
    : "/images/hero_image.webp";

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  // Variantes de entrada (stagger del contenido)
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const },
    },
  };

  return (
    <section
      className="relative w-full min-h-[640px] md:min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: BASE }}
    >
      <style>{`
        @keyframes ar-twinkle { 0%,100% { opacity:.3 } 50% { opacity:1 } }
        @keyframes ar-floatDown { 0% { transform:translateY(0); opacity:0 } 30% { opacity:1 } 100% { transform:translateY(24px); opacity:0 } }
        @media (prefers-reduced-motion: reduce) {
          .ar-star { animation: none !important; }
          .ar-scroll-dot { animation: none !important; }
        }
      `}</style>

      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={!prefersReduced ? { y: imageParallaxY } : undefined}
      >
        <motion.img
          src={imageUrl}
          alt={data?.title || "Annual report cover"}
          fetchPriority="high"
          onLoad={() => setLoaded(true)}
          initial={prefersReduced ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 1.12 }}
          animate={loaded ? { opacity: 0.95, scale: 1 } : { opacity: 0, scale: prefersReduced ? 1 : 1.12 }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 60% 45%, transparent 0%, rgba(5,6,12,0.35) 55%, rgba(5,6,12,0.85) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,6,12,0.55) 0%, rgba(5,6,12,0) 25%, rgba(5,6,12,0) 60%, rgba(5,6,12,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(5,6,12,0.7) 0%, rgba(5,6,12,0) 30%, rgba(5,6,12,0) 70%, rgba(5,6,12,0.5) 100%)" }} />
      </motion.div>

      <span className="ar-star absolute z-[1] rounded-full" style={{ top: "18%", left: "8%", width: 3, height: 3, background: "#fff", boxShadow: "0 0 8px #fff, 0 0 16px rgba(255,255,255,0.5)", animation: "ar-twinkle 4s ease-in-out infinite" }} />
      <span className="ar-star absolute z-[1] rounded-full" style={{ top: "28%", right: "12%", width: 2, height: 2, background: "#fff", boxShadow: "0 0 6px #fff", animation: "ar-twinkle 5s ease-in-out infinite 1s" }} />
      <span className="ar-star absolute z-[1] rounded-full" style={{ top: "65%", left: "14%", width: 2, height: 2, background: "#fff", boxShadow: "0 0 6px #fff", animation: "ar-twinkle 6s ease-in-out infinite 2s" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-[640px] md:min-h-screen flex-col"
      >
        {/* Cuerpo: meta + headline (sin menú de navegación) */}
        <div className="flex flex-1 items-center">
          <div className="w-full px-6 sm:px-10 md:px-16 pt-16 md:pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
              <div className="flex flex-col gap-8 md:gap-12 max-w-2xl">
                {/* Eyebrow: año / Annual Report */}
                <motion.div variants={fadeUp} className="flex items-center gap-5 md:gap-6">
                  <span className="text-white text-3xl md:text-4xl">
                    {year ?? "2025"}
                  </span>
                  <span className="h-8 w-px bg-white/20" />
                  <span className="flex flex-col gap-0.5">

                    <span className="text-md md:text-xl lg:text-3xl uppercase tracking-[0.18em] text-white">{eyebrow}</span>
                  </span>
                </motion.div>

                {/* Headline (título del proyecto, conserva tus saltos de línea) */}
                {data?.sub_title && (
                  <motion.h1
                    variants={fadeUp}
                    className={`${poppins.className}  m-0 whitespace-pre-line text-white text-5xl md:text-6xl lg:text-7xl xl:text-9xl`}
                    style={{
                      lineHeight: 0.98,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {(() => {
                      const words = data.sub_title.split(/(\s+)/);
                      if (words.length <= 1) return data.sub_title;
                      const last = words.pop();
                      return (
                        <>
                          {words.join("")}
                          <span className="text-ocre-500">{last}</span>
                        </>
                      );
                    })()}
                  </motion.h1>
                )}
                <motion.h3 variants={fadeUp} className="relative overflow-hidden text-base md:text-xl font-family-display">
                  {data?.hero_content_subtitle}
                </motion.h3>
              </div>
              {/* Columna derecha vacía: deja respirar la imagen */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Cinta inferior: scroll cue + KPIs */}
        <div className="px-6 sm:px-10 md:px-16">
          {/* Indicador de scroll */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-md md:text-lg uppercase tracking-[0.32em] text-white/50">{data?.executive_title}</span>
              <div className="relative h-9 w-px overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)" }}>
                <span className="ar-scroll-dot absolute top-0 left-0 h-3 w-px bg-white" style={{ animation: "ar-floatDown 2.4s ease-in-out infinite" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
