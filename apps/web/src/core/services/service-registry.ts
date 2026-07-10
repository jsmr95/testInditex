import { HttpClient, ProductRepository, ProductService } from '@phone-catalog/api-client';
import { env } from '../../config/env';

/**
 * ServiceRegistry — simple Dependency Injection container.
 * Instantiates singletons of core API client services.
 * Keeps services detached from React lifecycle.
 */
class ServiceRegistry {
  private readonly httpClient: HttpClient;
  private readonly productRepository: ProductRepository;
  public readonly productService: ProductService;

  constructor() {
    this.httpClient = new HttpClient({
      baseUrl: env.BFF_BASE_URL,
    });
    this.productRepository = new ProductRepository(this.httpClient);
    this.productService = new ProductService(this.productRepository);
  }
}

export const services = new ServiceRegistry();
