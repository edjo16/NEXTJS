'use client';
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer } from 'recharts';
import { TOKEN_HEX } from './tokens';
import type { PerfSeriesVM } from '@/types/annualReport2025';

/** Barras de performance (USD M, 5 años). Última barra = gold (año actual). */
export default function BarChartGroup({ series }: { series: PerfSeriesVM }) {
  const data = series.points.map((p) => ({
    name: p.yearLabel,
    value: p.value,
    hl: p.isHighlight,
  }));

  const summary = series.points.map((p) => `${p.yearLabel}: ${p.value}`).join(', ');

  return (
    <figure
      className="rounded-2xl border border-ar-line bg-white p-5 shadow-sh-sm"
      aria-label={`${series.label} (${series.unit ?? ''}). ${summary}`}
    >
      <figcaption className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ar-ink">{series.label}</span>
        <span className="font-ar-mono text-[11px] uppercase tracking-wide text-ar-muted2">
          {series.unit}
        </span>
      </figcaption>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontFamily: 'var(--font-ar-mono)', fontSize: 11, fill: '#000000' }}
          />
          <YAxis domain={[0, series.max || 1]} hide />
          <Bar dataKey="value" radius={[999, 999, 999, 999]} maxBarSize={24} isAnimationActive background={(props: any) => {
            const { x, y, width, height, value } = props;
            const max = series.max || 1;
            const bgH = (value * 1.1 / max) * height;
            return <rect x={x} y={y + height - bgH} width={width} height={bgH} fill="#e8e8ea" rx={999} />;
          }}>
            <LabelList
              dataKey="value"
              position="center"
              formatter={(v: number) => v.toFixed(1)}
              style={{ fontFamily: 'var(--font-ar-mono)', fontSize: 8, fill: '#ffffff' }}
            />
            {data.map((d, i) => (
              <Cell key={i} fill={d.hl ?  TOKEN_HEX['primary.500']: TOKEN_HEX['gray.500']} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </figure>
  );
}
