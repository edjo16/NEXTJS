"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import ImageBack from "../common/ImageBack";

type Region = {
	key: "americas" | "emea" | "apac" | (string & {});
	region: string;
	content: string;
	image?: string;
	imageAlt?: string;
};

type GlobalPresenceProps = {
	regions?: Region[];
	initialRegionKey?: Region["key"];
	className?: string;
};

const GlobalPresence: React.FC<GlobalPresenceProps> = ({
	regions,
	initialRegionKey,
	className = "",
}) => {
	const defaultRegions: Region[] = useMemo(
		() => [
			{
				key: "americas",
				region: "Americas & Caribbean",
				content:
					"Expanded participation in automatic treaties, entered new markets, particularly in North America, onboarded cedants aligned with Active Re’s risk appetite, and enhanced collateral management to support U.S. operations.",
				image: "5e57a1db-43bc-4e90-ae97-8842f5bac312"
			},
			{
				key: "emea",
				region: "Europe, Middle East & Africa (EMEA)",
				content:
					"Strengthened relationships with strategic partners, diversified lines of business, and supported specialized programs with underwriting discipline across key markets in EMEA.",
				image: "4e379591-8d31-4c81-8ed2-ede064b802db"
			},
			{
				key: "apac",
				region: "Asia-Pacific (APAC)",
				content:
					"Scaled participation in profitable niches, reinforced technical pricing, and fostered long-term alliances across Southeast Asia and Oceania.",
				image: "d98ecd31-c127-44df-9fde-f5939d2ca093"
			},
		],
		[]
	);

	const items = regions && regions.length > 0 ? regions : defaultRegions;
	const [activeKey, setActiveKey] = useState<Region["key"]>(
		initialRegionKey ?? items[0].key
	);

	// Preload all region images (both base and webp variants) up-front
	useEffect(() => {
		const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL as string | undefined;
		if (!apiUrl) return;

		items.forEach((r) => {
			if (!r.image) return;
			const baseSrc = `${apiUrl}/assets/${r.image}`;
			const webpSrc = `${baseSrc}?format=webp&quality=70`;

			const i1 = new Image();
			i1.src = baseSrc;
			const i2 = new Image();
			i2.src = webpSrc;
		});
	}, [items]);

	const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

	const active = items.find((r) => r.key === activeKey) ?? items[0];

	const onKeyDownTabs = (e: React.KeyboardEvent) => {
		const idx = items.findIndex((r) => r.key === activeKey);
		if (idx === -1) return;
		if (e.key === "ArrowRight") {
			e.preventDefault();
			const next = items[(idx + 1) % items.length];
			setActiveKey(next.key);
			tabRefs.current[next.key]?.focus();
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			const prev = items[(idx - 1 + items.length) % items.length];
			setActiveKey(prev.key);
			tabRefs.current[prev.key]?.focus();
		}
	};

	return (
		<section className={`w-full ${className} py-12`}>
			<div className="mx-auto max-w-3xl">
				{/* Tabs */}
				<div
					role="tablist"
					aria-label="Regiones"
					className="no-scrollbar flex w-full gap-8 overflow-x-auto pb-2"
					onKeyDown={onKeyDownTabs}
				>
					{items.map((r) => {
						const isActive = r.key === activeKey;
						return (
							<button
								key={r.key}
								role="tab"
								aria-selected={isActive}
								aria-controls={`panel-${r.key}`}
								id={`tab-${r.key}`}
								ref={(el) => { tabRefs.current[r.key] = el; }}
								onClick={() => setActiveKey(r.key)}
								className={
									`shrink-0 whitespace-nowrap pb-3 text-left text-lg font-semibold transition-colors ` +
									(isActive
										? "text-primary-900 border-b-4 border-terracota-500"
										: "text-gray-800 hover:text-primary-500 border-b-4 border-transparent")
								}
							>
								{r.region}
							</button>
						);
					})}
				</div>

				{/* Content */}
				<div
					id={`panel-${active.key}`}
					role="tabpanel"
					aria-labelledby={`tab-${active.key}`}
					className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-10"
				>
					{active.image ? (
						<ImageBack
							src={active.image}
							alt={active.region}
							className="h-56 w-full object-cover shadow-sm md:h-72"
						/>
					) : (
						<div className="flex h-56 w-full items-center justify-center border-gray-200 bg-gray-100 text-gray-500 md:h-72">
							Image not avaliable
						</div>
					)}

					<div className="leading-7 text-xl text-gray-800 mb-8">
						<p className="tracking-wide">
							{active.content}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GlobalPresence;

