import type { HttpError } from '../client/http-client';
import type { ProductRepository } from '../repositories/product.repository';
import type { ProductDetail, ProductListItem, Result, SearchParams } from '@phone-catalog/shared';
import { CACHE_CONFIG, SafeStorage } from '@phone-catalog/shared';

/**
 * ProductService — business logic facade.
 * Adds caching on top of repository calls.
 */
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async getProducts(params?: SearchParams): Promise<Result<ProductListItem[], HttpError>> {
    let result: Result<ProductListItem[], HttpError>;

    // Only cache when there's no search query (full list)
    if (!params?.search) {
      const cacheKey = this.buildListCacheKey(params);
      const cached = SafeStorage.getWithTTL<ProductListItem[]>(cacheKey);
      if (cached) {
        result = { ok: true, data: cached };
      } else {
        result = await this.repository.getAll(params);
        if (result.ok) {
          SafeStorage.setWithTTL(cacheKey, result.data, CACHE_CONFIG.TTL_MS);
        }
      }
    } else {
      result = await this.repository.getAll(params);
    }

    if (result.ok) {
      const uniqueData = result.data.filter(
        (item, index, self) => self.findIndex((t) => t.id === item.id) === index,
      );
      return { ok: true, data: uniqueData };
    }

    return result;
  }

  async getProductById(
    id: string,
    options?: { signal?: AbortSignal },
  ): Promise<Result<ProductDetail, HttpError>> {
    const cacheKey = `${CACHE_CONFIG.PRODUCT_DETAIL_KEY_PREFIX}${id}`;
    const cached = SafeStorage.getWithTTL<ProductDetail>(cacheKey);
    if (cached) {
      return { ok: true, data: cached };
    }

    const result = await this.repository.getById(id, options);
    if (result.ok) {
      SafeStorage.setWithTTL(cacheKey, result.data, CACHE_CONFIG.TTL_MS);
    }
    return result;
  }

  private buildListCacheKey(params?: SearchParams): string {
    const parts: string[] = [CACHE_CONFIG.PRODUCT_LIST_KEY];
    if (params?.limit) parts.push(`l=${params.limit}`);
    if (params?.offset) parts.push(`o=${params.offset}`);
    return parts.join(':');
  }
}
