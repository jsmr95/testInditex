import { env } from '../config/env';

interface ProxyRequestOptions {
  readonly path: string;
  readonly method?: string;
  readonly body?: unknown;
}

interface ProxyResponse<T> {
  readonly ok: boolean;
  readonly status: number;
  readonly data?: T;
  readonly error?: string;
}

/**
 * Proxy service — forwards requests to the upstream API.
 * Injects x-api-key header so the key is never exposed to the browser.
 */
export async function proxyRequest<T>(options: ProxyRequestOptions): Promise<ProxyResponse<T>> {
  const url = `${env.UPSTREAM_API_URL}${options.path}`;
  const method = options.method ?? 'GET';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': env.UPSTREAM_API_KEY,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        ok: false,
        status: response.status,
        error: errorBody || response.statusText,
      };
    }

    const data = (await response.json()) as T;
    return { ok: true, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error: error instanceof Error ? error.message : 'Upstream request failed',
    };
  }
}
