"use client"
import React, { useEffect, useMemo, useState } from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer } from "../ui/charts"

type ShareDatum = {
  year: number | string
  share_capital: number // US$ millions
  retained_earnings: number // US$ millions
  shareholder_equity: number // US$ millions (sum, for reference line)
}

type Props = {
  title: string
  data: ShareDatum[]
  height?: number | string
  capitalColor?: string
  retainedColor?: string
  equityColor?: string
  domain?: [number, number]
  showLegend?: boolean
}

const chartConfig = {
  share_capital: { label: "Share Capital", color: "#c65f06" }, // orange
  retained_earnings: { label: "Retained Earnings", color: "#0b5b66" }, // deep teal
  shareholder_equity: { label: "Shareholders Equity", color: "#7ed7e0" }, // light teal line
}

function fmt(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1)
}

export default function Shares({
  title,
  data: raw,
  height = 380,
  capitalColor = chartConfig.share_capital.color!,
  retainedColor = chartConfig.retained_earnings.color!,
  equityColor = chartConfig.shareholder_equity.color!,
  domain = [0, 120],
  showLegend = true,
}: Props) {
  const data = useMemo(
    () => (Array.isArray(raw) ? [...raw] : []).sort((a, b) => Number(a.year) - Number(b.year)),
    [raw]
  )

  // Simple mount animation: start from zero values
  const [animated, setAnimated] = useState<ShareDatum[]>([])
  useEffect(() => {
    setAnimated(
      data.map((d) => ({ ...d, share_capital: 0, retained_earnings: 0, shareholder_equity: 0 }))
    )
    const t = setTimeout(() => setAnimated(data), 120)
    return () => clearTimeout(t)
  }, [JSON.stringify(data)])

  const lastIndex = Math.max(0, data.length - 1)

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ minHeight: '380px' }}>
      <div className="mb-4 md:mb-6">
        <h2 className="text-primary-500 font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-secondary-500 text-sm">US$ in Millions</p>
      </div>
      <div style={{ width: "100%", height: typeof height === 'number' ? `${height}px` : height, minHeight: '340px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={animated} margin={{ top: 30, right: 40, left: 24, bottom: 30 }}>
            <defs>
              <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={capitalColor} stopOpacity={1} />
                <stop offset="100%" stopColor={capitalColor} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={retainedColor} stopOpacity={1} />
                <stop offset="100%" stopColor={retainedColor} stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              domain={domain}
              tickCount={7}
            />
            <Tooltip
              formatter={(val: any, name: any) => {
                if (name === "share_capital") return [fmt(Number(val)), "Share Capital"]
                if (name === "retained_earnings") return [fmt(Number(val)), "Retained Earnings"]
                if (name === "shareholder_equity") return [fmt(Number(val)), "Shareholders Equity"]
                return [val, name]
              }}
            />
            {showLegend && <Legend />}

            {/* Stacked areas */}
            <Area
              type="monotone"
              dataKey="share_capital"
              name="Share Capital"
              stackId="1"
              stroke={capitalColor}
              fill="url(#capGrad)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="retained_earnings"
              name="Retained Earnings"
              stackId="1"
              stroke={retainedColor}
              fill="url(#retGrad)"
              fillOpacity={1}
            />

            {/* Equity line over the stack */}
            <Line
              type="monotone"
              dataKey="shareholder_equity"
              name="Shareholders Equity"
              stroke={equityColor}
              strokeWidth={3}
              dot={({ cx, cy, value, index }: any) => (
                <g>
                  <circle cx={cx} cy={cy} r={4} fill={equityColor} />
                  <text
                    x={cx}
                    y={cy - 8}
                    textAnchor="middle"
                    fontSize={11}
                    fill={index === lastIndex ? "#cea559" : "#6b7280"}
                    fontWeight={index === lastIndex ? 700 : 500}
                  >
                    {fmt(Number(value))}
                  </text>
                </g>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}

// Example usage for quick preview
export function SharesExample() {
  const sample: ShareDatum[] = [
    { year: 2020, share_capital: 39.8, retained_earnings: 12.1, shareholder_equity: 51.9 },
    { year: 2021, share_capital: 44.9, retained_earnings: 20.6, shareholder_equity: 65.5 },
    { year: 2022, share_capital: 47.2, retained_earnings: 32.6, shareholder_equity: 79.8 },
    { year: 2023, share_capital: 49.4, retained_earnings: 38.2, shareholder_equity: 87.6 },
    { year: 2024, share_capital: 49.6, retained_earnings: 50.7, shareholder_equity: 100.3 },
  ]

  return (
    <div className="w-full">
      <Shares data={sample} title="" />
    </div>
  )
}
