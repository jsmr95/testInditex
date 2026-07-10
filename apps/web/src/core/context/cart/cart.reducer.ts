import type { CartAction, CartState } from '@phone-catalog/shared';
import { cartItemKey } from '@phone-catalog/shared';

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const key = cartItemKey(
        newItem.productId,
        newItem.selectedColor.name,
        newItem.selectedStorage.capacity,
      );

      const existingIndex = state.items.findIndex(
        (item) =>
          cartItemKey(item.productId, item.selectedColor.name, item.selectedStorage.capacity) ===
          key,
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingIndex];
        if (existingItem) {
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + newItem.quantity,
          };
        }
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, colorName, capacity } = action.payload;
      const key = cartItemKey(productId, colorName, capacity);

      return {
        ...state,
        items: state.items.filter(
          (item) =>
            cartItemKey(item.productId, item.selectedColor.name, item.selectedStorage.capacity) !==
            key,
        ),
      };
    }

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
}
