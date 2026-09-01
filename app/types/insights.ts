import { Image as InsightsImage } from "./types";

type SectionType =
  | "just_content"
  | "just_image"
  | "contentAndcontent"
  | "contentAndimage"
  | "imageContainerAndContent"
  | "contentAndcarrousel"
  | "imageAndImage";
export interface News {
  id: number,
  display_at_home: boolean,
  index_articles: number,
  index_articles_home: number,
  date: string,
  code:string,
  tags: string[],
  copy_writer: string,
  title: string,
  title_preview: string,
  preview_image: InsightsImage,
  content_preview: string,
  status: string,
  number_of_sections: number,
  background_image: InsightsImage,
  // Section 1
  section_one_type: SectionType;
  s1_just_content?: string;
  s1_just_image?: string;
  s1_content_image_content?: string;
  s1_content_image_image?: string;
  s1_content_two?: string;
  s1_content_one?: string;
  s1_image_one?: string;
  s1_image_two?: string;
  s1_content_carrousel?: string;
  s1_content_carrousel_content?: string;
  s1_image_content_image?: string;
  s1_image_content_content?: string;

  // Section 2 (if applicable)
  section_two_type?: SectionType;
  s2_just_content?: string;
  s2_just_image?: string;
  s2_content_image_content?: string;
  s2_content_image_image?: string;
  s2_content_two?: string;
  s2_content_one?: string;
  s2_image_one?: string;
  s2_image_two?: string;
  s2_content_carrousel?: string;
  s2_content_carrousel_content?: string;
  s2_image_content_image?: string;
  s2_image_content_content?: string;

  // section 3 (if applicable)
  section_three_type?: SectionType;
  s3_just_content?: string;
  s3_just_image?: string;
  s3_content_image_content?: string;
  s3_content_image_image?: string;
  s3_content_two?: string;
  s3_content_one?: string;
  s3_image_one?: string;
  s3_image_two?: string;
  s3_content_carrousel_content?: string;
  s3_content_carrousel?: string;
  s3_image_content_image?: string;
  s3_image_content_content?: string;

  // section 4 (if applicable)
  section_four_type?: SectionType;
  s4_just_content?: string;
  s4_just_image?: string;
  s4_content_image_content?: string;
  s4_content_image_image?: string;
  s4_content_two?: string;
  s4_content_one?: string;
  s4_image_one?: string;
  s4_image_two?: string;
  s4_content_carrousel_content?: string;
  s4_content_carrousel?: string;
  s4_image_content_image?: string;
  s4_image_content_content?: string;

  // section 5 (if applicable)
  section_five_type?: SectionType;
  s5_just_content?: string;
  s5_just_image?: string;
  s5_content_image_content?: string;
  s5_content_image_image?: string;
  s5_content_two?: string;
  s5_content_one?: string;
  s5_image_one?: string;
  s5_image_two?: string;
  s5_content_carrousel_content?: string;
  s5_content_carrousel?: string;
  s5_image_content_image?: string;  
  s5_image_content_content?: string;
}
export interface NewsHome {
  id: number,
  display_at_home: boolean,
  index_articles: number,
  index_articles_home: number,
  date: string,
  code:string,
  tags: string[],
  copy_writer: string,
  title: string,
  title_preview: string,
  preview_image: string,
  content_preview: string,
  status: string,
  number_of_sections: number,
  background_image: InsightsImage,
  // Section 1
  section_one_type: SectionType;
  s1_just_content?: string;
  s1_just_image?: string;
  s1_content_image_content?: string;
  s1_content_image_image?: string;
  s1_content_two?: string;
  s1_content_one?: string;
  s1_image_one?: string;
  s1_image_two?: string;
  s1_content_carrousel?: string;
  s1_content_carrousel_content?: string;
  s1_image_content_image?: string;
  s1_image_content_content?: string;

  // Section 2 (if applicable)
  section_two_type?: SectionType;
  s2_just_content?: string;
  s2_just_image?: string;
  s2_content_image_content?: string;
  s2_content_image_image?: string;
  s2_content_two?: string;
  s2_content_one?: string;
  s2_image_one?: string;
  s2_image_two?: string;
  s2_content_carrousel?: string;
  s2_content_carrousel_content?: string;
  s2_image_content_image?: string;
  s2_image_content_content?: string;

  // section 3 (if applicable)
  section_three_type?: SectionType;
  s3_just_content?: string;
  s3_just_image?: string;
  s3_content_image_content?: string;
  s3_content_image_image?: string;
  s3_content_two?: string;
  s3_content_one?: string;
  s3_image_one?: string;
  s3_image_two?: string;
  s3_content_carrousel_content?: string;
  s3_content_carrousel?: string;
  s3_image_content_image?: string;
  s3_image_content_content?: string;

  // section 4 (if applicable)
  section_four_type?: SectionType;
  s4_just_content?: string;
  s4_just_image?: string;
  s4_content_image_content?: string;
  s4_content_image_image?: string;
  s4_content_two?: string;
  s4_content_one?: string;
  s4_image_one?: string;
  s4_image_two?: string;
  s4_content_carrousel_content?: string;
  s4_content_carrousel?: string;
  s4_image_content_image?: string;
  s4_image_content_content?: string;

  // section 5 (if applicable)
  section_five_type?: SectionType;
  s5_just_content?: string;
  s5_just_image?: string;
  s5_content_image_content?: string;
  s5_content_image_image?: string;
  s5_content_two?: string;
  s5_content_one?: string;
  s5_image_one?: string;
  s5_image_two?: string;
  s5_content_carrousel_content?: string;
  s5_content_carrousel?: string;
  s5_image_content_image?: string;  
  s5_image_content_content?: string;
}
export interface YoutubeVideos {
  id: number,
  status: string,
  title: string,
  code_link: string,
  media_video: InsightsImage,
  media_image: InsightsImage,
}
export interface ITeamArticles {
  id: number,
  code: string,
  status: string,
  date: string,
  background_image: InsightsImage;
  title: string,
  business: string,
  content_preview: string,
  preview_image: InsightsImage,
  collaborator_name: string,
  collaborator_image: InsightsImage,
  content: string,
}
export interface InsightsPageData {
    id: number;
    status: string;
    title: string;
    content: string;
    background_image: InsightsImage;
    middle_image: InsightsImage;
    featured_title: string;
    news: News[];
    youtube_videos_title: string;
    youtube_videos: YoutubeVideos[];
    articles_title: string;
    articles: ITeamArticles[];
}

export interface UseDataResult {
    data: InsightsPageData | null;
    isLoading: boolean;
    error?: string | null;
}