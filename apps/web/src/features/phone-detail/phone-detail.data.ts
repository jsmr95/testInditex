import type { HttpError } from '@phone-catalog/api-client';
import type { ProductDetail, Result } from '@phone-catalog/shared';
import { getCachedPromise, invalidateCacheEntry } from '../../core/services/promise-cache';
import { services } from '../../core/services/service-registry';

function buildKey(id: string): string {
  return `phone-detail:${id}`;
}

/**
 * Returns (and caches) a stable promise for a single product detail.
 * Passing the same id always returns the same promise reference,
 * which is required for React's `use()` hook.
 */
export function getPhoneDetailPromise(id: string): Promise<Result<ProductDetail, HttpError>> {
  return getCachedPromise(buildKey(id), () => services.productService.getProductById(id));
}

/** Clears the cached promise so the next `use()` call triggers a fresh fetch. */
export function invalidatePhoneDetailCache(id: string): void {
  invalidateCacheEntry(buildKey(id));
}
