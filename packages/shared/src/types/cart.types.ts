import type { ColorOption, StorageOption } from './product.types';

/**
 * A single item in the shopping cart
 */
export interface CartItem {
  readonly productId: string;
  readonly brand: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly selectedColor: ColorOption;
  readonly selectedStorage: StorageOption;
  readonly price: number;
  readonly quantity: number;
}

/**
 * Cart state shape
 */
export interface CartState {
  readonly items: readonly CartItem[];
}

/**
 * Cart action union type
 */
export type CartAction =
  | { readonly type: 'ADD_ITEM'; readonly payload: CartItem }
  | {
      readonly type: 'REMOVE_ITEM';
      readonly payload: {
        readonly productId: string;
        readonly colorName: string;
        readonly capacity: string;
      };
    }
  | { readonly type: 'CLEAR_CART' };
