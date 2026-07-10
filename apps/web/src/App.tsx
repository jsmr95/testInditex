import { ROUTES } from '@phone-catalog/shared';
import { ErrorBoundary, ToastProvider } from '@phone-catalog/ui';
import type * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CartProvider } from './core/context/cart';
import { ConfigProvider } from './core/context/config';
import { CartPage } from './features/cart';
import { PhoneDetailPage } from './features/phone-detail';
import { PhoneListPage } from './features/phone-list';
import { Layout } from './shared/components/Layout';
import { NotFound } from './shared/components/NotFound';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path={ROUTES.HOME} element={<PhoneListPage />} />
                  <Route path={ROUTES.PRODUCT_DETAIL} element={<PhoneDetailPage />} />
                  <Route path={ROUTES.CART} element={<CartPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
