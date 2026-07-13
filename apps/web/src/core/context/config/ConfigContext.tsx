import * as React from 'react';

import type { FeatureFlagProvider } from '@web/config/feature-flags';
import { SimpleFeatureFlagProvider } from '@web/config/feature-flags';

export interface ConfigContextType {
  readonly featureFlags: FeatureFlagProvider;
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
}

export const ConfigContext = React.createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const featureFlags = React.useMemo(() => new SimpleFeatureFlagProvider(), []);

  return (
    <ConfigContext.Provider value={{ featureFlags, theme, toggleTheme }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
