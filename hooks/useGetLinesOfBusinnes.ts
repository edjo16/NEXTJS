import { LinesOfBusinessPageData } from "../types/lineOfBusiness";

import { getApiUrl } from "@/lib/api-config";

export async function fetchLinesOfBusiness(): Promise<LinesOfBusinessPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/lines_of_business?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}