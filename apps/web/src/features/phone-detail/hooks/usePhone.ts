import type { ProductDetail } from '@phone-catalog/shared';
import * as React from 'react';
import { services } from '../../../core/services/service-registry';

interface UsePhoneResult {
  readonly phone: ProductDetail | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => Promise<void>;
}

export function usePhone(productId: string | undefined): UsePhoneResult {
  const [phone, setPhone] = React.useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchPhone = React.useCallback(async (id: string, signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    const result = await services.productService.getProductById(id, { signal });

    if (result.ok) {
      setPhone(result.data);
    } else {
      // Ignore aborted requests
      if (result.error.statusText === 'AbortError') return;
      setError(result.error.message || 'Error al cargar los detalles del producto.');
    }

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (!productId) {
      setError('ID de producto no válido.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    fetchPhone(productId, controller.signal);

    return () => {
      controller.abort();
    };
  }, [productId, fetchPhone]);

  const refetch = React.useCallback(async () => {
    if (productId) {
      await fetchPhone(productId);
    }
  }, [productId, fetchPhone]);

  return {
    phone,
    isLoading,
    error,
    refetch,
  };
}
