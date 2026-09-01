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

export interface BackgroundTtitleImage {
    title_background: Image | null;
    title?: string;
    sub_title?: string;
    content?: string;
}

export interface BackgroundImageAnnualReport {
    hero_image: Image | null;
    title?: string;
    sub_title?: string;
    executive_title?:string;
    content?: string;
    hero_content_title?: string;
}