'use client';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartPoint } from '@/types/finnancialInformation';
import { FI_COLORS, formatNumber, niceMax } from '../utils';
import { PillBar } from './PillBar';
import { ChartTooltipBox } from './ChartTooltip';

interface ColumnChartProps {
  data: ChartPoint[];
  label: string;
  step?: number;
}

/** Vertical pill-column chart; the latest year is highlighted. */
export default function ColumnChart({ data, label, step = 20 }: ColumnChartProps) {
  const max = niceMax(Math.max(0, ...data.map((d) => d.value)) * 1.1, step);
  const lastIndex = data.length - 1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 24, right: 4, left: -18, bottom: 0 }} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke={FI_COLORS.grid} />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={(props: any) => {
            const isLast = props.payload.index === lastIndex;
            return (
              <text
                x={props.x}
                y={props.y + 12}
                textAnchor="middle"
                fontSize={12}
                fontWeight={isLast ? 700 : 400}
                fill={isLast ? FI_COLORS.text : FI_COLORS.axis}
              >
                {props.payload.value}
              </text>
            );
          }}
        />
        <YAxis
          domain={[0, max]}
          tickCount={Math.min(7, max / step + 1)}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: FI_COLORS.axis }}
        />
        <Tooltip
          cursor={{ fill: 'rgba(0,88,111,0.05)' }}
          content={({ active, payload }: any) =>
            active && payload?.length ? (
              <ChartTooltipBox
                title={payload[0].payload.year}
                rows={[{ label, value: `USD ${formatNumber(payload[0].value)} M`, color: FI_COLORS.highlight }]}
              />
            ) : null
          }
        />
        <Bar dataKey="value" shape={<PillBar />} maxBarSize={40} animationDuration={900}>
          {data.map((d, i) => (
            <Cell key={d.year} fill={i === lastIndex ? FI_COLORS.highlight : FI_COLORS.bar} />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            offset={8}
            formatter={(v: number) => formatNumber(v)}
            style={{ fontSize: 12, fontWeight: 600, fill: FI_COLORS.text }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
