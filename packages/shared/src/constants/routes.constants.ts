/**
 * Application route paths — single source of truth.
 */
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  PRODUCT_DETAIL_PATH: (id: string) => `/product/${id}`,
  CART: '/cart',
} as const;
