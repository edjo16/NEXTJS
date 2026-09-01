import { Image as linesOfBusinessImage } from "./types";


export interface LinesOptions {
  id: number,
  status: string,
  image_option: string,
  content: string,
  button_content: string
}
export interface LinesOfBusinessPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: linesOfBusinessImage;
    line_of_business_options: LinesOptions[];
}


export interface UseDataResult {
    data: LinesOfBusinessPageData | null;
    isLoading: boolean;
    error: string | null;
}

