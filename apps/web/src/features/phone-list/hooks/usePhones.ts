import type { ProductListItem } from '@phone-catalog/shared';
import * as React from 'react';
import { services } from '../../../core/services/service-registry';

interface UsePhonesResult {
  readonly phones: readonly ProductListItem[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly search: string;
  readonly setSearch: (query: string) => void;
  readonly refetch: () => Promise<void>;
}

export function usePhones(): UsePhonesResult {
  const [phones, setPhones] = React.useState<readonly ProductListItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  const fetchPhones = React.useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    const result = await services.productService.getProducts({
      search: query,
      limit: 20,
    });

    if (result.ok) {
      setPhones(result.data);
    } else {
      setError(result.error.message || 'Error al cargar los teléfonos.');
    }

    setIsLoading(false);
  }, []);

  // Fetch initial load and when search changes
  React.useEffect(() => {
    fetchPhones(search);
  }, [search, fetchPhones]);

  const refetch = React.useCallback(async () => {
    await fetchPhones(search);
  }, [search, fetchPhones]);

  return {
    phones,
    isLoading,
    error,
    search,
    setSearch,
    refetch,
  };
}
