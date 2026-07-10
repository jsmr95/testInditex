import type { ProductDetail, ProductListItem } from '@phone-catalog/shared';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductRepository } from '../repositories/product.repository';
import { ProductService } from './product.service';

describe('ProductService Unit Tests', () => {
  let service: ProductService;
  let mockRepository: {
    readonly getAll: ReturnType<typeof vi.fn>;
    readonly getById: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.useFakeTimers();

    // Mock Repository methods
    mockRepository = {
      getAll: vi.fn(),
      getById: vi.fn(),
    };

    service = new ProductService(mockRepository as unknown as ProductRepository);

    // Mock localStorage mock methods
    const store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k in store) delete store[k];
      },
      length: 0,
      key: () => null,
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('getProducts', () => {
    const MOCK_RAW_PRODUCTS: ProductListItem[] = [
      { id: '1', brand: 'Brand A', name: 'Phone 1', basePrice: 100, imageUrl: '' },
      { id: '2', brand: 'Brand B', name: 'Phone 2', basePrice: 200, imageUrl: '' },
      { id: '1', brand: 'Brand A', name: 'Phone 1 Duplicate', basePrice: 100, imageUrl: '' }, // Duplicate ID!
    ];

    it('should fetch list and deduplicate by ID from repository', async () => {
      mockRepository.getAll.mockResolvedValue({ ok: true, data: MOCK_RAW_PRODUCTS });

      const result = await service.getProducts();

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toHaveLength(2);
        expect(result.data[0]?.id).toBe('1');
        expect(result.data[1]?.id).toBe('2');
      }
    });

    it('should deduplicate elements loaded from localStorage cache', async () => {
      // Put duplicate elements into cache mock
      const entry = {
        data: MOCK_RAW_PRODUCTS,
        expiresAt: Date.now() + 60000,
      };
      globalThis.localStorage.setItem('phone-catalog:products', JSON.stringify(entry));

      const result = await service.getProducts();

      expect(result.ok).toBe(true);
      if (result.ok) {
        // Repository should not have been called
        expect(mockRepository.getAll).not.toHaveBeenCalled();
        // Returned list must be unique
        expect(result.data).toHaveLength(2);
        expect(result.data[0]?.id).toBe('1');
        expect(result.data[1]?.id).toBe('2');
      }
    });

    it('should skip cache if search parameter is provided', async () => {
      mockRepository.getAll.mockResolvedValue({ ok: true, data: [MOCK_RAW_PRODUCTS[0]] });

      const result = await service.getProducts({ search: 'Phone 1' });

      expect(result.ok).toBe(true);
      expect(mockRepository.getAll).toHaveBeenCalledWith({ search: 'Phone 1' });
    });
  });

  describe('getProductById', () => {
    const MOCK_DETAIL: ProductDetail = {
      id: 'phone-1',
      brand: 'Apple',
      name: 'iPhone 15 Pro',
      description: 'A premium phone',
      basePrice: 1200,
      rating: 4.8,
      specs: {
        screen: '6.1 inches',
        resolution: '2556 x 1179',
        processor: 'A17 Pro',
        mainCamera: '48 MP',
        selfieCamera: '12 MP',
        battery: '3274 mAh',
        os: 'iOS',
        screenRefreshRate: '120Hz',
      },
      colorOptions: [],
      storageOptions: [],
      similarProducts: [],
    };

    it('should fetch from repository and cache the product detail', async () => {
      mockRepository.getById.mockResolvedValue({ ok: true, data: MOCK_DETAIL });

      const result = await service.getProductById('phone-1');

      expect(result.ok).toBe(true);
      expect(mockRepository.getById).toHaveBeenCalledWith('phone-1', undefined);

      // Verify it's cached in localStorage
      const cached = globalThis.localStorage.getItem('phone-catalog:product:phone-1');
      expect(cached).not.toBeNull();
    });

    it('should serve product details from cache if present and not expired', async () => {
      const entry = {
        data: MOCK_DETAIL,
        expiresAt: Date.now() + 60000,
      };
      globalThis.localStorage.setItem('phone-catalog:product:phone-1', JSON.stringify(entry));

      const result = await service.getProductById('phone-1');

      expect(result.ok).toBe(true);
      expect(mockRepository.getById).not.toHaveBeenCalled();
      if (result.ok) {
        expect(result.data.name).toBe('iPhone 15 Pro');
      }
    });
  });
});
