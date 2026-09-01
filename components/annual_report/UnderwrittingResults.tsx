import React, { useEffect, useMemo, useState } from "react"
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Customized,
} from "recharts"
import { ChartContainer } from "../ui/charts"
import { useMediaQuery } from "../../hooks/useMediaQuery"

type UnderwritingDatum = {
	year: number | string
	underwriting_result: number // in US$ millions
	combined_ratio: number // %
	market_combined_ratio: number // %
}

type Props = {
	data: UnderwritingDatum[]
	height?: number | string
	barColor?: string
	combinedColor?: string
	marketColor?: string
	leftDomain?: [number, number]
	rightDomain?: [number, number]
	showLegend?: boolean
	annotationRightPadding?: number
	annotationTopOffset?: number
	fullBleedOnMobile?: boolean
}

const chartConfig = {
	underwriting_result: { label: "Underwriting Result", color: "#86cbd2" },
	combined_ratio: { label: "Combined Ratio", color: "#0e7490" },
	market_combined_ratio: { label: "Market's Combined Ratio", color: "#d1a354" },
}

function formatMoney(n: number) {
	return Number.isInteger(n) ? `${n}` : n.toFixed(1)
}

function avg(nums: number[]) {
	if (!nums.length) return 0
	return nums.reduce((a, b) => a + b, 0) / nums.length
}

