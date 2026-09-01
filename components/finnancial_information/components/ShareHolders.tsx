"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { shareholders } from "../../../types/finnancialInformation"
import { useState, useEffect } from 'react';
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-800">{entry.dataKey}:</span>
            </div>
            <span className="text-sm font-medium text-gray-800 ml-4">
              {Number(entry.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center items-center space-x-6 mt-6">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#21A6AB' }} />
        <span className="text-sm text-gray-700">Share & Additional Paid-in Capital</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#9CA3AF' }} />
        <span className="text-sm text-gray-700">Retained Earnings</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#00586F' }} />
        <span className="text-sm text-gray-700">Retained Premiums</span>
      </div>
    </div>
  );
};

export default function ShareholdersEquityChart( {shareholders} : { shareholders: shareholders[] }) {
  const data = (shareholders || []).sort((a, b) => Number(a.year) - Number(b.year));
  const [animatedData, setAnimatedData] = useState<shareholders[]>([]);

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
    <div className="w-full bg-white">
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={animatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="1 1" stroke="#d1d5db" horizontal={true} vertical={true} />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={[0, 150]}
              tickCount={11}
              tickFormatter={(value) => `${value}.00`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            
            <Area
              type="bump"
              dataKey="share_additional_paidin_capital"
              stackId="1"
              stroke="#21A6AB"
              fill="#21A6AB"
              strokeWidth={0}
            />
            <Area
              type="bump"
              dataKey="retained_earnings"
              stackId="1"
              stroke="#9CA3AF"
              fill="#9CA3AF"
              strokeWidth={0}
            />
            <Area
              type="bump"
              dataKey="retained_premiums"
              stackId="2"
              stroke="#374151"
              fill="none"
              strokeWidth={2}
              dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <g>
                  <rect x={cx - 12} y={cy - 10} width={25} height={20} fill="#00586F" />
                  <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
                    {payload?.retained_premiums}
                  </text>
                </g>
              );
            }}
            activeDot={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <g>
                  <rect x={cx - 12} y={cy - 10} width={25} height={20} fill="#00586F" />
                  <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
                    {payload?.retained_premiums}
                  </text>
                </g>
              );
            }}
          />          
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <CustomLegend />
    </div>
  );
}

