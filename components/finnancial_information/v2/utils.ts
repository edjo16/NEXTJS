import type {
  AuditorGroup,
  ChartPoint,
  EquityPoint,
  Evolutioncapital,
  FinnancialStatements,
  KpiSummary,
  UnderwritingPoint,
  UnderwrittenRatio,
  WrittenPremiums,
  financialAuditors,
  shareholders,
} from '@/types/finnancialInformation';

/** Brand palette used by the charts (mirrors tailwind.config.js). */
export const FI_COLORS = {
  highlight: '#00586F', // primary-500 – latest year
  bar: '#9FD3E3', // light teal – previous years
  barTop: '#B9E0E8', // celeste-300
  line: '#DE7F33', // secondary-400
  grid: '#E6ECEF',
  axis: '#7B8184', // gray-500
  text: '#002C38', // primary-900
};

/** Parses numbers that may arrive as strings from Directus ("88,4", "27"). */
export const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(String(value).replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

/** 100 -> "100", 88.43 -> "88.4" */
export const formatNumber = (value: number | null | undefined, decimals = 1): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) return '–';
  return Number(value.toFixed(decimals)).toLocaleString('en-US', { maximumFractionDigits: decimals });
};

const isPublished = (status?: string) => !status || status === 'published';
const byYear = <T extends { year: string }>(a: T, b: T) => Number(a.year) - Number(b.year);

export const mapPaidCapital = (items?: Evolutioncapital[]): ChartPoint[] =>
  (items ?? [])
    .filter((i) => isPublished(i?.status))
    .map((i) => ({ year: String(i.year), value: toNumber(i.value) ?? 0 }))
    .sort(byYear);

export const mapWrittenPremiums = (items?: WrittenPremiums[]): ChartPoint[] =>
  (items ?? [])
    .filter((i) => isPublished(i?.status))
    .map((i) => ({ year: String(i.year), value: toNumber(i.premiums) ?? 0 }))
    .sort(byYear);

export const mapUnderwriting = (items?: UnderwrittenRatio[]): UnderwritingPoint[] =>
  (items ?? [])
    .filter((i) => isPublished(i?.status))
    .map((i) => ({
      year: String(i.year),
      result: toNumber(i.underwritten_income) ?? 0,
      ratio: toNumber(i.combined_ratio),
    }))
    .sort(byYear);

/**
 * Shareholders' equity total = share & additional paid-in capital + retained earnings
 * (the two components the previous chart stacked as equity). Retained premiums is kept
 * as part of the breakdown shown in the tooltip.
 */
export const mapEquity = (items?: shareholders[]): EquityPoint[] =>
  (items ?? [])
    .map((i) => {
      const paidIn = toNumber(i.share_additional_paidin_capital) ?? 0;
      const earnings = toNumber(i.retained_earnings) ?? 0;
      return {
        year: String(i.year),
        value: Number((paidIn + earnings).toFixed(1)),
        share_additional_paidin_capital: paidIn,
        retained_earnings: earnings,
        retained_premiums: toNumber(i.retained_premiums) ?? 0,
      };
    })
    .sort(byYear);

/** Change between the last two points of a series. */
export const getKpi = (points: { year: string; value: number }[]): KpiSummary => {
  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  if (!last) return { latestYear: null, latestValue: null, previousValue: null, changePct: null };
  const changePct =
    prev && prev.value !== 0 ? ((last.value - prev.value) / Math.abs(prev.value)) * 100 : null;
  return {
    latestYear: last.year,
    latestValue: last.value,
    previousValue: prev?.value ?? null,
    changePct,
  };
};

export const formatPct = (pct: number | null): string => {
  if (pct === null) return '–';
  const rounded = Math.round(pct);
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
};

/** "increased to" / "decreased to" / "remained at" */
export const trendVerb = (kpi: KpiSummary, up = 'increased to', down = 'decreased to') => {
  if (kpi.changePct === null || Math.round(kpi.changePct) === 0) return 'remained at';
  return kpi.changePct > 0 ? up : down;
};

/** Rounded "nice" upper bound for an axis. */
export const niceMax = (value: number, step = 20) => Math.max(step, Math.ceil(value / step) * step);

/** Groups audited statements by auditor, newest group first. */
export const groupStatements = (
  statements?: FinnancialStatements[],
  auditors?: financialAuditors[]
): AuditorGroup[] => {
  const groups = new Map<string, AuditorGroup>();
  (statements ?? [])
    .filter((s) => isPublished(s?.status))
    .forEach((s) => {
      const key = (s.auditor_name ?? '').trim().toLowerCase();
      if (!key) return;
      if (!groups.has(key)) {
        const auditor = (auditors ?? []).find((a) => a?.name?.trim().toLowerCase() === key);
        groups.set(key, {
          key,
          name: auditor?.name ?? s.auditor_name,
          logo: auditor?.image ?? null,
          statements: [],
          firstYear: null,
          lastYear: null,
        });
      }
      groups.get(key)!.statements.push(s);
    });

  return Array.from(groups.values())
    .map((g) => {
      const sorted = [...g.statements].sort((a, b) => Number(b.year) - Number(a.year));
      return {
        ...g,
        statements: sorted,
        lastYear: sorted[0]?.year ?? null,
        firstYear: sorted[sorted.length - 1]?.year ?? null,
      };
    })
    .sort((a, b) => Number(b.lastYear) - Number(a.lastYear));
};
