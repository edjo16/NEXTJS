"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function useScrollAnimation(threshold = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const inViewOptions = {
    root: undefined,
    rootMargin: '0px',
    threshold: threshold,
  };

  const isInView = useInView(ref, inViewOptions);

  useEffect(() => {
    if (isInView && !inView) {
      setInView(true);
    }
  }, [isInView, inView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setInView(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, inView };
}