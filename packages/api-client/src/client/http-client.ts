import { err, ok } from '@phone-catalog/shared';
import type { Result } from '@phone-catalog/shared';
import { HTTP_CONFIG } from '@phone-catalog/shared';

/**
 * Configuration for HttpClient.
 */
export interface HttpClientConfig {
  readonly baseUrl: string;
  readonly headers?: Record<string, string>;
  readonly timeoutMs?: number;
  readonly maxRetries?: number;
  readonly retryDelayMs?: number;
}

/**
 * Normalized HTTP error.
 */
export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * Request options for individual requests.
 */
export interface RequestOptions {
  readonly signal?: AbortSignal;
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, string | number | undefined>;
}

/**
 * Generic HTTP client with timeout, retry, and error normalization.
 * This is the ONLY place in the entire application that calls fetch().
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    };
    this.timeoutMs = config.timeoutMs ?? HTTP_CONFIG.TIMEOUT_MS;
    this.maxRetries = config.maxRetries ?? HTTP_CONFIG.MAX_RETRIES;
    this.retryDelayMs = config.retryDelayMs ?? HTTP_CONFIG.RETRY_DELAY_MS;
  }

  async get<T>(path: string, options?: RequestOptions): Promise<Result<T, HttpError>> {
    const url = this.buildUrl(path, options?.params);
    return this.request<T>(url, { method: 'GET' }, options);
  }

  async post<T>(
    path: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<Result<T, HttpError>> {
    const url = this.buildUrl(path, options?.params);
    return this.request<T>(url, { method: 'POST', body: JSON.stringify(body) }, options);
  }

  private buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  private async request<T>(
    url: string,
    init: RequestInit,
    options?: RequestOptions,
  ): Promise<Result<T, HttpError>> {
    const headers = { ...this.defaultHeaders, ...options?.headers };
    let lastError: HttpError | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        // Combine external signal with timeout
        const signal = options?.signal
          ? this.combineSignals(options.signal, controller.signal)
          : controller.signal;

        const response = await fetch(url, {
          ...init,
          headers,
          signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          lastError = new HttpError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            response.statusText,
            url,
          );
          // Don't retry client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            return err(lastError);
          }
          // Retry server errors (5xx)
          if (attempt < this.maxRetries) {
            await this.delay(this.retryDelayMs * (attempt + 1));
            continue;
          }
          return err(lastError);
        }

        const data = (await response.json()) as T;
        return ok(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return err(new HttpError('Request aborted', 0, 'AbortError', url));
        }
        lastError = new HttpError(
          error instanceof Error ? error.message : 'Network error',
          0,
          'NetworkError',
          url,
        );
        if (attempt < this.maxRetries) {
          await this.delay(this.retryDelayMs * (attempt + 1));
        }
      }
    }

    return err(lastError ?? new HttpError('Unknown error', 0, 'UnknownError', url));
  }

  private combineSignals(externalSignal: AbortSignal, timeoutSignal: AbortSignal): AbortSignal {
    const controller = new AbortController();
    const onAbort = () => controller.abort();
    externalSignal.addEventListener('abort', onAbort);
    timeoutSignal.addEventListener('abort', onAbort);
    return controller.signal;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
