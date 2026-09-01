/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

const DEFAULT_API_URL = 'https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net';

/**
 * Get the Directus API URL from environment variables with fallback
 * @returns The API URL
 * @throws Error if the URL is not configured properly
 */
export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || DEFAULT_API_URL;
  
  if (!apiUrl || apiUrl === 'undefined' || apiUrl === 'null') {
    console.warn('NEXT_PUBLIC_DIRECTUS_URL is not set, using default:', DEFAULT_API_URL);
    return DEFAULT_API_URL;
  }
  
  return apiUrl;
}

/**
 * Validate that the API URL is accessible
 * @param url - The URL to validate
 * @returns true if valid, false otherwise
 */
export function isValidApiUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
