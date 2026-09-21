'use client';
import React from 'react';

export interface TooltipRow {
  label: string;
  value: string;
  color?: string;
}

/** Minimal tooltip shared by the v2 charts. */
export function ChartTooltipBox({ title, rows }: { title: string; rows: TooltipRow[] }) {
  return (
    <div className="rounded-lg border border-gray-50 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-primary-900">{title}</p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-gray-600">
            {r.color && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />}
            {r.label}
          </span>
          <span className="font-semibold text-primary-900">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
