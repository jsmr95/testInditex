/**
 * Discriminated union for operation results.
 * Eliminates try/catch chains and makes error handling explicit.
 */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E };

/**
 * Represents the state of an async operation in the UI.
 */
export type AsyncState<T> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: string };

/**
 * Search parameters for product queries
 */
export interface SearchParams {
  readonly search?: string;
  readonly limit?: number;
  readonly offset?: number;
}
