"use client"
import React from 'react';

type Metric = {
  title: string;
  value: string;
  note?: string;
};

interface Props {
  metrics?: Metric[];
}

// Default metrics based on the provided image
const defaultMetrics: Metric[] = [
  { title: 'Return on Premium ', value: '10.9%', note: '(2023: 12.4%)' },
  { title: 'Return on Equity  ', value: '17.3%', note: '(2023: 18.9%)' },
  { title: 'Return on Investment  ', value: '5.8%', note: '(2023: 1.8%)' },
  { title: 'Return on Assets  ', value: '3.7%', note: '(2023: 4.7%)' },
  { title: 'Combined Ratio  ', value: '94.5%', note: '(2023: 89.8%)' },
  { title: 'Leverage  ', value: '1.48', note: '(2023: 1.45)' },
];

function DiamondRating() {
  return (
    <div className="relative mx-auto md:mx-0 md:-mr-10 lg:-mr-14 xl:-mr-16 md:z-20 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex-shrink-0">
      {/* Outer decorative angled brace (left) */}

      <div className="absolute inset-0 rotate-45 bg-cyan-50/70 border border-cyan-800" />
      <div className="absolute inset-2 sm:inset-3 md:inset-4 rotate-45 bg-white/40 border border-white/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-900">
        <p className="text-[10px] sm:text-xs text-slate-600">Financial Strength</p>
        <div className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none">A</div>
        <p className="text-[10px] sm:text-xs text-slate-600">(Excellent) Positive Outlook</p>
        <div className="h-3" />
        <p className="text-[10px] sm:text-xs text-slate-600">Long-Term Credit Rating</p>
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">a</div>
        <p className="text-[10px] sm:text-xs text-slate-600">(Excellent) Positive Outlook</p>
      </div>

      {/* Label */}
      <span className="absolute -left-9 sm:-left-10 top-4 -rotate-45 text-cyan-800 font-semibold tracking-wide text-[10px] sm:text-xs whitespace-nowrap">
        AM Best Rating
      </span>
    </div>
  );
}

export default function FinancialHighlights({ metrics = defaultMetrics }: Props) {
  return (
    <section
      className="w-full mb-32 pt-14 md:pt-20"
    >
      <div className="relative mx-auto flex flex-col md:flex-row items-stretch gap-8 md:gap-0">
        {/* Diamond rating */}
        <DiamondRating />

        {/* Metrics panel */}
        <div className="relative flex-1 min-h-[220px] md:z-0">
          <div className="relative h-full w-full bg-cyan-50/70 border-y border-cyan-800 flex sm:flex-col md:flex-row">
            {/* grid: mobile 2 cols, md 3 cols */}
            <div className='w-2 md:w-32 h-full'>
              
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 h-full">
              {metrics.map((m) => (
                <div
                  key={m.title}
                  className={
                    'flex flex-col items-center justify-center gap-1 min-h-[110px] pl-3 py-6 text-cyan-900 '}
                >
                  <p className="text-[14px] sm:text-sm font-medium text-cyan-500/80 text-center leading-snug">
                    2024
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-cyan-900/80 text-center leading-snug">
                    {m.title}
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-none">{m.value}</p>
                  {m.note && (
                    <p className="text-[10px] sm:text-xs text-cyan-900/70">{m.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
