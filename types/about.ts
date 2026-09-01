// Hero Image Type
import { Image as AboutImage } from "../types/types";
// Primary Information Type
//Worldwide_offices
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
// Board of Directos
export interface BoardOfDirectos {
    id: number;
    status: string;
    integrant_image: string;
    integrant_name: string;
    integrant_position: string;
    integrant_index: number;
    about_us_board: number;
}
// Our Values
export interface OurValues {
    id: number;
    status: string;
    image_background: string;
    value_title: string;
    value_description: string;
    about_us_values: number;
}
// Brochure Section
export interface BrochureSection {
    id: number;
    brochure_title: string;
    brochure_image: string;
    brochure_description: string;
    about_section: number;
    brochure_file: string;
}
// Main Data Type
export interface AboutUsPageData {
    id: number;
    status: string;
    title: string;
    sub_title: string;
    content: string;
    video_link: string;
    video_title: string;
    video_description: string;
    video_button_content: string;
    background_image: AboutImage;
    Worldwide_offices_title: string;
    Worldwide_offices: WorldwideOffices[];
    board_of_directos_title: string;
    board_of_directos: BoardOfDirectos[];
    our_values: OurValues[];
    brochure_section: BrochureSection[];
}

export interface UseDataResult {
    data: AboutUsPageData | null;
    isLoading: boolean;
    error: string | null;
}
