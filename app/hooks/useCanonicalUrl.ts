"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const BASE_URL = 'https://active-re.com';

export const useCanonicalUrl = (customPath?: string) => {
  const pathname = usePathname();

  useEffect(() => {
    // Get or create the canonical link element
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    // Build the canonical URL
    const path = customPath || pathname;
    const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;
    
    // Remove trailing slash if present (except for root)
    const finalUrl = canonicalUrl.endsWith('/') && canonicalUrl !== `${BASE_URL}/` 
      ? canonicalUrl.slice(0, -1) 
      : canonicalUrl;
    
    canonicalLink.setAttribute('href', finalUrl);

    // Also update og:url meta tag if it exists
    const ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', finalUrl);
    }
  }, [pathname, customPath]);
};
