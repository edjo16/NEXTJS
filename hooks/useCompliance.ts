import { HomePageData } from "../types/home";
import { getApiUrl } from "@/lib/api-config";

export async function fetchComplianceData( ): Promise<HomePageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/compliance?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching compliance data: ${response.statusText}`);
  }
 const result = await response.json();
  return result.data;
}