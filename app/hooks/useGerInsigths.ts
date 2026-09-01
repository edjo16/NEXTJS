import { InsightsPageData } from "../types/insights";

import { getApiUrl } from "@/lib/api-config";

export async function fetchInsights(): Promise<InsightsPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/insights?fields=*.*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  let result = await response.json();
  
  // Fix for date sorting issue
  const news = result.data?.news.sort((a: any, b: any) => {
    // Ensure dates are properly parsed before comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // Check if dates are valid
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.warn("Invalid date found during sorting:", a.date, b.date);
      return 0;
    }
    
    // Sort from newest to oldest (descending)
    return dateB.getTime() - dateA.getTime();
  });
  
  result.data.news = news;
  return result.data;
}