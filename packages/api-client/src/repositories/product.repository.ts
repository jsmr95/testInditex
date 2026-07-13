import type {
  ApiProductDetail,
  ApiProductListItem,
  ProductDetail,
  ProductListItem,
  Result,
  SearchParams,
} from '@phone-catalog/shared';
import { API_ENDPOINTS } from '@phone-catalog/shared';
import type { HttpClient, HttpError } from '../client/http-client';
import { ProductMapper } from '../mappers/product.mapper';

/**
 * ProductRepository — data access layer for products.
 * Handles HTTP communication and maps raw responses to domain types.
 */
export class ProductRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getAll(params?: SearchParams): Promise<Result<ProductListItem[], HttpError>> {
    const result = await this.httpClient.get<ApiProductListItem[]>(API_ENDPOINTS.PRODUCTS, {
      params: {
        search: params?.search,
        limit: params?.limit,
        offset: params?.offset,
      },
    });

    if (!result.ok) return result;
    return { ok: true, data: ProductMapper.toProductListItems(result.data) };
  }

  async getById(
    id: string,
    options?: { signal?: AbortSignal },
  ): Promise<Result<ProductDetail, HttpError>> {
    const result = await this.httpClient.get<ApiProductDetail>(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      signal: options?.signal,
    });

    if (!result.ok) return result;
    return { ok: true, data: ProductMapper.toProductDetail(result.data) };
  }
}
