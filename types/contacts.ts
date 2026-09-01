// Hero Image Type
import { Image as ContactImage } from "../types/types";
// Primary Information Type
//Address
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
    background_image: ContactImage;
    team_image: ContactImage;
    address: Address[];
}
export interface UseDataResult {
    data: ContactPageData | null;
    isLoading: boolean;
    error: string | null;
}
export interface ContactInfo {
    code: string,
    business: string
    country: string,
    department: string,
    avatar: string,
    linkedin: string,
    name: string,
    phone: string,
    phone2: string,
    role: string
    email: string,
    address: string
}

export interface UsePersonalDataResult {
    data: ContactInfo | null;
    isLoading: boolean;
    error: string | null;
}
export interface BusinessCardProps {
      avatar: string,
      code: string,
      name: string,
      country: string,
      business?: string,
      role: string,
      department: string,
      linkedin: string,
      phone: string,
      phone2: string,
      email: string,
      address: string,
}