"use client"
import React from "react"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/charts"
import { Evolutioncapital } from "../../../types/finnancialInformation"

const chartConfig = {
  value: {
    label: "Capital Pagado",
    color: "hsl(var(--chart-1))",
  },
  remaining: {
    label: "Restante",
    color: "hsl(var(--muted))",
  },
}

interface PaidCapitalChartProps {
  capitalInfo: Evolutioncapital[]
  fullSize?: boolean
}

export function PaidCapitalChart({ fullSize = false, capitalInfo }: PaidCapitalChartProps) {
  const data = (capitalInfo || []).sort((b, a) => Number(a.year) - Number(b.year));
  const maxValue = data.reduce((acc, item) => Math.max(acc, item.value), 0);
  const [animatedData, setAnimatedData] = useState<Evolutioncapital[]>([]);

  useEffect(() => {
    setAnimatedData(
      data.map((item) => ({ ...item, value: 0 }))
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
          {animatedData.map((item) => (
            <div key={item.year} className="flex items-center">
              <div className="text-right mr-4 font-medium text-sm">{item?.year}A</div>
              <div className="flex-1 relative h-4">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 flex items-center pl-2"
                  style={{
                    width: `${(item?.value / maxValue) * 100}%`,
                    transition: "width 1s ease-out",
                  }}
                >
                  <span className="text-white font-bold text-sm">${item?.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
