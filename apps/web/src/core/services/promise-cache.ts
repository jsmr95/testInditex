/**
 * Module-level promise cache.
 *
 * React's `use(promise)` hook requires a STABLE promise reference between renders.
 * If a new Promise is created on every render, the component will suspend in an
 * infinite loop. This cache ensures the same promise is reused for the same key.
 *
 * Usage:
 *   const promise = getCachedPromise('products:apple', () => fetchProducts('apple'));
 *   // Subsequent calls with the same key return the original promise.
 *
 * Clearing the cache (e.g. on retry after error):
 *   invalidateCacheEntry('products:apple');
 */
const cache = new Map<string, Promise<unknown>>();

export function getCachedPromise<T>(key: string, factory: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    cache.set(key, factory());
  }
  return cache.get(key) as Promise<T>;
}

/** Call before retrying a failed request so a fresh promise is created. */
export function invalidateCacheEntry(key: string): void {
  cache.delete(key);
}
