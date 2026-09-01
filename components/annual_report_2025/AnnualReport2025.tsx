"use client";
import React, { useMemo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import HeaderReport from '@/components/annual_report_2025/layout/HeaderReport'
import HeroContent from '@/components/annual_report_2025/sections/Hero'
import {
  fetchHeroData,
  fetchKeyHighlights,
  fetchExecutiveData,
  fetchFinancialPerformance,
  fetchLinesOfBusiness,
  fetchGlobalPresence,
  fetchOperations,
  fetchRetrosecion,
  fetchGovernance,
  fetchClose,
} from '@/hooks/useAnualReport-2025'
import Executive from '@/components/annual_report_2025/sections/Leadership'
import KeyHighlights from '@/components/annual_report_2025/sections/KeyHighlights'
const FloatingMenu = dynamic(() => import('@/components/ui/FloatingMenu2025'), { ssr: false });
import { useCallback } from 'react'
import { buildAnnualReportMenuItems2025 } from '@/components/annual_report/menu_items'
import Loading from '@/components/common/Loading'
import Performance from '@/components/annual_report_2025/sections/Performance'
import BusinessLines from './sections/BusinessLines';
import { getAssetUrl } from '@/lib/annual-report/asset';
import type { BusinessLineVM, LinesOfBusinessSectionData, LineOfBusinessRaw } from '@/types/annualReport2025';
import GlobalPresence from '@/components/annual_report_2025/sections/GlobalPresence';
import Operations from '@/components/annual_report_2025/sections/Operations';
import RetroGovernance from '@/components/annual_report_2025/sections/RetroGovernance';
import Closing from '@/components/annual_report_2025/sections/Closing';
import FooterAnnualReport from '../annual_report/FooterAnnualReport25';

export default function AnualReport() {
  const [report, setReport] = useState<any>(null)
  const [loadingReport, setLoadingReport] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoadingReport(true);
      setError(null);
      try {
        const hero = await fetchHeroData();
        const [executive, keyHighlights, financial_performance, linesOfBusiness, globalPresence, operations, retrosecion, governance, closing] = await Promise.all([
          fetchExecutiveData(),
          fetchKeyHighlights(),
          fetchFinancialPerformance(),
          fetchLinesOfBusiness(),
          fetchGlobalPresence(),
          fetchOperations(),
          fetchRetrosecion(),
          fetchGovernance(),
          fetchClose()
        ]);
        if (!alive) return;
        setReport({
          hero,
          keyHighlights,
          executive,
          financial_performance,
          linesOfBusiness,
          globalPresence,
          operations,
          retrosecion,
          governance,
          closing,
        });
      } catch (e: any) {
        if (alive) setError(e.message || 'Error loading annual report');
      } finally {
        if (alive) setLoadingReport(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  const hero = useMemo(() => report?.hero ?? ({} as any), [report]);
  const executive = useMemo(() => report?.executive ?? ({} as any), [report]);
  const financialPerformance = useMemo(() => report?.financial_performance ?? ({} as any), [report]);
  const keyHighligths = useMemo(() => report?.keyHighlights ?? ({} as any), [report]);
  const linesOfBusinessData = useMemo(
    () => report?.linesOfBusiness as LinesOfBusinessSectionData,
    [report]
  );
  const businessLinesHeader = useMemo(
    () => ({
      kickerNum: linesOfBusinessData?.kicker_num,
      kickerLabel: linesOfBusinessData?.kicker_label,
      title: linesOfBusinessData?.title,
      subtitle: linesOfBusinessData?.subtitle,
      line_message: linesOfBusinessData?.line_message
    }),
    [linesOfBusinessData]
  );
  const lineOfBusinessIcons: Record<string, string> = {
    property: 'Building2',
    casualty: 'ShieldCheck',
    marine: 'Globe',
    aviation: 'Network',
    life: 'Users',
    health: 'ShieldCheck',
    financial: 'Banknote',
    specialty: 'Sparkles',
    reinsurance: 'Repeat',
    credit: 'FileCheck',
    surety: 'ClipboardCheck',
    bond: 'Handshake',
    liability: 'ShieldAlert',
    motor: 'TrendingUp',
    accident: 'BadgeCheck',
    engineering: 'Settings',
    energy: 'Layers',
    cyber: 'Database',
    political: 'Globe',
    terror: 'ShieldAlert',
    agriculture: 'Landmark',
    travel: 'Languages',
    delegated: 'Handshake',
    alternative: 'Repeat',
  };
  const guessIcon = (title: string) => {
    const t = title.toLowerCase();
    for (const [kw, icon] of Object.entries(lineOfBusinessIcons)) {
      if (t.includes(kw)) return icon;
    }
    return undefined;
  };
  const linesOfBusiness = useMemo(() => {
    const data = linesOfBusinessData;
    if (!data?.lines_of_business_table) return [];
    return data.lines_of_business_table.map((item: LineOfBusinessRaw): BusinessLineVM => ({
      id: item.id,
      icon: guessIcon(item.title),
      title: item.title,
      content: item.content,
      imageUrl: getAssetUrl(item.line_image, { format: 'webp', quality: 80 }),
      cards: [
        { title: item.card1_title ?? null, subtitle: item.card1_subtitle, paragraph: item.card1_paragraph ?? null },
        { title: item.card2_title ?? null, subtitle: item.card2_subtitle, paragraph: item.card2_paragraph ?? null },
        { title: item.card3_title ?? null, subtitle: item.card3_subtitle, paragraph: item.card3_paragraph ?? null },
        { title: item.card4_title ?? null, subtitle: item.card4_subtitle, paragraph: item.card4_paragraph ?? null },
      ],
    }));
  }, [linesOfBusinessData]);
  const globalPresenceData = useMemo(() => report?.globalPresence ?? undefined, [report]);
  const operationsData = useMemo(() => report?.operations ?? undefined, [report]);
  const retrosecion = useMemo(() => report?.retrosecion ?? undefined, [report]);
  const governance = useMemo(() => report?.governance ?? undefined, [report]);
  const closing = useMemo(() => report?.closing ?? undefined, [report]);
  // KPIs de la portada derivados de tus key_highlights_cards (title→label, content→valor, subtitle→delta)
  const coverKpis = useMemo(() => {
    const cards = keyHighligths?.key_highlights_cards ?? [];
    return cards.slice(0, 4).map((c: any) => ({
      label: c?.title,
      value: c?.content,
      delta: c?.subtitle,
      note: c?.back_subtitle,
    }));
  }, [keyHighligths]);
  const items = buildAnnualReportMenuItems2025()
  if (loadingReport) return <Loading />;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  return (
    <div className="relative w-full overflow-x-hidden">

      <FloatingMenu items={items} />
      <HeaderReport data={hero as any} year={hero?.year} />
      <div className="mx-auto max-w-7xl">
        <KeyHighlights keys={keyHighligths as any} />
        <Executive executive={executive} />
        <Performance performance={financialPerformance} />
        <BusinessLines lines={linesOfBusiness} header={businessLinesHeader} />
        <GlobalPresence data={globalPresenceData} />
        <Operations data={operationsData} />
        <RetroGovernance retrocession={retrosecion} governance={governance} />
        <Closing data={closing} />
      </div>
      <FooterAnnualReport cards ={closing.annual_links} />
    </div>
  )
}
