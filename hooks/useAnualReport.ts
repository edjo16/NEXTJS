import {
  HeroPageData,
  AboutPageData,
  ExecutivePageData,
  UnderwritingPageData,
  RetrosessionPageData,
  CorporateGovernancePageData,
  TechnologyPageData,
  FinancialPerformanceData,
  StrategicPilarsData,
  TechnicalOperationsData
} from "../types/anualReport";
import { getApiUrl } from "@/lib/api-config";

async function fetchSingle<T>(endpoint: string): Promise<T> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    next: { revalidate: 3600 } // Revalidar cada hora
  });
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // Directus returns { data: [...] } or { data: { ... } }
  const data = Array.isArray(result?.data) ? result.data[0] : result?.data;
  if (!data) throw new Error(`No data returned for ${endpoint}`);
  return data as T;
}

export async function fetchHeroData(): Promise<HeroPageData> {
  // Always fetch fresh
  const hero = await fetchSingle<HeroPageData>(`/items/hero?fields=*.*&limit=1`);
  return hero;
}

export async function fetchAboutData(): Promise<AboutPageData> {
  const about = await fetchSingle<AboutPageData>(`/items/about?fields=*.*&limit=1`);
  return about;
}

export async function fetchExecutiveData(): Promise<ExecutivePageData> {
  const executive = await fetchSingle<ExecutivePageData>(`/items/executive?fields=*.*&limit=1`);
  return executive;
}

export async function fetchUnderwritingData(): Promise<UnderwritingPageData> {
  const underwriting = await fetchSingle<UnderwritingPageData>(
    `/items/underwriting_business_performance?fields=*.*&limit=1`
  );
  return underwriting;
}
export async function fetchRetrosessionData(): Promise<RetrosessionPageData> {
  const retrosession = await fetchSingle<RetrosessionPageData>(
    `/items/retrocession?fields=*.*&limit=1`
  );
  return retrosession;
}
export async function fetchCorporateGovernanceData(): Promise<CorporateGovernancePageData> {
  const corporateGovernance = await fetchSingle<CorporateGovernancePageData>(
    `/items/Corporate_Governance?fields=*.*&limit=1`
  );
  return corporateGovernance;
}
export async function fetchTechnologyData(): Promise<TechnologyPageData> {
  const technology = await fetchSingle<TechnologyPageData>(
    `/items/tec_and_innovation?fields=*.*&limit=1`
  );
  return technology;
}

export async function fetchFinancialPerformance(): Promise<FinancialPerformanceData> {
  const financial_performance = await fetchSingle<FinancialPerformanceData>(
    `/items/financial_perfomance?fields=*.*&limit=1`
  );
  return financial_performance;
}

// New: Management Strategy Highlights (Strategic Pillars)
export async function fetchManagementStrategyHighlights(): Promise<StrategicPilarsData> {
  const management_strategy_highlights = await fetchSingle<StrategicPilarsData>(
    `/items/management_strategy_highlights?fields=*.*&limit=1`
  );
  return management_strategy_highlights;
}

export async function fetchTechnicalOperationsData(): Promise<TechnicalOperationsData> {
  const technical_operations = await fetchSingle<TechnicalOperationsData>(
    `/items/operations_and_portfolio?fields=*.*&limit=1`
  );
  return technical_operations;
}

// Coordinator: fetch in priority order (hero -> about) sequentially, then the rest
export async function fetchAnnualReportPrioritized(): Promise<{
  hero: HeroPageData;
  about: AboutPageData;
  executive: ExecutivePageData;
  underwriting: UnderwritingPageData;
  retrosession: RetrosessionPageData;
  corporateGovernance: CorporateGovernancePageData;
  technology: TechnologyPageData;
  financial_performance: FinancialPerformanceData;
  management_strategy_highlights: StrategicPilarsData;
  technical_operations: TechnicalOperationsData;
}> {
  // Always fetch fresh (no cache short-circuit)
  const hero = await fetchHeroData();
  const about = await fetchAboutData();
  const [executive, underwriting, retrosession, corporateGovernance, technology, financial_performance, management_strategy_highlights, technical_operations] = await Promise.all([
    fetchExecutiveData(),
    fetchUnderwritingData(),
    fetchRetrosessionData(),
    fetchCorporateGovernanceData(),
    fetchTechnologyData(),
    fetchFinancialPerformance(),
    fetchManagementStrategyHighlights(),
    fetchTechnicalOperationsData(),
  ]);
  return { hero, about, executive, underwriting, retrosession, corporateGovernance, technology, financial_performance, management_strategy_highlights, technical_operations };
}

// Two-phase helper: resolves early with {hero, about} and returns a background promise
export async function fetchAnnualReportTwoPhase(): Promise<{
  initial: { hero: HeroPageData; about: AboutPageData };
  background: Promise<{ executive: ExecutivePageData; underwriting: UnderwritingPageData }>;
}> {
  // Keep two-phase shape but without any caching side-effects
  const hero = await fetchHeroData();
  const about = await fetchAboutData();
  const background = Promise.all([
    fetchExecutiveData(),
    fetchUnderwritingData(),
  ]).then(([executive, underwriting]) => ({ executive, underwriting }));
  // Trigger remaining fetches fire-and-forget purely for warm data (consumer can ignore)
  Promise.all([
    fetchRetrosessionData(),
    fetchCorporateGovernanceData(),
    fetchTechnologyData(),
    fetchFinancialPerformance(),
    fetchManagementStrategyHighlights(),
    fetchTechnicalOperationsData(),
  ]).catch(() => {});
  return { initial: { hero, about }, background };
}