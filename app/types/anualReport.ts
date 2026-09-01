
import { Image } from "../types/types";
export interface HeroPageData {
    id: number;
    year: string;
    title: string;
    hero_image: Image;
    sub_title: Image;
    hero_content_title: string;
    hero_content: string;
    annual_report_pdf: Image
}

export interface AboutPageData {
    id: number;
    status: string;
    title: string;
    title_background: Image;
    content_title: string;
    content: string;
    map_image: Image;
    milestone_title: string;
    milestone_content: string;
    about_page:number;
}

export interface ExecutivePageData {
    id: number;
    status: string;
    chairman_title: string;
    title_background: Image;
    chairman: Image;
    chairman_quote:string;
    chairman_message: string;
    chairman_name: string;
    chairman_page:string;
    ceo_title: string;
    ceo: Image;
    ceo_quote:string;
    ceo_message: string;
    ceo_name: string;
    ceo_page:number;
}
export interface GlobalPrecense {
    region: string;
    image: Image;
    content: string;
}

export interface InHouseUnderwriting {
    icon?: string; // API may return a JSX-like string, parsed client-side
    title: string;
    amount: string;
    unit?: string;
    description: string;
    page?: number;
    id?: number;
}

export interface MGASIcon {
    title: string;
    mgas_icon: Image;
}
export interface TypeOfContract {
 type_of_contract:string;
 accounts:number;
 retained_premiums:number;
 profiability:number;
} 
export interface TypeOfBusiness {
 type_business:string;
 accounts:number;
 retained_premiums:number;
 profiability:number;
} 

export interface UnderwritingPageData {
    id: number;
    title: string;
    title_background: Image;
    content: string;
    global_presence_annual_report: GlobalPrecense;
    in_house_title: string;
    in_house_underwriting: InHouseUnderwriting[] | InHouseUnderwriting;
    mgas_title: string;
    mgas_content: string;
    mga_figures: MGASIcon[] | MGASIcon;
    mgas_second_content: string;
    technical_operations_title: string;
    type_of_Contract_title: string;
    type_of_contract: TypeOfContract[] | TypeOfContract;
    type_of_business: string;
    portafolio_line_of_business: TypeOfBusiness[] | TypeOfBusiness;
}

export interface RetrosessionPageData {
    id: number;
    title: string;
    title_background: Image;
    content: string;
    retrocession_page:number;
}

export interface CorporateGovernancePageData {
    id: number;
    title: string;
    title_background: Image;
    content: string;
}
export interface TechnologyPageData {
    id: number;
    title: string;
    title_background: Image;
    content: string;
}

// New: Financial Performance aggregated endpoint typing
export interface FinancialPerformanceSharePoint {
    id: number;
    year: number;
    share_capital: string; // numeric string
    retained_earnings: string; // numeric string
    shareholder_equity: string; // numeric string
}

export interface FinancialPerformanceUnderwritingResultPoint {
    id: number;
    year: number;
    underwriting_result: string; // numeric string
    combined_ratio: string; // numeric string (percentage)
    market_combined_ratio: string; // numeric string (percentage)
}

export interface FinancialPerformanceSolvencyMetric {
    id: number;
    label: string;
    value: string; // numeric string
    unit?: string; // e.g., '%', 'm'
}

export interface FinancialPerformanceNetWrittenPremiumPoint {
    year: number;
    value: string; // numeric string
    financial_net_written: number;
}

export interface FinancialPerformanceData {
    title: string;
    title_background: Image;
    title_kpis_performance: string;
    sub_title_kpis_performance: string;
    kpis_performance: FinancialPerformanceSolvencyMetric[]
    shares: FinancialPerformanceSharePoint[];
    underwriting_results: FinancialPerformanceUnderwritingResultPoint[];
    title_solvency_metrics:string;
    sub_title_solvency_metrics:string;
    solvency_metrics: FinancialPerformanceSolvencyMetric[];
    net_written_premiums: FinancialPerformanceNetWrittenPremiumPoint[];
}

export interface StrategicPilars {
    id: number;
    numeral: string;
    title:string;
    content: string;
}
export interface StrategicPilarsData {
    title: string;
    sub_title:string;
    global_business_content:string;
    global_business_development_page:string;
    title_background: Image;
    content: string;
    sub_title_kpis_performance: string;
    strategic_pillars: StrategicPilars
}

type TableRow = {
	label: string;
	values: number[];
}

type TableDefinition = {
	title: string;
	columns: string[];
	rows: TableRow[];
}
export interface TechnicalOperationsData {
    title?: string;
    subtitle?: string;
    content?:string;
    contractTable?: TableDefinition;
    portfolio_type_of_contract_title?: string;
    portfolio_type_of_contract_content?: string;
    portfolio_line_of_business_title?: string;
    lobTable?: TableDefinition;
}