import { ContactPageData } from "../types/contacts";

import { getApiUrl } from "@/lib/api-config";

export async function fetchContacts(): Promise<ContactPageData> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/contacts?fields=*.*&limit=1`,{
          next: { revalidate: 3600 } 
  });
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}