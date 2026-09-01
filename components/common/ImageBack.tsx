import { motion } from "framer-motion";
import Image from "next/image"

export default function ImageBack({
  src,
  alt,
  className,
  width,
  height,
  fill,
  style,
  activeTransition = true,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  style?: any;
  activeTransition?: boolean;
  priority?: boolean;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const baseSrc = `${apiUrl}/assets/${src}`;
  const srcWebp = `${baseSrc}?format=webp&quality=75`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
    >
      <picture>
        <source srcSet={srcWebp} type="image/webp" />
        {!activeTransition ? (
          <Image
            src={baseSrc}
            alt={alt}
            fill={fill}
            width={!fill ? (width || 800) : undefined}
            height={!fill ? (height || 600) : undefined}
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            loading={priority ? "eager" : undefined}
            className={`${fill ? 'object-cover' : ''} ${fill ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <motion.img
            src={baseSrc}
            alt={alt}
            className={`w-full h-full object-top ${fill ? "object-contain" : "object-cover"}`}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        )}
      </picture>
    </div>
  );
}
