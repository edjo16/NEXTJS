import { Image as FinancialImage } from "./types";

export interface Evolutioncapital {
  id: number,
  status: string,
  year: string,
  value: number,
}

export interface WrittenPremiums {
  status: string,
  year: string,
  premiums: number,
}

export interface UnderwrittenRatio {
  status: string,
  year: number,
  underwritten_income: string,
  combined_ratio: string,
  [key: string]: any
}

export interface FinnancialStatements {
  id: number;
  status: string,
  auditor_name: string,
  audited_file: string,
  year: string,
}

export interface ranking {
  status: string,
  year: string,
  financial_strength: string,
  credit_rating: string,
  certification: string, 
  link: string,
}

export interface financialAuditors {
  id : number,
  name: string,
  image: string,
}

export interface shareholders {
  id : number,
  year: number,
  share_additional_paidin_capital: number,
  retained_earnings: number,
  retained_premiums: number,
}

export interface FinancialInformationPageData {
    id: number;
    status: string;
    title: string;
    sub_title: string;
    content_title: string;
    content: string;
    background_image: FinancialImage;
    evolution_capital_title: string;
    evolution_capital: Evolutioncapital[];
    written_premiums_title: string;
    written_premiums: WrittenPremiums[];
    rating_title: string;
    ratio_title: string;
    Underwritten_result_ratio: UnderwrittenRatio[];
    shareholders_title: string;
    shareholders: shareholders[];
    financial_auditor: string;
    financial_auditors: financialAuditors[];
    audited_financial_statements_title: string;
    audited_finnancial_statements: FinnancialStatements[];
    ranking: ranking[];
    ranking_image: FinancialImage;
}

export interface FinancialInformationCharts {
  evolution_capital: Evolutioncapital[];
  written_premiums: WrittenPremiums[];
  Underwritten_result_ratio: UnderwrittenRatio[];
  shareholders: shareholders[];
  // audited_finnancial_statements: FinnancialStatements[];
  // ranking: ranking[];
}
export interface UseDataResult {
    data: FinancialInformationPageData | null;
    isLoading: boolean;
    error: string | null;
}