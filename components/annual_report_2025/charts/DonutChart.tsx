'use client';
import { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { hex } from './tokens';
import type { RegionVM } from '@/types/annualReport2025';

function parseAmount(amount: string): { currency: string; value: number } | null {
  const m = amount.match(/^(\S+)\s+([\d,.]+)\s*([KMBkmb])?$/);
  if (!m) return null;
  const num = parseFloat(m[2].replace(/,/g, ''));
  const mult = (m[3]?.toUpperCase() === 'B' ? 1_000_000_000 : m[3]?.toUpperCase() === 'M' ? 1_000_000 : m[3]?.toUpperCase() === 'K' ? 1_000 : 1);
  return { currency: m[1], value: num * mult };
}

function formatTotal(value: number, currency: string): string {
  if (value >= 1_000_000_000) return `${currency} ${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${currency} ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${currency} ${(value / 1_000).toFixed(1)}K`;
  return `${currency} ${value.toFixed(1)}`;
}

export default function DonutChart({
  regions,
  total: externalTotal,
  activeIndex: externalActiveIndex,
  onActiveChange,
}: {
  regions: RegionVM[];
  total?: string;
  activeIndex?: number | undefined;
  onActiveChange?: (index: number | undefined) => void;
}) {
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | undefined>(undefined);
  const activeIndex = externalActiveIndex ?? internalActiveIndex;
  const setActiveIndex = onActiveChange ?? setInternalActiveIndex;

  const { data, totalDisplay, currencyDisplay, amountDisplay } = useMemo(() => {
    const parsed = regions.map(r => ({ parsed: r.amount ? parseAmount(r.amount) : null }));
    const hasAmounts = parsed.some(p => p.parsed);

    if (hasAmounts) {
      const totalValue = parsed.reduce((s, p) => s + (p.parsed?.value ?? 0), 0);
      const currency = parsed.find(p => p.parsed)!.parsed!.currency;
      const data = regions.map((r, i) => ({
        name: r.name,
        value: parsed[i].parsed ? Math.trunc((parsed[i].parsed!.value / totalValue) * 100 * 10) / 10 : r.percentage,
        token: r.colorToken,
      }));
      const total = externalTotal ?? formatTotal(totalValue, currency);
      const parts = total.split(' ');
      return { data, totalDisplay: total, currencyDisplay: parts[0] ?? 'USD', amountDisplay: parts.slice(1).join(' ') || total };
    }

    const data = regions.map(r => ({ name: r.name, value: r.percentage, token: r.colorToken }));
    const total = externalTotal ?? 'USD 192.0M';
    const parts = total.split(' ');
    return { data, totalDisplay: total, currencyDisplay: parts[0] ?? 'USD', amountDisplay: parts.slice(1).join(' ') || total };
  }, [regions, externalTotal]);

  const summary = data.map((d) => `${d.name} ${d.value}%`).join(', ');

  const onPieEnter = useCallback((_event: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(undefined);
  }, []);

  const renderLabel = useCallback(({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = (innerRadius + outerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={value < 10 ? 0 : 13}
        fontWeight={700}
      >
        {`${value.toFixed(1)}%`}
      </text>
    );
  }, []);

  const renderActiveShape = useCallback((props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))', transition: 'all 0.2s ease' }}
      />
    );
  }, []);

  return (
    <div className="relative" role="img" aria-label={`GWP distribution by region: ${summary}. Total ${totalDisplay}`}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={104}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            label={renderLabel}
            labelLine={false}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={hex(d.token)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-ar-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ar-muted2">
          {currencyDisplay}
        </span>
        <span className="ar-tnum mt-0.5 text-lg font-semibold text-ar-ink">
          {amountDisplay}
        </span>
        <span className="mt-1 font-ar-mono text-[9px] uppercase tracking-[0.1em] text-ar-muted2">
          Total GWP
        </span>
      </div>
    </div>
  );
}
