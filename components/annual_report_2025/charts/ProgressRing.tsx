'use client';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';


/** Ring de cobertura (panel oscuro de Operaciones). */
export default function ProgressRing({
  value,
  label,
  size = 120,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value}%`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="85%"
          outerRadius="100%"
          data={[{ value }]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={999}
            background={{ fill: '#d1d5db' }}
            fill="#00586f"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <span className="ar-tnum text-sm font-semibold">{value}%</span>
      </div>
    </div>
  );
}
