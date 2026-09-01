"use client";
import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import BackgroundAnualReport from '@/components/common/BackgroundAnualReport'
import FinancialHighlights from '@/components/annual_report/FinancialHighlights'
import PerformanceTable from '@/components/annual_report/PerformanceTable'
import OurPerformance from '@/components/annual_report/OurPerformance'
import UnderwrittenResultChart from '@/components/annual_report/UnderwrittingResults'
import OurFinalKPIS from '@/components/annual_report/OurFinalKPIS'
import Shares from '@/components/annual_report/Shares'
import HeroContent from '@/components/annual_report/HeroContent'
import BackgroundTitleReport from '@/components/common/BackgroundTitleReport'
import Executive from '@/components/annual_report/Executive'
import PerformanceSolvency from '@/components/annual_report/PerformanceSolvency'
import PdfViewer from '@/components/common/PdfViewerWrapper'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { buildAnnualReportMenuItems } from '@/components/annual_report/menu_items'
import GlobalPresence from '@/components/annual_report/GlobalPresence'
import MapInfo from '@/components/annual_report/MapInfo'
import StrategicPilars from '@/components/annual_report/StrategicPilars'
import InHouseUnderWritting from '@/components/annual_report/InHouseUnderWritting'
import TechnicalOperations from '@/components/annual_report/TechnicalOperations'
import MGAsFigures from '@/components/annual_report/MGAsFigures'
import FooterAnnualReport from '@/components/annual_report/FooterAnnualReport'

const FloatingMenu = dynamic(() => import('@/components/ui/FloatingMenu'), { ssr: false });

interface AnnualReportClientProps {
  report: {
    hero: any;
    about: any;
    executive: any;
    underwriting: any;
    retrosession: any;
    corporateGovernance: any;
    technology: any;
    financial_performance: any;
    management_strategy_highlights: any;
    technical_operations: any;
  };
}

