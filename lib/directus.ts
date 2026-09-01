// Configuración de variables de entorno para Directus
export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
export const DIRECTUS_API_URL = `${DIRECTUS_URL}/items`;

// Headers para las peticiones a Directus
export const getDirectusHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Función para hacer fetch a Directus REST API
export async function directusFetch<T>(
  endpoint: string,
  options?: {
    fields?: string;
    filter?: Record<string, any>;
    sort?: string;
    limit?: number;
    offset?: number;
    token?: string;
  }
): Promise<T> {
  try {
    const url = new URL(`${DIRECTUS_API_URL}/${endpoint}`, DIRECTUS_URL);

    if (options?.fields) {
      url.searchParams.append('fields', options.fields);
    }
    if (options?.limit) {
      url.searchParams.append('limit', options.limit.toString());
    }
    if (options?.offset) {
      url.searchParams.append('offset', options.offset.toString());
    }
    if (options?.sort) {
      url.searchParams.append('sort', options.sort);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getDirectusHeaders(options?.token),
      // Next.js 15: fetch no cachea por default, necesitamos especificarlo
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: 'force-cache', // Force caching
    });

    if (!response.ok) {
      console.error(`Directus API error: ${response.status} ${response.statusText}`);
      // Retornar datos vacíos en lugar de lanzar error durante build
      return { data: [] } as any;
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    console.error('Directus fetch error:', error);
    // Retornar datos vacíos en lugar de lanzar error durante build
    return { data: [] } as any;
  }
}

// Funciones específicas para cada endpoint
export async function fetchHomeData() {
  return directusFetch('home_section', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchAboutData() {
  return directusFetch('about_us', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchTeamData() {
  return directusFetch('team', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchContactsData() {
  return directusFetch('contacts', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchCareersData() {
  return directusFetch('careers', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchFinancialData() {
  return directusFetch('financial_information', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchLinesOfBusinessData() {
  return directusFetch('lines_of_business', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchInsightsData() {
  return directusFetch('news', {
    fields: '*.*',
    limit: 100,
  });
}

export async function fetchComplianceData() {
  return directusFetch('compliance', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchNavbarData() {
  return directusFetch('navbar', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchFooterData() {
  return directusFetch('footer', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchPoliciesData() {
  return directusFetch('policies_terms', {
    fields: '*.*',
    limit: 1,
  });
}

export async function fetchNewsArticle(code: string) {
  return directusFetch('news', {
    fields: '*.*',
    filter: { code: { _eq: code } },
    limit: 1,
  });
}
