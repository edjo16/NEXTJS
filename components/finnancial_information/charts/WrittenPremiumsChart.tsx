"use client"
import React from "react"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/charts"
import { WrittenPremiums } from "../../../types/finnancialInformation"


const chartConfig = {
  value: {
    label: "Primas Escritas",
    color: "hsl(var(--chart-1))",
  },
  remaining: {
    label: "Restante",
    color: "hsl(var(--muted))",
  },
}

interface WrittenPremiumsChartProps {
  premiumsInfo: WrittenPremiums[]
  fullSize?: boolean
}

export function WrittenPremiumsChart({ fullSize = false, premiumsInfo }: WrittenPremiumsChartProps) {
  const data = (premiumsInfo || []).sort((b, a) => Number(a.year) - Number(b.year));
  const maxValue = data.reduce((acc, item) => Math.max(acc, item.premiums), 0);
  const [animatedData, setAnimatedData] = useState<WrittenPremiums[]>([]);

  useEffect(() => {
    setAnimatedData(
      data.map((item) => ({ ...item, premiums: 0 }))
    );
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [JSON.stringify(data)]);

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <div className="flex flex-col space-y-6 py-4">
          {animatedData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="text-right mr-4 font-medium text-sm">{item.year}A</div>
              <div className="flex-1 relative h-4">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 flex items-center pl-3"
                  style={{
                    width: `${(item.premiums / maxValue) * 100}%`,
                    transition: "width 1s ease-out",
                  }}
                >
                  <span className="text-white font-bold text-sm">${item.premiums}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </ResponsiveContainer>
    </ChartContainer>
  );
}
