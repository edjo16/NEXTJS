'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { formatPct } from './utils';

interface KpiCardProps {
  icon: LucideIcon;
  title: string;
  unit?: string;
  changePct: number | null;
  description: React.ReactNode;
  legend?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export default function KpiCard({
  icon: Icon,
  title,
  unit = 'USD million',
  changePct,
  description,
  legend,
  children,
  delay = 0,
}: KpiCardProps) {
  const rounded = changePct === null ? 0 : Math.round(changePct);
  const Arrow = rounded > 0 ? ArrowUpRight : rounded < 0 ? ArrowDownRight : ArrowRight;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="flex h-full flex-col rounded-2xl border border-gray-50 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,44,56,0.18)] sm:p-6"
    >
      <header className="mb-4 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-celeste-100 text-primary-500">
          <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </span>
        <div>
          <h3 className="font-serif text-xl font-semibold leading-tight text-primary-900 sm:text-2xl">{title}</h3>
          {unit && <p className="text-sm text-gray-500">{unit}</p>}
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 md:flex-row md:items-stretch">
        <div className="min-w-0 flex-1">
          <div className="h-56 w-full sm:h-60">{children}</div>
          {legend}
        </div>

        <div className="flex flex-row items-start gap-4 border-t border-gray-50 pt-4 md:w-36 md:flex-col md:justify-center md:gap-3 md:border-l md:border-t-0 md:pl-5 md:pt-0 lg:w-40">
          {changePct !== null && (
            <p className="flex items-center gap-1 whitespace-nowrap font-serif text-3xl font-semibold text-primary-500">
              <Arrow className="h-6 w-6" strokeWidth={1.8} aria-hidden />
              {formatPct(changePct)}
            </p>
          )}
          <p className="text-sm leading-relaxed text-gray-700">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
