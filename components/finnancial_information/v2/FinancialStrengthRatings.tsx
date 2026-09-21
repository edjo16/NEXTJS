'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import ImageBack from '@/components/common/ImageBack';
import type { ranking } from '@/types/finnancialInformation';
import type { Image as ImageData } from '@/types/types';

interface FinancialStrengthRatingsProps {
  title?: string;
  ratings?: ranking[];
  image?: ImageData | null;
}

const TIMELINE_COUNT = 5;

/** "A (Excellent)" -> { grade: "A", label: "(Excellent)" } */
const splitRating = (value?: string) => {
  const match = (value ?? '').match(/^\s*([^()]+?)\s*(\(.*\))?\s*$/);
  return { grade: match?.[1] ?? value ?? '', label: match?.[2] ?? '' };
};

function CertificationLink({ item, className = '' }: { item: ranking; className?: string }) {
  if (!item.link) return <span className={className}>{item.certification}</span>;
  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-primary-500 ${className}`}
    >
      {item.certification}
      <ExternalLink className="h-3 w-3" aria-hidden />
    </Link>
  );
}

export default function FinancialStrengthRatings({ title, ratings, image }: FinancialStrengthRatingsProps) {
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(
    () =>
      [...(ratings ?? [])]
        .filter((r) => !r?.status || r.status === 'published')
        .sort((a, b) => Number(b.year) - Number(a.year)),
    [ratings]
  );

  if (!sorted.length) return null;

  const [latest, ...previous] = sorted;
  const timeline = (showAll ? previous : previous.slice(0, TIMELINE_COUNT)).reverse(); // oldest -> newest
  const hasEarlier = previous.length > TIMELINE_COUNT;
  const latestRating = splitRating(latest.financial_strength);

  return (
    <section aria-labelledby="financial-strength-ratings" className="h-full rounded-2xl bg-white p-5 sm:p-6">
      <h2 id="financial-strength-ratings" className="font-serif text-2xl font-semibold text-primary-900">
        {title || 'Financial Strength Ratings'}
      </h2>
      <span className="mt-2 block h-1 w-10 rounded-full bg-secondary-500" />

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-stretch">
        {/* Timeline of previous years */}
        {timeline.length > 0 && (
          <div className="min-w-0 flex-1 overflow-x-auto pb-2">
            <ol className="relative flex w-full min-w-max gap-1 sm:min-w-0">
              <span aria-hidden className="absolute left-8 right-8 top-[30px] h-px bg-gray-100" />
              {timeline.map((item, i) => {
                const r = splitRating(item.financial_strength);
                const isNewest = i === timeline.length - 1;
                return (
                  <li key={item.year} className="relative flex w-[72px] flex-col items-center text-center sm:w-auto sm:min-w-[64px] sm:flex-1">
                    <span className="text-xs font-semibold text-gray-600">{item.year}</span>
                    <span
                      className={`relative z-10 mt-2 h-3 w-3 rounded-full border-2 ${
                        isNewest ? 'border-secondary-500 bg-secondary-500' : 'border-gray-300 bg-white'
                      }`}
                    />
                    <span className="mt-3 font-serif text-xl font-semibold text-primary-900">{r.grade}</span>
                    {r.label && <span className="text-[11px] text-gray-600">{r.label}</span>}
                    {item.credit_rating && (
                      <span className="mt-2 text-[11px] leading-tight text-gray-600">{item.credit_rating}</span>
                    )}
                    <CertificationLink item={item} className="mt-2 text-[11px]" />
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* Current rating highlight */}
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border-2 border-secondary-300 bg-secondary-50/40 px-6 py-5 text-center md:w-40">
          <span className="font-serif text-2xl font-semibold text-secondary-500">{latest.year}</span>
          <span className="mt-2 font-serif text-3xl font-semibold text-primary-900">{latestRating.grade}</span>
          {latestRating.label && <span className="text-sm text-gray-700">{latestRating.label}</span>}
          {latest.credit_rating && <span className="mt-3 text-sm text-gray-700">{latest.credit_rating}</span>}
          {image?.filename_disk && (
            <ImageBack
              src={image.filename_disk}
              alt="Rating agency"
              activeTransition={false}
              className="mt-3 w-24 [&_img]:h-auto [&_img]:w-full [&_img]:object-contain"
            />
          )}
          <CertificationLink item={latest} className="mt-2 text-xs" />
        </div>
      </div>

      {hasEarlier && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-1 rounded-full border border-gray-100 bg-celeste-50 px-4 py-1.5 text-xs font-medium text-primary-900 transition-colors hover:bg-celeste-100"
          >
            {showAll ? 'Show fewer years' : 'View ratings for earlier years'}
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}
    </section>
  );
}
