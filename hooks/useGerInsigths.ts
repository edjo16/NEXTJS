import { InsightsPageData } from "../types/insights";
import { getApiUrl } from "@/lib/api-config";

export async function fetchInsights(): Promise<InsightsPageData> {
  const apiUrl = getApiUrl();
  
  const response = await fetch(`${apiUrl}/items/insights?fields=*.*.*&limit=1`, {
    next: { revalidate: 3600 } // Revalidar cada hora
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  
  let result = await response.json();
  const news = result.data?.news.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  result.data.news = news;
  return result.data;
}