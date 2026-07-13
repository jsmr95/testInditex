import * as React from 'react';

import { cartReducer, initialCartState } from './cart.reducer';
import type { CartItem, CartState } from '@phone-catalog/shared';
import { CACHE_CONFIG, SafeStorage } from '@phone-catalog/shared';

export interface CartContextType {
  readonly state: CartState;
  readonly addItem: (item: Omit<CartItem, 'quantity'>) => void;
  readonly removeItem: (productId: string, colorName: string, capacity: string) => void;
  readonly clearCart: () => void;
  readonly totalItemsCount: number;
  readonly totalPrice: number;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, initialCartState, () => {
    const cached = SafeStorage.get<CartState>(CACHE_CONFIG.CART_KEY);
    return cached ?? initialCartState;
  });

  React.useEffect(() => {
    SafeStorage.set(CACHE_CONFIG.CART_KEY, state);
  }, [state]);

  const addItem = React.useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
  }, []);

  const removeItem = React.useCallback((productId: string, colorName: string, capacity: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, colorName, capacity } });
  }, []);

  const clearCart = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItemsCount = React.useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const totalPrice = React.useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearCart,
        totalItemsCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
