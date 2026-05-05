interface ApiConfig {
  baseUrl: string;
  isProduction: boolean;
}

const DEFAULT_LOCAL_API = 'http://localhost:8000/api';

function isLikelyRemoteApi(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return (
      host !== 'localhost' && host !== '127.0.0.1' && host !== '[::1]'
    );
  } catch {
    return false;
  }
}

export const getApiConfig = (): ApiConfig => {
  const isClient = typeof window !== 'undefined';

  const forceRemote =
    process.env.NEXT_PUBLIC_USE_REMOTE_API === 'true' ||
    process.env.USE_REMOTE_API === 'true';

  const configured = (
    isClient
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_URL
  )?.trim();

  let baseUrl = configured && configured.length > 0 ? configured : DEFAULT_LOCAL_API;

  if (!forceRemote) {
    if (isClient && typeof window !== 'undefined') {
      const h = window.location.hostname.toLowerCase();
      const localUi =
        h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
      if (localUi && isLikelyRemoteApi(baseUrl)) {
        baseUrl = DEFAULT_LOCAL_API;
      }
    } else if (!isClient) {
      const onVercel = Boolean(process.env.VERCEL);
      if (!onVercel && isLikelyRemoteApi(baseUrl)) {
        baseUrl = DEFAULT_LOCAL_API;
      }
    }
  }

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'production';

  return {
    baseUrl,
    isProduction,
  };
};

export async function fetchWithConfig<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const { baseUrl } = getApiConfig();
  const isClient = typeof window !== 'undefined';

  const url = `${baseUrl}${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;

  const defaultOptions: RequestInit = isClient
    ? {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 100 },
      };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${endpoint}`,
      );
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const getAuthHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const buildQueryString = (
  params: Record<string, string | number | boolean>,
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  BRANDS: '/brands',
  BRAND_BY_ID: (id: string) => `/brands/${id}`,
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_PROFILE: '/users/profile',
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  USER_ORDERS: (userId: string) => `/orders/user/${userId}`,
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  REMOVE_FROM_CART: '/cart/remove',
  STATS: '/stats',
  ANALYTICS: '/analytics',
} as const;
