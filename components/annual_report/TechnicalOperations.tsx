"use client"
import React from "react";


type TableRow = {
	label: string;
	// values are all percentages for this section
	values: number[]; // must match columns.length
};

type TableDefinition = {
	title: string;
	content?: string;
	columns: string[]; // excludes the sticky first column
	rows: TableRow[];
};

function formatPercent(value: number) {
	// keep provided precision; do not round
	const base = String(Math.abs(value));
	const formatted = value < 0 ? `(${base})` : base;
	return `${formatted}%`;
}

function SimpleStatTable({ def }: { def: TableDefinition }) {
	return (
		<div className="mb-10">
			<h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 text-left">
				{def.title}
			</h4>
			<div className="relative overflow-x-auto md:overflow-visible no-scrollbar rounded-md shadow-sm ring-1 ring-celeste-800/20">
				<table className="min-w-[640px] w-full text-sm">
					<thead>
						<tr className="bg-celeste-50">
							<th className="sticky left-0 z-30 bg-celeste-50 px-3 py-2 text-left text-primary-500 font-semibold border-b border-celeste-800/30 border-dashed"></th>
							{def.columns.map((c) => (
								<th
									key={c}
									className="px-3 py-2 text-center text-secondary-500 font-semibold border-b border-celeste-800/30 border-dashed whitespace-nowrap"
								>
									{c}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{def.rows.map((row, idx) => (
							<tr key={row.label} className={idx % 2 === 1 ? "bg-white" : "bg-celeste-50/40"}>
								<th
									scope="row"
									className={`sticky left-0 z-20 px-3 py-2 text-left text-primary-500 font-medium border-b border-celeste-800/30 border-dashed ${
										idx % 2 === 1 ? "bg-white" : "bg-celeste-50/40"
									}`}
								>
									{row.label}
								</th>
								{row.values.map((v, i) => (
									<td
										key={i}
										className="px-3 py-2 text-center text-gray-900 border-b border-celeste-800/30 border-dashed"
									>
										{formatPercent(v)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export interface TechnicalOperationsProps {
	title?: string;
	subtitle?: string;
	content?: string;
	contractTable?: TableDefinition;
	lobTable?: TableDefinition;
	/** Page number for main content "Read more" */
	contentPage?: number;
	/** Page number for contract table extra content */
	contractTablePage?: number;
	/** Page number for line of business table extra content */
	lobTablePage?: number;
	/** Callback used to open the PDF at a given page */
	onOpenPage?: (page: number) => void;
}

const defaultContractTable: TableDefinition = {
	title: "Portfolio Structure by Type of Contract",
	content: "",
	columns: ["% Accounts", "% Retained Premiums", "% Profitability"],
	rows: [
		{ label: "MGAs & Facilities", values: [85, 33, 84] },
		{ label: "Treaties", values: [4, 39, 10] },
		{ label: "Facultatives", values: [11, 28, 6] },
		{ label: "Total", values: [100, 100, 100] },
	],
};

const defaultLobTable: TableDefinition = {
	title: "Portfolio Structure by Line of Business",
	content: "",
	columns: ["% Accounts", "% Retained Premiums", "% Profitability"],
	rows: [
		{ label: "P&E", values: [93, 57, 54] },
		{ label: "Surety", values: [4, 13, 45] },
		{ label: "Affinity", values: [3, 30, 1] },
		{ label: "Total", values: [100, 100, 100] },
	],
};

export default function TechnicalOperations({
	title = "Technical Operations",
	content = "",
	subtitle = undefined,
	contractTable = defaultContractTable,
	lobTable = defaultLobTable,
	contentPage,
	contractTablePage,
	lobTablePage,
	onOpenPage,
}: TechnicalOperationsProps) {
	return (
		<section className="w-full">
			<div className="mb-3">
				{subtitle && <p className="text-secondary-500 text-sm">{subtitle}</p>}
			</div>
			<div
				className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 mb-4 font-family-display"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			{contentPage && contentPage > 0 && onOpenPage && (
				<span
					className="inline-block text-lg text-orange-700 hover:text-orange-800 mb-8 underline cursor-pointer"
					onClick={() => onOpenPage(contentPage)}
				>
					Read more
				</span>
			)}

			{/* Contract table */}
			{contractTable && (
				<div className="mb-10">
					<SimpleStatTable def={contractTable} />
					{contractTablePage && contractTablePage > 0 && onOpenPage && (
						<span
							className="inline-block text-lg text-orange-700 hover:text-orange-800 mb-8 underline cursor-pointer"
							onClick={() => onOpenPage(contractTablePage)}
						>
							Read more
						</span>
					)}
				</div>
			)}

			{/* Line of business table */}
			{lobTable && (
				<div className="mb-4">
					<SimpleStatTable def={lobTable} />
					{lobTablePage && lobTablePage > 0 && onOpenPage && (
						<span
							className="inline-block text-lg text-orange-700 hover:text-orange-800 mb-8 underline cursor-pointer"
							onClick={() => onOpenPage(lobTablePage)}
						>
							Read more
						</span>
					)}
				</div>
			)}
		</section>
	);
}

