import { PoliciesandTerms } from "../types/PoliciesandTerms";
import { getApiUrl } from "@/lib/api-config";

export async function fetchPrivacyPolicy(): Promise<PoliciesandTerms> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/privacy_policy?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}

export async function fetchAboutCookies(): Promise<PoliciesandTerms> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/about_cookies?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}

export async function fetchTermsConditions(): Promise<PoliciesandTerms> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/terms_conditions?fields=*.*&limit=1`);
  if (!response.ok) {
    throw new Error(`Error fetching initial data: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}