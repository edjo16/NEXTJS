import { Image } from "../types/types";
// Primary Information Type
//Address
export interface PoliciesandTerms {
    id: number;
    title: string;
    content: string;
    background_image: Image;    
}

export interface UseDataResult {
    data: PoliciesandTerms | null;
    isLoading: boolean;
    error: string | null;
}
