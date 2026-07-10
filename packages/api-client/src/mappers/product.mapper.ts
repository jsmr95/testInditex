import type {
  ApiColorOption,
  ApiProductDetail,
  ApiProductListItem,
  ApiStorageOption,
  ColorOption,
  ProductDetail,
  ProductListItem,
  StorageOption,
} from '@phone-catalog/shared';

/**
 * ProductMapper — pure transformation functions.
 * All data shape conversions from API to domain models live here.
 * No side effects, no async, easily testable.
 */
export const ProductMapper = {
  toProductListItem(raw: ApiProductListItem): ProductListItem {
    return {
      id: raw.id,
      brand: raw.brand,
      name: raw.name,
      basePrice: raw.basePrice,
      imageUrl: raw.imageUrl,
    };
  },

  toProductListItems(raw: readonly ApiProductListItem[]): ProductListItem[] {
    const items = raw.map(ProductMapper.toProductListItem);
    return items.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
  },

  toColorOption(raw: ApiColorOption): ColorOption {
    return {
      name: raw.name,
      hexCode: raw.hexCode,
      imageUrl: raw.imageUrl,
    };
  },

  toStorageOption(raw: ApiStorageOption): StorageOption {
    return {
      capacity: raw.capacity,
      price: raw.price,
    };
  },

  toProductDetail(raw: ApiProductDetail): ProductDetail {
    return {
      id: raw.id,
      brand: raw.brand,
      name: raw.name,
      description: raw.description,
      basePrice: raw.basePrice,
      rating: raw.rating,
      specs: {
        screen: raw.specs.screen,
        resolution: raw.specs.resolution,
        processor: raw.specs.processor,
        mainCamera: raw.specs.mainCamera,
        selfieCamera: raw.specs.selfieCamera,
        battery: raw.specs.battery,
        os: raw.specs.os,
        screenRefreshRate: raw.specs.screenRefreshRate,
      },
      colorOptions: raw.colorOptions.map(ProductMapper.toColorOption),
      storageOptions: raw.storageOptions.map(ProductMapper.toStorageOption),
      similarProducts: raw.similarProducts
        .map(ProductMapper.toProductListItem)
        .filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index),
    };
  },
} as const;
