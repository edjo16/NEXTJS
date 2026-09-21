'use client';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { UnderwritingPoint } from '@/types/finnancialInformation';
import { FI_COLORS, formatNumber, niceMax } from '../utils';
import { PillBar } from './PillBar';
import { ChartTooltipBox } from './ChartTooltip';

/** Underwritten result (bars, USD m – left axis) + combined ratio (line, % – right axis). */
export default function UnderwritingChart({ data }: { data: UnderwritingPoint[] }) {
  const lastIndex = data.length - 1;
  const results = data.map((d) => d.result);
  const ratios = data.map((d) => d.ratio ?? 0);

  // Bars live in the lower half, the ratio line floats above them (as in the design).
  const leftMin = Math.min(0, Math.floor(Math.min(0, ...results) / 10) * 10);
  const leftMax = niceMax(Math.max(0, ...results) * 1.7, 10);
  const rightMax = niceMax(Math.max(100, ...ratios) * 1.12, 20);
  const rightMin = leftMin < 0 ? -Math.round((rightMax * Math.abs(leftMin)) / leftMax) : 0;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 16, right: -8, left: -18, bottom: 0 }} barCategoryGap="22%">
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
        <YAxis yAxisId="left" domain={[leftMin, leftMax]} tickCount={Math.min(7, (leftMax - leftMin) / 10 + 1)} axisLine={false} tickLine={false}
          tick={{ fontSize: 11, fill: FI_COLORS.axis }} />
        <YAxis yAxisId="right" orientation="right" domain={[rightMin, rightMax]} axisLine={false} tickLine={false}
          tick={{ fontSize: 11, fill: FI_COLORS.axis }} />
        {leftMin < 0 && <ReferenceLine yAxisId="left" y={0} stroke={FI_COLORS.axis} strokeOpacity={0.4} />}
        <Tooltip
          cursor={{ fill: 'rgba(0,88,111,0.05)' }}
          content={({ active, payload }: any) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as UnderwritingPoint;
            return (
              <ChartTooltipBox
                title={p.year}
                rows={[
                  { label: 'Underwritten result', value: `USD ${formatNumber(p.result)} M`, color: FI_COLORS.highlight },
                  { label: 'Combined ratio', value: `${formatNumber(p.ratio)}%`, color: FI_COLORS.line },
                ]}
              />
            );
          }}
        />
        <Bar yAxisId="left" dataKey="result" shape={<PillBar />} maxBarSize={40} animationDuration={900}>
          {data.map((d, i) => (
            <Cell key={d.year} fill={i === lastIndex ? FI_COLORS.highlight : FI_COLORS.bar} />
          ))}
          <LabelList dataKey="result" position="top" offset={8} formatter={(v: number) => formatNumber(v)}
            style={{ fontSize: 12, fontWeight: 600, fill: FI_COLORS.text }} />
        </Bar>
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ratio"
          stroke={FI_COLORS.line}
          strokeWidth={2.5}
          dot={{ r: 4, fill: FI_COLORS.line, stroke: '#fff', strokeWidth: 1.5 }}
          activeDot={{ r: 6 }}
          connectNulls
          animationDuration={1100}
        >
          <LabelList dataKey="ratio" position="top" offset={10} formatter={(v: number) => formatNumber(v)}
            style={{ fontSize: 12, fontWeight: 600, fill: FI_COLORS.text }} />
        </Line>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
