/**
 * Raw API response types — mirror the external API exactly.
 * These are used ONLY by mappers, never by UI components.
 */

export interface ApiProductListItem {
  readonly id: string;
  readonly brand: string;
  readonly name: string;
  readonly basePrice: number;
  readonly imageUrl: string;
}

export interface ApiProductSpecs {
  readonly screen: string;
  readonly resolution: string;
  readonly processor: string;
  readonly mainCamera: string;
  readonly selfieCamera: string;
  readonly battery: string;
  readonly os: string;
  readonly screenRefreshRate: string;
}

export interface ApiColorOption {
  readonly name: string;
  readonly hexCode: string;
  readonly imageUrl: string;
}

export interface ApiStorageOption {
  readonly capacity: string;
  readonly price: number;
}

export interface ApiProductDetail {
  readonly id: string;
  readonly brand: string;
  readonly name: string;
  readonly description: string;
  readonly basePrice: number;
  readonly rating: number;
  readonly specs: ApiProductSpecs;
  readonly colorOptions: readonly ApiColorOption[];
  readonly storageOptions: readonly ApiStorageOption[];
  readonly similarProducts: readonly ApiProductListItem[];
}

export interface ApiError {
  readonly error: string;
  readonly message: string;
}
