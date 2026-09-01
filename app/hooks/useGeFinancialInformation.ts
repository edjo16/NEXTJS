import { FinancialInformationPageData } from "../types/finnancialInformation";

import { getApiUrl } from "@/lib/api-config";

export async function fetchFinancialInformation(): Promise<FinancialInformationPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/finnancial_information?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching financial information: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}