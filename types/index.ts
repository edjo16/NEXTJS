// Base Types
export interface Image {
    id: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    width: number;
    height: number;
}

export interface BackgroundImage {
    background_image: Image | null;
    title?: string;
    sub_title?: string;
    content?: string;
}

export interface BackgroundTitleImage {
    title_background: Image | null;
    title?: string;
    sub_title?: string;
    content?: string;
}

export interface BackgroundImageAnnualReport {
    hero_image: Image | null;
    title?: string;
    sub_title?: string;
    executive_title?: string;
    content?: string;
    hero_content_title?: string;
}

// Home Page Types
export interface PrimaryInformation {
    id: number;
    status: string;
    information_image: string;
    information_title: string;
    home_primary_information: number;
    information_description: string;
    link: string;
}

export interface KeyFigure {
    id: number;
    status: string;
    key_icon: string | null;
    key_name: string;
    key_description: string;
    key_figures_home: number;
}

export interface GlobalPresenceList {
    code: string;
    name: string;
    content: string;
}

export interface News {
    id: number;
    display_at_home: boolean;
    index_articles: number;
    index_articles_home: number;
    date: string;
    code: string;
    tags: string[];
    copy_writer: string;
    title: string;
    title_preview: string;
    preview_image: Image;
    content_preview: string;
    status: string;
}

export interface HomePageData {
    id: number;
    status: string;
    title: string;
    content: string;
    global_presence_title: string;
    global_presence_sub_title: string;
    global_presence_content: string;
    global_presence_list: GlobalPresenceList[];
    global_presence_background_image: Image;
    background_image: Image;
    primary_information: PrimaryInformation[];
    global_presence_button: string;
    Key_Figures: KeyFigure[];
    news: News[];
}

// About Page Types
export interface WorldwideOffices {
    id: number;
    status: string;
    Office_image: string;
    office_country: string;
    office_contact: string | null;
    office_mail: string | null;
    office_ubication: string | null;
    about_us_offices: number;
    office_content: string;
}

export interface BoardOfDirectors {
    id: number;
    status: string;
    integrant_image: string;
    integrant_name: string;
    integrant_position: string;
    integrant_index: number;
    about_us_board: number;
}

export interface OurValues {
    id: number;
    status: string;
    image_background: string;
    value_title: string;
    value_description: string;
    about_us_values: number;
}

export interface BrochureSection {
    id: number;
    brochure_title: string;
    brochure_image: string;
    brochure_description: string;
    about_section: number;
    brochure_file: string;
}

export interface AboutUsPageData {
    id: number;
    status: string;
    title: string;
    sub_title: string;
    content: string;
    background_image: Image;
    worldwide_offices: WorldwideOffices[];
    board_of_directors: BoardOfDirectors[];
    values: OurValues[];
    brochure_sections: BrochureSection[];
}

// Team Page Types
export interface OurTeam {
    id: number;
    index_all: number;
    index: number;
    status: string;
    department: string;
    personal_image: string;
    name: string;
    position: string | null;
    email: string | null;
    linkedin: string | null;
    languages_spoken: string[];
    biography: string | null;
    location: string[];
}

export interface TeamPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    our_team: OurTeam[];
}

// Contacts Page Types
export interface Address {
    status: string;
    type: string;
    city: string;
    address_title: string;
    address: string;
    map_image: string;
    office_mail: string | null;
    link_map: string | null;
}

export interface ContactPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    team_image: Image;
    address: Address[];
}

export interface ContactInfo {
    code: string;
    business: string;
    country: string;
    department: string;
    avatar: string;
    linkedin: string;
    name: string;
    phone: string;
    phone2: string;
    role: string;
    email: string;
    address: string;
}

export interface BusinessCardProps {
    avatar: string;
    code: string;
    name: string;
    country: string;
    business?: string;
    role: string;
    department: string;
    linkedin: string;
    phone: string;
    phone2: string;
    email: string;
    address: string;
}

// Careers Page Types
export interface ICareersContent {
    id: number;
    status: string;
    title: string;
    image: string;
    content: string;
    button_content: string;
}

export interface CareersPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    careers_content: ICareersContent[];
}

// Financial Information Types
export interface FinancialInformationItem {
    id: number;
    status: string;
    title: string;
    description: string;
    file: string;
    date: string;
}

export interface FinancialInformationPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    financial_items: FinancialInformationItem[];
}

// Lines of Business Types
export interface LineOfBusinessItem {
    id: number;
    status: string;
    title: string;
    description: string;
    image: string;
    content: string;
}

export interface LinesOfBusinessPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    lines_items: LineOfBusinessItem[];
}

// Compliance Types
export interface IGeneralInformation {
    razon_social: string;
    nombre_comercial?: string;
    pais_de_domicilio: string;
    estructura_jur: string;
    estructura_jur_otro: string;
    datos_folio: string;
    tax_id: string;
    actividad_a_que_se_dedica_la_soc: string;
    actividad_otra: string;
    telefono_fax: string;
    direccion_fisica: string;
    direccion_correspondencia: string;
    ano_de_constitucion: string;
    web_site?: string;
    regulador_nombre: string;
    regulador_web?: string;
    oficial_cump_nombre: string;
    oficial_cump_email: string;
    contacto_active: string;
}

export interface CompliancePageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
}

// Navbar Types
export interface NavbarMenu {
    id: number;
    title: string;
    url: string;
    order: number;
}

export interface NavbarData {
    id: number;
    title_navbar: string;
    menus: NavbarMenu[];
}

// Footer Types
export interface FooterLink {
    id: number;
    title: string;
    url: string;
}

export interface FooterData {
    id: number;
    company_name: string;
    description: string;
    links: FooterLink[];
    social_media: Record<string, string>;
}

// Policies Types
export interface PoliciesAndTermsPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
}

// Annual Report Types
export interface AnnualReportPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    year: number;
}

// Generic Result Types
export interface UseDataResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export interface ApiResponse<T> {
    data: T;
    meta?: {
        total_count?: number;
        page?: number;
        limit?: number;
    };
}
