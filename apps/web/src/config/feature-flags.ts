/**
 * Simple GrowthBook-compatible interface for client-side Feature Flags.
 * Enables runtime configuration changes for testing/rollout.
 */
export interface FeatureFlagProvider {
  readonly isEnabled: (flagName: string) => boolean;
  readonly getVariant: <T>(flagName: string) => T | null;
}

export const defaultFeatureFlags: Record<string, boolean | string> = {
  'show-similar-products': true,
  'enable-dark-mode': false,
  'enable-quick-buy': false,
};

export class SimpleFeatureFlagProvider implements FeatureFlagProvider {
  private readonly flags: Record<string, boolean | string>;

  constructor(customFlags: Record<string, boolean | string> = {}) {
    this.flags = { ...defaultFeatureFlags, ...customFlags };
  }

  isEnabled(flagName: string): boolean {
    const flag = this.flags[flagName];
    return typeof flag === 'boolean' ? flag : false;
  }

  getVariant<T>(flagName: string): T | null {
    const flag = this.flags[flagName];
    return (flag as T) ?? null;
  }
}
