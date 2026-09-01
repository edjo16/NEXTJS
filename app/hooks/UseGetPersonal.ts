import { ContactInfo } from "../types/contacts";
import { getApiUrl } from "@/lib/api-config";

export async function fetchPersonal(code: string): Promise<ContactInfo> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/personal_contact?filter[code][_eq]=${code}`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data[0];
}