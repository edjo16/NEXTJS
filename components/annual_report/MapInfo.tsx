"use client"
import React from 'react'
import { Card } from "../ui/card"
import type { LucideIcon } from "lucide-react"
import {
	Globe2,
	Handshake,
	BriefcaseBusiness,
	ShieldCheck,
	Building2,
	MapPinHouse,
	Pin,
	Languages as LanguagesIcon,
	ExternalLink,
} from "lucide-react"

type StatItem = {
	value: string | number
	label: string
}

type LanguagesItem = {
	count: number | string
	label: string
	list?: string[]
}

interface MapInfoProps {
	stats?: StatItem[]
	languages?: LanguagesItem
	className?: string
	sourceLabel?: string
	sourceHref?: string
}

// Defaults inspired by the provided image
const defaultStats: StatItem[] = [
	{ value: 653, label: 'Cedents' },
	{ value: 170, label: 'Brokers' },
	{ value: 137, label: 'Countries' },
	{ value: 6, label: 'MGAs' },
	{ value: 1, label: 'Facility' },
	{ value: 17, label: 'Cities\nActive Re Team' },
]

const defaultLanguages: LanguagesItem = {
	count: 12,
	label: 'Spoken languages',
	list: [
		'Spanish',
		'English',
		'French',
		'Portuguese',
		'German',
		'Italian',
		'Russian',
		'Hindi',
		'Arabic',
		'Swedish',
		'Cantonese',
		'Turkish',
	],
}

// Pick a professional icon per label (fallback to Pin)
const pickIcon = (label: string): LucideIcon => {
	const key = label.toLowerCase()
	if (key.includes('cedent')) return Handshake
	if (key.includes('broker')) return BriefcaseBusiness
	if (key.includes('countries')) return Globe2
	if (key.includes('mga')) return ShieldCheck
	if (key.includes('facilit')) return Building2
	if (key.includes('city')) return MapPinHouse
	return Pin
}

const IconBadge: React.FC<{ Icon: LucideIcon; className?: string }> = ({ Icon, className = '' }) => (
	<div className={`flex items-center justify-center ${className}`}>
		<Icon className="h-7 w-7 text-teal-800" aria-hidden />
	</div>
)

const StatCard: React.FC<StatItem & { className?: string }> = ({ value, label, className = '' }) => {
	const Icon = pickIcon(label)
	const [l1, l2] = label.split('\n')
	return (
		<Card className={`bg-white p-6 md:p-7 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
			<div className="flex flex-col items-center text-center gap-2">
				<IconBadge Icon={Icon} />
				<div className="text-3xl md:text-4xl font-extrabold text-orange-700 tracking-tight">{value}</div>
				<div className="text-sm md:text-base text-teal-800 leading-snug font-medium">
					<span className="block">{l1}</span>
					{l2 && <span className="block">{l2}</span>}
				</div>
			</div>
		</Card>
	)
}

const LanguagesCard: React.FC<LanguagesItem & { className?: string }> = ({ count, label, list, className = '' }) => (
	<Card className={`bg-white p-6 md:p-7 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
		<div className="flex flex-col items-center text-center gap-2">
			<IconBadge Icon={LanguagesIcon} />
			<div className="text-3xl md:text-4xl font-extrabold text-orange-700 tracking-tight">{count}</div>
			<div className="text-sm md:text-base text-teal-800 font-medium">{label}</div>
			{!!list?.length && (
				<p className="mt-1 text-xs md:text-sm text-gray-700 leading-relaxed">
					({list.join(', ')})
				</p>
			)}
		</div>
	</Card>
)

const MapInfo: React.FC<MapInfoProps> = ({
	stats = defaultStats,
	languages = defaultLanguages,
	className = '',
	sourceLabel = 'Source: Explore our Geographical Scope',
	sourceHref = '/#global-presence',
}) => {
	return (
		<section className={`w-full ${className} mb-20`}>
			<div className="max-w-7xl mx-auto">
				{/*
				  Estructura como la imagen:
				  - Dos filas de métricas (3 columnas) y una tarjeta de Idiomas a la derecha ocupando las 2 filas.
				*/}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{/* 6 stats: ocupan las 3 primeras columnas en 2 filas */}
					{stats.slice(0, 6).map((s, i) => (
						<StatCard
							key={`${s.label}-${i}`}
							value={s.value}
							label={s.label}
							className="min-h-[120px]"
						/>
					))}
					{/* Idiomas: columna derecha y ocupa las 2 filas en lg */}
					<LanguagesCard
						className="lg:col-start-4 lg:row-start-1 lg:row-span-2"
						count={languages.count}
						label={languages.label}
						list={languages.list}
					/>
				</div>

				<div className="mt-4 text-xs text-gray-700 flex items-center gap-1">
					<span>Source:</span>
					{sourceHref ? (
						<a
							href={sourceHref}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1 text-orange-700 hover:text-orange-800 underline"
						>
							{sourceLabel.replace(/^Source:\s*/i, '') || 'Explore our Geographical Scope'}
							<ExternalLink className="h-3.5 w-3.5" aria-hidden />
						</a>
					) : (
						<span className="text-gray-700">{sourceLabel}</span>
					)}
				</div>
			</div>
		</section>
	)
}

export default MapInfo

