
export async function fetchTitle(): Promise<{ title_navbar: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const response = await fetch(`${apiUrl}/items/navbar?fields=title_navbar`);
  if (!response.ok) {
    throw new Error(`Error fetching navbar data: ${response.statusText}`);
  }
  const result = await response.json();
  const data = Array.isArray(result.data) ? result.data[0] : result.data;
  return { title_navbar: data?.title_navbar || "" };
}