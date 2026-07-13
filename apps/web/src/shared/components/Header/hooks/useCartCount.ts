import * as React from 'react';
import { CartContext } from '../../../../core/context/cart/CartContext';

/**
 * useCartCount — returns the total number of items in the cart.
 * Decouples visual components from the CartContext implementation detail.
 */
export const useCartCount = (): number => {
  const ctx = React.useContext(CartContext);
  return ctx?.totalItemsCount ?? 0;
};
