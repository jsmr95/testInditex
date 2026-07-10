/**
 * Type-safe localStorage abstraction with JSON serialization.
 * Gracefully handles unavailable storage (SSR, private browsing).
 */
export const SafeStorage = {
  get<T>(key: string): T | null {
    try {
      const raw = globalThis.localStorage?.getItem(key);
      if (raw === null || raw === undefined) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      globalThis.localStorage?.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — fail silently
    }
  },

  remove(key: string): void {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      // Fail silently
    }
  },

  /**
   * Get with TTL support. Returns null if expired.
   */
  getWithTTL<T>(key: string): T | null {
    try {
      const raw = globalThis.localStorage?.getItem(key);
      if (raw === null || raw === undefined) return null;
      const { data, expiresAt } = JSON.parse(raw) as { data: T; expiresAt: number };
      if (Date.now() > expiresAt) {
        globalThis.localStorage?.removeItem(key);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },

  setWithTTL<T>(key: string, value: T, ttlMs: number): void {
    try {
      const entry = { data: value, expiresAt: Date.now() + ttlMs };
      globalThis.localStorage?.setItem(key, JSON.stringify(entry));
    } catch {
      // Fail silently
    }
  },
} as const;
