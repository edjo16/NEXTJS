import { AboutUsPageData } from "../types/about";
import { getApiUrl } from "@/lib/api-config";

export async function fetchAbout() : Promise<AboutUsPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/about_us?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}