"use client"
import React, { useEffect, useMemo, useState } from "react"
import {
	Bar,
	CartesianGrid,
	Cell,
	ComposedChart,
	LabelList,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	ReferenceLine,
} from "recharts"
import { ChartContainer } from "../ui/charts"
import { useMediaQuery } from "../../hooks/useMediaQuery"

type PerformancePoint = {
	year: number | string
	value: number
}

type OurPerformanceProps = {
	data: PerformancePoint[]
	height?: number | string
	barColor?: string
	highlightColor?: string
	showLegend?: boolean
	yMax?: number // fixed top of Y axis (default 250)
	// Optional annotations
	cagrPercent?: number // e.g. 24 means 24%
	lastGrowthPercent?: number // e.g. 16 means 16%
}

const chartConfig = {
	value: {
		label: "Performance",
		color: "#0e7490", // teal-700
	},
	highlight: {
		label: "Latest",
		color: "#f97316", // orange-500
	},
}

function formatNumber(n: number) {
	// 1 decimal like 223.8
	return Number.isInteger(n) ? `${n}` : n.toFixed(1)
}

export default function OurPerformance({
	data: rawData,
	height = 360,
	barColor = chartConfig.value.color,
	highlightColor = chartConfig.highlight.color,
	showLegend = false,
	yMax = 300,
	cagrPercent,
	lastGrowthPercent,
}: OurPerformanceProps) {
	// Detect small screens to tweak chart paddings/margins and axis width
	const isMobile = useMediaQuery("(max-width: 640px)")

	const data = useMemo(
		() => (Array.isArray(rawData) ? [...rawData] : []).sort((a, b) => Number(a.year) - Number(b.year)),
		[rawData]
	)

		const [animatedData, setAnimatedData] = useState<PerformancePoint[]>([])

	useEffect(() => {
		// simple number grow-in like UnderwrittenResultChart pattern
		setAnimatedData(data.map((d) => ({ ...d, value: 0 })))
		const t = setTimeout(() => setAnimatedData(data), 100)
		return () => clearTimeout(t)
	}, [JSON.stringify(data)])

	const lastIndex = data.length - 1

	return (
		<ChartContainer config={chartConfig} className="w-full mb-20" style={{ minHeight: '360px' }}>
			<div className="mb-3">
				<h3 className="text-primary-500 font-semibold tracking-tight">Net Written Premiums Throughout the Years</h3>
				<p className="text-secondary-500 text-sm">US$ in Millions</p>
			</div>
			{/* Wrapper made relative so we can overlay external arrow content above the chart */}
			<div className="relative" style={{ width: "100%", height: typeof height === 'number' ? `${height}px` : height, minHeight: '320px', overflow: "visible" }}>
				{/* External overlay that sits above the chart. Pointer-events disabled so tooltips still work. */}
				<div className="pointer-events-none absolute inset-0 overflow-visible">
					{/* SVG arrow spanning the container with a bit of extra right/top room. */}
					{typeof cagrPercent === "number" && (
						<svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
							<defs>
								<marker id="ap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
									<path d="M 0 0 L 10 5 L 0 10 z" fill="#374151" />
								</marker>
							</defs>
							<line x1="10" y1="70" x2="94" y2="17" stroke="#374151" strokeWidth="0.8" markerEnd="url(#ap-arrow)" />
						</svg>
					)}

					{/* Middle label for CAGR near the arrow */}
					{typeof cagrPercent === "number" && (
						<div className="absolute" style={{ left: "43%", top: "40%", transform: "translate(-50%, -50%)" }}>
							<div className="font-extrabold leading-none" style={{ fontSize: 28, color: "#b6821f" }}>
								{cagrPercent}%
							</div>
							<div className="text-slate-600 font-semibold tracking-wide -mt-0.5" style={{ fontSize: 12 }}>CAGR</div>
						</div>
					)}

					{/* Top-right label (e.g., last growth) with small icon similar to reference */}
					{typeof lastGrowthPercent === "number" && (
						<div className="absolute flex items-center gap-2" style={{ right: "2%", top: "6%" }}>
							<div className="font-bold" style={{ fontSize: 18, color: "#b6821f" }}>{lastGrowthPercent}%</div>
							<svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								{/* simple mountain icon */}
								<path d="M2 24 L10 10 L18 24" stroke="#6b7280" strokeWidth="2" fill="none" />
								<path d="M12 24 L20 8 L30 24" stroke="#6b7280" strokeWidth="2" fill="none" />
								<path d="M22 10 C24 12 24 14 26 16" stroke="#0e7490" strokeWidth="2" fill="none" />
								<rect x="28" y="1" width="4" height="6" stroke="#0e7490" strokeWidth="2" fill="none" />
								<path d="M30 1 V-1" stroke="#0e7490" strokeWidth="2" />
							</svg>
						</div>
					)}
				</div>

				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart
						data={animatedData}
						margin={{ top: isMobile ? 12 : 24, right: isMobile ? 12 : 24, left: isMobile ? 4 : 24, bottom: isMobile ? 12 : 24 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="year" tick={{ fontSize: isMobile ? 10 : 12 }} interval={isMobile ? 1 : 0} tickMargin={8} />
						<YAxis
							domain={[0, yMax]}
							tick={isMobile ? false : { fontSize: 12 }}
							width={isMobile ? 1 : 36}
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							formatter={(value: any, name: any) => {
								if (name === "value") return [formatNumber(Number(value)), "Performance"]
								return [value, name]
							}}
						/>
						{showLegend && <Legend />}

						<Bar dataKey="value" barSize={isMobile ? 18 : 28} name="Performance" radius={[4, 4, 0, 0]}>
							{animatedData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={index === lastIndex ? highlightColor : barColor}
								/>
							))}
							<LabelList
								dataKey="value"
								position="top"
								formatter={(v: any) => formatNumber(Number(v))}
								className="text-[10px] sm:text-xs" fill="#b6821f"
							/>
						</Bar>

						{/* Note: lastGrowthPercent and the external CAGR arrow are now rendered in the HTML overlay above. */}

						{/* Baseline for aesthetics */}
						<ReferenceLine y={0} stroke="#e2e8f0" />
					</ComposedChart>
				</ResponsiveContainer>
				</div>
		</ChartContainer>
	)
}

// Small in-file demo (optional). Remove or ignore in production usage.
export function OurPerformanceExample() {
	const sample: PerformancePoint[] = [
		{ year: 2008, value: 5.7 },
		{ year: 2009, value: 9.8 },
		{ year: 2010, value: 43.4 },
		{ year: 2011, value: 47.3 },
		{ year: 2012, value: 56.5 },
		{ year: 2013, value: 38.9 },
		{ year: 2014, value: 88.6 },
		{ year: 2015, value: 124.6 },
		{ year: 2016, value: 106.5 },
		{ year: 2017, value: 92.2 },
		{ year: 2018, value: 99.0 },
		{ year: 2019, value: 119.4 },
		{ year: 2020, value: 145.9 },
		{ year: 2021, value: 163.4 },
		{ year: 2022, value: 171.7 },
		{ year: 2023, value: 193.6 },
		{ year: 2024, value: 223.8 },
	]

	return (
		<div className="w-full">
			<OurPerformance data={sample} cagrPercent={24} lastGrowthPercent={16} />
		</div>
	)
}