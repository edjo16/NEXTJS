import { HomePageData } from "../types/home";
import { getApiUrl } from "@/lib/api-config";

export async function fetchInitialData( ): Promise<HomePageData> {
  const apiUrl = getApiUrl();
  
  const response = await fetch(`${apiUrl}/items/home_section?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const response2 = await fetch(`${apiUrl}/items/news?fields=id,code,title,preview_image,tags,title_preview,content_preview,date,index_articles_home&filter[display_at_home][_eq]=true`);
  if (!response2.ok) {
    throw new Error(`Error fetching news data: ${response.statusText}`);
  }
  
  const result1 = await response.json();
  const result2 = await response2.json();
  const result = {...result1.data, news: result2.data};
  return result
}
