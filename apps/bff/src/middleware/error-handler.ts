import type { ErrorRequestHandler } from 'express';

/**
 * Global error handler — catches unhandled errors and returns consistent JSON.
 */
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const message = error instanceof Error ? error.message : 'Internal server error';
  const status = 'status' in error ? (error as { status: number }).status : 500;

  if (process.env.NODE_ENV === 'development') {
    console.error('[BFF Error]', error);
  }

  res.status(status).json({
    error: 'Internal Server Error',
    message,
  });
};
