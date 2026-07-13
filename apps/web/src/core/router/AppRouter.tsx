import { ROUTES } from '@phone-catalog/shared';
import type * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CartPage } from '../../features/cart';
import { PhoneDetailPage } from '../../features/phone-detail';
import { PhoneListPage } from '../../features/phone-list';
import { Layout } from '../../shared/components/Layout';
import { NotFound } from '../../shared/components/NotFound';

/**
 * AppRouter — single source of truth for all application routes.
 * Only responsible for route definitions; no providers or business logic here.
 */
export const AppRouter: React.FC = () => {
  return (
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
  );
};
