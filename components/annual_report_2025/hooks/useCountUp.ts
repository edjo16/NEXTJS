'use client';
import { useEffect, useState } from 'react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Cuenta desde 0 hasta `target` con requestAnimationFrame y easeOutCubic.
 * Conserva los decimales del target. Respeta prefers-reduced-motion (muestra final).
 */
export function useCountUp(
  target: number,
  { enabled = true, durationMs = 1400, start = false }: { enabled?: boolean; durationMs?: number; start?: boolean } = {}
): number {
  const decimals = (() => {
    const s = String(target);
    const i = s.indexOf('.');
    return i === -1 ? 0 : s.length - i - 1;
  })();

  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    if (!start) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = easeOutCubic(p);
      const current = target * eased;
      setValue(Number(current.toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, durationMs, start, decimals]);

  return value;
}
