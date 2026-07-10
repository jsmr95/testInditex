/**
 * Web app environment config.
 * Resolves properties from Vite/Rsbuild env variables.
 */
interface WebEnvConfig {
  readonly BFF_BASE_URL: string;
  readonly IS_DEV: boolean;
}

function getWebEnv(): WebEnvConfig {
  const isDev = import.meta.env.MODE === 'development';
  // Default to localhost BFF or window origin if relative
  const bffBaseUrl = (import.meta.env.PUBLIC_BFF_BASE_URL as string) || 'http://localhost:3001';

  return {
    BFF_BASE_URL: bffBaseUrl,
    IS_DEV: isDev,
  };
}

export const env = getWebEnv();
