

export interface sub_menus {
    status: string;
    menu_web: number;
    title:  string;
    url:  string;
}

export interface TNavbar {
    status: string;
    menu_web: number;
    title: string;
    url: string;
    sub_menus: sub_menus[];
}
export type NavItems = {
    to: string;
    label: string;
    hasDropdown: boolean;
    sub_items?: {
        to: string;
        label: string;
    }[];
}
export type NavItemsTitle = {
    title: string;
    data: NavItems[];
}
export interface UseNavbarDataResult {
    data: TNavbar | null;
    isLoading: boolean;
    error: string | null;
}

// export interface UseFooterDataResult {
//     data: footerInfo | null;
//     isLoading: boolean;
//     error: string | null;
// }

