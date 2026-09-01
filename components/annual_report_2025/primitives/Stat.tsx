'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion, useInView } from 'framer-motion';
import Icon from './Icon';
import type { KeyHighlightsCards } from '@/types/annualReport2025';

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const prefersReduced = useReducedMotion();
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  const numStr = match?.[1] ?? '';
  const suffix = match?.[2] ?? '';
  const num = parseFloat(numStr.replace(/[^0-9.-]/g, ''));
  const isNumeric = !isNaN(num);
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (v) => {
    if (Number.isInteger(num)) return `${Math.round(v)}${suffix}`;
    return `${v.toFixed(1)}${suffix}`;
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !isNumeric || prefersReduced) return;
    hasAnimated.current = true;
    const controls = animate(count, num, { duration: 1.4, ease: 'easeOut' });
    return controls.stop;
  }, [inView, num, isNumeric, count, prefersReduced]);

  if (!isNumeric || prefersReduced) return <>{value}</>;
  return <motion.span>{displayValue}</motion.span>;
}

export default function Stat({ data }: { data: KeyHighlightsCards }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex flex-col items-center px-1 text-center"
    >
      <div className="mb-3 flex items-center justify-center gap-2 text-primary-500">
        <Icon name={data.icon} size={42} />
      </div>
      <p className="text-md font-bold uppercase tracking-[0.1em] text-primary-500">
        {data.title}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ocre-500">
        <CountUp value={data?.content ?? ''} inView={inView} />
      </p>
      {data?.subtitle && (
        <p className="mt-1 text-[12px] font-medium">{data.subtitle}</p>
      )}
      {data?.back_subtitle && (
        <p className="mt-0.5 text-[11px] leading-tight">{data.back_subtitle}</p>
      )}
    </motion.div>
  );
}
