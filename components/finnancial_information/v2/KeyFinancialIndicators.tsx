'use client';
import React, { useMemo } from 'react';
import { BarChart3, Coins, ShieldCheck, Sprout } from 'lucide-react';
import type { FinancialInformationPageData } from '@/types/finnancialInformation';
import KpiCard from './KpiCard';
import ColumnChart from './charts/ColumnChart';
import UnderwritingChart from './charts/UnderwritingChart';
import EquityChart from './charts/EquityChart';
import {
  FI_COLORS,
  formatNumber,
  formatPct,
  getKpi,
  mapEquity,
  mapPaidCapital,
  mapUnderwriting,
  mapWrittenPremiums,
  trendVerb,
} from './utils';

export default function KeyFinancialIndicators({ data }: { data: FinancialInformationPageData }) {
  const capital = useMemo(() => mapPaidCapital(data?.evolution_capital), [data?.evolution_capital]);
  const premiums = useMemo(() => mapWrittenPremiums(data?.written_premiums), [data?.written_premiums]);
  const underwriting = useMemo(() => mapUnderwriting(data?.Underwritten_result_ratio), [data?.Underwritten_result_ratio]);
  const equity = useMemo(() => mapEquity(data?.shareholders), [data?.shareholders]);

  const capitalKpi = getKpi(capital);
  const premiumsKpi = getKpi(premiums);
  const uwKpi = getKpi(underwriting.map((d) => ({ year: d.year, value: d.result })));
  const equityKpi = getKpi(equity);
  const lastRatio = underwriting[underwriting.length - 1]?.ratio ?? null;

  const premiumsVerb =
    premiumsKpi.changePct !== null && Math.round(premiumsKpi.changePct) !== 0
      ? `${premiumsKpi.changePct > 0 ? 'grew' : 'declined'} ${formatPct(Math.abs(premiumsKpi.changePct)).replace('+', '')} to`
      : 'remained at';

  return (
    <section aria-labelledby="key-financial-indicators" className="py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="key-financial-indicators" className="font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
            {data?.content_title || 'Key Financial Indicators'}
          </h2>
          <span className="mt-3 block h-1 w-12 rounded-full bg-secondary-500" />
        </div>
        <p className="max-w-md text-sm leading-relaxed text-gray-700 sm:text-base">
          A track record of resilient performance, underpinned by disciplined underwriting and a strong capital position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {capital.length > 0 && (
          <KpiCard
            icon={Coins}
            title={data?.evolution_capital_title || 'Paid Capital'}
            changePct={capitalKpi.changePct}
            description={`Paid capital ${trendVerb(capitalKpi)} USD ${formatNumber(capitalKpi.latestValue)} million in ${capitalKpi.latestYear}.`}
          >
            <ColumnChart data={capital} label="Paid capital" />
          </KpiCard>
        )}

        {premiums.length > 0 && (
          <KpiCard
            icon={BarChart3}
            title={data?.written_premiums_title || 'Net Written Premiums'}
            changePct={premiumsKpi.changePct}
            delay={0.08}
            description={`Net written premiums ${premiumsVerb} USD ${formatNumber(premiumsKpi.latestValue)} million in ${premiumsKpi.latestYear}.`}
          >
            <ColumnChart data={premiums} label="Net written premiums" step={50} />
          </KpiCard>
        )}

        {underwriting.length > 0 && (
          <KpiCard
            icon={ShieldCheck}
            title={data?.ratio_title || 'Underwritten Result & Combined Ratio'}
            unit="USD million  ·  %"
            changePct={uwKpi.changePct}
            delay={0.12}
            description={
              <>
                Underwriting result {trendVerb(uwKpi, 'grew to', 'decreased to')} USD {formatNumber(uwKpi.latestValue)} million
                in {uwKpi.latestYear}
                {lastRatio !== null ? `, with a combined ratio of ${formatNumber(lastRatio)}%.` : '.'}
              </>
            }
            legend={
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FI_COLORS.highlight }} />
                  Underwritten result (USD m)
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: FI_COLORS.line }} />
                  Combined ratio (%)
                </span>
              </div>
            }
          >
            <UnderwritingChart data={underwriting} />
          </KpiCard>
        )}

        {equity.length > 0 && (
          <KpiCard
            icon={Sprout}
            title={data?.shareholders_title || "Shareholders' Equity"}
            changePct={equityKpi.changePct}
            delay={0.16}
            description={`Shareholders' equity ${trendVerb(equityKpi)} USD ${formatNumber(equityKpi.latestValue)} million in ${equityKpi.latestYear}.`}
          >
            <EquityChart data={equity} />
          </KpiCard>
        )}
      </div>
    </section>
  );
}
