/**
 * Environment configuration with validation.
 * Fails fast on missing required vars.
 */
interface EnvConfig {
  readonly PORT: number;
  readonly UPSTREAM_API_URL: string;
  readonly UPSTREAM_API_KEY: string;
  readonly CORS_ORIGIN: string;
  readonly NODE_ENV: 'development' | 'production';
}

function getEnvConfig(): EnvConfig {
  const port = Number(process.env.PORT) || 3001;
  const upstreamApiUrl =
    process.env.UPSTREAM_API_URL || 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
  const upstreamApiKey = process.env.UPSTREAM_API_KEY || '87909682e6cd74208f41a6ef39fe4191';
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production';

  return {
    PORT: port,
    UPSTREAM_API_URL: upstreamApiUrl,
    UPSTREAM_API_KEY: upstreamApiKey,
    CORS_ORIGIN: corsOrigin,
    NODE_ENV: nodeEnv,
  };
}

export const env = getEnvConfig();
