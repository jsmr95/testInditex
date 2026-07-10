/**
 * Cache configuration constants.
 */
export const CACHE_CONFIG = {
  PRODUCT_LIST_KEY: 'phone-catalog:products',
  PRODUCT_DETAIL_KEY_PREFIX: 'phone-catalog:product:',
  CART_KEY: 'phone-catalog:cart',
  TTL_MS: 60 * 60 * 1000, // 1 hour
} as const;
