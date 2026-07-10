/**
 * Product list item — returned by GET /products
 */
export interface ProductListItem {
  readonly id: string;
  readonly brand: string;
  readonly name: string;
  readonly basePrice: number;
  readonly imageUrl: string;
}

/**
 * Color option with hex code and product image for that color
 */
export interface ColorOption {
  readonly name: string;
  readonly hexCode: string;
  readonly imageUrl: string;
}

/**
 * Storage option with capacity label and specific price
 */
export interface StorageOption {
  readonly capacity: string;
  readonly price: number;
}

/**
 * Technical specifications of a phone
 */
export interface ProductSpecs {
  readonly screen: string;
  readonly resolution: string;
  readonly processor: string;
  readonly mainCamera: string;
  readonly selfieCamera: string;
  readonly battery: string;
  readonly os: string;
  readonly screenRefreshRate: string;
}

/**
 * Full product detail — returned by GET /products/:id
 */
export interface ProductDetail {
  readonly id: string;
  readonly brand: string;
  readonly name: string;
  readonly description: string;
  readonly basePrice: number;
  readonly rating: number;
  readonly specs: ProductSpecs;
  readonly colorOptions: readonly ColorOption[];
  readonly storageOptions: readonly StorageOption[];
  readonly similarProducts: readonly ProductListItem[];
}
