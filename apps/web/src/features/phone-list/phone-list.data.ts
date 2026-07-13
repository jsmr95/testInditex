import type { HttpError } from '@phone-catalog/api-client';
import type { ProductListItem, Result } from '@phone-catalog/shared';
import { getCachedPromise, invalidateCacheEntry } from '../../core/services/promise-cache';
import { services } from '../../core/services/service-registry';

function buildKey(query: string): string {
  return `phone-list:${query}`;
}

/**
 * Returns (and caches) a stable promise for the phone list.
 * Passing the same query always returns the same promise reference,
 * which is required for React's `use()` hook.
 */
export function getPhoneListPromise(query: string): Promise<Result<ProductListItem[], HttpError>> {
  return getCachedPromise(buildKey(query), () =>
    services.productService.getProducts({ search: query || undefined, limit: 20 }),
  );
}

/** Clears the cached promise so the next `use()` call triggers a fresh fetch. */
export function invalidatePhoneListCache(query: string): void {
  invalidateCacheEntry(buildKey(query));
}