export default function AnnualReportClient({ report }: AnnualReportClientProps) {
  const [openPdf, setOpenPdf] = useState(false)
  const [pdfPage, setPdfPage] = useState<number | undefined>(undefined)
  
  const openReport = useCallback(() => {
    setPdfPage(undefined)
    setOpenPdf(true)
  }, [])
  
  const openReportAtPage = useCallback((page: number) => {
    setPdfPage(page)
    setOpenPdf(true)
  }, [])

  const { hero, about, executive, underwriting, retrosession, corporateGovernance, technology, financial_performance: financialPerformance, management_strategy_highlights: managementStrategy, technical_operations: technicalOperations } = report;

  const items = buildAnnualReportMenuItems(openReport)
  
  // Lightweight UA based detection for tailoring PDF viewer behavior.
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  
  return (
    <div className="relative w-full">
      <FloatingMenu items={items} />
      <BackgroundAnualReport data={hero as any} year={hero?.year} showContent={false} />
      <HeroContent hero={hero as any} />

      <section id="about-active-re" className="container-regular max-w-5xl">
        <BackgroundTitleReport data={about as any} />
        <div className='mx-auto max-w-3xl'>
          <h2 className="text-slate-900 font-semibold text-xl 2xl:text-3xl leading-relaxed mb-6">{about.content_title}</h2>
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 mb-8 font-family-display">
            <span
              className="inline"
              dangerouslySetInnerHTML={{ __html: (about as any)?.content }}
            />
            {Number((about as any)?.about_page) > 0 ? (
              <span
                className="inline text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer"
                onClick={() => openReportAtPage(Number((about as any).about_page))}
              >
                Read more
              </span>
            ) : null}
          </div>
          <MapInfo />
          <h2 className="text-slate-900 font-semibold text-xl 2xl:text-3xl leading-relaxed mt-6">{about.milestone_title}</h2>
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 font-family-display"
            dangerouslySetInnerHTML={{ __html: (about as any)?.milestone_content }}
          />
            {Number((about as any)?.equity_page) > 0 ? (
              <span
                className="inline text-lg text-orange-700 hover:text-orange-800 mb-8 underline cursor-pointer"
                onClick={() => openReportAtPage(Number((about as any).equity_page))}
              >
                Read more
              </span>
            ) : null}
        </div>
      </section>

      <section id="financials-report" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={{
          title: financialPerformance?.title || 'Financial Highlights',
          content: '',
          title_background: financialPerformance?.title_background || { filename_disk: 'placeholder.png' }
        } as any} />
        <div className='mx-auto max-w-3xl'>
          <FinancialHighlights />
          <PerformanceTable />
          <OurPerformance
            data={(financialPerformance?.net_written_premiums || []).map((p: any) => ({
              year: p.year,
              value: Number(p.value),
            }))}
            cagrPercent={24}
            lastGrowthPercent={16}
          />
          <div className="">
            <h3 className="text-primary-500 font-semibold tracking-tight">Underwriting Results (in US$ millions) and Combined Ratio (%)</h3>
            <UnderwrittenResultChart
              data={(financialPerformance?.underwriting_results || []).map((u: any) => ({
                year: u.year,
                underwriting_result: Number(u.underwriting_result),
                combined_ratio: Number(u.combined_ratio),
                market_combined_ratio: Number(u.market_combined_ratio),
              }))}
            />
          </div>
          <OurFinalKPIS
            title={financialPerformance?.title_kpis_performance || ''}
            subtitle={financialPerformance?.sub_title_kpis_performance || ''}
            data={financialPerformance?.kpis_performance?.map((m: any) => ({
              label: m.label,
              value: Number(m.value),
              unit: m.unit,
            }))}
          />
          <div className="mt-8" />
          <Shares
            title={financialPerformance?.share_title}
            data={(financialPerformance?.shares || []).map((s: any) => ({
              year: s.year,
              share_capital: Number(s.share_capital),
              retained_earnings: Number(s.retained_earnings),
              shareholder_equity: Number(s.shareholder_equity),
            }))}
          />
          <PerformanceSolvency
            title={financialPerformance?.title_solvency_metrics || ''}
            subtitle={financialPerformance?.sub_title_solvency_metrics || ''}
            data={financialPerformance?.solvency_metrics?.map((m: any) => ({
              label: m.label,
              value: Number(m.value),
              unit: m.unit,
            }))}
          />
        </div>
      </section>

      <Executive executive={executive} onOpenPage={(p) => openReportAtPage(p)} />
      
      <section id="strategy" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={managementStrategy as any} />
        <div className='mx-auto max-w-3xl'>
          <StrategicPilars
            title={managementStrategy?.title}
            sub_title={managementStrategy?.sub_title}
            content={managementStrategy?.content}
            items={Array.isArray(managementStrategy?.strategic_pillars)
              ? managementStrategy?.strategic_pillars
              : managementStrategy?.strategic_pillars
                ? [managementStrategy?.strategic_pillars]
                : undefined}
          />
          <div className="relative w-full overflow-hidden text-xl text-gray-800 mb-8 font-family-display">
            <span
              className="inline"
              dangerouslySetInnerHTML={{ __html: (managementStrategy as any)?.global_business_content }}
            />
            {Number((managementStrategy as any)?.global_business_development_page) > 0 ? (
              <span
                className="inline text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer"
                onClick={() => openReportAtPage(Number((managementStrategy as any).global_business_development_page))}
              >
                Read more
              </span>
            ) : null}
          </div>
          <GlobalPresence regions={underwriting?.global_presence_annual_report} initialRegionKey='americas' />
        </div>
      </section>
      
      <section id="underwriting" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={underwriting as any} />
        <div className='mx-auto max-w-3xl'>
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 mb-8 font-family-display"
            dangerouslySetInnerHTML={{ __html: (underwriting as any)?.content }}
          />
          <InHouseUnderWritting
            title={underwriting?.in_house_title}
            items={Array.isArray(underwriting?.in_house_underwriting)
              ? underwriting?.in_house_underwriting
              : underwriting?.in_house_underwriting
                ? [underwriting?.in_house_underwriting]
                : undefined}
            onOpenPage={(p) => openReportAtPage(p)}
          />
          <MGAsFigures title={underwriting?.mgas_title} items={underwriting?.mga_figures} mgas_content={underwriting?.mgas_content} />
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 font-family-display"
            dangerouslySetInnerHTML={{ __html: (underwriting as any)?.mgas_second_content }}
          />
          {Number((underwriting as any)?.mgas_content_page) > 0 ? (
            <span
              className="inline text-lg text-orange-700 hover:text-orange-800 mb-8 underline cursor-pointer"
              onClick={() => openReportAtPage(Number((underwriting as any).mgas_content_page))}
            >
              Read more
            </span>
          ) : null}
        </div>
      </section>
      
      <section id="technical-operations" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={technicalOperations as any} />
        <div className='mx-auto max-w-3xl'>
          <TechnicalOperations
            title="Technical Operations and Portfolio Profile 2024"
            content={technicalOperations?.content}
            contractTable={{
              title: technicalOperations?.portfolio_type_of_contract_title,
              content: technicalOperations?.portfolio_type_of_contract_content,
              columns: ["% Accounts", "% Retained Premiums", "% Profitability"],
              rows: [
                { label: "MGAs & Facilities", values: [85, 33, 84] },
                { label: "Treaties", values: [4, 39, 10] },
                { label: "Facultatives", values: [11, 28, 6] },
                { label: "Total", values: [100, 100, 100] },
              ],
            }}
            lobTable={{
              title: technicalOperations?.portfolio_line_of_business_title,
              content: technicalOperations?.portfolio_line_of_business_content,
              columns: ["% Accounts", "% Retained Premiums", "% Profitability"],
              rows: [
                { label: "P&E", values: [93, 57, 54] },
                { label: "Surety", values: [4, 13, 45] },
                { label: "Affinity", values: [3, 30, 1] },
                { label: "Total", values: [100, 100, 100] },
              ],
            }}
            onOpenPage={openReportAtPage}
            contentPage={Number((technicalOperations as any)?.operations_page) || undefined}
            contractTablePage={Number((technicalOperations as any)?.portfolio_type_of_contract_page) || undefined}
            lobTablePage={Number((technicalOperations as any)?.portfolio_line_of_business_page) || undefined}
          />
        </div>
      </section>
      
      <section id="retrosession" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={retrosession as any} />
        <div className='mx-auto max-w-3xl'>
          <div className="relative w-full max-w-3xl overflow-hidden text-xl text-gray-800 mb-8 font-family-display">
            <span
              className="inline"
              dangerouslySetInnerHTML={{ __html: (retrosession as any)?.content }}
            />
            {Number((retrosession as any)?.retrocession_page) > 0 ? (
              <span
                className="inline text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer"
                onClick={() => openReportAtPage(38)}
              >
                Read more
              </span>
            ) : null}
          </div>
        </div>
      </section>
      
      <section id="corporate-governance" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={corporateGovernance as any} />
        <div className='mx-auto max-w-3xl'>
          <div className="relative w-full max-w-3xl overflow-hidden  text-xl text-gray-800 font-family-display"
            dangerouslySetInnerHTML={{ __html: (corporateGovernance as any)?.content }}
          />
        {Number((corporateGovernance as any)?.corporate_governance_page) > 0 ? (
          <span
            className="inline text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer mb-8"
            onClick={() => openReportAtPage(Number((corporateGovernance as any).corporate_governance_page))}
          >
            Read more
          </span>
        ) : null}
        </div>
      </section>
      
      <section id="technology-innovation" className="container-regular max-w-3xl py-16">
        <BackgroundTitleReport data={technology as any} />
        <div className='mx-auto max-w-3xl'>
          <div className="relative w-full max-w-3xl overflow-hidden text-xl text-gray-800 font-family-display"
            dangerouslySetInnerHTML={{ __html: (technology as any)?.content }}
          />
        {Number((technology as any)?.tec_and_innovation_page) > 0 ? (
          <span
            className="inline text-lg text-orange-700 hover:text-orange-800 underline cursor-pointer mb-8"
            onClick={() => openReportAtPage(Number((technology as any).tec_and_innovation_page))}
          >
            Read more
          </span>
        ) : null}
        </div>
      </section>

      <FooterAnnualReport onOpenReport={openReport} />

      <Dialog open={openPdf} onOpenChange={setOpenPdf}>
        <DialogContent hideClose className="w-[95vw] max-w-6xl p-2 sm:p-4">
          <DialogHeader>
            <DialogTitle className="sr-only">Full 2024 Annual Report</DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <PdfViewer
            src="/ANNUALREPORT.pdf"
            title="Full 2024 Annual Report"
            height={isMobile ? 650 : 800}
            className="mt-2"
            page={pdfPage}
            onClose={() => setOpenPdf(false)}
            showZoomControls
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}