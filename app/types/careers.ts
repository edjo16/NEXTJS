import { Image as CareersImage } from "./types";

export interface ICareersContent {
  id: number,
  status: string,
  title: string,
  image: string,
  content: string,
  button_content: string
}
export interface CareersPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: CareersImage;
    careers_content: ICareersContent[];
}


export interface UseDataResult {
    data: CareersPageData | null;
    isLoading: boolean;
    error: string | null;
}
