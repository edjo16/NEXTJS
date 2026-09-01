export async function fetchFromDirectus<T>(endpoint: string): Promise<T | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
    const response = await fetch(`${apiUrl}/items/${endpoint}?fields=*.*&limit=1`, {
      next: { revalidate: 3600 }
    } as any);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const result = await response.json();
    return result.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

export async function fetchFromDirectusList<T>(endpoint: string, limit = 100): Promise<T[] | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
    const response = await fetch(`${apiUrl}/items/${endpoint}?fields=*.*&limit=${limit}`, {
      next: { revalidate: 3600 }
    } as any);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error(`Error fetching ${endpoint} list:`, error);
    return null;
  }
}
