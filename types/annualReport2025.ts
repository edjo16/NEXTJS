
import { Image } from "../types/types";


export interface SectionHeaderVM{
    title: string;
    subtitle: string;
    kickerNum: string;
    kickerLabel: string;
}

export interface CardVM {
  icon: string | null;
  title: string;
  body?: string | null;
}

export interface BusinessLineCardVM {
  title: string | null;
  subtitle: string;
  paragraph: string | null;
}

export interface BusinessLineVM {
  id: number;
  icon?: string;
  title: string;
  content: string;
  imageUrl?: string;
  cards: BusinessLineCardVM[];
  line_message?:string;
}

export interface LineOfBusinessRaw {
  id: number;
  line_image: string | null;
  title: string;
  content: string;
  card1_title: string | null;
  card1_subtitle: string;
  card1_paragraph: string | null;
  card2_title: string | null;
  card2_subtitle: string;
  card2_paragraph: string | null;
  card3_title: string | null;
  card3_subtitle: string;
  card3_paragraph: string | null;
  card4_title: string | null;
  card4_subtitle: string;
  card4_paragraph: string | null;
  line_of_business: number;
}

export interface LinesOfBusinessSectionData {
  kicker_num?: string;
  kicker_label?: string;
  title: string;
  subtitle: string;
  lines_of_business_table: LineOfBusinessRaw[];
  page: number;
  line_message: string;
}

export interface HeroPageData {
    id: number;
    year: string;
    title: string;
    hero_image: Image;
    sub_title: Image;
    hero_content_title: string;
    hero_content_subtitle: string;
    hero_content: string;
    annual_report_pdf: Image
}

export interface KeyHighlightsCards {
    id: number;
    icon: string;
    title: string;
    subtitle: string;
    content: string;
    keyHighlightsCards: string;
    back_subtitle: string;
    key_highlights: number
}

export interface KeyHighlightseData {
    kicker_num?: string;
    kicker_label?: string;
    title: string;
    subtitle: string;
    content: string;
    key_highlights_cards: KeyHighlightsCards[];
    hero_content: string;
    hero_content_subtitle: string;
    annual_report_pdf: Image
    key_highlights_message: string;
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
    kicker_num?: string;
    kicker_label?: string;
    title:string;
    leadership_message?: string;
    chairman_image: Image;
    chairman_title: string;
    chairman_message: string;
    chairman_quote?: string;
    chairman_name: string;
    chairman_page:string;
    chairman_position:string;
    ceo_image: Image;
    ceo_title: string;
    ceo_name: string;
    ceo_message: string;
    ceo_quote?: string;
    ceo_page:number;
    ceo_position:string;
    section_chairman_title:string;
    section_chairman_content:string;
    section_chairman_3:string;
    section_chairman_message?:string;
    section_ceo_title:string;
    section_ceo_content:string;
    section_ceo_3:string;
    section_ceo_message?:string;
    section_chairman_1_title:string;
    section_ceo_1_title?:string;
}
export interface GlobalPrecense {
    region: string;
    image: Image;
    content: string;
}

export interface InHouseUnderwriting {
    icon?: string;
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

export interface FinancialPerformance {
    year: number;
    value: string;
    type: string;
    id: number;
    max?: number | null;
}

export interface PerfPointVM {
    yearLabel: string;
    value: number;
    isHighlight: boolean;
}

export interface PerfSeriesVM {
    key: string;
    label: string;
    unit?: string;
    max: number;
    points: PerfPointVM[];
}

export interface FinancialPerformanceSecond {
    icon: string;
    title: string;
    value: string;
    year: string;
    growth: number;
    direction?: 'up' | 'down';
    tone?: 'success' | 'danger' | 'neutral';
    symbol?: string;
}

export interface FinancialPerformanceData {
    kicker_num?: string;
    kicker_label?: string;
    title: string;
    subtitle: string;
    content: string;
    performance_message:string;
    perfomance_view: FinancialPerformance[];
    perfomance_view_second:FinancialPerformanceSecond[];
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
export interface GlobalStatItem {
  id: number;
  icon: string;
  sort_order: number;
  value: number;
  label: string;
}

export interface MapPinRaw {
  x_pct: string | number;
  y_pct: number;
  label?: string;
  accent?: boolean;
}

export interface GlobalPresenceData {
  id: number;
  kicker_num?: string;
  kicker_label?: string;
  title: string;
  subtitle:string;
  content: string;
  total_gwp?: string;
  global_presence_message: string;
  message_link: string;
  message_link_href?: string;
  page: number | null;
  global_stat: GlobalStatItem[];
  regions?: RegionVM[];
  map_pin?: MapPinRaw[];
  distribution_title?:string;
  distribution_region?: DistributionRegionRaw[];
  map:Image;
  title_map?:string;
}

export interface DistributionRegionRaw {
  id: number;
  name: string;
  percentage: number;
  color_token: string;
  amount_label?: string;
  sort_order?: number;
}

export interface RegionVM {
  name: string;
  percentage: number;
  amount?: string;
  colorToken: string;
}

export interface MapPinVM {
  x: number;
  y: number;
  accent: boolean;
  label?: string;
}

export interface OperationCardItem {
  id: number;
  sort_order: number;
  icon: string;
  title: string;
  body: string;
}

export interface OperationMetricItem {
  id: number;
  kind: 'metric' | 'ring';
  icon: string | null;
  icon_image: string | null;
  value: number;
  unit: string | null;
  label: string;
  color_token: string | null;
  sort_order: number;
}

export interface OperationsData {
  kicker_num?: string;
  kicker_label?: string;
  title: string;
  subtitle: string;
  content: string;
  operation_card: OperationCardItem[];
  operation_metric: OperationMetricItem[];
  page?:number;
  operations_message?: string;
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
    operations_message?: string;

}

export interface RetroItems {
  id: number;
  icon: string | null;
  title: string;
  body: string;
}

export interface RetrocessionData {
    title?: string;
    subtitle?: string;
    content?:string;
    retrocession_cards_title?:string;
    retrocession_message?:string;
    retrocession_cards?: RetroItems[];
    page?:number;
}

export interface GovernanceItems {
  id: number;
  icon: string | null;
  title: string;
  body: string;
  sort_order: number;
}

export interface GovernancenData {
    title?: string;
    governance_message?:string;
    governance_cards?: GovernanceItems[];
    page?:number
}

export interface ClosingData {
    lead?: string;
    wordmark?: string;
    quote?: string;
    authorName?: string;
    authorPhotoUrl?: string;
    authorRole?: string;
    downloadTitle?: string;
    downloadCopy?: string;
    pdfUrl?: string;
    modal_title?: string;
    modal_subtitle?: string;
}
