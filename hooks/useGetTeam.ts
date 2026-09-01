import { TeamPageData } from "../types/team";

import { getApiUrl } from "@/lib/api-config";

export async function fetchTeam(): Promise<TeamPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/team?fields=*.*&limit=1`,{
        next: { revalidate: 60 }
  });
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}