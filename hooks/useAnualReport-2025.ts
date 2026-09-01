import {
  HeroPageData,
  ExecutivePageData,
  TechnologyPageData,
  FinancialPerformanceData,
  KeyHighlightseData,
  LinesOfBusinessSectionData,
  OperationsData,
  RetrocessionData,
  ClosingData,
  GovernancenData,
  GlobalPresenceData} from "../types/annualReport2025";
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
  const hero = await fetchSingle<HeroPageData>(`/items/hero_2025?fields=*.*&limit=1`);
  return hero;
}
export async function fetchKeyHighlights(): Promise<KeyHighlightseData> {
  // Always fetch fresh
  const key = await fetchSingle<KeyHighlightseData>(`/items/key_highlights?fields=*.*.*&limit=1`);
  return key;
}
export async function fetchExecutiveData(): Promise<ExecutivePageData> {
  const executive = await fetchSingle<ExecutivePageData>(`/items/leadership_messages?fields=*.*&limit=1`);
  return executive;
}

export async function fetchTechnologyData(): Promise<TechnologyPageData> {
  const technology = await fetchSingle<TechnologyPageData>(
    `/items/tec_and_innovation?fields=*.*&limit=1`
  );
  return technology;
}

export async function fetchFinancialPerformance(): Promise<FinancialPerformanceData> {
  const financial_performance = await fetchSingle<FinancialPerformanceData>(
    `/items/discipline_performance?fields=*.*&limit=1`
  );
  return financial_performance;
}
export async function fetchLinesOfBusiness(): Promise<LinesOfBusinessSectionData> {
  const data = await fetchSingle<LinesOfBusinessSectionData>(
    `/items/line_of_business?fields=*.*&limit=1`
  );
  return data;
}
export async function fetchGlobalPresence(): Promise<GlobalPresenceData> {
  const data = await fetchSingle<GlobalPresenceData>(
    `/items/global_presence_2025?fields=*.*&limit=1`
  );
  return data;
}
export async function fetchOperations(): Promise<OperationsData> {
  const data = await fetchSingle<OperationsData>(
    `/items/Operations?fields=*.*&limit=1`
  );
  return data;
}
export async function fetchRetrosecion(): Promise<RetrocessionData> {
  const data = await fetchSingle<RetrocessionData>(
    `/items/retrocession_2025?fields=*.*&limit=1`
  );
  return data;
}
export async function fetchGovernance(): Promise<GovernancenData> {
  const data = await fetchSingle<RetrocessionData>(
    `/items/governance_2025?fields=*.*&limit=1`
  );
  return data;
}
export async function fetchClose(): Promise<ClosingData> {
  const data = await fetchSingle<ClosingData>(
    `/items/closing?fields=*.*&limit=1`
  );
  return data;
}

// Coordinator: fetch in priority order (hero -> about) sequentially, then the rest
export async function fetchAnnualReportPrioritized(): Promise<{
  hero: HeroPageData;
  executive: ExecutivePageData;
  financial_performance: FinancialPerformanceData;
}> {
  // Always fetch fresh (no cache short-circuit)
  const hero = await fetchHeroData();
  const [executive, financial_performance] = await Promise.all([
    fetchExecutiveData(),
    fetchFinancialPerformance()
  ]);
  return { hero, executive, financial_performance };
  
}

// Two-phase helper: resolves early with {hero, about} and returns a background promise
export async function fetchAnnualReportTwoPhase(): Promise<{
  initial: { hero: HeroPageData };
  background: Promise<{ executive: ExecutivePageData; }>;
}> {
  // Keep two-phase shape but without any caching side-effects
  const hero = await fetchHeroData();
  const background = Promise.all([
    fetchExecutiveData(),
  ]).then(([executive]) => ({ executive }));
  // Trigger remaining fetches fire-and-forget purely for warm data (consumer can ignore)
  Promise.all([
    fetchTechnologyData(),
    fetchFinancialPerformance()
  ]).catch(() => {});
  return { initial: { hero }, background };
}