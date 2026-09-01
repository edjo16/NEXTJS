// Hero Image Type
import { Image as ContactImage } from "../types/types";
// Primary Information Type
//Address
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
    background_image: ContactImage;
    our_team: OurTeam[];
    
}
export interface UseDataResult {
    data: TeamPageData | null;
    isLoading: boolean;
    error: string | null;
}
