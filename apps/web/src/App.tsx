import type * as React from 'react';
import { AppProviders } from './core/providers';
import { AppRouter } from './core/router';

/**
 * App — root composition: wires providers and router together.
 * Has zero business logic; adding a new provider or route
 * only requires touching AppProviders or AppRouter respectively.
 */
export const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};
