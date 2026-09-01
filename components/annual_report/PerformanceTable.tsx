"use client"
import React from "react";
type Year = 2020 | 2021 | 2022 | 2023 | 2024;

type MetricRow = {
	label: string;
	unit?: "money" | "percent" | "ratio"; // ratio used for values like leverage
	values: Record<Year, number>;
	// Optional precomputed change column (e.g., % Change 2021–2022 from the design)
	change?: string; // keep as string to allow signs and custom formatting (e.g., "(4.6)" or "-16%")
};

const defaultRows: MetricRow[] = [
	{
		label: "Net Premiums Written",
		unit: "money",
		values: { 2024: 223.8, 2023: 193.6, 2022: 171.7, 2021: 163.4, 2020: 145.9 },
		change: "16%",
	},
	{
		label: "Net Retained Premium",
		unit: "money",
		values: { 2024: 148.9, 2023: 127.0, 2022: 99.2, 2021: 70.6, 2020: 51.0 },
		change: "17%",
	},
	{
		label: "Underwriting Income",
		unit: "money",
		values: { 2024: 20.0, 2023: 23.8, 2022: 39.3, 2021: 22.0, 2020: 14.6 },
		change: "-16%",
	},
	{
		label: "Operating Income Before Taxes",
		unit: "money",
		values: { 2024: 8.3, 2023: 13.2, 2022: 18.3, 2021: 13.9, 2020: 9.7 },
		change: "-37%",
	},
	{
		label: "Net Investment Income",
		unit: "money",
		values: { 2024: 8.1, 2023: 2.9, 2022: -4.6, 2021: 0.2, 2020: 1.4 },
		change: "177%",
	},
	{
		label: "Net Income",
		unit: "money",
		values: { 2024: 16.3, 2023: 15.8, 2022: 17.8, 2021: 14.0, 2020: 9.7 },
		change: "3%",
	},
	{
		label: "Total Assets",
		unit: "money",
		values: { 2024: 487.1, 2023: 346.6, 2022: 278.6, 2021: 250.1, 2020: 245.8 },
		change: "22%",
	},
	{
		label: "Total Equity",
		unit: "money",
		values: { 2024: 100.3, 2023: 87.6, 2022: 79.8, 2021: 65.5, 2020: 51.9 },
		change: "15%",
	},
	{
		label: "Combined Ratio %",
		unit: "money",
		values: { 2024: 94.5, 2023: 89.6, 2022: 76.9, 2021: 80.4, 2020: 83.8 },
		change: "5%",
	},
	{
		label: "Return on Premium %",
		unit: "money",
		values: { 2024: 10.9, 2023: 12.4, 2022: 18.9, 2021: 19.8, 2020: 19.0 },
		change: "-12%",
	},
	{
		label: "Return on Equity %",
		unit: "money",
		values: { 2024: 17.3, 2023: 18.9, 2022: 24.6, 2021: 23.8, 2020: 21.0 },
		change: "-8%",
	},
	{
		label: "Leverage",
		unit: "ratio",
		values: { 2024: 1.48, 2023: 1.45, 2022: 1.24, 2021: 1.08, 2020: 0.98 },
		change: "2%",
	},
];

function formatNumber(value: number, unit: MetricRow["unit"]) {
	const base = String(value);
	if (unit === "percent") return `${base}%`;
	return base;
}

const YEARS: Year[] = [2024, 2023, 2022, 2021, 2020];
export interface PerformanceTableProps {
	title?: string;
	subtitle?: string;
	rows?: MetricRow[];
}

export default function PerformanceTable({
	title = "Our Performance 2020–2024",
	subtitle = "US$ in Millions",
	rows = defaultRows,
}: PerformanceTableProps) {
	return (
		<section className="w-full mb-20">
			{/* Header */}
			<div className="mb-3">
				<h3 className="text-primary-500 font-semibold tracking-tight">{title}</h3>
				<p className="text-secondary-500 text-sm">{subtitle}</p>
			</div>

			{/* Table wrapper for responsiveness */}
			<div className="relative overflow-x-auto md:overflow-visible no-scrollbar rounded-md shadow-sm ring-1 ring-celeste-800/20">
				<table className="min-w-[720px] w-full text-sm">
					<thead>
						<tr className="bg-celeste-50">
							<th className="sticky left-0 z-30 bg-celeste-50 px-3 py-2 text-left text-primary-500 font-semibold border-b border-celeste-800/30 border-dashed">
								{/* empty corner cell for row labels */}
							</th>
							{YEARS.map((y) => (
								<th
									key={y}
									className="px-3 py-2 text-center text-secondary-500 font-semibold border-b border-celeste-800/30 border-dashed"
								>
									{y}
								</th>
							))}
							<th className="px-3 py-2 text-center text-secondary-500 font-semibold border-b border-celeste-800/30 border-dashed whitespace-nowrap">
								% Change 2023–2024
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, idx) => (
							<tr key={row.label} className={idx % 2 === 1 ? "bg-white" : "bg-celeste-50/40"}>
								{/* Row label */}
								<th
									scope="row"
									className={`sticky left-0 z-20 px-3 py-2 text-left text-primary-500 font-medium border-b border-celeste-800/30 border-dashed ${idx % 2 === 1 ? "bg-white" : "bg-celeste-50/40"}`}
								>
									{row.label}
								</th>
								{/* Year values */}
								{YEARS.map((y) => (
									<td
										key={y}
										className="px-3 py-2 text-right text-gray-900 border-b border-celeste-800/30 border-dashed"
									>
										{formatNumber(row.values[y], row.unit)}
									</td>
								))}
								{/* Change column */}
								{/* <td className="px-3 py-2 text-right border-b border-celeste-800/30 border-dashed"> */}
								<td className="px-3 py-2 text-right text-gray-900 border-b border-celeste-800/30 border-dashed">
									{row.change ?? "-"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}

