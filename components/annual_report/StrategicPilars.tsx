"use client"
import React from 'react'
import { Card, CardContent } from "../ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion"

type Pillar = {
	numeral: string
	title: string
	content?: string
}

interface StrategicPilarsProps {
	title?: string
	sub_title?: string
	content?:string
	items?: Pillar[]
	className?: string
}

const defaultPillars: Pillar[] = [
	{ numeral: 'I.', title: 'Sustained Growth and Diversification', content: 'A strong balance sheet, prudent cash-flowmanagement, and disciplined capital allocation underpin the Company´s financial solidity. Emphasis is placed on enhancing efficiency, broadening diversification by geography and line of business, and prioritising growth in markets with higher country risk, where Active Re´s expertise adds resilience and sustainable value.' },
	{ numeral: 'II.', title: 'Investment and Global Market Outlook', content: '' },
	{ numeral: 'III.', title: 'Innovation and Digital Transformation', content: '' },
	{ numeral: 'IV.', title: 'Operational Performance Optimisation', content: '' },
	{ numeral: 'V.', title: 'Business Development and GRC Culture', content: '' },
	{ numeral: 'VI.', title: 'Talent Structure and Management', content: '' },
]

const PillarCard: React.FC<Pillar> = ({ numeral, title, content = '' }) => {
	return (
		<Card className="overflow-hidden bg-white text-gray-800 border border-gray-100 shadow-sm rounded-lg">
			<CardContent className="p-0">
				<Accordion type="single" collapsible>
					<AccordionItem value="content" className="border-none">
						<AccordionTrigger className="px-5 py-3 text-gray-700 hover:no-underline">
							<div className="flex items-center gap-3">
								<div className="text-sm font-bold text-primary-500">{numeral}</div>
								<h3 className="text-base md:text-lg font-semibold text-gray-700 leading-snug">{title}</h3>
							</div>
						</AccordionTrigger>
						<AccordionContent className="bg-white text-gray-700">
							{content && (
								<div
									className="px-5 pb-4 relative w-full max-w-3xl overflow-hidden text-xl text-gray-800 mb-2 font-family-display"
									dangerouslySetInnerHTML={{ __html: content }}
								/>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	)
}

const StrategicPilars: React.FC<StrategicPilarsProps> = ({
	sub_title = 'The Six Strategic Pillars of Active Re',
	content,
	items = defaultPillars,
	className = '',
}) => {
	return (
		<section className={`w-full ${className} pb-12`}>
			<div className=" mx-auto">
				<div className="relative w-full max-w-3xl overflow-hidden text-xl text-gray-800 mb-8 font-family-display"
				dangerouslySetInnerHTML={{ __html: content ?? '' }}
				/>
				<h2 className='text-xl text-gray-900 mb-6 2xl:mb-12 font-semibold'>{sub_title}</h2>
				<div className="grid grid-cols-1 gap-4">
					{items.map((p) => (
						<PillarCard key={p.numeral} {...p} />
					))}
				</div>
			</div>
		</section>
	)
}

export default StrategicPilars

