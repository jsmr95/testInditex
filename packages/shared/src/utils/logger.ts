/**
 * Decoupled logger interface.
 * Uses console in development, can be replaced with any transport (Sentry, DataDog, etc.)
 */
export interface LoggerTransport {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  debug(message: string, context?: Record<string, unknown>): void;
}

const noop = (): void => {};

const consoleTransport: LoggerTransport = {
  info: (message, context) => {
    if (context) console.info(`[INFO] ${message}`, context);
    else console.info(`[INFO] ${message}`);
  },
  warn: (message, context) => {
    if (context) console.warn(`[WARN] ${message}`, context);
    else console.warn(`[WARN] ${message}`);
  },
  error: (message, context) => {
    if (context) console.error(`[ERROR] ${message}`, context);
    else console.error(`[ERROR] ${message}`);
  },
  debug: (message, context) => {
    if (context) console.debug(`[DEBUG] ${message}`, context);
    else console.debug(`[DEBUG] ${message}`);
  },
};

const noopTransport: LoggerTransport = {
  info: noop,
  warn: noop,
  error: noop,
  debug: noop,
};

/**
 * Creates a logger instance. Uses console in dev, noop in production.
 * Can be extended with external transports (Sentry, DataDog).
 */
export function createLogger(isDev = false): LoggerTransport {
  return isDev ? consoleTransport : noopTransport;
}

/** Default logger — overridden by app-level configuration */
export const logger = createLogger(
  typeof (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process !== 'undefined' &&
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV ===
      'development',
);
