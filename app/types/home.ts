// Hero Image Type
import { Image as HeroImage } from "../types/types";
import { News } from "./insights";
// Primary Information Type
export interface PrimaryInformation {
    id: number;
    status: string;
    information_image: string;
    information_title: string;
    home_primary_information: number;
    information_description: string;
    link: string;
}

// Key Figure Type
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
// Main Data Type
export interface HomePageData {
    id: number;
    status: string;
    title: string;
    content: string;
    global_presence_title: string;
    global_presence_sub_title: string;
    global_presence_content: string;
    global_presence_list: GlobalPresenceList[];
    global_presence_background_image: HeroImage;
    background_image: HeroImage;
    primary_information: PrimaryInformation[];
    global_presence_button: string;
    Key_Figures: KeyFigure[];
    news: News[];
}


export interface UseDataResult {
    data: HomePageData | null;
    isLoading: boolean;
    error: string | null;
}