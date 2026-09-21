'use client';
import React from 'react';
import { Bar, CartesianGrid, Cell, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { EquityPoint } from '@/types/finnancialInformation';
import { FI_COLORS, formatNumber, niceMax } from '../utils';
import { PillBar } from './PillBar';
import { ChartTooltipBox } from './ChartTooltip';

/** Shareholders' equity: pill columns + trend line joining the tops. */
export default function EquityChart({ data }: { data: EquityPoint[] }) {
  const lastIndex = data.length - 1;
  const max = niceMax(Math.max(0, ...data.map((d) => d.value)) * 1.1, 20);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 24, right: 4, left: -18, bottom: 0 }} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke={FI_COLORS.grid} />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={(props: any) => {
            const isLast = props.payload.index === lastIndex;
            return (
              <text x={props.x} y={props.y + 12} textAnchor="middle" fontSize={12}
                fontWeight={isLast ? 700 : 400} fill={isLast ? FI_COLORS.text : FI_COLORS.axis}>
                {props.payload.value}
              </text>
            );
          }}
        />
        <YAxis domain={[0, max]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: FI_COLORS.axis }} />
        <Tooltip
          cursor={{ fill: 'rgba(0,88,111,0.05)' }}
          content={({ active, payload }: any) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as EquityPoint;
            return (
              <ChartTooltipBox
                title={p.year}
                rows={[
                  { label: "Shareholders' equity", value: `USD ${formatNumber(p.value)} M`, color: FI_COLORS.highlight },
                  { label: 'Share & add. paid-in capital', value: formatNumber(p.share_additional_paidin_capital) },
                  { label: 'Retained earnings', value: formatNumber(p.retained_earnings) },
                  { label: 'Retained premiums', value: formatNumber(p.retained_premiums) },
                ]}
              />
            );
          }}
        />
        <Bar dataKey="value" shape={<PillBar />} maxBarSize={40} animationDuration={900}>
          {data.map((d, i) => (
            <Cell key={d.year} fill={i === lastIndex ? FI_COLORS.highlight : FI_COLORS.bar} />
          ))}
        </Bar>
        <Line
          type="monotone"
          dataKey="value"
          stroke={FI_COLORS.highlight}
          strokeWidth={2}
          dot={{ r: 4, fill: '#fff', stroke: FI_COLORS.highlight, strokeWidth: 2 }}
          activeDot={{ r: 6 }}
          animationDuration={1100}
        >
          <LabelList dataKey="value" position="top" offset={10} formatter={(v: number) => formatNumber(v)}
            style={{ fontSize: 12, fontWeight: 600, fill: FI_COLORS.text }} />
        </Line>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