export default function UnderwrittingResults({
	data: raw,
	height = 380,
	barColor = chartConfig.underwriting_result.color,
	combinedColor = chartConfig.combined_ratio.color,
	marketColor = chartConfig.market_combined_ratio.color,
	leftDomain = [0, 45],
	rightDomain = [70, 110],
	showLegend = true,
	annotationRightPadding = 12,
	annotationTopOffset = 24,
	fullBleedOnMobile = true,
}: Props) {
	// Mobile detection (Tailwind sm breakpoint ~640px)
	const isMobile = useMediaQuery("(max-width: 640px)")

	const data = useMemo(
		() => (Array.isArray(raw) ? [...raw] : []).sort((a, b) => Number(a.year) - Number(b.year)),
		[raw]
	)

	// Animate values in like the previous chart
	const [animated, setAnimated] = useState<UnderwritingDatum[]>([])
	useEffect(() => {
		setAnimated(
			data.map((d) => ({
				...d,
				underwriting_result: 0,
				combined_ratio: rightDomain[0],
				market_combined_ratio: rightDomain[0],
			}))
		)
		const t = setTimeout(() => setAnimated(data), 120)
		return () => clearTimeout(t)
	}, [JSON.stringify(data), rightDomain[0]])

	const avgCombined = useMemo(() => avg(data.map((d) => d.combined_ratio)), [data])
	const avgMarket = useMemo(() => avg(data.map((d) => d.market_combined_ratio)), [data])

	// Responsive tweaks
	const chartHeight = isMobile ? (typeof height === "number" ? Math.max(height, 460) : height) : height
	const chartMargin = isMobile
		? { top: 16, right: 28, left: 8, bottom: 28 }
		: { top: 30, right: 40, left: 24, bottom: 40 }
	const barSize = isMobile ? 28 : 38
	const tickFontSize = isMobile ? 10 : 12
	const legendFontSize = isMobile ? 11 : 12
	const showInlinePointLabels = !isMobile

	// Custom legend to ensure spacing and consistent bottom placement
	const renderLegend = (props: any) => {
		const { payload = [] } = props || {}
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: 12,
					fontSize: legendFontSize,
					width: "100%",
					paddingTop: 6,
				}}
			>
				{payload.map((entry: any, i: number) => (
					<span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
						<span
							style={{
								display: "inline-block",
								width: 10,
								height: 10,
								backgroundColor: entry.color,
								borderRadius: 2,
							}}
						/>
						<span>{entry.value}</span>
					</span>
				))}
			</div>
		)
	}

	// Full-bleed container on mobile to remove lateral gaps
	const containerStyle = isMobile && fullBleedOnMobile
		? { width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", minHeight: '380px' }
		: { minHeight: '380px' }

	return (
		<ChartContainer config={chartConfig} className="w-full" style={containerStyle as any}>
			<p className="text-secondary-500 text-sm">US$ in Millions</p>
			<div style={{ width: "100%", height: typeof chartHeight === 'number' ? `${chartHeight}px` : chartHeight, minHeight: '340px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={animated} margin={chartMargin}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="year" tick={{ fontSize: tickFontSize }} tickLine={false} />
						<YAxis
							yAxisId="left"
							orientation="left"
							domain={leftDomain}
							tickCount={6}
							tick={{ fontSize: tickFontSize }}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							domain={rightDomain}
							tickFormatter={(v) => `${v}%`}
							tickCount={9}
							tick={{ fontSize: tickFontSize }}
							tickLine={false}
						/>
						<Tooltip
							formatter={(val: any, name: any) => {
								if (name === "underwriting_result") return [`${formatMoney(Number(val))}`, "Underwriting Result"]
								if (name === "combined_ratio") return [`${val}%`, "Combined Ratio"]
								if (name === "market_combined_ratio") return [`${val}%`, "Market's Combined Ratio"]
								return [val, name]
							}}
						/>
						{showLegend && (
							<Legend verticalAlign="bottom" align="center" content={renderLegend as any} />
						)}

						{/* Bars */}
						<Bar
							yAxisId="left"
							dataKey="underwriting_result"
							name="Underwriting Result"
							fill={barColor}
							barSize={barSize}
							radius={[4, 4, 0, 0]}
							label={{ position: "top", formatter: (v: any) => formatMoney(Number(v)) } as any}
						/>

						{/* Combined Ratio line (teal) */}
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="combined_ratio"
							name="Combined Ratio"
							stroke={combinedColor}
							strokeWidth={3}
							dot={({ cx, cy, value, index }: any) => {
								const isLast = typeof index === "number" && index === animated.length - 1
								const showLabel = showInlinePointLabels || isLast
								return (
									<g>
										<circle cx={cx} cy={cy} r={4} fill={combinedColor} />
										{showLabel && (
											<text
												x={cx}
												y={cy - 8}
												textAnchor="middle"
												fontSize={isMobile ? 10 : 11}
												fill={combinedColor}
											>
												{`${value}%`}
											</text>
										)}
									</g>
								)
							}}
						/>

						{/* Market's Combined Ratio (gold, dashed) */}
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="market_combined_ratio"
							name="Market's Combined Ratio"
							stroke={marketColor}
							strokeWidth={2}
							strokeDasharray="4 4"
							dot={({ cx, cy, value, index }: any) => {
								const isLast = typeof index === "number" && index === animated.length - 1
								const showLabel = showInlinePointLabels || isLast
								return (
									<g>
										<circle cx={cx} cy={cy} r={4} fill={marketColor} />
										{showLabel && (
											<text
												x={cx}
												y={cy - 8}
												textAnchor="middle"
												fontSize={isMobile ? 10 : 11}
												fill={marketColor}
											>
												{`${value}%`}
											</text>
										)}
									</g>
								)
							}}
						/>

						{/* Optional: averages at top-right area */}
						<Customized
							component={(props: any) => {
								const { offset } = props || {}
								if (!offset) return null
								const plotRight = offset.left + (offset.width || 0)
								// Right-align the labels inside the plot with a small padding so they don't overlap the right axis ticks.
								const x = plotRight - annotationRightPadding
								const y = (offset.top || 0) + (isMobile ? 16 : annotationTopOffset)
								return (
									<g>
										<text x={x} y={y} fill={combinedColor} fontWeight={700} fontSize={isMobile ? 13 : 16} textAnchor="end">
											{`Avg. ${avgCombined.toFixed(1)}%`}
										</text>
										<text x={x} y={y + (isMobile ? 20 : 26)} fill={marketColor} fontWeight={600} fontSize={isMobile ? 13 : 16} textAnchor="end">
											{`Avg. ${avgMarket.toFixed(1)}%`}
										</text>
									</g>
								)
							}}
						/>

						<ReferenceLine yAxisId="left" y={0} stroke="#e2e8f0" />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</ChartContainer>
	)
}

// Example usage for quick preview
export function UnderwrittingResultsExample() {
	const sample: UnderwritingDatum[] = [
		{ year: 2020, underwriting_result: 14.5, combined_ratio: 83.8, market_combined_ratio: 104.1 },
		{ year: 2021, underwriting_result: 22.0, combined_ratio: 80.4, market_combined_ratio: 97.6 },
		{ year: 2022, underwriting_result: 39.0, combined_ratio: 76.9, market_combined_ratio: 94.6 },
		{ year: 2023, underwriting_result: 24.0, combined_ratio: 89.6, market_combined_ratio: 87.3 },
		{ year: 2024, underwriting_result: 20.0, combined_ratio: 94.5, market_combined_ratio: 86.8 },
	]

	return (
		<div className="w-full">
			<UnderwrittingResults data={sample} />
		</div>
	)
}

