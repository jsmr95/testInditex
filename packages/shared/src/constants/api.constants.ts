/**
 * API configuration constants.
 * The BFF base URL is resolved from environment at runtime.
 */
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
} as const;

export const EXTERNAL_API = {
  BASE_URL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  },
  HEADERS: {
    API_KEY_NAME: 'x-api-key',
    API_KEY_VALUE: '87909682e6cd74208f41a6ef39fe4191',
  },
} as const;

export const HTTP_CONFIG = {
  TIMEOUT_MS: 10_000,
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 500,
} as const;

export const DEFAULT_PRODUCT_LIMIT = 20;
