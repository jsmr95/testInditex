import { ErrorBoundary, ToastProvider } from '@phone-catalog/ui';
import type * as React from 'react';
import { CartProvider } from '../context/cart';
import { ConfigProvider } from '../context/config';

/**
 * AppProviders — composition root for all React context providers.
 * Order matters: ErrorBoundary wraps everything so any provider crash is caught.
 * ConfigProvider must be before CartProvider in case cart ever reads feature flags.
 */
export const AppProviders: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ConfigProvider>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
