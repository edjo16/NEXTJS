import { TNavbar, NavItems } from '../types/navbarAndFooter';
import { getApiUrl } from '@/lib/api-config';

export function mapNavbarDataToNavItems(data: TNavbar[]){
  return data.map((item) => ({
    to: item.url,
    label: item.title,
    hasDropdown: item.sub_menus && item.sub_menus.length > 0,
    sub_items: item.sub_menus?.map((sub) => ({
      to: sub.url,
      label: sub.title
    })) || []
  }));
}


export async function fetchNavbar(): Promise<NavItems[]> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/items/menu_web?fields=*.*`);

  if (!response.ok) {
    throw new Error(`Error fetching navbar data: ${response.statusText}`);
  }

  const result = await response.json();
  const rawData: TNavbar[] = result.data || [];

  const data = mapNavbarDataToNavItems(rawData);
  return data;
  
}


// export async function fetchFooter(code: string): Promise<ContactInfo> {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const response = await fetch(`${apiUrl}/items/menu_web?fields=*.*&limit=1`);
//   if (!response.ok) {
//     throw new Error(`Error fetching navbar data: ${response.statusText}`);
//   }
//   const result = await response.json();
//   return result.data[0];
// }