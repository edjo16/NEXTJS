import { CareersPageData } from "../types/careers";

import { getApiUrl } from "@/lib/api-config";

export async function fetchCareers(): Promise<CareersPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/careers?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}