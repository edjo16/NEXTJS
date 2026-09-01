"use client"
import React from "react"
import { useEffect, useState } from "react"
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "../../ui/charts"
import { UnderwrittenRatio } from "../../../types/finnancialInformation"


const chartConfig = {
  underwritten_income: {
    label: "Underwriting Income",
    color: "#0e7490",
  },
  combined_ratio: {
    label: "Combined Ratio",
    color: "#06b6d4",
  },
}

export function UnderwrittenResultChart({ ratioInfo }: { ratioInfo: UnderwrittenRatio[] }) {
  const data = Array.isArray(ratioInfo) ? ratioInfo : [];
  const [animatedData, setAnimatedData] = useState<UnderwrittenRatio[]>([]);
  const maxCombinedRatio = Math.max(...animatedData.map((item: any) => item.combined_ratio)) + 5;

  useEffect(() => {
    setAnimatedData(
      data.map((item: UnderwrittenRatio) => ({
        ...item,
        underwritten_income: "0",
        combined_ratio: "0",
      }))
    );
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [JSON.stringify(data)]);

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={animatedData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, 45]}
            tickCount={11}
            label={{
              value: "Underwriting Income",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[70, maxCombinedRatio]}
            tickCount={11}
            label={{
              value: "Combined Ratio",
              angle: 90,
              position: "insideRight",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "underwritten_income") return [`${value}`, "Underwriting Income"];
              if (name === "combined_ratio") return [`${value}%`, "Combined Ratio"];
              return [value, name];
            }}
          />
          <Legend />
          <Bar barSize={35} yAxisId="left" dataKey="underwritten_income" fill="#0e7490" name="Underwriting Income" radius={[4, 4, 0, 0]} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="combined_ratio"
            stroke="#06b6d4"
            name="Combined Ratio"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <g>
                  <rect x={cx - 12} y={cy - 12} width={24} height={24} fill="#06b6d4" stroke="#06b6d4" />
                  <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                    {payload.combined_ratio}
                  </text>
                </g>
              );
            }}
            activeDot={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <g>
                  <rect x={cx - 14} y={cy - 14} width={28} height={28} fill="#06b6d4" stroke="#ffffff" strokeWidth={2} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                    {payload.combined_ratio}
                  </text>
                </g>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
