'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver con safety-flush: si por cualquier motivo no dispara,
 * fuerza el estado visible tras `flushMs` para garantizar que el contenido aparece.
 * Respeta prefers-reduced-motion devolviendo true de inmediato.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.12, once = true, flushMs = 2000 } = {}
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const flush = window.setTimeout(() => setInView(true), flushMs);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      window.clearTimeout(flush);
      observer.disconnect();
    };
  }, [threshold, once, flushMs]);

  return [ref, inView];
}
