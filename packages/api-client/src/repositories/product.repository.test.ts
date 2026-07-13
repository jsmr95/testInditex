import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { HttpClient } from '../client/http-client';
import { ProductRepository } from './product.repository';
import type { ApiProductDetail, ApiProductListItem } from '@phone-catalog/shared';

const MOCK_PRODUCTS: readonly ApiProductListItem[] = [
  {
    id: 'phone-1',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    basePrice: 1200,
    imageUrl: 'http://example.com/iphone15.jpg',
  },
];

const MOCK_DETAIL: ApiProductDetail = {
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
  colorOptions: [
    {
      name: 'Titanium Blue',
      hexCode: '#2f4452',
      imageUrl: 'http://example.com/blue.jpg',
    },
  ],
  storageOptions: [
    {
      capacity: '256 GB',
      price: 1200,
    },
  ],
  similarProducts: [
    {
      id: 'phone-2',
      brand: 'Apple',
      name: 'iPhone 15',
      basePrice: 900,
      imageUrl: 'http://example.com/iphone15-base.jpg',
    },
  ],
};

const server = setupServer(
  http.get('http://localhost:3001/api/products', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    if (search === 'empty') {
      return HttpResponse.json([]);
    }
    return HttpResponse.json(MOCK_PRODUCTS);
  }),

  http.get('http://localhost:3001/api/products/phone-1', () => {
    return HttpResponse.json(MOCK_DETAIL);
  }),

  http.get('http://localhost:3001/api/products/unknown', () => {
    return new HttpResponse('Not Found', { status: 404 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductRepository Integration tests via MSW', () => {
  const client = new HttpClient({ baseUrl: 'http://localhost:3001' });
  const repository = new ProductRepository(client);

  it('should fetch list of products successfully', async () => {
    const result = await repository.getAll();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0]?.name).toBe('iPhone 15 Pro');
      expect(result.data[0]?.basePrice).toBe(1200);
    }
  });

  it('should search products and filter correctly', async () => {
    const result = await repository.getAll({ search: 'empty' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toHaveLength(0);
    }
  });

  it('should fetch a single product details successfully', async () => {
    const result = await repository.getById('phone-1');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('iPhone 15 Pro');
      expect(result.data.specs.processor).toBe('A17 Pro');
      expect(result.data.similarProducts).toHaveLength(1);
    }
  });

  it('should handle API errors gracefully', async () => {
    const result = await repository.getById('unknown');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(404);
    }
  });
});
