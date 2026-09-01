import { Image} from "../types/types";
export interface IGeneralInformation {
    razon_social: string,
    nombre_comercial?: string,
    pais_de_domicilio: string,
    "estructura-jur": string,
    "estructura-jur_otro": string,
    datos_folio: string,
    tax_id: string,
    actividad_a_que_se_dedica_la_soc: string,
    actividad_otra: string,
    telefono_fax: string,
    direccion_fisica: string,
    direccion_correspondencia: string,
    ano_de_constitucion: string,
    web_site?: string,
    regulador_nombre: string,
    regulador_web?: string,
    oficial_cump_nombre: string,
    oficial_cump_email: string,
    contacto_active: string,
}
// *--------------------------------------------------------------------------- Shareholders

export interface IDirectoresNatural {
        //d_1 al 10
        // "j":"company",
        // "n": "natural"
        d1_nombre_director_n: string,
        d1_cedula_n: string,
        d1_role: string,
        d1_autoridad: string,
        d1_email?: string,
        d1_fec_nac_n?: string,
        d1_pais_nac_n?: string,
        d1_nacionalidad_n: string,
        d1_pais_residencia_n: string,
        d1_pep_n: string,
}
export interface IDirectorescompany {
        //d_1 al 10
        d1_company_director_j: string,
        d1_cedula_j: string,
        d1_role: string,
        d1_autoridad: string,
        d1_pais_reg_j: string,
        d1_constitucion_j: string,
        d1_email?: string,
        d1_website_j?: string,
        d1_direccion_j: string,
        d1_pep_j: string,
}
// *--------------------------------------------------------------------------- Shareholders

export interface IShareholdersCompany {
        acc1_nombre_n: string,
        acc1_cedula_n: string,
        acc1_email?: string,
        acc1_fec_nac_n?: string,
        acc1_pais_nac_n?: string,
        acc1_nacionalidad_n: string,
        acc1_pais_residencia_n: string,
        acc1_porc_part: string,
        acc1_pep_n: string,
}
export interface IShareholdersNatural {
        acc1_nombre_n: string,
        acc1_cedula_n?: string,
        acc1_email?: string,
        acc1_fec_nac_n?: string,
        acc1_pais_nac_n?: string,
        acc1_nacionalidad_n: string,
        acc1_pais_residencia_n: string,
        acc1_porc_part: string,
        acc1_pep_n: string,
}
// *--------------------------------------------------------------------------- UBO
export interface IUBOSGovernment {
    ubo_name_gov: string,
    ubo_country_gov: string
}
export interface IUBOSExchange{
    ubo_name_ex: string,
    ubo_location_ex: string,
}
export interface IUBOSRegular{
    //ubo_1 to 5
    ubo1_nombre_n?: string,
    ubo1_cedula_n?: string,
    ubo1_email_n?: string,
    ubo1_fec_nac_n?: string,
    ubo1_pais_nac_n?: string,
    ubo1_nacionalidad_n: string,
    ubo1_pais_residencia_n: string,
    ubo1_porc_part_n: string,
    ubo1_pep_n: string,
}
// *--------------------------------------------------------------------------- 

export type IDirectors = 
    | { d1_entidad: "j"; director: IDirectorescompany[] }
    | { d1_entidad: "n"; director: IDirectoresNatural[] }
    
    export type IShareholders =
    | { acc1_entidad: "j"; shareholders: IShareholdersCompany[] }
    | { acc1_entidad: "n"; shareholders: IShareholdersNatural[] }

export type UBOS =
    | { ubo_numero: "gov"; ubo: IUBOSGovernment }
    | { ubo_numero: "ex"; ubo: IUBOSExchange }
    | { ubo_numero: number; ubo: IUBOSRegular };
export interface IDocuments {
  uploaded_files: File[]
}
export interface IStatement {
  statement_agreement: boolean
}
export interface IDueDiligence {
    // I.GeneralInformation
    general_information: IGeneralInformation,
    // II. Directors
    d_numero: number, // 1 to 10
    directors: IDirectors[],
    // III. Shareholders
    acc_numero:number, // 1 to 5
    IShareholders: IShareholders,
    // IV. Financial Information
    ubos: UBOS[],
    //V. Financial Profile
    detalle_fondos: string,
    ingresos_actividad_principal: string,
    ingresos_anuales_por_otras_activ: string,
   // VI. Risk Rating Information
    Ragency_rating_name: string,
    Ragency_rating_date: string,
    Ragency_rating: string,
    //VII. Interface & Others
    canal_de_ingreso: string,
    otro_canal_ingreso: string,
    //VIII. Point of Contact for This KYC Form-Related References and Communications
    nombre_contacto: string,
    correo_electronico: string,
    // IX. Documentos Requeridos
    documents: IDocuments,
    // X. Statement
    statement: IStatement
}
export type FormStep =
  | "general-information"
  | "directors"
  | "shareholders"
  | "ubos"
  | "financial-information"
  | "risk-information"
  | "interface"
  | "contact"
  | "documents"
  | "statement"

export const STEPS: FormStep[] = [
  "general-information",
  "directors",
  "shareholders",
  "ubos",
  "financial-information",
  "risk-information",
  "interface",
  "contact",
  "documents",
  "statement"
]

export const STEP_TITLES: Record<FormStep, string> = {
  "general-information": "General Information",
  directors: "Board of Directors",
  shareholders: "Shareholders",
  ubos: "UBOs",
  "financial-information": "Financial Information",
  "risk-information": "Risk Information",
  interface: "Interface",
  contact: "Contact",
  documents: "Documents",
  statement: "Statement"
}
export interface IComplianceContent {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: Image;
    imagen: Image;
    title_content: string;
    body_content: string;
    second_body_content: string;
    form_title: string;
    form_content: string;
    form_button: string;
    form_image: Image;
    contact_image: Image;
    contact_title: string;
    contact_name: string;
    contact_role: string;
    contact_content: string;
}
export interface UseDataResult {
    data: IComplianceContent | null;
    title: string;
    isLoading: boolean;
    error: string | null;
}