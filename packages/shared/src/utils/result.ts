import type { Result } from '../types/common.types';

/**
 * Creates a successful Result.
 */
export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

/**
 * Creates a failed Result.
 */
export function err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Type guard for successful Result.
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; data: T } {
  return result.ok;
}

/**
 * Type guard for failed Result.
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return !result.ok;
}
