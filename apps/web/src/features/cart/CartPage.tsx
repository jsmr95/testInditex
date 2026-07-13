import * as React from 'react';
import { useNavigate } from 'react-router';

import { CartContext } from '../../core/context/cart/CartContext';
import { CartView } from './CartView';
import { CartEmpty } from './components/CartEmpty';
import { ROUTES } from '@phone-catalog/shared';
import { useToast } from '@phone-catalog/ui';

/**
 * CartPage — page orchestrator.
 * Accesses cart context, handles checkout logic, and delegates rendering
 * to CartView (items present) or CartEmpty (empty state).
 */
export const CartPage: React.FC = () => {
  const cartContext = React.useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);

  if (!cartContext) return null;

  const { state, removeItem, clearCart, totalItemsCount, totalPrice } = cartContext;

  if (state.items.length === 0) {
    return <CartEmpty />;
  }

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      showToast('ORDER PLACED SUCCESSFULLY');
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <CartView
      items={state.items}
      totalItemsCount={totalItemsCount}
      totalPrice={totalPrice}
      onRemove={removeItem}
      onCheckout={handleCheckout}
      onContinueShopping={handleContinueShopping}
      isProcessing={isProcessing}
    />
  );
};
